<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->string('trail_id', 100)->index();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->string('author_name', 80);
            $table->string('status', 20)->default('good'); // good, muddy, caution
            $table->text('comment');
            $table->integer('likes')->default(0);
            $table->string('ip_hash', 64)->nullable()->index(); // Hasheado para privacidade / LGPD
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};

