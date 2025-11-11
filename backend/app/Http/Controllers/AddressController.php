<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;

class AddressController extends Controller
{
    /**
     * GET /addresses
     */
    public function index(Request $request)
    {
        $addresses = $request->user()->addresses()->get();
        return response()->json($addresses);
    }

    /**
     * POST /addresses
     */
  public function store(Request $request)
{
    $request->validate([
        'recipient_name' => 'required|string|max:255',
        'phone' => 'required|string|max:20',
        'address' => 'required|string',
        'postal_code' => 'required|string|max:10',
        'province_id' => 'required|integer',
        'city_id' => 'required|integer',
        'district_id' => 'required|integer',
    ]);

    $address = $request->user()->addresses()->create([
        'label' => $request->input('label', 'Alamat Utama'),
        'recipient_name' => $request->input('recipient_name'),
        'phone' => $request->input('phone'),
        'address' => $request->input('address'),
        'postal_code' => $request->input('postal_code'),
        'province_id' => $request->input('province_id'),
        'city_id' => $request->input('city_id'),
        'district_id' => $request->input('district_id'),
        'is_default' => $request->boolean('is_default', false),
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Alamat berhasil disimpan',
        'data' => $address,
    ]);
}


    /**
     * PUT /addresses/{id}
     */
    public function update(Request $request, $id)
    {
        $address = Address::where('user_id', $request->user()->id)->findOrFail($id);

        $validated = $request->validate([
            'label' => 'nullable|string|max:50',
            'recipient_name' => 'required|string|max:100',
            'phone' => 'required|string|max:20',
            'address' => 'required|string',
            'city' => 'required|string|max:100',
            'postal_code' => 'nullable|string|max:10',
            'is_default' => 'boolean',
        ]);

        // Jika dijadikan default, yang lain di-nonaktifkan
        if (!empty($validated['is_default']) && $validated['is_default']) {
            $request->user()->addresses()->update(['is_default' => false]);
        }

        $address->update($validated);

        return response()->json(['message' => 'Alamat berhasil diperbarui.', 'data' => $address]);
    }

    /**
     * DELETE /addresses/{id}
     */
    public function destroy(Request $request, $id)
    {
        $address = Address::where('user_id', $request->user()->id)->findOrFail($id);
        $address->delete();

        return response()->json(['message' => 'Alamat berhasil dihapus.']);
    }
}
