<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use App\Models\Voucher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    public function index()
{
    $cart = \App\Models\Cart::with([
        'items.product.images',
        'voucher'
    ])
    ->where('user_id', auth()->id())
    ->first();

    if (!$cart) {
        return response()->json([
            'message' => 'Keranjang kosong',
            'items' => []
        ]);
    }

    return response()->json($cart);
}

public function updateShipping(Request $request)
{
    $request->validate([
        'courier' => 'required|string',
        'shipping_cost' => 'required|integer|min:0',
    ]);

    $cart = Cart::where('user_id', Auth::id())->first();

    if (!$cart) {
        return response()->json(['message' => 'Keranjang tidak ditemukan'], 404);
    }

    $cart->courier = $request->courier;
    $cart->shipping_cost = $request->shipping_cost;
    $cart->total = $cart->items()->sum('subtotal') + $cart->shipping_cost;
    $cart->save();

    return response()->json([
        'message' => 'Ongkir berhasil diperbarui',
        'cart' => $cart->load('items.product')
    ]);
}


    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'integer|min:1'
        ]);

        $product = Product::findOrFail($request->product_id);

        $product = Product::find($request->product_id);
    if (!$product || $product->stock <= 0) {
        return response()->json(['message' => 'Produk sudah habis atau tidak tersedia.'], 400);
    }
    if ($request->quantity > $product->stock) {
        return response()->json(['message' => "Stok tidak mencukupi. Tersisa {$product->stock} unit."], 400);
    }


        $cart = Cart::firstOrCreate(['user_id' => Auth::id()], ['total' => 0]);

        $cartItem = CartItem::where('cart_id', $cart->id)
            ->where('product_id', $product->id)
            ->first();

        if ($cartItem) {
            $cartItem->quantity += $request->quantity ?? 1;
            $cartItem->subtotal = $cartItem->quantity * $cartItem->price;
            $cartItem->save();
        } else {
            $cartItem = CartItem::create([
                'cart_id' => $cart->id,
                'product_id' => $product->id,
                'quantity' => $request->quantity ?? 1,
                'price' => $product->discount_price ?? $product->price,
                'subtotal' => ($product->discount_price ?? $product->price) * ($request->quantity ?? 1),
            ]);
        }

        $this->updateCartTotal($cart);

        return response()->json(['message' => 'Produk berhasil ditambahkan ke keranjang', 'cart' => $cart->load('items.product')]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        $item = \App\Models\CartItem::where('id', $id)
            ->whereHas('cart', fn($q) => $q->where('user_id', auth()->id()))
            ->with('product')
            ->first();

        if (!$item) {
            return response()->json(['message' => 'Item tidak ditemukan'], 404);
        }

        $product = $item->product;
        if (!$product) {
            return response()->json(['message' => 'Produk tidak ditemukan'], 404);
        }

        // ❌ Cek stok
        if ($request->quantity > $product->stock) {
            return response()->json([
                'message' => "Stok tidak mencukupi. Maksimal hanya {$product->stock} unit."
            ], 400);
        }

        $item->update(['quantity' => $request->quantity]);

        return response()->json(['message' => 'Quantity berhasil diperbarui']);
    }



    public function remove($id)
    {
        $cartItem = CartItem::findOrFail($id);
        $cart = $cartItem->cart;
        $cartItem->delete();

        $this->updateCartTotal($cart);

        return response()->json(['message' => 'Produk dihapus dari keranjang', 'cart' => $cart->load('items.product')]);
    }

    public function applyVoucher(Request $request)
    {
        $request->validate(['code' => 'required|string']);

        $cart = Cart::where('user_id', Auth::id())->firstOrFail();
        $voucher = Voucher::where('code', $request->code)->first();

        if (!$voucher || !$voucher->is_active) {
            return response()->json(['message' => 'Voucher tidak valid atau sudah tidak aktif'], 400);
        }

        $cart->voucher_id = $voucher->id;
        $cart->total = $cart->total - $voucher->discount_amount;
        $cart->save();

        return response()->json(['message' => 'Voucher diterapkan', 'cart' => $cart->load('items.product')]);
    }

private function updateCartTotal(Cart $cart)
{
    $totalItems = $cart->items()->sum('subtotal');
    $total = $totalItems + ($cart->shipping_cost ?? 0);
    $cart->update(['total' => $total]);
}

}
