<?php

namespace App\Http\Controllers;

use App\Models\Taxa;
use Illuminate\Http\Request;

class TaxaController extends Controller
{
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
    public function show(Taxa $taxa)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Taxa $taxa)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Taxa $taxa)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Taxa $taxa)
    {
        //
    }

    public function pull($taxa_id){
        $url = "https://www.inaturalist.org/taxa/$taxa_id.json";
        $data = json_decode(file_get_contents($url));
        $taxa = new Taxa();
        $taxa->id = $data->id;
        $taxa->name = $data->name;
        $taxa->common_name = $data->common_name->name ?? null;
        $taxa->rank = $data->rank;
        $taxa->ancestry = $data->ancestry;
        $taxa->save();
        return response()->json($taxa);
    }
}
