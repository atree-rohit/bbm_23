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
        Schema::create('count_species', function (Blueprint $table) {
            $table->id();
            $table->foreignId('count_form_id')->nullable(true)->constrained(
                table: 'count_forms', indexName: 'species_count_form_id'
            );
            $table->string('no', 100)->nullable(true);
            $table->string('common_name', 100)->nullable(true);
            $table->string('scientific_name', 100)->nullable(true);
            $table->string('scientific_name_cleaned', 100)->nullable(true);
            $table->foreignId('taxa_id')->nullable(true)->constrained(
                table: 'taxas', indexName: 'count_taxa_id'
            );
            $table->string('individuals', 100)->nullable(true);
            $table->text('remarks')->nullable(true);
            $table->string('img_url', 500)->nullable(true);
            $table->enum('status', ['pending', 'approved', 'duplicate', 'rejected'])->default('approved');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('count_species');
    }
};
