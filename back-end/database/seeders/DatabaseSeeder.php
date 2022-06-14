<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory(2)->create();
        \App\Models\Jabatan::factory(4)->create();
        // \App\Models\GajiPokok::factory(2)->create();
        DB::table('gaji_pokok')->insert([
            'kd_gp' => 'GP01',
            'gol_gp' => 'kontrak',
            'gaji_pokok' => 1500000
        ]);
        DB::table('gaji_pokok')->insert([
            'kd_gp' => 'GP02',
            'gol_gp' => 'tetap',
            'gaji_pokok' => 2000000
        ]);
        \App\Models\Pegawai::factory(100)->create();
        DB::table('stts_bpjs_kes')->insert([
            'stts' => 'Y'
        ]);
        DB::table('stts_bpjs_kes')->insert([
            'stts' => 'T'
        ]);
        \App\Models\DataGaji::factory(100)->create();
        \App\Models\Absensi::factory(4)->create();
    }
}
