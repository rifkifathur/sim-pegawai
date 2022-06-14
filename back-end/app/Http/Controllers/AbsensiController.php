<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Absensi;

class AbsensiController extends Controller
{
    // public function index(){
    //     $absen = Absensi::all();
    //     return $absen;
    // }   

    // public function show(Absensi $absensId)
    // {
    //     $absen = Absensi::leftJoin('gaji_pokok', 'gaji_pokok.id_gp', '=', 'absen.id_gp')
    //     ->leftJoin('pegawai', 'pegawai.id_pegawai', '=', 'absen.id_pegawai')
    //     ->leftJoin('jabatan', 'jabatan.id_jb', '=', 'pegawai.id_jb')
    //     ->leftJoin('stts_bpjs_kes', 'stts_bpjs_kes.id_bpjs_kes', '=', 'absen.id_bpjs_kes')
    //     ->find($absensId);
    //     foreach ($absen as $absen) {
    //         return $absen;
    //     }
    // }

    public function store(Request $request)
    {
        $absen = new Absensi;
        $absen->id_pegawai = $request->input('id_pegawai');
        $absen->absensi = $request->input('absensi');
        $absen->save();
        return $absen;
    }

    public function update(Request $request, Absensi $absensId)
    {

        $absen = Absensi::find($absensId);   

        foreach ($absen as $absen) {
            $absen->id_pegawai = $request->input('id_pegawai');
            $absen->absensi = $request->input('absensi');
            $absen->update();
            return $absen;
        }
    }

    public function destroy(Absensi $absensId)
    {
        $absen = Absensi::find($absensId);
        foreach ($absen as $absen) {
            $absen->delete();
            return $absen;
        }
    }
}
