<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class AdminAuthController extends Controller
{
    public function login(Request $request)
    {
        // 1️⃣ Validasi input
        $validator = Validator::make($request->all(), [
            'email'    => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // 2️⃣ Cek apakah user ada
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Email atau password salah'], 401);
        }

        // 3️⃣ Hanya tolak role 'user' (customer biasa)
        if ($user->role === 'user') {
            return response()->json(['message' => 'Akses ditolak: Akun ini tidak memiliki hak akses ke admin panel'], 403);
        }

        // 4️⃣ Buat token untuk role non-user (admin, operator, dispatcher)
        $token = $user->createToken('admin_token')->plainTextToken;

        // 5️⃣ Kembalikan respon
        return response()->json([
            'message' => 'Login berhasil',
            'token'   => $token,
            'user'    => [
                'id'    => $user->id,
                'name'  => $user->name,
                'email' => $user->email,
                'role'  => $user->role,
            ],
        ]);
    }
}
