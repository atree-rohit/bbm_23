<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;


class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function home(Request $request)
    {
        return view("welcome");
    }

    public function data()
    {
        return view('pages.data');
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

    public function resources()
    {
        return view('pages.resources');
    }

    public function calendar()
    {
        return view('pages.calendar');
    }
}
