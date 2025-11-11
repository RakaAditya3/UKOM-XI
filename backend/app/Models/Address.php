<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $table = 'addresses';

   protected $fillable = [
    'user_id',
    'label',
    'recipient_name',
    'phone',
    'address',
    'postal_code',
    'province_id',
    'city_id',
    'district_id',
    'province_name',
    'city_name',
    'district_name',
    'is_default',
];


     public function user()
    {
        return $this->belongsTo(User::class);
    }
}
