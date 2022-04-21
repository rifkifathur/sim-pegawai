<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function login(Request $request){
        $user = User::where('username', $request->input('username'))->first();
        if(!$user || !Hash::check($request->input('password'), $user->password)){
            return response([
                'error' => "wrong user"
            ]);
        };
        return $user;
    }
}
