<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class DataGajiFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            't_makan' => $this->faker->randomNumber(6, true),
            't_transport' => $this->faker->randomNumber(6, true),
            'id_pegawai' => mt_rand(1,10),
            'id_gp' => mt_rand(1,2),
            'id_bpjs_kes' => mt_rand(1,2),
        ];
    }
}
