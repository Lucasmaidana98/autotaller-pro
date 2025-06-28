<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('work_orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique();
            $table->foreignId('customer_id')->constrained()->onDelete('cascade');
            $table->foreignId('vehicle_id')->constrained()->onDelete('cascade');
            $table->foreignId('assigned_mechanic_id')->nullable()->constrained('mechanics')->onDelete('set null');
            $table->text('problem_description');
            $table->text('diagnosis')->nullable();
            $table->text('work_performed')->nullable();
            $table->decimal('labor_cost', 10, 2)->default(0);
            $table->decimal('parts_cost', 10, 2)->default(0);
            $table->decimal('total_cost', 10, 2)->default(0);
            $table->enum('priority', ['low', 'medium', 'high', 'urgent'])->default('medium');
            $table->enum('status', ['pending', 'in_progress', 'waiting_parts', 'waiting_approval', 'completed', 'cancelled'])->default('pending');
            $table->datetime('started_at')->nullable();
            $table->datetime('completed_at')->nullable();
            $table->date('estimated_completion')->nullable();
            $table->integer('estimated_hours')->nullable();
            $table->text('customer_notes')->nullable();
            $table->text('internal_notes')->nullable();
            $table->json('images')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('work_orders');
    }
};
