<?php

namespace App\Http\Controllers;

use App\Models\Pegawai;
use App\Models\Jabatan;
use Illuminate\Http\Request;

class PegawaiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pegawai = Pegawai::leftJoin('jabatan', 'jabatan.id_jabatan', '=', 'pegawai.id_jabatan')
        ->get();
        $jkL = Pegawai::where('jk', 'L')->count('jk');
        $jkP = Pegawai::where('jk', 'P')->count('jk');
        $totalPegawai = Pegawai::count('id');

        $jabatan = Jabatan::all();

        return response()->json([
            'pegawai' => $pegawai,
            'total_pegawai' => $totalPegawai,
            'jk_L' => $jkL,
            'jk_p' => $jkP,
            'jabatan' => $jabatan
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        
        $file = $request->file('foto');
        $nama_file = time().$file->getClientOriginalName();
        $file->move(public_path().'/images/', $nama_file);

        $pegawai = new Pegawai;
        $pegawai->foto = $nama_file;
        $pegawai->nama_pegawai = $request->input('nama');
        $pegawai->jk = $request->input('jk');
        $pegawai->tgl_lahir = $request->input('tgl_lahir');
        $pegawai->alamat = $request->input('alamat');
        $pegawai->id_jabatan = $request->input('id_jabatan');
        
        $pegawai->save();
        return $pegawai;

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Pegawai  $pegawai
     * @return \Illuminate\Http\Response
     */
    public function show(Pegawai $pegawaiId)
    {
        $pegawai = Pegawai::find($pegawaiId);
        foreach ($pegawai as $pegawai) {
            return $pegawai;
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Pegawai  $pegawai
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Pegawai $pegawaiId)
    {

        $pegawai = Pegawai::find($pegawaiId);
        $ubah = false;

        if ($request->file('foto')) {
            $file = $request->file('foto');
            $nama_file = time().$file->getClientOriginalName();
            $file->move(public_path().'/images/', $nama_file);
            $ubah = true;
        }
        

        foreach ($pegawai as $pegawai) {
            if ($ubah) {
                unlink(public_path().'/images/'.$pegawai->foto);
                $pegawai->foto = $nama_file;
            }
            $pegawai->nama_pegawai = $request->input('nama');
            $pegawai->jk = $request->input('jk');
            $pegawai->tgl_lahir = $request->input('tgl_lahir');
            $pegawai->alamat = $request->input('alamat');
            $pegawai->update();
            return $pegawai;
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Pegawai  $pegawai
     * @return \Illuminate\Http\Response
     */
    public function destroy(Pegawai $pegawaiId)
    {
        $pegawai = Pegawai::find($pegawaiId);
        foreach ($pegawai as $pegawai) {
            unlink(public_path().'/images/'.$pegawai->foto);
            $pegawai->delete();
            return $pegawai;
        }
    }
}
