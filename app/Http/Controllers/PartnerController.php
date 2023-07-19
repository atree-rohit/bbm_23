<?php

namespace App\Http\Controllers;

use App\Models\Partner;
use Illuminate\Http\Request;

class PartnerController extends Controller
{
    public function all_data()
    {
        $all_data = Partner::with("partner_image")->get();
        $all_data->transform(function($i) {
            unset($i->created_at);
            unset($i->updated_at);
            $i->image_path = $i->partner_image->path;
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
            'name' => 'required|max:100',
            'partner_type' => 'required|in:ngo,research_organization,school,college,university,nature_club,social_media_group,other',
        ]);

        $partner = new Partner();
        $partner->name = $request->name;
        $partner->partner_type = $request->partner_type;
        $partner->description = $request->description;
        $partner->contact_person = $request->contact_person;
        $partner->image = $request->image;
        $partner->link = $request->link;
        $partner->added_by = $request->user["id"];
        $partner->save();

        return response()->json([
            'message' => 'Partner added successfully!',
            'status' => 200,
            'data' => $partner->toArray()
        ]);
    }

    public function delete($partner_id){
        $partner = Partner::find($partner_id);
        if($partner){
            $partner->delete();
            return response()->json([
                'message' => 'Partner deleted successfully!',
                'status' => 200,
            ]);
        }else{
            return response()->json([
                'message' => 'Partner not found!',
                'status' => 404,
            ]);
        }
    }
    /**
     * Display the specified resource.
     */
    public function show(Partner $partner)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Partner $partner)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Partner $partner)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Partner $partner)
    {
        //
    }
}
