<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Voucher extends Model
{
    protected $fillable = [
        'code',
        'name',
        'percentage',
        'fixed_amount',
        'usage_limit',
        'used_count',
        'starts_at',
        'ends_at',
        'is_active'
    ];
}
