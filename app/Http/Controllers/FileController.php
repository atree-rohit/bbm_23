<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;
use App\Models\FileUpload;

class FileController extends Controller
{
    public function index()
    {
        return view('welcome');
    }

    public function upload(Request $request)
    {
        $user_id = $request->input("user_id");
        $folder = $request->input("folder");
        
        if($request->hasFile('file')){
            $file = $request->file('file');

            $file_name = time().'_'.$file->getClientOriginalName();
            $file_path = $file->storeAs($folder, $file_name, 'public');
            $file_upload = new FileUpload();
            $file_upload->name = $file_name;
            $file_upload->path = '/storage/' . $file_path;
            $file_upload->description = $request->description;
            $file_upload->added_by = $user_id;
            $file_upload->save();

            return response()->json([
                'message' => 'File uploaded successfully!',
                'status' => 200,
                'data' => $file_upload->toArray()
            ]);
        }
        return response()->json([
            'message' => 'File upload failed!',
            'status' => 400,
            'data' => []
        ]);
    }
    public function upload_old(Request $request)
    {
        dd($request);
        $request->validate([
            'file' => 'required|mimes:jpg, jpeg, png|max:4096',
        ]);

        $file = new FileUpload();

        if($request->file()) {
            $file_name = time().'_'.$request->file->getClientOriginalName();
            $file_path = $request->file('file')->storeAs('uploads', $file_name, 'public');
            $file->name = time().'_'.$request->file->getClientOriginalName();
            $file->path = '/storage/' . $file_path;
            $file->description = $request->description;
            dd(Auth::user(), $request->user(), $request->user);
            $file->added_by = $request->user["id"];
            $file->save();
            return response()->json([
                'message' => 'File uploaded successfully!',
                'status' => 200,
                'data' => $file->toArray()
            ]);
        }
    }
}
