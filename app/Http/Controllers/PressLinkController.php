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
        $request->validate([
            'title' => 'required|max:100',
            'link_type' => 'required|in:newspaper_print,newspaper_online,journal,magazine,socialmedia,blog,other',
        ]);

        $press_link = new PressLink();
        $press_link->title = $request->title;
        $press_link->link_type = $request->link_type;
        $press_link->link = $request->link;
        $press_link->image = $request->image;
        $press_link->description = $request->description;
        $press_link->tags = $request->tags;
        $press_link->added_by = $request->user["id"];
        dd($request->all);
        // $press_link->save();

        return response()->json([
            'message' => 'Press Link added successfully!',
            'status' => 200,
            'data' => $press_link->toArray()
        ]);
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
