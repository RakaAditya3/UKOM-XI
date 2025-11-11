<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'address_id',
        'voucher_id',
        'order_number',
        'status',
        'subtotal',
        'discount_total',
        'total',
        'is_confirmed',
        'confirmed_at',
    ];

    public function items()
{
    return $this->hasMany(OrderItem::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function address()
    {
        return $this->belongsTo(Address::class);
    }

    public function voucher()
    {
        return $this->belongsTo(Voucher::class);
    }
    public function images()
{
    return $this->hasMany(ProductImage::class);
}


}
