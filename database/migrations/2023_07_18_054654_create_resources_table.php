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
        Schema::create('resources', function (Blueprint $table) {
            $table->id();
            $table->string('title', 100)->nullable(false);
            $table->string('link', 100)->nullable(true);
            $table->enum('resource_type', ['video', 'presentation', 'e-book', 'website', 'other'])->default('video');
            $table->string('image', 100)->nullable(true);
            $table->string('description', 100)->nullable(true);
            $table->string('tags', 200)->nullable(true);
            $table->foreignId('added_by')->constrained(
                table: 'users', indexName: 'resources_user_id'
            );
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resources');
    }
};
