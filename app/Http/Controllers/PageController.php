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
        $page = "home";
        $fullUrl = $request->url();
        $url_parts = explode("//", $fullUrl);
        $url_without_protocol = $url_parts[1];
        $url_parts_1 = explode("/", $url_without_protocol);
        if(count($url_parts_1)> 1){
            $url_slug = $url_parts_1[1];
        } else {
            $url_slug = "home";
        }
        return view("welcome")->with("page", "$url_slug");
    }
    
    public function about()
    {
        return view('about');
    }

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
    public function show(Page $page)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Page $page)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Page $page)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Page $page)
    {
        //
    }
}
