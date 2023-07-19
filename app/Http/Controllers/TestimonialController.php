<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    public function all_data()
    {
        $all_data = Testimonial::all();
        $all_data->transform(function($i) {
            unset($i->created_at);
            unset($i->updated_at);
            return $i;
        });
        return $all_data;
    }
   
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:100',
            'text' => 'required|min: 10|max: 5000',
        ]);

        $testimonial = new Testimonial();
        $testimonial->name = $request->name;
        $testimonial->designation = $request->designation;
        $testimonial->text = $request->text;
        $testimonial->added_by = $request->user["id"];
        $testimonial->save();

        return response()->json([
            'message' => 'Testimonial added successfully!',
            'status' => 200,
            'data' => $testimonial->toArray()
        ]);
    }

    public function delete($testimonial_id){
        $partner = Testimonial::find($testimonial_id);
        if($testimonial){
            $testimonial->delete();
            return response()->json([
                'message' => 'Testimonial deleted successfully!',
                'status' => 200,
            ]);
        }else{
            return response()->json([
                'message' => 'Testimonial not found!',
                'status' => 404,
            ]);
        }
    }
}
