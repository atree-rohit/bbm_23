<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class PageController extends Controller
{
    public function home(Request $request)
    {
        return view("welcome");
    }
    
    public function about()
    {
        return view('pages.about');
    }

    public function participate()
    {
        return view('pages.participate');
    }

    public function registration()
    {
        return view('pages.registration');
    }

    public function buttetfly_counts()
    {
        return view('pages.butterfly-counts');
        
    }
    public function resources()
    {
        return view('pages.resources');
    }

    public function calendar()
    {
        return view('pages.calendar');
    }

    public function validate_forms()
    {
        return view('pages.validate_forms');
    }

    public function register()
    {
        return view('pages.auth.register');
    }

    public function login()
    {
        return view('pages.auth.login');
    }

    public function manage()
    {
        return view('pages.auth.manage-users');
    }
    
    public function clean_data()
    {
        return view('pages.auth.clean_data');

    }

    public function logout()
    {
        Auth::logout();
        return view('pages.auth.logout');
    }
}
