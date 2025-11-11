<?php

namespace App\Http\Controllers;

use App\Models\ProductRating;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductRatingController extends Controller
{
   public function store(Request $request, $productId)
{
    $request->validate([
        'rating' => 'required|integer|min:1|max:5',
        'review' => 'nullable|string|max:1000',
    ]);

    $user = auth()->user();

    // ✅ Cek apakah user pernah membeli produk ini dan statusnya "delivered"
    $hasPurchased = \App\Models\OrderItem::whereHas('order', function ($q) use ($user) {
        $q->where('user_id', $user->id)
          ->whereIn('status', ['delivered'])
          ->where('is_confirmed', true); // boleh pakai konfirmasi user
    })
    ->where('product_id', $productId)
    ->exists();

    if (!$hasPurchased) {
        return response()->json([
            'message' => 'Kamu hanya bisa memberi rating untuk produk yang sudah kamu terima.',
        ], 403);
    }

    $rating = \App\Models\ProductRating::updateOrCreate(
        [
            'user_id' => $user->id,
            'product_id' => $productId,
        ],
        [
            'rating' => $request->rating,
            'review' => $request->review,
        ]
    );

    return response()->json([
        'message' => 'Rating berhasil disimpan',
        'rating' => $rating
    ]);
}


    public function show($productId)
    {
        $ratings = ProductRating::with('user')
            ->where('product_id', $productId)
            ->latest()
            ->get();

        $average = round($ratings->avg('rating'), 1);

        return response()->json([
            'average' => $average,
            'count' => $ratings->count(),
            'ratings' => $ratings
        ]);
    }

    public function canRate($productId)
{
    $user = auth()->user();

    $hasPurchased = \App\Models\OrderItem::whereHas('order', function ($q) use ($user) {
        $q->where('user_id', $user->id)
          ->whereIn('status', ['delivered'])
          ->where('is_confirmed', true);
    })
    ->where('product_id', $productId)
    ->exists();

    return response()->json(['can_rate' => $hasPurchased]);
}

// Dalam ProductRatingController
public function myRating($productId)
{
    $user = auth()->user();

    $rating = ProductRating::where('user_id', $user->id)
        ->where('product_id', $productId)
        ->first();

    if (!$rating) {
        return response()->json(['message' => 'Belum ada ulasan'], 404);
    }

    return response()->json($rating);
}


}
