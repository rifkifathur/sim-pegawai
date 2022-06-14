<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePegawaiTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('pegawai');
        Schema::create('pegawai', function (Blueprint $table) {
            $table->id('id_pegawai');
            $table->string('nik', 25)->unique();
            $table->string('nama_pegawai', 30);
            $table->enum('jk', ['L','P']);
            $table->date('tgl_lahir');
            $table->string('alamat');
            $table->string('foto');
            $table->unsignedBigInteger('id_jb');
            $table->foreign('id_jb')->references('id_jb')->on('jabatan');
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
        Schema::dropIfExists('pegawai');
    }
}
