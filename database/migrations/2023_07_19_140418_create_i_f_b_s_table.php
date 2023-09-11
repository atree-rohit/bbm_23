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
        Schema::create('i_f_b_s', function (Blueprint $table) {
            $table->id();
            $table->string('ifb_id', 100)->nullable(false);
            $table->string('user', 100)->nullable(false);
            $table->string('observed_on', 20)->nullable(true);
            $table->float('latitude', 10, 6)->nullable(true);
            $table->float('longitude', 10, 6)->nullable(true);
            $table->string('place', 200)->nullable(true);
            $table->string('country', 100)->nullable(true);
            $table->string('state', 100)->nullable(true);
            $table->string('district', 100)->nullable(true);
            $table->string('species', 100)->nullable(true);
            $table->foreignId('taxa_id')->nullable(true)->constrained(
                table: 'taxas', indexName: 'ifb_taxa_id'
            );
            $table->string('img_url', 500)->nullable(true);
            $table->string('ifb_created_at', 100)->nullable(false);
            $table->boolean('validated')->nullable(true)->default(null);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('i_f_b_s');
    }
};
