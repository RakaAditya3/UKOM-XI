<?php

namespace App\Http\Controllers;

use App\Models\BankAccount;
use Illuminate\Http\Request;

class BankAccountController extends Controller
{
    /**
     * GET /bank-accounts
     */
    public function index(Request $request)
    {
        $accounts = $request->user()->bankAccounts()->get();
        return response()->json($accounts);
    }

    /**
     * POST /bank-accounts
     */
    public function store(Request $request)
    {
        $user = $request->user();

        // Maksimal 3 rekening per user
        if ($user->bankAccounts()->count() >= 3) {
            return response()->json(['error' => 'Maksimal 3 rekening per pengguna.'], 400);
        }

        $validated = $request->validate([
            'bank_name' => 'required|string|max:100',
            'account_number' => 'required|string|max:50',
            'account_owner' => 'required|string|max:100',
        ]);

        $account = $user->bankAccounts()->create($validated);

        return response()->json([
            'message' => 'Rekening berhasil ditambahkan.',
            'data' => $account,
        ]);
    }

    /**
     * DELETE /bank-accounts/{id}
     */
    public function destroy(Request $request, $id)
    {
        $account = BankAccount::where('user_id', $request->user()->id)->findOrFail($id);
        $account->delete();

        return response()->json(['message' => 'Rekening berhasil dihapus.']);
    }
}
