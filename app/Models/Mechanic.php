<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Mechanic extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'specialties',
        'hourly_rate',
        'hire_date',
        'experience_years',
        'status',
        'notes',
    ];

    protected $casts = [
        'specialties' => 'array',
        'hire_date' => 'date',
        'hourly_rate' => 'decimal:2',
    ];

    public function workOrders(): HasMany
    {
        return $this->hasMany(WorkOrder::class, 'assigned_mechanic_id');
    }

    public function appointments(): HasMany
    {
        return $this->hasMany(Appointment::class);
    }

    public function workOrderAssignments(): BelongsToMany
    {
        return $this->belongsToMany(WorkOrder::class, 'work_order_mechanics')
            ->withPivot(['hours_worked', 'hourly_rate', 'total_cost', 'started_at', 'finished_at', 'work_description'])
            ->withTimestamps();
    }

    public function getFullNameAttribute(): string
    {
        return $this->first_name . ' ' . $this->last_name;
    }
}
