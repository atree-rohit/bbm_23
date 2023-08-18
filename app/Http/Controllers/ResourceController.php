<?php

namespace App\Http\Controllers;

use App\Models\Resource;
use Illuminate\Http\Request;

class ResourceController extends Controller
{

    public function all_data()
    {
        $all_data = Resource::with("resource_image")->get();
        $all_data->transform(function($i) {
            if($i->resource_image){
                $i->image_path = $i->resource_image->path;
            }
            unset($i->created_at);
            unset($i->updated_at);
            unset($i->resource_image);
            return $i;
        });
        return $all_data;
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|max:100',
            'resource_type' => 'required|in:video,presentation,e-book,website,other',
        ]);
        

        $resource = new Resource();
        $resource->title = $request->title;
        $resource->link = $request->link;
        $resource->resource_type = $request->resource_type;
        $resource->image = $request->image;
        $resource->description = $request->description;
        $resource->tags = $request->tags;
        $resource->added_by = $request->user["id"];
        $resource->save();

        return response()->json([
            'message' => 'Resource added successfully!',
            'status' => 200,
            'data' => $resource->toArray()
        ]);
    }

    public function update($resource_id, Request $request){
        $resource = Resource::find($resource_id);
        $resource->title = $request->title;
        $resource->link = $request->link;
        $resource->resource_type = $request->resource_type;
        $resource->description = $request->description;
        $resource->tags = $request->tags;
        $resource->save();

        return response()->json([
            'message' => 'Resource updated successfully',
            'status' => 200,
            'data' => $resource->toArray()
        ]);
    }
    
    public function delete($resource_id){
        $resource = Resource::find($resource_id);
        if($resource){
            $resource->delete();
            return response()->json([
                'message' => 'Resource deleted successfully!',
                'status' => 200,
            ]);
        }else{
            return response()->json([
                'message' => 'Resource not found!',
                'status' => 404,
            ]);
        }
    }
}
