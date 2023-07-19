<?php

namespace App\Http\Controllers;

use App\Models\DistrictCoordinator;
use Illuminate\Http\Request;

class DistrictCoordinatorController extends Controller
{
    public function all_data()
    {
        $all_data = DistrictCoordinator::with("district_coordinator_image")->get();
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
    public function show(DistrictCoordinator $districtCoordinator)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DistrictCoordinator $districtCoordinator)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DistrictCoordinator $districtCoordinator)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DistrictCoordinator $districtCoordinator)
    {
        //
    }
}
