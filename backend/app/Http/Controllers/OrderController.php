<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    // 🧾 Melihat semua pesanan user
    public function index()
    {
        $orders = Order::with('items.product')
            ->where('user_id', Auth::id())
            ->orderByDesc('created_at')
            ->get();

        return response()->json($orders);
    }

    // 📦 Detail satu pesanan
    public function show($id)
    {
        $order = Order::with('items.product')
            ->where('user_id', Auth::id())
            ->findOrFail($id);

        return response()->json($order);
    }

    // 🛒 Checkout dari cart
    public function checkout(Request $request)
    {
        $request->validate([
            'address_id' => 'required|exists:addresses,id',
        ]);

        $cart = Cart::with(['items.product', 'voucher'])
            ->where('user_id', Auth::id())
            ->first();

        if (!$cart || $cart->items->isEmpty()) {
            return response()->json(['message' => 'Keranjang kosong'], 400);
        }

        DB::beginTransaction();

        try {
            $subtotal = $cart->items->sum('subtotal');
            $discount = $cart->voucher ? ($cart->voucher->fixed_amount ?? 0) : 0;
            $total = $subtotal - $discount;

            $order = Order::create([
                'user_id' => Auth::id(),
                'address_id' => $request->address_id,
                'voucher_id' => $cart->voucher_id,
                'order_number' => 'ORD-' . strtoupper(Str::random(10)),
                'status' => 'pending',
                'subtotal' => $subtotal,
                'discount_total' => $discount,
                'total' => $total,
            ]);

            foreach ($cart->items as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price' => $item->price,
                    'subtotal' => $item->subtotal,
                ]);

                // Kurangi stok produk
                $item->product->decrement('stock', $item->quantity);
            }

            // Kosongkan keranjang
            $cart->items()->delete();
            $cart->update(['total' => 0, 'voucher_id' => null]);

            DB::commit();

            return response()->json([
                'message' => 'Checkout berhasil, pesanan telah dibuat',
                'order' => $order->load('items.product')
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Checkout gagal',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // 🔄 Ubah status pesanan (khusus admin)
    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,paid,shipped,delivered,cancelled'
        ]);

        $order = Order::findOrFail($id);
        $order->update(['status' => $request->status]);

        return response()->json([
            'message' => 'Status pesanan diperbarui',
            'order' => $order
        ]);
    }
}
