<?php

namespace App\Http\Controllers;

use App\Models\PressLink;
use Illuminate\Http\Request;

class PressLinkController extends Controller
{
    public function all_data()
    {
        $all_data = PressLink::all();
        $all_data->transform(function($i) {
            unset($i->created_at);
            unset($i->updated_at);
            return $i;
        });
        return $all_data;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(PressLink $pressLink)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PressLink $pressLink)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PressLink $pressLink)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PressLink $pressLink)
    {
        //
    }
}
