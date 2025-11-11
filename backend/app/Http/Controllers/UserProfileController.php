<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class UserProfileController extends Controller
{
     public function index()
    {
        $users = \App\Models\User::select('id', 'name', 'email', 'role', 'email_verified_at')
            ->orderBy('id', 'desc')
            ->get();

        return response()->json($users);
    }
    
    public function updatePhoto(Request $request)
    {
        $request->validate([
            'photo' => 'required|file|mimetypes:image/jpeg,image/png,image/jpg,image/webp|max:2048',
        ]);

        $user = $request->user();
        $file = $request->file('photo');

        $fileName = 'users/' . Str::random(40) . '.' . $file->getClientOriginalExtension();

        $response = Http::withToken(env('SUPABASE_KEY'))
            ->attach('file', fopen($file->getRealPath(), 'r'), $fileName)
            ->post(env('SUPABASE_URL') . "/storage/v1/object/images/" . $fileName);

        if ($response->failed()) {
            \Log::error('Upload foto gagal ke Supabase', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);

            return response()->json([
                'error' => 'Gagal mengunggah foto ke Supabase',
                'details' => $response->body(),
            ], 500);
        }

        $publicUrl = env('SUPABASE_URL') . "/storage/v1/object/public/images/" . $fileName;

        $user->update(['photo_url' => $publicUrl]);

        return response()->json([
            'message' => 'Foto profil berhasil diperbarui',
            'photo_url' => $publicUrl,
        ]);
    }

    public function updateProfile(Request $request)
{
    $user = $request->user();

    $validated = $request->validate([
        'name' => 'nullable|string|max:100',
        'birth_date' => 'nullable|date',
        'phone' => 'nullable|string|max:20',
        'email' => 'nullable|email|max:255',
    ]);

    $user->update($validated);

    return response()->json([
        'message' => 'Profil berhasil diperbarui.',
        'data' => $user,
    ]);
}

public function store(Request $request)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255|regex:/^[a-zA-Z\s]+$/',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|min:6',
        'role' => 'required|in:operator,dispatcher,admin,user',
    ]);

    $user = \App\Models\User::create([
        'name' => $validated['name'],
        'email' => $validated['email'],
        'password' => bcrypt($validated['password']),
        'role' => $validated['role'],
        'email_verified_at' => now(), // langsung aktif untuk staff
    ]);

    return response()->json([
        'message' => 'User berhasil ditambahkan',
        'data' => $user,
    ]);
}

public function destroy($id)
{
    $user = \App\Models\User::findOrFail($id);

    // Cegah hapus admin/owner
    if (in_array($user->role, ['admin', 'owner'])) {
        return response()->json(['message' => 'Tidak bisa menghapus admin/owner'], 403);
    }

    $user->delete();

    return response()->json(['message' => 'User berhasil dihapus']);
}


}
