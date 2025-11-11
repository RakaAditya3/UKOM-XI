<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable; 

    protected $fillable = [
        'name', 'email', 'password', 'otp_code', 'otp_expires_at', 'birth_date', 'photo_url', 'phone','role'
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'otp_code',
    ];

    // App\Models\User.php
public function addresses()
{
    return $this->hasMany(Address::class);
}

public function wishlist()
{
    return $this->belongsToMany(Product::class, 'wishlist');
}

public function bankAccounts()
{
    return $this->hasMany(BankAccount::class);
}

public function isAdmin(): bool
{
    return $this->role === 'admin';
}

public function isUser(): bool
{
    return $this->role === 'user';
}

public function ratings()
{
    return $this->hasMany(ProductRating::class);
}


}
