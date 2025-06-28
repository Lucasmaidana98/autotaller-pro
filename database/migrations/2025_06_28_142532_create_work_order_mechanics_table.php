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
        Schema::create('work_order_mechanics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('work_order_id')->constrained()->onDelete('cascade');
            $table->foreignId('mechanic_id')->constrained()->onDelete('cascade');
            $table->decimal('hours_worked', 8, 2)->default(0);
            $table->decimal('hourly_rate', 8, 2);
            $table->decimal('total_cost', 10, 2);
            $table->datetime('started_at')->nullable();
            $table->datetime('finished_at')->nullable();
            $table->text('work_description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('work_order_mechanics');
    }
};
