<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|max:255',
            'email' => 'email|required|unique:users',
            'password' => 'required|confirmed',
        ]);

        $user = new User();
        $user->name = $request->name;
        $user->email = strtolower($request->email);
        $user->password = Hash::make($request->password);
        $user->save();

        return redirect('/login');
    }

    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        Auth::login($user, $remember = true);
        return redirect('/');
    }

    public function get_all_users(){
        $users = User::select("id", "name", "email", "user_type")->get();
        return $users;
    }

    public function logout()
    {
        Auth::logout();
        return redirect('/');
    }

    public function delete($user_id){
        $user = User::find($user_id);
        if($user){
            $user->delete();
            return response()->json([
                'message' => 'User deleted successfully!',
                'status' => 200,
            ]);
        }else{
            return response()->json([
                'message' => 'User not found!',
                'status' => 404,
            ]);
        }
    }
}
