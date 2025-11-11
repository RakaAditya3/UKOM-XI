<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;

class BrandController extends Controller
{
    /**
     * GET /brands
     * Tampilkan semua brand (umum & admin)
     */
    public function index()
    {
        $brands = Brand::withCount('products')->latest()->get();

        return response()->json([
            'success' => true,
            'data' => $brands,
        ]);
    }

    /**
     * POST /brands
     * Tambah brand baru dengan upload logo ke Supabase
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => 'required|string|max:255|unique:brands,name',
            'description' => 'nullable|string',
            'logo'        => 'nullable|file|max:2048|mimetypes:image/jpeg,image/png,image/webp',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        // 🪶 Upload logo ke Supabase jika ada
        if ($request->hasFile('logo')) {
            $file = $request->file('logo');
            $fileName = 'brands/' . Str::random(40) . '.' . $file->getClientOriginalExtension();

            $response = Http::withToken(env('SUPABASE_KEY'))
                ->attach('file', fopen($file->getRealPath(), 'r'), $fileName)
                ->post(env('SUPABASE_URL') . "/storage/v1/object/images/" . $fileName);

            if ($response->failed()) {
                \Log::error('Gagal upload logo brand ke Supabase', [
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);
            } else {
                $validated['logo'] = env('SUPABASE_URL') . "/storage/v1/object/public/images/" . $fileName;
            }
        }

        $brand = Brand::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Brand berhasil ditambahkan',
            'data' => $brand,
        ], 201);
    }

    /**
     * PUT /brands/{id}
     * Update brand + upload logo baru jika ada
     */
    public function update(Request $request, $id)
    {
        $brand = Brand::findOrFail($id);

        $validated = $request->validate([
            'name'        => 'nullable|string|max:255|unique:brands,name,' . $brand->id,
            'description' => 'nullable|string',
            'logo'        => 'nullable|file|max:2048|mimetypes:image/jpeg,image/png,image/webp',
        ]);

        if (isset($validated['name'])) {
            $validated['slug'] = Str::slug($validated['name']);
        }

        // 🔁 Upload logo baru (hapus lama di Supabase jika ada)
        if ($request->hasFile('logo')) {
            // Hapus logo lama dari Supabase
            if (!empty($brand->logo)) {
                $path = str_replace(env('SUPABASE_URL') . '/storage/v1/object/public/images/', '', $brand->logo);
                Http::withToken(env('SUPABASE_KEY'))
                    ->delete(env('SUPABASE_URL') . "/storage/v1/object/images/" . $path);
            }

            $file = $request->file('logo');
            $fileName = 'brands/' . Str::random(40) . '.' . $file->getClientOriginalExtension();

            $response = Http::withToken(env('SUPABASE_KEY'))
                ->attach('file', fopen($file->getRealPath(), 'r'), $fileName)
                ->post(env('SUPABASE_URL') . "/storage/v1/object/images/" . $fileName);

            if ($response->successful()) {
                $validated['logo'] = env('SUPABASE_URL') . "/storage/v1/object/public/images/" . $fileName;
            }
        }

        $brand->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Brand berhasil diperbarui',
            'data' => $brand,
        ]);
    }

    /**
     * DELETE /brands/{id}
     * Hapus brand + logo di Supabase
     */
    public function destroy($id)
    {
        $brand = Brand::findOrFail($id);

        if (!empty($brand->logo)) {
            $path = str_replace(env('SUPABASE_URL') . '/storage/v1/object/public/images/', '', $brand->logo);
            Http::withToken(env('SUPABASE_KEY'))
                ->delete(env('SUPABASE_URL') . "/storage/v1/object/images/" . $path);
        }

        $brand->delete();

        return response()->json([
            'success' => true,
            'message' => 'Brand berhasil dihapus',
        ]);
    }
}
