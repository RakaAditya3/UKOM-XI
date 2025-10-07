<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('shipments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->cascadeOnDelete();
            $table->string('tracking_number')->nullable();
            $table->string('courier')->nullable();
            $table->enum('status', ['processing', 'shipped', 'delivered'])->default('processing');
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('shipments');
    }
};
