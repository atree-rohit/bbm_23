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
        Schema::create('count_forms', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100)->nullable(true);
            $table->string('affilation', 200)->nullable(true);
            $table->string('phone', 100)->nullable(true);
            $table->string('email', 200)->nullable(false);
            $table->text('team_members')->nullable(true);
            $table->text('photo_link')->nullable(true);
            $table->text('location')->nullable(true);
            $table->string('state', 100)->nullable(true);
            $table->string('district', 100)->nullable(true);
            $table->string('coordinates', 100)->nullable(true);
            $table->string('latitude', 100)->nullable(true);
            $table->string('longitude', 100)->nullable(true);
            $table->string('date', 100)->nullable(false);
            $table->string('date_cleaned', 100)->nullable(true);
            $table->string('start_time', 100)->nullable(true);
            $table->string('end_time', 100)->nullable(true);
            $table->string('altitude', 100)->nullable(true);
            $table->string('distance', 100)->nullable(true);
            $table->string('weather', 100)->nullable(true);
            $table->text('comments')->nullable(true);
            $table->string('file', 200)->nullable(true);
            $table->string('original_filename', 200)->nullable(true);
            $table->enum('status', ['pending', 'approved', 'duplicate', 'rejected'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('count_forms');
    }
};
