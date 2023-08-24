<?php

namespace App\Http\Controllers;

use App\Models\Taxa;
use App\Models\CountForm;
use App\Models\CountSpecies;
use Illuminate\Http\Request;

class CountFormController extends Controller
{
    public function submit_form(Request $request)
    {
        $coordinates = explode(',', $request->coordinates);
        $admin = $this->get_district($coordinates);
        $form = new CountForm();
        $form->name = $request->name;
        $form->affiliation = $request->affiliation;
        $form->phone = $request->phone;
        $form->email = $request->email;
        $form->team_members = $request->team_members;
        $form->photo_link = $request->photo_link;
        $form->location = $request->location;
        $form->state = $admin["state"] ?? null;
        $form->district = $admin["district"] ?? null;
        $form->coordinates = $request->coordinates;
        $form->latitude = $coordinates[0];
        $form->longitude = $coordinates[1];
        $form->date = $request->date;
        $form->start_time = $request->start_time;
        $form->end_time = $request->end_time;
        $form->altitude = $request->altitude;
        $form->distance = $request->distance;
        $form->weather = $request->weather;
        $form->comments = $request->comments;
        $form->status = 'pending';
        $form->validated = false;
        $form->open_access = $request->open_access;
        $form->save();

        foreach($request->species_list as $k=>$sl){
            $species = new CountSpecies();
            $species->count_form_id = $form->id;
            $species->no = $k + 1;
            $species->common_name = $sl["common_name"];
            $species->scientific_name = $sl["scientific_name"];
            $species->individuals = $sl["individuals"];
            $species->remarks = $sl["remarks"];
            $species->status = 'pending';
            $species->validated = false;
            $species->save();
        }

        return response()->json([
            'message' => 'Form submitted successfully',
            'form' => $form
        ]);
    }

    public function get_district($coordinates)
    {
        $districts = json_decode(file_get_contents(public_path('/json/districts_1.json')));
        $match = [
            'district' => '',
            'state' => ''
        ];
        foreach($districts->features as $district){
            foreach($district->geometry->coordinates as $arr){
                if($this->pointInPolygon($coordinates[1], $coordinates[0], $arr)){
                    $match['district'] = $district->properties->district;
                    $match['state'] = $district->properties->state;
                    break;
                }
            }
        }
        return $match;
    }

    private function pointInPolygon($longitude, $latitude, $polygonVertices) {
        $intersections = 0;
        $vertexCount = count($polygonVertices);
        
        for ($i = 0; $i < $vertexCount; $i++) {
            $j = ($i + 1) % $vertexCount;
    
            $vertexI = $polygonVertices[$i];
            $vertexJ = $polygonVertices[$j];
            
            if ($vertexI[1] == $vertexJ[1]) {
                // Skip horizontal edges
                continue;
            }
    
            if ($latitude < min($vertexI[1], $vertexJ[1])) {
                // Skip if point is below the edge
                continue;
            }
    
            if ($latitude >= max($vertexI[1], $vertexJ[1])) {
                // Skip if point is above the edge
                continue;
            }
    
            $xIntersect = ($latitude - $vertexI[1]) * ($vertexJ[0] - $vertexI[0]) / ($vertexJ[1] - $vertexI[1]) + $vertexI[0];
    
            if ($xIntersect > $longitude) {
                $intersections++;
            }
        }
    
        return ($intersections % 2) == 1;
    }



    public function count_forms()
    {
        $forms = CountForm::where("id", ">", 699)->with("species_list")->get();
        return $this->clean_object($forms);
    }

    public function user_count_forms(Request $request){
        $forms = CountForm::where('email', $request->email)->with("species_list")->get();
        return $this->clean_object($forms);
    }

    public function clean_object($obj){
        return $obj->transform(function($i) {
            $i->species_list->transform(function($j) {
                unset($j->count_form_id);
                unset($j->created_at);
                unset($j->updated_at);
                return $j;
            });
            unset($i->created_at);
            unset($i->updated_at);
            return $i;
        });
    }

    public function set_form_status(Request $request)
    {
        $form = CountForm::find($request->form_id);
        $form->status = $request->status;
        $date = date('d-m-Y', strtotime($form->date));
        $form->date_cleaned = $date;
        if($request->status == 'approved'){
            $form->validated = true;
        } else {
            $form->validated = false;
        }
        $form->save();
        return response()->json([
            'message' => 'Count Form status updated successfully',
            'form' => $form
        ]);
    }

    public function set_species_status(Request $request)
    {
        $species = CountSpecies::find($request->species_id);
        $species->status = $request->status;
        if($request->status == 'approved'){
            $taxa = Taxa::where('name', $species->scientific_name)->first();
            if($taxa){
                $species->scientific_name_cleaned = $species->scientific_name;
                $species->taxa_id = $taxa->id;                
                $species->validated = true;
            }
        } else {
            $species->taxa_id = null;
            $species->validated = false;
        }
        $species->save();
        return response()->json([
            'message' => 'Species status updated successfully',
            'species' => $species
        ]);
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
    public function show(CountForm $countForm)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CountForm $countForm)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CountForm $countForm)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CountForm $countForm)
    {
        //
    }
}
