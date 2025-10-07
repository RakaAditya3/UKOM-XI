<?php

namespace App\Helpers;

use App\Models\Otp;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use App\Mail\OtpMail;

class OtpHelper
{
    public static function send($user, $type)
    {
        $code = rand(100000, 999999);

        Otp::where('user_id', $user->id)
            ->where('type', $type)
            ->where('is_used', false)
            ->delete();

        $otp = Otp::create([
            'user_id' => $user->id,
            'code' => $code,
            'type' => $type,
            'expires_at' => Carbon::now()->addMinutes(5),
        ]);

        Mail::to($user->email)->send(new OtpMail($code));

        return $otp;
    }
}
