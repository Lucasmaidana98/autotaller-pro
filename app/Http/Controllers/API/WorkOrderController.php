<?php

namespace App\Http\Controllers\API;

use App\Events\WorkOrderStatusChanged;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreWorkOrderRequest;
use App\Http\Requests\UpdateWorkOrderRequest;
use App\Http\Resources\WorkOrderResource;
use App\Models\WorkOrder;
use App\Services\WorkOrderService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class WorkOrderController extends Controller
{
    public function __construct(private WorkOrderService $workOrderService)
    {
        $this->middleware('auth:sanctum');
        $this->middleware('permission:view work orders')->only(['index', 'show']);
        $this->middleware('permission:create work orders')->only('store');
        $this->middleware('permission:edit work orders')->only('update');
        $this->middleware('permission:delete work orders')->only('destroy');
    }

    public function index(Request $request): AnonymousResourceCollection
    {
        $cacheKey = 'work_orders_' . md5(serialize($request->all()));
        
        $workOrders = Cache::tags(['work_orders'])->remember($cacheKey, 300, function () use ($request) {
            $query = WorkOrder::with(['customer', 'vehicle', 'assignedMechanic', 'parts', 'mechanics'])
                ->when($request->status, fn($q) => $q->where('status', $request->status))
                ->when($request->priority, fn($q) => $q->where('priority', $request->priority))
                ->when($request->mechanic_id, fn($q) => $q->where('assigned_mechanic_id', $request->mechanic_id))
                ->when($request->customer_id, fn($q) => $q->where('customer_id', $request->customer_id))
                ->when($request->search, function ($q) use ($request) {
                    $q->where(function ($query) use ($request) {
                        $query->where('order_number', 'like', "%{$request->search}%")
                            ->orWhere('problem_description', 'like', "%{$request->search}%")
                            ->orWhereHas('customer', function ($q) use ($request) {
                                $q->where('first_name', 'like', "%{$request->search}%")
                                  ->orWhere('last_name', 'like', "%{$request->search}%")
                                  ->orWhere('email', 'like', "%{$request->search}%");
                            });
                    });
                })
                ->orderBy($request->sort_by ?? 'created_at', $request->sort_direction ?? 'desc');

            return $query->paginate($request->per_page ?? 15);
        });

        return WorkOrderResource::collection($workOrders);
    }

    public function store(StoreWorkOrderRequest $request): JsonResponse
    {
        try {
            DB::beginTransaction();
            
            $workOrder = $this->workOrderService->create($request->validated());
            
            DB::commit();
            Cache::tags(['work_orders'])->flush();
            
            return response()->json([
                'message' => 'Work order created successfully',
                'data' => new WorkOrderResource($workOrder->load(['customer', 'vehicle', 'assignedMechanic']))
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Failed to create work order'], 500);
        }
    }

    public function show(WorkOrder $workOrder): JsonResponse
    {
        $this->authorize('view', $workOrder);
        
        $workOrder->load([
            'customer', 
            'vehicle', 
            'assignedMechanic', 
            'parts', 
            'mechanics',
            'workOrderParts.part',
            'workOrderMechanics.mechanic'
        ]);
        
        return response()->json([
            'data' => new WorkOrderResource($workOrder)
        ]);
    }

    public function update(UpdateWorkOrderRequest $request, WorkOrder $workOrder): JsonResponse
    {
        $this->authorize('update', $workOrder);
        
        try {
            DB::beginTransaction();
            
            $oldStatus = $workOrder->status;
            $updatedWorkOrder = $this->workOrderService->update($workOrder, $request->validated());
            
            if ($oldStatus !== $updatedWorkOrder->status) {
                event(new WorkOrderStatusChanged($updatedWorkOrder, $oldStatus));
            }
            
            DB::commit();
            Cache::tags(['work_orders'])->flush();
            
            return response()->json([
                'message' => 'Work order updated successfully',
                'data' => new WorkOrderResource($updatedWorkOrder->load(['customer', 'vehicle', 'assignedMechanic']))
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Failed to update work order'], 500);
        }
    }

    public function destroy(WorkOrder $workOrder): JsonResponse
    {
        $this->authorize('delete', $workOrder);
        
        try {
            $workOrder->delete();
            Cache::tags(['work_orders'])->flush();
            
            return response()->json([
                'message' => 'Work order deleted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete work order'], 500);
        }
    }

    public function updateStatus(Request $request, WorkOrder $workOrder): JsonResponse
    {
        $this->authorize('update', $workOrder);
        
        $request->validate([
            'status' => 'required|in:pending,in_progress,waiting_parts,waiting_approval,completed,cancelled'
        ]);
        
        $oldStatus = $workOrder->status;
        $workOrder->update(['status' => $request->status]);
        
        event(new WorkOrderStatusChanged($workOrder, $oldStatus));
        Cache::tags(['work_orders'])->flush();
        
        return response()->json([
            'message' => 'Work order status updated successfully',
            'data' => new WorkOrderResource($workOrder)
        ]);
    }

    public function addParts(Request $request, WorkOrder $workOrder): JsonResponse
    {
        $this->authorize('update', $workOrder);
        
        $request->validate([
            'parts' => 'required|array',
            'parts.*.part_id' => 'required|exists:parts,id',
            'parts.*.quantity' => 'required|integer|min:1',
            'parts.*.unit_price' => 'required|numeric|min:0'
        ]);
        
        try {
            DB::beginTransaction();
            
            $this->workOrderService->addParts($workOrder, $request->parts);
            
            DB::commit();
            Cache::tags(['work_orders'])->flush();
            
            return response()->json([
                'message' => 'Parts added successfully',
                'data' => new WorkOrderResource($workOrder->load(['parts']))
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Failed to add parts'], 500);
        }
    }

    public function getStatistics(): JsonResponse
    {
        $stats = Cache::remember('work_order_stats', 3600, function () {
            return [
                'total' => WorkOrder::count(),
                'pending' => WorkOrder::where('status', 'pending')->count(),
                'in_progress' => WorkOrder::where('status', 'in_progress')->count(),
                'completed' => WorkOrder::where('status', 'completed')->count(),
                'average_completion_time' => WorkOrder::whereNotNull('completed_at')
                    ->selectRaw('AVG(TIMESTAMPDIFF(HOUR, created_at, completed_at)) as avg_hours')
                    ->value('avg_hours'),
                'revenue_this_month' => WorkOrder::where('status', 'completed')
                    ->whereMonth('completed_at', now()->month)
                    ->sum('total_cost')
            ];
        });
        
        return response()->json(['data' => $stats]);
    }
}
