<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PegawaiController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\JabatanController;
use App\Http\Controllers\GajiPokokController;
use App\Http\Controllers\DataGajiController;
use App\Http\Controllers\AbsensiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::post('/user', [UserController::class, 'login']);


Route::get('/pegawai', [PegawaiController::class, 'index']);
Route::post('/pegawai/create', [PegawaiController::class, 'store']);
Route::get('/pegawai/{pegawaiId}', [PegawaiController::class, 'show']);
Route::put('/pegawai/{pegawaiId}', [PegawaiController::class, 'update']);
Route::delete('/pegawai/{pegawaiId}', [PegawaiController::class, 'destroy']);

Route::get('/jabatan', [JabatanController::class, 'index']);
Route::post('/jabatan/create', [JabatanController::class, 'store']);
Route::get('/jabatan/{jabatanId}', [JabatanController::class, 'show']);
Route::put('/jabatan/{jabatanId}', [JabatanController::class, 'update']);
Route::delete('/jabatan/{jabatanId}', [JabatanController::class, 'destroy']);

Route::get('/gajipokok', [GajiPokokController::class, 'index']);
Route::post('/gajipokok/create', [GajiPokokController::class, 'store']);
Route::get('/gajipokok/{gajipId}', [GajiPokokController::class, 'show']);
Route::put('/gajipokok/{gajipId}', [GajiPokokController::class, 'update']);
Route::delete('/gajipokok/{gajipId}', [GajiPokokController::class, 'destroy']);

Route::get('/datagaji', [DataGajiController::class, 'index']);
Route::post('/datagaji/create', [DataGajiController::class, 'store']);
Route::get('/datagaji/{datagajiId}', [DataGajiController::class, 'show']);
Route::put('/datagaji/{datagajiId}', [DataGajiController::class, 'update']);
Route::delete('/datagaji/{datagajiId}', [DataGajiController::class, 'destroy']);

Route::get('/absensi', [AbsensiController::class, 'index']);
Route::post('/absensi/create', [AbsensiController::class, 'store']);
Route::get('/absensi/{absensiId}', [AbsensiController::class, 'show']);
Route::put('/absensi/{absensiId}', [AbsensiController::class, 'update']);
Route::delete('/absensi/{absensiId}', [AbsensiController::class, 'destroy']);