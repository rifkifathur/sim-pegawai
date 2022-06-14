<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDatagajiTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('datagaji', function (Blueprint $table) {
            $table->id('id_datagaji');
            $table->string('t_makan',20);
            $table->string('t_transport',20);
            $table->unsignedBigInteger('id_pegawai');
            $table->foreign('id_pegawai')->references('id_pegawai')->on('pegawai');
            $table->unsignedBigInteger('id_gp');
            $table->foreign('id_gp')->references('id_gp')->on('gaji_pokok');
            $table->unsignedBigInteger('id_bpjs_kes');
            $table->foreign('id_bpjs_kes')->references('id_bpjs_kes')->on('stts_bpjs_kes');
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
        Schema::dropIfExists('datagaji');
    }
}
