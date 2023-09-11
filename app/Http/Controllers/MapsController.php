<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MapsController extends Controller
{
    public function index()
    {
        // switch($slug) {
        //     case 'regions':
        //         $data = json_decode(file_get_contents(public_path('maps/regions.json')));
        //         break;
        //     case 'states':
        //         $data = json_decode(file_get_contents(public_path('maps/states.json')));
        //         break;
        //     case 'districts':
        //         $data = json_decode(file_get_contents(public_path('maps/districts_1.json')));
        //         break;
        //     default:
        //         $data = [];
        // }
        $data = [
            "countries" => json_decode(file_get_contents(public_path('maps/countries.json'))),
            "states" => json_decode(file_get_contents(public_path('maps/states.json'))),
            "districts" => json_decode(file_get_contents(public_path('maps/districts_1.json'))),
        ];
        return response()->json($data);
    }
}
