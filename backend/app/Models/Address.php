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
        'city',
        'postal_code',
        'is_default'
    ];
}
