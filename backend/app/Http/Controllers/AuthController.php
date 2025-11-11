<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Otp;
use App\Helpers\OtpHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;

class AuthController extends Controller
{
    /**
     * 📦 REGISTER (Sign Up)
     */
   public function signup(Request $request)
{
    $response = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
        'secret' => env('RECAPTCHA_SECRET'),
        'response' => $request->input('g-recaptcha-response'),
        'remoteip' => $request->ip(),
    ]);

    $captchaData = $response->json();

    if (empty($captchaData['success']) || !$captchaData['success']) {
        return response()->json([
            'message' => 'Verifikasi CAPTCHA gagal. Coba lagi.'
        ], 400);
    }

 // === 2️⃣ Validasi input dasar ===
$validator = Validator::make($request->all(), [
    'name' => [
        'required',
        'string',
        'max:50',
        'regex:/^[A-Za-z\s]+$/u'
    ],
    'email' => 'required|email',
    'password' => 'required|min:6',
], [
    'name.required' => 'Nama wajib diisi.',
    'name.string' => 'Nama tidak valid.',
    'name.max' => 'Nama maksimal 50 karakter.',
    'name.regex' => 'Nama hanya boleh berisi huruf dan spasi, tanpa angka atau simbol.',
    'email.required' => 'Email wajib diisi.',
    'email.email' => 'Format email tidak valid.',
    'password.required' => 'Password wajib diisi.',
    'password.min' => 'Password minimal 6 karakter.',
]);


    if ($validator->fails()) {
        return response()->json([
            'errors' => $validator->errors()
        ], 422);
    }

    // === 3️⃣ Cek apakah email sudah terdaftar ===
    if (User::where('email', $request->email)->exists()) {
        return response()->json([
            'message' => 'Email sudah terdaftar. Silakan login atau gunakan email lain.'
        ], 409);
    }

    // === 4️⃣ Buat user baru ===
    $user = User::create([
        'name'     => $request->name,
        'email'    => $request->email,
        'password' => Hash::make($request->password),
        'role'     => 'user',
    ]);

    try {
        OtpHelper::send($user, 'signup');
    } catch (\Exception $e) {
        $user->delete();
        return response()->json([
            'message' => 'Gagal mengirim OTP. Coba lagi nanti.'
        ], 500);
    }

    return response()->json([
        'message' => 'User berhasil dibuat. OTP telah dikirim ke email.',
        'email' => $user->email,
    ], 201);
}


    /**
     * ✅ Verifikasi OTP Sign Up
     */
    public function verifySignupOtp(Request $request)
{
    $otp = Otp::where('code', $request->code)
              ->where('type', 'signup')
              ->where('is_used', false)
              ->first();

    if (!$otp || $otp->expires_at < Carbon::now()) {
        return response()->json(['message' => 'OTP tidak valid atau kadaluarsa'], 400);
    }

    // ✅ Tandai OTP sudah digunakan
    $otp->is_used = true;
    $otp->save();

    // ✅ Verifikasi email user
    $user = $otp->user;
    $user->email_verified_at = Carbon::now();
    $user->save();

    // ✅ Buat token login otomatis
    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'message' => 'Akun berhasil diverifikasi dan login otomatis',
        'token' => $token,
        'user' => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
            'photo_url' => $user->photo_url,
            'created_at' => $user->created_at,
        ]
    ]);
    }


    /**
     * 🔐 LOGIN (Minta OTP)
     */
    public function login(Request $request)
    {

        // 🔒 Verifikasi reCAPTCHA
    $response = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
        'secret' => env('RECAPTCHA_SECRET'),
        'response' => $request->input('g-recaptcha-response'),
        'remoteip' => $request->ip(),
    ]);

    $captchaData = $response->json();

    if (!$captchaData['success']) {
        return response()->json(['message' => 'Verifikasi CAPTCHA gagal. Coba lagi.'], 400);
    }

        $validator = Validator::make($request->all(), [
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Email atau password salah'], 401);
        }

        OtpHelper::send($user, 'login');

        return response()->json([
            'message' => 'OTP login telah dikirim ke email',
            'email' => $user->email
        ]);
    }

    /**
     * 🔓 Verifikasi OTP Login (Return Token + Role)
     */
    public function verifyLoginOtp(Request $request)
    {
        $otp = Otp::where('code', $request->code)
                  ->where('type', 'login')
                  ->where('is_used', false)
                  ->first();

        if (!$otp || $otp->expires_at < Carbon::now()) {
            return response()->json(['message' => 'OTP tidak valid atau kadaluarsa'], 400);
        }

        $otp->is_used = true;
        $otp->save();

        $user = $otp->user;
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login berhasil',
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
                'photo_url' => $user->photo_url,
                'created_at' => $user->created_at,
            ]
        ]);
    }

    /**
     * 🔁 Lupa Password (Kirim OTP)
     */
    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
        ], [
            'email.exists' => 'Email tidak ditemukan dalam sistem'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::where('email', $request->email)->first();

        // Kirim OTP dengan tipe 'reset'
        OtpHelper::send($user, 'reset');

        return response()->json([
            'message' => 'OTP reset password telah dikirim ke email',
            'email' => $user->email
        ]);
    }

    /**
     * 🔑 Verifikasi OTP Reset Password
     */
    public function verifyResetOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'    => 'required|email|exists:users,email',
            'code'     => 'required|string',
            'password' => 'required|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $otp = Otp::where('code', $request->code)
                  ->where('type', 'reset')
                  ->where('is_used', false)
                  ->first();

        if (!$otp || $otp->expires_at < Carbon::now()) {
            return response()->json(['message' => 'OTP tidak valid atau kadaluarsa'], 400);
        }

        $otp->is_used = true;
        $otp->save();

        $user = User::where('email', $request->email)->first();
        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json(['message' => 'Password berhasil direset']);
    }



public function googleAuth(Request $request)
{
    
    $request->validate([
        'id_token' => 'required|string'
    ]);

    // ✅ Verifikasi token ke Google
    $googleResponse = Http::get('https://oauth2.googleapis.com/tokeninfo', [
        'id_token' => $request->id_token
    ]);

    if ($googleResponse->failed()) {
        return response()->json(['message' => 'Token Google tidak valid'], 401);
    }

    $googleUser = $googleResponse->json();

    // Ambil data user dari Google
    $email = $googleUser['email'] ?? null;
    $name = $googleUser['name'] ?? 'User';
    $photo = $googleUser['picture'] ?? null;

    if (!$email) {
        return response()->json(['message' => 'Email tidak ditemukan pada akun Google'], 400);
    }

    // 🔎 Cari user berdasarkan email
    $user = User::where('email', $email)->first();

    if (!$user) {
        // 🆕 Buat akun baru tanpa password
        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => null,
            'photo_url' => $photo,
            'email_verified_at' => null,
            'role' => 'user',
        ]);

        // Kirim OTP untuk verifikasi signup
        \App\Helpers\OtpHelper::send($user, 'signup');

        return response()->json([
            'is_new' => true,
            'message' => 'Akun Google baru terdeteksi, OTP signup telah dikirim.',
            'email' => $user->email
        ]);
    }

    // 🧠 User sudah ada → kirim OTP login
    \App\Helpers\OtpHelper::send($user, 'login');

    return response()->json([
        'is_new' => false,
        'message' => 'Login dengan Google berhasil, OTP login telah dikirim.',
        'email' => $user->email
    ]);
}

}
