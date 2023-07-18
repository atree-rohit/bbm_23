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
        Schema::create('district_coordinators', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100)->nullable(false);
            $table->string('designation', 100)->nullable(true);
            $table->string('district', 100)->nullable(false);
            $table->string('state', 100)->nullable(false);
            $table->string('coordinates', 100)->nullable(true);
            $table->string('email', 100)->nullable(true);
            $table->string('phone', 100)->nullable(true);
            $table->string('image', 100)->nullable(true);
            $table->foreignId('added_by')->constrained(
                table: 'users', indexName: 'district_coordinators_user_id'
            );
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('district_coordinators');
    }
};
