<?php

use App\Http\Controllers\API\AppointmentController;
use App\Http\Controllers\API\CustomerController;
use App\Http\Controllers\API\MechanicController;
use App\Http\Controllers\API\PartController;
use App\Http\Controllers\API\VehicleController;
use App\Http\Controllers\API\WorkOrderController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/user', [AuthController::class, 'user']);
        
        Route::apiResource('customers', CustomerController::class);
        Route::apiResource('vehicles', VehicleController::class);
        Route::apiResource('mechanics', MechanicController::class);
        Route::apiResource('parts', PartController::class);
        Route::apiResource('appointments', AppointmentController::class);
        
        Route::apiResource('work-orders', WorkOrderController::class);
        Route::post('/work-orders/{workOrder}/status', [WorkOrderController::class, 'updateStatus']);
        Route::post('/work-orders/{workOrder}/parts', [WorkOrderController::class, 'addParts']);
        Route::get('/work-orders-statistics', [WorkOrderController::class, 'getStatistics']);
    });
});