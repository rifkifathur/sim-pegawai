<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\DataGaji;

class DataGajiController extends Controller
{
    public function index(){
        $datagaji = DataGaji::all();
        return $datagaji;
    }   

    public function show(DataGaji $datagajiId)
    {
        $datagaji = DataGaji::leftJoin('gaji_pokok', 'gaji_pokok.id_gp', '=', 'datagaji.id_gp')
        ->leftJoin('pegawai', 'pegawai.id_pegawai', '=', 'datagaji.id_pegawai')
        ->leftJoin('jabatan', 'jabatan.id_jb', '=', 'pegawai.id_jb')
        ->leftJoin('stts_bpjs_kes', 'stts_bpjs_kes.id_bpjs_kes', '=', 'datagaji.id_bpjs_kes')
        ->find($datagajiId);
        foreach ($datagaji as $datagaji) {
            return $datagaji;
        }
    }

    public function store(Request $request)
    {
        $datagaji = new DataGaji;

        $datagaji->id_pegawai = $request->input('id_pegawai');
        $datagaji->id_gp = $request->input('id_gp');
        $datagaji->t_makan = $request->input('t_makan');
        $datagaji->t_transport = $request->input('t_transport');
        $datagaji->id_bpjs_kes = $request->input('id_bpjs_kes');
        $datagaji->save();
        return $datagaji;
    }

    public function update(Request $request, DataGaji $datagajiId)
    {

        $datagaji = DataGaji::find($datagajiId);   

        foreach ($datagaji as $datagaji) {
            $datagaji->id_pegawai = $request->input('id_pegawai');
            $datagaji->id_gp = $request->input('id_gp');
            $datagaji->t_makan = $request->input('t_makan');
            $datagaji->t_transport = $request->input('t_transport');
            $datagaji->id_bpjs_kes = $request->input('id_bpjs_kes');
            $datagaji->update();
            return $datagaji;
        }
    }

    public function destroy(DataGaji $datagajiId)
    {
        $datagaji = DataGaji::find($datagajiId);
        foreach ($datagaji as $datagaji) {
            $datagaji->delete();
            return $datagaji;
        }
    } 
}
