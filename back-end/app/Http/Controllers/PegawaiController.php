<?php

namespace App\Http\Controllers;

use App\Models\Pegawai;
use App\Models\Jabatan;
use App\Models\GajiPokok;
use App\Models\StatusBPJSKes;
use App\Models\DataGaji;
use App\Models\Absensi;
use Illuminate\Http\Request;

class PegawaiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(DataGaji $datagajii)
    {
        $pegawai = Pegawai::leftJoin('jabatan', 'jabatan.id_jb', '=', 'pegawai.id_jb')->paginate(5);
        $datagaji = DataGaji::leftJoin('gaji_pokok', 'gaji_pokok.id_gp', '=', 'datagaji.id_gp')
                                ->leftJoin('pegawai', 'pegawai.id_pegawai', '=', 'datagaji.id_pegawai')
                                ->leftJoin('jabatan', 'jabatan.id_jb', '=', 'pegawai.id_jb')
                                ->leftJoin('stts_bpjs_kes', 'stts_bpjs_kes.id_bpjs_kes', '=', 'datagaji.id_bpjs_kes')
                                // ->leftJoin('absensi', 'absensi.id_absen', '=', 'datagaji.id_absen')
                                ->get();
        $jkL = Pegawai::where('jk', 'L')->count('jk');
        $jkP = Pegawai::where('jk', 'P')->count('jk');
        $totalPegawai = Pegawai::count('id_pegawai');
        $jabatan = Jabatan::all();
        $gajip = GajiPokok::all();
        $sttsBpjsKes = StatusBPJSKes::all();
        $absen = Absensi::leftJoin('pegawai', 'pegawai.id_pegawai', '=', 'absensi.id_pegawai')
                            ->leftJoin('jabatan', 'jabatan.id_jb', '=', 'pegawai.id_jb')
                            ->get();

        function otomatis($kd, $char, $str, $digit){
            $KdPecah = substr($kd, $str);
            $ParseKd = (int)$KdPecah + 1;
            $tempKd = sprintf($digit, $ParseKd);
            $KdBaru = $char.$tempKd;
            return $KdBaru;
        }

        $tempNIK = '';
        if($pegawai->isEmpty()){
            $tempNIK = "01";
        } else {
            $nik= pegawai::all()->sortDesc()->first()->nik;
            $tempNIK = otomatis($nik, "", 0, "%'02s");;
        }

        $tempJb = '';
        if($jabatan->isEmpty()){
            $tempJb = "J00";
        } else {
            $KdJb = Jabatan::all()->sortDesc()->first()->kode_jabatan;
            $tempJb = otomatis($KdJb, "J", 1, "%'02s");
        }

        $tempGp = '';
        if($gajip->isEmpty()){
            $tempGp = "GP00";
        } else {
            $KdGp= GajiPokok::all()->sortDesc()->first()->kd_gp;
            $tempGp = otomatis($KdJb, "GP", 2, "%'02s");;
        }
        
        return response()->json([
            'pegawai' => $pegawai,
            'total_pegawai' => $totalPegawai,
            'jk_L' => $jkL,
            'jk_p' => $jkP,
            'jabatan' => $jabatan,
            'gaji_pokok' => $gajip,
            'nik_oto' => $tempNIK,
            'kd_jb' => $tempJb,
            'kd_gp' => $tempGp,
            'stts_bpjs_kes' => $sttsBpjsKes,
            'datagaji' => $datagaji,
            'absen' => $absen
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
        $pegawai->nik = $request->input('nik');
        $pegawai->nama_pegawai = $request->input('nama_pegawai');
        $pegawai->jk = $request->input('jk');
        $pegawai->tgl_lahir = $request->input('tgl_lahir');
        $pegawai->alamat = $request->input('alamat');
        $pegawai->id_jb = $request->input('id_jb');
        
        $pegawai->save();
        return $pegawai;

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Pegawai  $pegawai
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Pegawai $pegawaiId)
    {
        $pegawai = Pegawai::find($pegawaiId);
        foreach ($pegawai as $pegawai) {
            return $pegawai;
        }

        // return $pegawaiId->id_pegawai;
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
            $pegawai->nama_pegawai = $request->input('nama_pegawai');
            $pegawai->jk = $request->input('jk');
            $pegawai->tgl_lahir = $request->input('tgl_lahir');
            $pegawai->alamat = $request->input('alamat');
            $pegawai->id_jabatan = $request->input('id_jabatan');
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
            // return $pegawai;
        }

        $datagajiid = DataGaji::where('id_pegawai', $pegawaiId->id_pegawai)->get();
        foreach ($datagajiid as $datagajiid) {
            $datagajiid->delete();
            // return $datagajiid;
        }
    }
}
