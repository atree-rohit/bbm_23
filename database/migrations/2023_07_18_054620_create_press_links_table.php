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
        Schema::create('press_links', function (Blueprint $table) {
            $table->id();
            $table->string('title', 100)->nullable(false);
            $table->enum('link_type', ['newspaper_print', 'newspaper_online', 'journal', 'magazine','socialmedia', 'blog', 'other'])->default('newspaper_print');
            $table->string('link', 100)->nullable(true);
            $table->string('image', 100)->nullable(true);
            $table->string('description', 100)->nullable(true);
            $table->string('tags', 200)->nullable(true);
            $table->foreignId('added_by')->constrained(
                table: 'users', indexName: 'press_links_user_id'
            );
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('press_links');
    }
};
