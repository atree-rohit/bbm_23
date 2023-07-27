<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use Spatie\Activitylog\Models\Activity;

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
        $token = $request->user()->createToken(Auth::user()->email);
        return response()->json([
            'message' => 'User logged in successfully!',
            'token' => $token->plainTextToken,
            'status' => 200,
        ]);
    }

    public function get_all_users(){
        $users = User::select("id", "name", "email", "user_type")->get();
        return $users;
    }

    public function update(Request $request){
        $uploading_user = User::find($request->user["id"]);
        if($uploading_user->user_type == "user"){
            return response()->json([
                'message' => 'You do not have permission to edit this user!',
                'status' => 403,
            ]);
        }
        $user = User::find($request->form_data["id"]);
        $user->name = $request->form_data["name"];
        $user->email = $request->form_data["email"];
        $user->user_type = $request->form_data["user_type"];
        if(!$user->isDirty()){
            return response()->json([
                'message' => 'User details not changed!',
                'status' => 304,
            ]);
        }
        $user->save();
        activity()
            ->causedBy($uploading_user)
            ->performedOn($user)
            ->withProperties(['attributes' => $user->getChanges()])
            ->event('updated')
            ->log('updated');
        return response()->json([
            'message' => 'User updated successfully!',
            'status' => 200,
        ]);
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
