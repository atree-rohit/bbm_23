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
            $i->image_path = $i->district_coordinator_image->path;
            unset($i->created_at);
            unset($i->updated_at);
            unset($i->district_coordinator_image);
            return $i;
        });
        return $all_data;
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:100',
            'district' => 'required|max:100',
            'state' => 'required|max:100'
        ]);

        $district_coordinator = new DistrictCoordinator();
        $district_coordinator->name = $request->name;
        $district_coordinator->designation = $request->designation;
        $district_coordinator->district = $request->district;
        $district_coordinator->state = $request->state;
        $district_coordinator->coordinates = $request->coordinates;
        $district_coordinator->email = $request->email;
        $district_coordinator->phone = $request->phone;
        $district_coordinator->image = $request->image;
        $district_coordinator->added_by = $request->user["id"];
        $district_coordinator->save();

        return response()->json([
            'message' => 'District Coordinator added successfully!',
            'status' => 200,
            'data' => $district_coordinator->toArray()
        ]);
    }

    public function delete($district_coordinator_id){
        $district_coordinator = DistrictCoordinator::find($district_coordinator_id);
        if($district_coordinator){
            $district_coordinator->delete();
            return response()->json([
                'message' => 'District Coordinator deleted successfully!',
                'status' => 200,
            ]);
        }else{
            return response()->json([
                'message' => 'District Coordinator not found!',
                'status' => 404,
            ]);
        }
    }
    
}
