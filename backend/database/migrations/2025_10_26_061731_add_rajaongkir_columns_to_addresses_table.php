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
    Schema::table('addresses', function (Blueprint $table) {
        $table->string('province_id')->nullable();
        $table->string('city_id')->nullable();
        $table->string('district_id')->nullable();

        $table->string('province_name')->nullable();
        $table->string('city_name')->nullable();
        $table->string('district_name')->nullable();
    });
}

public function down(): void
{
    Schema::table('addresses', function (Blueprint $table) {
        $table->dropColumn([
            'province_id', 'city_id', 'district_id',
            'province_name', 'city_name', 'district_name',
        ]);
    });
}

};
