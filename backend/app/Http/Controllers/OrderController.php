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
 public function index(Request $request)
{
    $user = $request->user();

    if (in_array(strtolower($user->role), ['admin', 'operator', 'dispatcher'])) {
        $orders = Order::with(['user', 'items.product.images'])
            ->orderByDesc('created_at')
            ->get();
    } 
    // 🔹 User biasa hanya lihat miliknya
    else {
        $orders = Order::with('items.product.images')
            ->where('user_id', $user->id)
            ->orderByDesc('created_at')
            ->get();
    }

    return response()->json($orders);
}

public function adminIndex()
{
    $orders = Order::with(['user', 'items.product.images'])
        ->orderByDesc('created_at')
        ->get();

    return response()->json($orders);
}


    public function show($id)
    {
        $order = Order::with('items.product')
            ->where('user_id', Auth::id())
            ->findOrFail($id);

        return response()->json($order);
    }


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

  public function dashboardStats()
{
    $orders = \App\Models\Order::with('items.product')
        ->where('status', '!=', 'cancelled')
        ->get();

    $totalOmset = $orders->sum('total');
    $totalModal = 0;
    $totalProdukTerjual = 0;

    // 🔹 Hitung total modal dan produk terjual
    foreach ($orders as $order) {
        foreach ($order->items as $item) {
            $modal = $item->product->modal_cost ?? 0;
            $totalModal += $modal * $item->quantity;
            $totalProdukTerjual += $item->quantity;
        }
    }

    $labaBersih = $totalOmset - $totalModal;

    // 🔹 Kelompokkan per bulan (chart)
    $monthlyStats = \App\Models\Order::with('items.product')
        ->selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month, SUM(total) as total_omset')
        ->where('status', '!=', 'cancelled')
        ->groupBy('month')
        ->orderBy('month', 'asc')
        ->get()
        ->map(function ($row) {
            // hitung modal dan laba per bulan
            $ordersInMonth = \App\Models\Order::with('items.product')
                ->whereRaw('DATE_FORMAT(created_at, "%Y-%m") = ?', [$row->month])
                ->where('status', '!=', 'cancelled')
                ->get();

            $modal = 0;
            foreach ($ordersInMonth as $order) {
                foreach ($order->items as $item) {
                    $modal += ($item->product->modal_cost ?? 0) * $item->quantity;
                }
            }

            $laba = $row->total_omset - $modal;

            return [
                'month' => \Carbon\Carbon::parse($row->month . '-01')->translatedFormat('M Y'),
                'omset' => (float) $row->total_omset,
                'modal' => (float) $modal,
                'laba' => (float) $laba,
            ];
        })
        ->values();

    return response()->json([
        'total_omset' => $totalOmset,
        'total_modal' => $totalModal,
        'laba_bersih' => $labaBersih,
        'total_produk_terjual' => $totalProdukTerjual,
        'total_pesanan' => $orders->count(),
        'chart' => $monthlyStats,
    ]);
}
public function createFromCart(Request $request)
{
    $user = auth()->user();

    $request->validate([
        'address_id' => 'required|integer',
        'courier' => 'nullable|string',
        'shipping_cost' => 'nullable|numeric',
    ]);

    $cart = Cart::with('items.product')->where('user_id', $user->id)->first();
    if (!$cart || $cart->items->isEmpty()) {
        return response()->json(['message' => 'Keranjang kosong'], 400);
    }

    DB::beginTransaction();
    try {
        $subtotal = $cart->items->sum('subtotal');
        $shippingCost = $request->input('shipping_cost', 0);
        $total = $subtotal + $shippingCost;

        $order = Order::create([
            'user_id' => $user->id,
            'address_id' => $request->address_id,
            'order_number' => 'ORD-' . strtoupper(Str::random(10)),
            'status' => 'paid',
            'subtotal' => $subtotal,
            'discount_total' => 0,
            'shipping_cost' => $shippingCost,
            'courier' => $request->courier ?? null,
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

            $item->product->decrement('stock', $item->quantity);
        }

        // Kosongkan keranjang
        $cart->items()->delete();
        $cart->update(['total' => 0]);

        DB::commit();

        return response()->json([
            'message' => 'Order berhasil dibuat setelah pembayaran',
            'order' => $order->load('items.product')
        ]);
    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json([
            'message' => 'Gagal membuat order',
            'error' => $e->getMessage()
        ], 500);
    }
}

public function confirmReceipt($id)
{
    $order = Order::where('user_id', Auth::id())
        ->where('status', 'delivered')
        ->findOrFail($id);

    if ($order->is_confirmed) {
        return response()->json(['message' => 'Pesanan sudah dikonfirmasi sebelumnya.'], 400);
    }

    $order->update([
        'is_confirmed' => true,
        'confirmed_at' => now(),
    ]);

    return response()->json([
        'message' => 'Pesanan dikonfirmasi sebagai diterima ✅',
        'order' => $order
    ]);
}

public function getByNumber($orderNumber)
{
    $order = Order::with('items.product.images')
        ->where('order_number', $orderNumber)
        ->first();

    if (!$order) {
        return response()->json(['message' => 'Order tidak ditemukan'], 404);
    }

    return response()->json($order);
}





}
