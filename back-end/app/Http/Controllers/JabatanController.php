<?php

namespace App\Http\Controllers;

use App\Models\Jabatan;
use Illuminate\Http\Request;

class JabatanController extends Controller
{

    public function index()
    {
        $jabatan = Jabatan::all();
        return $jabatan;
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
        $jabatan->nama_jabatan = $request->input('jabatan');
        $jabatan->gaji_pokok = $request->input('gajiPokok');
        $jabatan->save();
        return $jabatan;
    }
}
