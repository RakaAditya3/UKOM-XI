<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    /**
     * GET /products
     * Ambil daftar produk lengkap dengan kategori, brand, dan gambar
     */
    public function index()
    {
        $products = Product::with(['category', 'brand', 'images'])
            ->latest()
            ->get();

        return response()->json($products);
    }

    /**
     * GET /products/{id}
     * Detail 1 produk
     */
    public function show($id)
    {
        $product = \App\Models\Product::with(['brand', 'images'])->findOrFail($id);

        // Hitung total terjual (dari order_items)
        $soldCount = \App\Models\OrderItem::where('product_id', $product->id)
            ->whereHas('order', function ($q) {
                $q->whereIn('status', ['delivered', 'paid', 'shipped']);
            })
            ->sum('quantity');

        $product->sold_count = $soldCount;

        return response()->json([
            'data' => $product
        ]);
    }


    /**
     * POST /products
     * Tambah produk baru + upload gambar ke Supabase
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'brand_id'        => 'nullable|exists:brands,id',
            'category_id'     => 'required|exists:categories,id',
            'name'            => 'required|string|max:255',
            'description'     => 'nullable|string',
            'price'           => 'required|numeric|min:0',
            'discount_price'  => 'nullable|numeric|min:0',
            'modal_cost'      => 'required|numeric|min:0',
            'stock'           => 'required|integer|min:0',
            'is_active'       => 'boolean',
            'images'          => 'nullable|array',
            'images.*'        => 'file|max:2048|mimetypes:image/jpeg,image/png,image/webp,image/svg+xml',
        ]);

        $validated['slug'] = Str::slug($validated['name']);
        $validated['sku'] = strtoupper('SKU-' . Str::random(8));
        unset($validated['images']);

        $product = Product::create($validated);

        // Upload ke Supabase
        if ($request->hasFile('images')) {
            $this->uploadImagesToSupabase($request->file('images'), $product);
        }

        return response()->json([
            'message' => 'Produk berhasil ditambahkan',
            'product' => $product->load(['brand', 'category', 'images']),
        ], 201);
    }

    /**
     * PUT /products/{id}
     * Update produk + upload gambar baru
     */
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'brand_id'        => 'nullable|exists:brands,id',
            'category_id'     => 'nullable|exists:categories,id',
            'name'            => 'nullable|string|max:255',
            'description'     => 'nullable|string',
            'price'           => 'nullable|numeric|min:0',
            'discount_price'  => 'nullable|numeric|min:0',
            'modal_cost'      => 'nullable|numeric|min:0',
            'sku' => 'nullable|string|max:50|unique:products,sku,' . $id,
            'stock'           => 'nullable|integer|min:0',
            'is_active'       => 'nullable|boolean',
            'images'          => 'nullable|array',
            'images.*'        => 'file|max:2048|mimetypes:image/jpeg,image/png,image/webp,image/svg+xml',
        ]);

        if (isset($validated['name'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        unset($validated['images']);
        $product->update($validated);

        if ($request->hasFile('images')) {
            $this->uploadImagesToSupabase($request->file('images'), $product);
        }

        return response()->json([
            'message' => 'Produk berhasil diperbarui',
            'product' => $product->load(['brand', 'category', 'images']),
        ]);
    }

    /**
     * DELETE /products/{id}
     * Hapus produk dan semua gambar di Supabase
     */
   public function destroy($id)
{
    $product = Product::with('images')->findOrFail($id);

    if ($product->images && $product->images->count() > 0) {
        foreach ($product->images as $image) {
            $path = str_replace(
                env('SUPABASE_URL') . '/storage/v1/object/public/images/',
                '',
                $image->image_url
            );

            // Pastikan path tidak kosong
            if ($path) {
                Http::withToken(env('SUPABASE_KEY'))
                    ->delete(env('SUPABASE_URL') . "/storage/v1/object/images/" . $path);
            }
        }
    }

    // Hapus record gambar dari database (opsional)
    $product->images()->delete();

    // Hapus produk utama
    $product->delete();

    return response()->json(['message' => 'Produk berhasil dihapus']);
}

    /**
     * GET /products/home
     * Produk untuk halaman utama (highlight)
     */
    public function productsHome()
    {
        $products = Product::with(['images'])
            ->where('is_highlighted', true)
            ->take(6)
            ->get();

        return response()->json(['data' => $products]);
    }

    /**
     * 🔧 Helper: Upload gambar ke Supabase Storage
     */
    private function uploadImagesToSupabase(array $images, Product $product)
    {
        foreach ($images as $index => $image) {
            $fileName = 'products/' . Str::random(40) . '.' . $image->getClientOriginalExtension();

            $response = Http::withToken(env('SUPABASE_KEY'))
                ->attach('file', fopen($image->getRealPath(), 'r'), $fileName)
                ->post(env('SUPABASE_URL') . "/storage/v1/object/images/" . $fileName);

            if ($response->failed()) {
                Log::error('Upload gagal ke Supabase', [
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
}
