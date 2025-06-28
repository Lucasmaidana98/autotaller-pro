<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class WorkOrder extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_number',
        'customer_id',
        'vehicle_id',
        'assigned_mechanic_id',
        'problem_description',
        'diagnosis',
        'work_performed',
        'labor_cost',
        'parts_cost',
        'total_cost',
        'priority',
        'status',
        'started_at',
        'completed_at',
        'estimated_completion',
        'estimated_hours',
        'customer_notes',
        'internal_notes',
        'images',
    ];

    protected $casts = [
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
        'estimated_completion' => 'date',
        'images' => 'array',
        'labor_cost' => 'decimal:2',
        'parts_cost' => 'decimal:2',
        'total_cost' => 'decimal:2',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function assignedMechanic(): BelongsTo
    {
        return $this->belongsTo(Mechanic::class, 'assigned_mechanic_id');
    }

    public function mechanics(): BelongsToMany
    {
        return $this->belongsToMany(Mechanic::class, 'work_order_mechanics')
            ->withPivot(['hours_worked', 'hourly_rate', 'total_cost', 'started_at', 'finished_at', 'work_description'])
            ->withTimestamps();
    }

    public function parts(): BelongsToMany
    {
        return $this->belongsToMany(Part::class, 'work_order_parts')
            ->withPivot(['quantity', 'unit_price', 'total_price'])
            ->withTimestamps();
    }

    public function workOrderParts(): HasMany
    {
        return $this->hasMany(WorkOrderPart::class);
    }

    public function workOrderMechanics(): HasMany
    {
        return $this->hasMany(WorkOrderMechanic::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($workOrder) {
            if (!$workOrder->order_number) {
                $workOrder->order_number = 'WO-' . date('Y') . '-' . str_pad(static::whereYear('created_at', date('Y'))->count() + 1, 4, '0', STR_PAD_LEFT);
            }
        });
    }
}
