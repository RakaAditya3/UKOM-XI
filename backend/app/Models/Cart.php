<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $fillable = [
        'user_id',
        'vouched_id',
        'total',
    ];
    
    public function user() {
    return $this->belongsTo(User::class);
    }

    public function items() {
        return $this->hasMany(CartItem::class);
    }

    public function voucher() {
        return $this->belongsTo(Voucher::class);
    }

}
