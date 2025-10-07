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
        $cart = Cart::with('items.product')->where('user_id', Auth::id())->first();

        if (!$cart) {
            return response()->json(['message' => 'Keranjang kosong', 'items' => []]);
        }

        return response()->json($cart);
    }

    public function add(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'integer|min:1'
        ]);

        $product = Product::findOrFail($request->product_id);

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

    public function update(Request $request)
    {
        $request->validate([
            'cart_item_id' => 'required|exists:cart_items,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $cartItem = CartItem::findOrFail($request->cart_item_id);
        $cartItem->quantity = $request->quantity;
        $cartItem->subtotal = $cartItem->price * $request->quantity;
        $cartItem->save();

        $this->updateCartTotal($cartItem->cart);

        return response()->json(['message' => 'Keranjang diperbarui', 'cart' => $cartItem->cart->load('items.product')]);
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
        $total = $cart->items()->sum('subtotal');
        $cart->update(['total' => $total]);
    }
}
