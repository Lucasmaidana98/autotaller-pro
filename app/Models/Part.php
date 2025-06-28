<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Part extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'part_number',
        'description',
        'category',
        'brand',
        'cost_price',
        'selling_price',
        'stock_quantity',
        'min_stock_level',
        'supplier',
        'location',
        'status',
    ];

    protected $casts = [
        'cost_price' => 'decimal:2',
        'selling_price' => 'decimal:2',
    ];

    public function workOrders(): BelongsToMany
    {
        return $this->belongsToMany(WorkOrder::class, 'work_order_parts')
            ->withPivot(['quantity', 'unit_price', 'total_price'])
            ->withTimestamps();
    }

    public function isLowStock(): bool
    {
        return $this->stock_quantity <= $this->min_stock_level;
    }

    public function getProfitMarginAttribute(): float
    {
        if ($this->cost_price > 0) {
            return (($this->selling_price - $this->cost_price) / $this->cost_price) * 100;
        }
        return 0;
    }
}
