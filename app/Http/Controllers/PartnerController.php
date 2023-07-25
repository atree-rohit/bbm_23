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
            $i->image_path = $i->partner_image->path;
            unset($i->created_at);
            unset($i->updated_at);
            unset($i->partner_image);
            return $i;
        });
        return $all_data;
    }
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
}
