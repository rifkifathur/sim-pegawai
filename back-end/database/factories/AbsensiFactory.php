<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class AbsensiFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'absensi' => mt_rand(1,4),
            'id_pegawai' => mt_rand(1,10)
        ];
    }
}
