<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GajiPokok;

class GajiPokokController extends Controller
{
    public function index()
    {
        $gajip = GajiPokok::all();
        return $gajip;
    }

    public function show(GajiPokok $gajipId)
    {
        $gajip = GajiPokok::find($gajipId);
        foreach ($gajip as $gajip) {
            return $gajip;
        }
    }

    public function store(Request $request)
    {
        $gajip = new GajiPokok;

        $gajip->kd_gp = $request->input('kd_gp');
        $gajip->gol_gp = $request->input('gol_gp');
        $gajip->gaji_pokok = $request->input('gaji_pokok');
        $gajip->save();
        return $gajip;
    }

    public function update(Request $request, GajiPokok $gajipId)
    {

        $gajip = GajiPokok::find($gajipId);   

        foreach ($gajip as $gajip) {
            $gajip->gol_gp = $request->input('gol_gp');
            $gajip->gaji_pokok = $request->input('gaji_pokok');
            $gajip->update();
            return $gajip;
        }
    }

    public function destroy(GajiPokok $gajipId)
    {
        $gajip = GajiPokok::find($gajipId);
        foreach ($gajip as $gajip) {
            $gajip->delete();
            return $gajip;
        }
    }
}
