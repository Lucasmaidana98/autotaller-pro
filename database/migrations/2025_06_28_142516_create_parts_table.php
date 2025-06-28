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
        Schema::create('parts', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('part_number')->unique();
            $table->text('description')->nullable();
            $table->string('category');
            $table->string('brand')->nullable();
            $table->decimal('cost_price', 10, 2);
            $table->decimal('selling_price', 10, 2);
            $table->integer('stock_quantity')->default(0);
            $table->integer('min_stock_level')->default(5);
            $table->string('supplier')->nullable();
            $table->string('location')->nullable();
            $table->enum('status', ['available', 'out_of_stock', 'discontinued'])->default('available');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('parts');
    }
};
