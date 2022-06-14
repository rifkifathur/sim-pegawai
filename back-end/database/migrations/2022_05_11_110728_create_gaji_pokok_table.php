<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGajiPokokTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('gaji_pokok', function (Blueprint $table) {
            $table->id('id_gp');
            $table->string('kd_gp', 10)->unique();
            $table->string('gol_gp', 10);
            $table->string('gaji_pokok', 30);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('gaji_pokok');
    }
}
