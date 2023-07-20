<?php

namespace App\Http\Controllers;
use App\Models\CountForm;
use App\Models\CountSpecies;
use App\Models\INat;
use App\Models\IBP;
use App\Models\IFB;
use App\Models\Taxa;


use Illuminate\Http\Request;

class DataController extends Controller
{
    public function index()
    {
        
        return view('pages.data');
    }
}
