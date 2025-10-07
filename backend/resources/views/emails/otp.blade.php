<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Kode OTP Anda</title>
</head>

<body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
    <div style="max-width: 500px; margin: auto; background: white; padding: 20px; border-radius: 10px;">
        <h2 style="text-align: center; color: #333;">Verifikasi OTP</h2>
        <p>Halo {{ $user->name ?? 'Pengguna' }},</p>
        <p>Kode OTP Anda adalah:</p>
        <h1 style="text-align: center; letter-spacing: 5px; color: #2c3e50;">{{ $otp }}</h1>
        <p>Kode ini berlaku selama <b>5 menit</b>. Jangan berikan kode ini kepada siapa pun.</p>
        <p>Terima kasih,<br>Tim <b>Chronova</b></p>
    </div>
</body>

</html>