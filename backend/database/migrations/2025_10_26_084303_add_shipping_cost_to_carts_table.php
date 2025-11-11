<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('carts', function (Blueprint $table) {
            $table->integer('shipping_cost')->default(0)->after('total');
            $table->string('courier')->nullable()->after('shipping_cost');
        });
    }

    public function down(): void {
        Schema::table('carts', function (Blueprint $table) {
            $table->dropColumn(['shipping_cost', 'courier']);
        });
    }
};
