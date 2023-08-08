<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MapsController extends Controller
{
    public function index($slug)
    {
        switch($slug) {
            case 'regions':
                $data = file_get_contents(public_path('maps/regions.json'));
                break;
            case 'states':
                $data = file_get_contents(public_path('maps/states.json'));
                break;
            case 'districts':
                $data = file_get_contents(public_path('maps/districts_1.json'));
                break;
            default:
                $data = [];
        }
        return response()->json($data);
    }
}
