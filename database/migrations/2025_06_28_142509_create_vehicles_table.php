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
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained()->onDelete('cascade');
            $table->string('brand');
            $table->string('model');
            $table->integer('year');
            $table->string('license_plate')->unique();
            $table->string('vin')->nullable();
            $table->string('color')->nullable();
            $table->enum('type', ['car', 'motorcycle', 'truck', 'van']);
            $table->integer('mileage')->nullable();
            $table->string('engine_type')->nullable();
            $table->text('notes')->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
