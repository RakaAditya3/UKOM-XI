<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class RajaOngkirController extends Controller
{
    /**
     * ✅ Ambil daftar provinsi (JSON)
     */
    public function index()
    {
        try {
            $response = Http::withHeaders([
                'Accept' => 'application/json',
                'key' => config('rajaongkir.api_key'),
            ])->get('https://rajaongkir.komerce.id/api/v1/destination/province');

            if ($response->failed()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Gagal mengambil data provinsi',
                    'detail' => $response->body(),
                ], $response->status());
            }

            $data = $response->json();

            return response()->json([
                'success' => true,
                'data' => $data['data'] ?? [],
                'meta' => $data['meta'] ?? [],
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan server',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * ✅ Ambil daftar kota berdasarkan ID provinsi (JSON)
     */
    public function getCities($provinceId)
    {
        try {
            $response = Http::withHeaders([
                'Accept' => 'application/json',
                'key' => config('rajaongkir.api_key'),
            ])->get("https://rajaongkir.komerce.id/api/v1/destination/city/{$provinceId}");

            if ($response->failed()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Gagal mengambil data kota',
                    'detail' => $response->body(),
                ], $response->status());
            }

            $data = $response->json();

            return response()->json([
                'success' => true,
                'data' => $data['data'] ?? [],
                'meta' => $data['meta'] ?? [],
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan server',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * ✅ Ambil daftar kecamatan berdasarkan ID kota (JSON)
     */
    public function getDistricts($cityId)
    {
        try {
            $response = Http::withHeaders([
                'Accept' => 'application/json',
                'key' => config('rajaongkir.api_key'),
            ])->get("https://rajaongkir.komerce.id/api/v1/destination/district/{$cityId}");

            if ($response->failed()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Gagal mengambil data kecamatan',
                    'detail' => $response->body(),
                ], $response->status());
            }

            $data = $response->json();

            return response()->json([
                'success' => true,
                'data' => $data['data'] ?? [],
                'meta' => $data['meta'] ?? [],
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan server',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    /**
     * ✅ Hitung ongkos kirim
     */
   public function checkOngkir(Request $request)
{
    $user = $request->user();
    if (!$user) {
        return response()->json(['success' => false, 'message' => 'User tidak terautentikasi'], 401);
    }

    $addresses = $user->addresses;
    if ($addresses->isEmpty()) {
        return response()->json(['success' => false, 'message' => 'Kamu belum punya alamat pengiriman'], 400);
    }
    $address = $addresses->where('is_default', true)->first() ?? $addresses->first();

    if (!$address->district_id) {
        return response()->json(['success' => false, 'message' => 'Alamat belum memiliki district_id'], 400);
    }

    $origin = 18; 
    $destination = $address->district_id;
    $weight = $request->input('weight', 10);
    $courier = $request->input('courier', 'jne:jnt:sicepat:ninja');

    try {
        $response = Http::asForm()->withHeaders([
            'Accept' => 'application/json',
            'key' => config('rajaongkir.api_key'),
        ])->post('https://rajaongkir.komerce.id/api/v1/calculate/domestic-cost', [
            'origin' => $origin,
            'destination' => $destination,
            'weight' => $weight,
            'courier' => $courier,
        ]);

        \Log::info('RajaOngkir Response', [
            'status' => $response->status(),
            'body' => $response->body(),
        ]);

        if ($response->failed()) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghitung ongkir',
                'detail' => $response->body(),
            ], $response->status());
        }

        $data = $response->json();

        return response()->json([
            'success' => true,
            'data' => $data['data'] ?? [],
            'meta' => $data['meta'] ?? [],
        ]);
    } catch (\Throwable $th) {
        \Log::error('❌ Error checkOngkir: ' . $th->getMessage());
        return response()->json([
            'success' => false,
            'message' => 'Terjadi kesalahan server saat menghitung ongkir',
            'error' => $th->getMessage(),
        ], 500);
    }
}

}
