<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class PegawaiFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */

    public function definition()
    {
        // $file = pathinfo('D:/Punyaku/PemrogramanWeb/LatihanProjek/try-project/tes.png');
        // file('D:\Punyaku\PemrogramanWeb\LatihanProjek\try-project\tes.png');
        // $nama_file = time().$file['basename'];
        // $filee = 'public/images/tes.png';
        // $newfile = 'public/images/'.$nama_file;

        // if (!copy($filee, $newfile)) {
        //     echo "failed to copy";
        // }
        
        return [
            'nik' => $this->faker->regexify('[0-9]{10}'),
            'nama_pegawai' => $this->faker->name(),
            'jk' => $this->faker->randomElement(['L', 'P']),
            'tgl_lahir' => $this->faker->date(),
            'alamat' => $this->faker->address(),
            'foto' => $this->faker->image('public/images',300,400, null, false),
            'id_jb' => mt_rand(1,4),
        ];
    }
}
