<?php

namespace App\Http\Controllers;

use App\Models\CountForm;
use App\Models\CountSpecies;
use Illuminate\Http\Request;

class CountFormController extends Controller
{
    public function submit_form(Request $request)
    {
        $coordinates = explode(',', $request->coordinates);
        $form = new CountForm();
        $form->name = $request->name;
        $form->affilation = $request->affilation;
        $form->phone = $request->phone;
        $form->email = $request->email;
        $form->team_members = $request->team_members;
        $form->photo_link = $request->photo_link;
        $form->location = $request->location;
        $form->state = $request->state;
        $form->district = $request->district;
        $form->coordinates = $request->coordinates;
        $form->latitude = $coordinates[0];
        $form->longitude = $coordinates[0];
        $form->date = $request->date;
        $form->start_time = $request->start_time;
        $form->end_time = $request->end_time;
        $form->altitude = $request->altitude;
        $form->distance = $request->distance;
        $form->weather = $request->weather;
        $form->comments = $request->comments;
        $form->status = 'pending';
        $form->validated = false;
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



    public function count_forms()
    {
        $forms = CountForm::with("species_list")->get();
        return $forms;
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
