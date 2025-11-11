<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class WishlistController extends Controller
{

   public function index(Request $request)
{
    $wishlist = $request->user()
        ->wishlist()
        ->with([
            'category:id,name',
            'images:id,product_id,image_url', 
        ])
        ->select('products.id', 'products.name', 'products.price', 'products.category_id')
        ->get();

    return response()->json($wishlist);
}


    public function store(Request $request, $product_id)
    {
        $user = $request->user();
        $product = Product::findOrFail($product_id);


        if ($user->wishlist()->where('product_id', $product->id)->exists()) {
            return response()->json(['message' => 'Produk sudah ada di wishlist.'], 400);
        }

        $user->wishlist()->attach($product->id);

        return response()->json(['message' => 'Produk berhasil ditambahkan ke wishlist.']);
    }

    public function destroy(Request $request, $product_id)
    {
        $user = $request->user();

        if (! $user->wishlist()->where('product_id', $product_id)->exists()) {
            return response()->json(['message' => 'Produk tidak ditemukan di wishlist.'], 404);
        }

        $user->wishlist()->detach($product_id);

        return response()->json(['message' => 'Produk dihapus dari wishlist.']);
    }
}
