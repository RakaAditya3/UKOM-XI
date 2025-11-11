<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Midtrans\Config;
use Midtrans\Snap;
use App\Models\Order;
use App\Models\Payment;
use Illuminate\Support\Str;
use App\Models\Cart;


class PaymentController extends Controller
{
public function createTransaction(Request $request)
{
    $user = $request->user();
    if (!$user) {
        return response()->json(['success' => false, 'message' => 'User belum login'], 401);
    }
    if (!$user->birth_date) {
        return response()->json([
            'success' => false,
            'message' => 'Silakan isi tanggal lahir Anda di profil untuk melanjutkan pembelian.'
        ], 403);
    }
    $age = \Carbon\Carbon::parse($user->birth_date)->age;
    if ($age < 17) {
        return response()->json([
            'success' => false,
            'message' => 'Kamu belum cukup umur untuk melakukan pembelian (minimal 17 tahun).'
        ], 403);
    }

    $request->validate([
        'address_id' => 'required|integer',
        'courier' => 'nullable|string',
        'shipping_cost' => 'nullable|numeric',
    ]);

    $cart = \App\Models\Cart::with(['items.product'])->where('user_id', $user->id)->first();

    if (!$cart || $cart->items->isEmpty()) {
        return response()->json(['success' => false, 'message' => 'Keranjang kosong'], 400);
    }

    foreach ($cart->items as $item) {
    if (!$item->product) {
        return response()->json(['success' => false, 'message' => 'Produk tidak ditemukan.'], 400);
    }
    if ($item->quantity > $item->product->stock) {
        return response()->json([
            'success' => false,
            'message' => "Stok produk '{$item->product->name}' tidak mencukupi. Maksimal {$item->product->stock}."
        ], 400);
    }
}


    $subtotal = $cart->items->sum(fn($item) => $item->price * $item->quantity);
    $shippingCost = $request->input('shipping_cost', 0);
    $total = $subtotal + $shippingCost;

    // 💳 Midtrans Config
    \Midtrans\Config::$serverKey = config('midtrans.server_key');
    \Midtrans\Config::$isProduction = false;
    \Midtrans\Config::$isSanitized = true;
    \Midtrans\Config::$is3ds = true;

    // 🧾 Item Details
    $items = $cart->items->map(function ($item) {
        return [
            'id' => $item->product_id,
            'price' => (int) $item->price,
            'quantity' => $item->quantity,
            'name' => $item->product->name ?? 'Produk',
        ];
    })->toArray();

    // Tambahkan ongkir ke item detail
    if ($shippingCost > 0) {
        $items[] = [
            'id' => 'ONGKIR',
            'price' => (int) $shippingCost,
            'quantity' => 1,
            'name' => 'Ongkos Kirim',
        ];
    }

    // === Data transaksi Midtrans ===
    $payload = [
        'transaction_details' => [
            'order_id' => 'INV-' . strtoupper(uniqid()),
            'gross_amount' => (int) $total,
        ],
        'item_details' => $items,
        'customer_details' => [
            'first_name' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone ?? '',
        ],
    ];

    try {
        $snapToken = \Midtrans\Snap::getSnapToken($payload);

        return response()->json([
            'success' => true,
            'snap_token' => $snapToken,
            'total' => $total,
            'subtotal' => $subtotal,
            'shipping_cost' => $shippingCost,
        ]);
    } catch (\Throwable $e) {
        return response()->json([
            'success' => false,
            'message' => 'Gagal membuat transaksi Midtrans',
            'error' => $e->getMessage(),
        ], 500);
    }
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

        if (in_array($transactionStatus, ['capture', 'settlement'])) {
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
