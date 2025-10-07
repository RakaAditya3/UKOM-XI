<?php

namespace App\Http\Controllers;

use App\Models\Voucher;
use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class DiscountController extends Controller
{
    public function index()
    {
        $vouchers = Voucher::orderBy('created_at', 'desc')->get();
        return response()->json($vouchers);
    }

    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required|string|unique:vouchers,code',
            'name' => 'required|string|max:255',
            'percentage' => 'nullable|numeric|min:0|max:100',
            'fixed_amount' => 'nullable|numeric|min:0',
            'usage_limit' => 'nullable|integer|min:1',
            'starts_at' => 'nullable|date',
            'ends_at' => 'nullable|date|after_or_equal:starts_at',
            'is_active' => 'boolean',
        ]);

        // Pastikan tidak ada dua tipe diskon sekaligus
        if (!$request->percentage && !$request->fixed_amount) {
            return response()->json(['message' => 'Minimal salah satu dari percentage atau fixed_amount wajib diisi'], 422);
        }

        $voucher = Voucher::create($request->all());

        return response()->json([
            'message' => 'Voucher berhasil dibuat',
            'voucher' => $voucher
        ]);
    }

    public function update(Request $request, $id)
    {
        $voucher = Voucher::findOrFail($id);

        $request->validate([
            'name' => 'sometimes|string|max:255',
            'percentage' => 'nullable|numeric|min:0|max:100',
            'fixed_amount' => 'nullable|numeric|min:0',
            'usage_limit' => 'nullable|integer|min:1',
            'starts_at' => 'nullable|date',
            'ends_at' => 'nullable|date|after_or_equal:starts_at',
            'is_active' => 'boolean',
        ]);

        $voucher->update($request->all());

        return response()->json([
            'message' => 'Voucher berhasil diperbarui',
            'voucher' => $voucher
        ]);
    }

    public function destroy($id)
    {
        $voucher = Voucher::findOrFail($id);
        $voucher->delete();

        return response()->json(['message' => 'Voucher berhasil dihapus']);
    }
    
    public function applyVoucher(Request $request)
    {
        $request->validate(['code' => 'required|string']);

        $cart = Cart::where('user_id', Auth::id())->firstOrFail();
        $voucher = Voucher::where('code', $request->code)->first();

        if (!$voucher || !$voucher->isValid()) {
            return response()->json(['message' => 'Voucher tidak valid atau sudah tidak aktif'], 400);
        }

        $total = $cart->items()->sum('subtotal');
        $newTotal = $voucher->applyDiscount($total);

        $cart->update([
            'voucher_id' => $voucher->id,
            'total' => $newTotal,
        ]);

        $voucher->increment('used_count');

        return response()->json([
            'message' => 'Voucher berhasil diterapkan',
            'cart' => $cart->load('items.product'),
            'discount_applied' => [
                'code' => $voucher->code,
                'type' => $voucher->percentage ? 'percentage' : 'fixed',
                'value' => $voucher->percentage ?? $voucher->fixed_amount,
                'new_total' => $newTotal
            ]
        ]);
    }
}
