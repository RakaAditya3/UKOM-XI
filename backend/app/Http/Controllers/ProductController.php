<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with(['category', 'images'])
            ->latest()
            ->paginate(10);

        return response()->json($products);
    }

    public function show($id)
    {
        $product = Product::with(['category', 'images'])->findOrFail($id);
        return response()->json($product);
    }

    public function store(Request $request)
    {

        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'discount_price' => 'nullable|numeric|min:0',
            'stock' => 'required|integer|min:0',
            'brand' => 'nullable|string|max:100',
            'images' => 'nullable|array',
            'images.*' => 'file|max:2048|mimetypes:image/jpeg,image/png,image/jpg,image/gif,image/webp,image/svg+xml',
        ]);


        $validated['slug'] = Str::slug($validated['name']);


        unset($validated['images']);


        $product = Product::create($validated);

   
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $image) {
 
                $fileName = 'products/' . Str::random(40) . '.' . $image->getClientOriginalExtension();

    
                $response = Http::withToken(env('SUPABASE_KEY'))
                    ->attach('file', fopen($image->getRealPath(), 'r'), $fileName)
                    ->post(env('SUPABASE_URL') . "/storage/v1/object/images/" . $fileName);

                if ($response->failed()) {
                    \Log::error('Upload gagal ke Supabase', [
                        'status' => $response->status(),
                        'body' => $response->body(),
                    ]);
                    continue;
                }
                $imageUrl = env('SUPABASE_URL') . "/storage/v1/object/public/images/" . $fileName;

                $product->images()->create([
                    'image_url' => $imageUrl,
                    'is_main' => $index === 0, 
                ]);
            }
        }

        return response()->json([
            'message' => 'Produk berhasil ditambahkan',
            'product' => $product->load('images'),
        ], 201);
    }


    public function update(Request $request, $id)
{
    $product = Product::findOrFail($id);

    $validated = $request->validate([
        'category_id'     => 'nullable|exists:categories,id',
        'name'            => 'nullable|string|max:255',
        'description'     => 'nullable|string',
        'price'           => 'nullable|numeric|min:0',
        'discount_price'  => 'nullable|numeric|min:0',
        'stock'           => 'nullable|integer|min:0',
        'brand'           => 'nullable|string|max:100',
        'images'          => 'nullable|array',
        'images.*'        => 'file|max:2048|mimetypes:image/jpeg,image/png,image/jpg,image/gif,image/webp,image/svg+xml',
        'is_active'       => 'nullable|boolean',
    ]);

    if (isset($validated['name'])) {
        $validated['slug'] = Str::slug($validated['name']);
    }

    unset($validated['images']);

    $product->update($validated);

    if ($request->hasFile('images')) {
        foreach ($request->file('images') as $index => $image) {
            // sama persis seperti store()
            $fileName  = 'products/' . Str::random(40) . '.' . $image->getClientOriginalExtension();

            $response = Http::withToken(env('SUPABASE_KEY'))
                ->attach('file', fopen($image->getRealPath(), 'r'), $fileName)
                ->post(env('SUPABASE_URL') . "/storage/v1/object/images/" . $fileName);

            if ($response->failed()) {
                \Log::error('Upload gagal ke Supabase (update)', [
                    'status' => $response->status(),
                    'body'   => $response->body(),
                ]);
                continue;
            }

            $imageUrl = env('SUPABASE_URL') . "/storage/v1/object/public/images/" . $fileName;

            $product->images()->create([
                'image_url' => $imageUrl,
                'is_main'   => $index === 0,
            ]);
        }
    }

    return response()->json([
        'message' => 'Produk berhasil diperbarui',
        'product' => $product->load('images'),
    ]);
    }
    
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json(['message' => 'Produk berhasil dihapus']);
    }

    public function productsHome()
    {
        $products = Product::with(['images'])
            ->where('is_highlighted', true)
            ->take(6)
            ->get();

        return response()->json(['data' => $products]);
    }
}