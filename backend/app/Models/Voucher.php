<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Voucher extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
        'percentage',
        'fixed_amount',
        'usage_limit',
        'used_count',
        'starts_at',
        'ends_at',
        'is_active',
    ];

    protected $casts = [
        'starts_at' => 'datetime',
        'ends_at' => 'datetime',
        'is_active' => 'boolean',
    ];

    public function isValid(): bool
    {
        $now = Carbon::now();

        return $this->is_active &&
            (!$this->starts_at || $this->starts_at <= $now) &&
            (!$this->ends_at || $this->ends_at >= $now) &&
            (!$this->usage_limit || $this->used_count < $this->usage_limit);
    }

    public function applyDiscount(float $total): float
    {
        if ($this->percentage) {
            return $total - ($total * ($this->percentage / 100));
        }

        if ($this->fixed_amount) {
            return max($total - $this->fixed_amount, 0);
        }

        return $total;
    }
}
