<?php

namespace App\Http\Controllers;

use App\Models\Jabatan;
use Illuminate\Http\Request;

class JabatanController extends Controller
{

    public function index()
    {
        $jabatan = Jabatan::all();

        if($jabatan->isEmpty()){
            return "J00";
        } else {
            $KdJb = Jabatan::all()->sortDesc()->first()->kode_jabatan;
            $KdPecah = substr($KdJb, 1);
            $ParseKd = (int)$KdPecah + 1;
            $tempKd = sprintf("%'02s", $ParseKd);
            $KdBaru = "J".$tempKd;
            return $KdBaru;
        }
    }

    public function show(Jabatan $jabatanId)
    {
        $jabatan = Jabatan::find($jabatanId);
        foreach ($jabatan as $jabatan) {
            return $jabatan;
        }
    }

    public function store(Request $request)
    {
        $jabatan = new Jabatan;

        $jabatan->kode_jabatan = $request->input('kode_jabatan');
        $jabatan->nama_jabatan = $request->input('nama_jabatan');
        $jabatan->tunj_jb = $request->input('tunj_jb');
        $jabatan->save();
        return $jabatan;
    }

    public function update(Request $request, Jabatan $jabatanId)
    {

        $jabatan = Jabatan::find($jabatanId);   

        foreach ($jabatan as $jabatan) {
            $jabatan->nama_jabatan = $request->input('nama_jabatan');
            $jabatan->tunj_jb = $request->input('tunj_jb');
            $jabatan->update();
            return $jabatan;
        }
    }

    public function destroy(Jabatan $jabatanId)
    {
        $jabatan = Jabatan::find($jabatanId);
        foreach ($jabatan as $jabatan) {
            $jabatan->delete();
            return $jabatan;
        }
    }
}
