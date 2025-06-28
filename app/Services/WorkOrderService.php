<?php

namespace App\Services;

use App\Models\Part;
use App\Models\WorkOrder;
use App\Models\WorkOrderPart;
use Illuminate\Support\Facades\DB;

class WorkOrderService
{
    public function create(array $data): WorkOrder
    {
        $workOrder = WorkOrder::create($data);
        
        if (isset($data['parts'])) {
            $this->addParts($workOrder, $data['parts']);
        }
        
        if (isset($data['mechanics'])) {
            $this->assignMechanics($workOrder, $data['mechanics']);
        }
        
        $this->calculateTotalCost($workOrder);
        
        return $workOrder;
    }
    
    public function update(WorkOrder $workOrder, array $data): WorkOrder
    {
        $workOrder->update($data);
        
        if (isset($data['parts'])) {
            $workOrder->workOrderParts()->delete();
            $this->addParts($workOrder, $data['parts']);
        }
        
        if (isset($data['mechanics'])) {
            $workOrder->workOrderMechanics()->delete();
            $this->assignMechanics($workOrder, $data['mechanics']);
        }
        
        $this->calculateTotalCost($workOrder);
        
        return $workOrder;
    }
    
    public function addParts(WorkOrder $workOrder, array $parts): void
    {
        foreach ($parts as $partData) {
            $part = Part::find($partData['part_id']);
            
            if ($part->stock_quantity < $partData['quantity']) {
                throw new \Exception("Insufficient stock for part: {$part->name}");
            }
            
            WorkOrderPart::create([
                'work_order_id' => $workOrder->id,
                'part_id' => $partData['part_id'],
                'quantity' => $partData['quantity'],
                'unit_price' => $partData['unit_price'],
                'total_price' => $partData['quantity'] * $partData['unit_price']
            ]);
            
            $part->decrement('stock_quantity', $partData['quantity']);
        }
    }
    
    public function assignMechanics(WorkOrder $workOrder, array $mechanics): void
    {
        foreach ($mechanics as $mechanicData) {
            $workOrder->workOrderMechanics()->create([
                'mechanic_id' => $mechanicData['mechanic_id'],
                'hours_worked' => $mechanicData['hours_worked'] ?? 0,
                'hourly_rate' => $mechanicData['hourly_rate'],
                'total_cost' => ($mechanicData['hours_worked'] ?? 0) * $mechanicData['hourly_rate'],
                'work_description' => $mechanicData['work_description'] ?? null
            ]);
        }
    }
    
    public function calculateTotalCost(WorkOrder $workOrder): void
    {
        $partsCost = $workOrder->workOrderParts()->sum('total_price');
        $laborCost = $workOrder->workOrderMechanics()->sum('total_cost');
        
        $workOrder->update([
            'parts_cost' => $partsCost,
            'labor_cost' => $laborCost,
            'total_cost' => $partsCost + $laborCost
        ]);
    }
    
    public function completeWorkOrder(WorkOrder $workOrder): WorkOrder
    {
        $workOrder->update([
            'status' => 'completed',
            'completed_at' => now()
        ]);
        
        return $workOrder;
    }
    
    public function cancelWorkOrder(WorkOrder $workOrder, string $reason = null): WorkOrder
    {
        foreach ($workOrder->workOrderParts as $workOrderPart) {
            $workOrderPart->part->increment('stock_quantity', $workOrderPart->quantity);
        }
        
        $workOrder->update([
            'status' => 'cancelled',
            'internal_notes' => ($workOrder->internal_notes ?? '') . "\n\nCancelled: " . $reason
        ]);
        
        return $workOrder;
    }
}