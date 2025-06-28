<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Vehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'brand',
        'model',
        'year',
        'license_plate',
        'vin',
        'color',
        'type',
        'mileage',
        'engine_type',
        'notes',
        'status',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function workOrders(): HasMany
    {
        return $this->hasMany(WorkOrder::class);
    }

    public function appointments(): HasMany
    {
        return $this->hasMany(Appointment::class);
    }

    public function getDisplayNameAttribute(): string
    {
        return $this->year . ' ' . $this->brand . ' ' . $this->model . ' (' . $this->license_plate . ')';
    }
}
