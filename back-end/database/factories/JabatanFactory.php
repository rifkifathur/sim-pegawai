<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class JabatanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'kode_jabatan' => $this->faker->regexify('[J]{1}[0-9]{2}'),
            'nama_jabatan' => $this->faker->randomElement(['-', 'Staf', 'Operator']),
            'tunj_jb' => $this->faker->randomNumber(6, true),
        ];
    }
}
