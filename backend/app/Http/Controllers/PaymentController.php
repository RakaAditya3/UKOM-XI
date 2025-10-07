<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Midtrans\Config;
use Midtrans\Snap;
use App\Models\Order;
use App\Models\Payment;

class PaymentController extends Controller
{
    public function createTransaction(Request $request)
    {
        $order = Order::with('user')->findOrFail($request->order_id);

        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = config('midtrans.is_production');
        Config::$isSanitized = config('midtrans.is_sanitized');
        Config::$is3ds = config('midtrans.is_3ds');

        $params = [
            'transaction_details' => [
                'order_id' => $order->order_number,
                'gross_amount' => $order->total,
            ],
            'customer_details' => [
                'first_name' => $order->user->name,
                'email' => $order->user->email,
            ],
        ];

        $snapToken = Snap::getSnapToken($params);

        Payment::create([
            'order_id' => $order->id,
            'method' => 'bank_transfer',
            'amount' => $order->total,
            'status' => 'pending',
        ]);

        return response()->json([
            'snap_token' => $snapToken,
            'redirect_url' => "https://app.sandbox.midtrans.com/snap/v2/vtweb/" . $snapToken,
        ]);
    }

    public function handleNotification(Request $request)
    {
        $payload = $request->all();

        $order = Order::where('order_number', $payload['order_id'])->first();
        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $payment = Payment::where('order_id', $order->id)->first();

        $transactionStatus = $payload['transaction_status'] ?? null;
        $transactionId = $payload['transaction_id'] ?? null;

        if ($transactionStatus === 'capture' || $transactionStatus === 'settlement') {
            $order->status = 'paid';
            $payment->status = 'success';
        } elseif (in_array($transactionStatus, ['cancel', 'deny', 'expire'])) {
            $order->status = 'cancelled';
            $payment->status = 'failed';
        } elseif ($transactionStatus === 'pending') {
            $order->status = 'pending';
            $payment->status = 'pending';
        }

        $payment->transaction_id = $transactionId;
        $order->save();
        $payment->save();

        return response()->json(['message' => 'Payment status updated']);
    }
}
