<?php
namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Otp;
use App\Helpers\OtpHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class AuthController extends Controller
{
    public function signup(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|min:6'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);

        OtpHelper::send($user, 'signup');

        return response()->json([
            'message' => 'User berhasil dibuat. OTP telah dikirim ke email.',
            'email' => $user->email
        ]);
    }

    public function verifySignupOtp(Request $request)
    {
        $otp = Otp::where('code', $request->code)
                  ->where('type', 'signup')
                  ->where('is_used', false)
                  ->first();

        if (!$otp || $otp->expires_at < Carbon::now()) {
            return response()->json(['message' => 'OTP tidak valid atau kadaluarsa'], 400);
        }

        $otp->is_used = true;
        $otp->save();

        $otp->user->email_verified_at = Carbon::now();
        $otp->user->save();

        return response()->json(['message' => 'Email berhasil diverifikasi']);
    }

    public function login(Request $request)
    {
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

        $token = $otp->user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login berhasil',
            'token' => $token,
            'user' => $otp->user
        ]);
    }

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
}
