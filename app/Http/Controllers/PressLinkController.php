<?php

namespace App\Http\Controllers;

use App\Models\PressLink;
use Illuminate\Http\Request;

class PressLinkController extends Controller
{
    public function all_data()
    {
        $all_data = PressLink::with("press_link_image")->get();
        $all_data->transform(function($i) {
            $i->image_path = $i->press_link_image->path;
            unset($i->created_at);
            unset($i->updated_at);
            unset($i->press_link_image);
            return $i;
        });
        return $all_data;
    }

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
        $press_link->save();

        return response()->json([
            'message' => 'Press Link added successfully!',
            'status' => 200,
            'data' => $press_link->toArray()
        ]);
    }
    
    public function delete($press_link_id){
        $press_link = PressLink::find($press_link_id);
        if($press_link){
            $press_link->delete();
            return response()->json([
                'message' => 'Press Link deleted successfully!',
                'status' => 200,
            ]);
        }else{
            return response()->json([
                'message' => 'Press Link not found!',
                'status' => 404,
            ]);
        }
    }
}
