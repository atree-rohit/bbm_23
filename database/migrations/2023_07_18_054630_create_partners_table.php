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
        Schema::create('partners', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100)->nullable(false);
            $table->enum('partner_type', ['ngo', 'research_organization', 'school', 'college', 'university' ,'nature_club', 'social_media_group', 'other'])->default('ngo');
            $table->text('description')->nullable(true);
            $table->string('logo', 200)->nullable(true);
            $table->string('link', 100)->nullable(true);
            $table->foreignId('added_by')->constrained(
                table: 'users', indexName: 'partners_user_id'
            );
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('partners');
    }
};
