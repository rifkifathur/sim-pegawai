<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PegawaiController;
use App\Http\Controllers\UserController;

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
