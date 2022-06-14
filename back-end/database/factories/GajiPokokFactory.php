<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class GajiPokokFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'kd_gp' => $this->faker->regexify('[G][P]{1}[0-9]{2}'),
            'gol_gp' => $this->faker->randomElement(['Kontrak', 'Tetap']),
            'gaji_pokok' => $this->faker->randomNumber(7, true),
        ];
    }
}
