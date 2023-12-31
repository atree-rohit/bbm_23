<?php

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;
use App\Models\CountForm;
use App\Models\CountSpecies;
use App\Models\INat;
use App\Models\IBP;
use App\Models\IFB;
use App\Models\Taxa;

use Illuminate\Support\Facades\Cache;

use Illuminate\Support\Str;
use DateTime;

use Spatie\Activitylog\Models\Activity;


use Illuminate\Http\Request;

class DataController extends Controller
{
    public function index()
    {
        return view('pages.data');
    }

    public function observations()
    {
        ini_set('memory_limit', '256M');
        $cacheKey = 'observations_data';
        $cacheDuration = now()->addHours(24);
        $cache_data = Cache::get($cacheKey);
        if($cache_data){
            return response()->json($cache_data);
        }
        


        $limit = -1;
        $district_names = $this->get_district_names();
        
        $get = [
            "counts" => $this->get_counts_data($limit, $district_names),
            "inats" => $this->get_inat_data($limit, $district_names),
            "ibps" => $this->get_ibp_data($limit, $district_names),
            "ifbs" => $this->get_ifb_data($limit, $district_names)
        ];
        $data = [
            "headers" => ["id", "taxa", "user", "date", "district"],
            "observations" => [
                "counts" => $get["counts"]["observations"],
                "inat" => $get["inats"]["observations"],
                "ibp" => $get["ibps"]["observations"],
                "ifb" => $get["ifbs"]["observations"],
            ],
            "users" => [
                "counts" => $get["counts"]["users"],
                "inat" => $get["inats"]["users"],
                "ibp" => $get["ibps"]["users"],
                "ifb" => $get["ifbs"]["users"],
            ],
            "districts" => $district_names,
        ];

        if(!$cache_data){
            Cache::put($cacheKey, $data, $cacheDuration);
        }
        
        return response()->json($data);
    }

    public function taxa()
    {
        $data = Taxa::select("id", "name", "common_name", "rank", "ancestry")->get();
        return response()->json($data);
    }

    public function get_district_names()
    {
        $districts = json_decode(file_get_contents(public_path('/json/districts_1.json')));
        $district_names = [];
        foreach($districts->features as $district){
            $district_exists = false;
            foreach($district_names as $dn){
                if($dn == $district->properties->district){
                    $district_exists = true;
                }
            }
            if(!$district_exists){
                $district_names[] = $district->properties->district;
            }
        }
        return $district_names;
    }


    public function get_counts_data($limit, $district_names)
    {
        $data = CountForm::where("validated", 1)->with("species_list")->limit($limit)->get();
        $op = [];
        $users = [];
        foreach($data as $form){
            $user_id = -1;
            if(!in_array($form->name, $users)){
                $users[] = $form->name;
            } 
            $user_id = array_search($form->name, $users);
            $district_id = array_search($form->district, $district_names);
            $row = [
                "id" => -1,
                "taxa" => -1,
                "user" => $user_id,
                "date" => $this->fixDate($form->date, $form->date_cleaned),
                "district" => $district_id,
            ];
            // dd($row);
            foreach($form->species_list as $species){
                $row["id"] = $species->id;
                $row["taxa"] = $species->taxa_id;
                $op[] = $row;
            }
        }
        $return_data = [
            "observations" => array_map('array_values', $op),
            "users" => $users
        ];
        return $return_data;
    }

    public function fixDate($date1, $date2){
        $dateToClean = isset($date2) ? $date2 : $date1;
        $timestamp = strtotime($dateToClean);
        if ($timestamp === false) {
            return "Invalid Date";
        } else {
            return date("Y-m-d", $timestamp);
        }

    }

    public function get_inat_data($limit, $district_names)
    {
        $data = INat::where("validated", 1)->limit($limit)->get();
        $op = [];
        $users = [];
        foreach($data as $row){
            $user_id = -1;
            if(!in_array($row->user, $users)){
                $users[] = $row->user;
            } 
            $user_id = array_search($row->user, $users);
            $district_id = array_search($row->district, $district_names);
            $op[] = [
                "id" => $row->id,
                "taxa" => $row->taxa_id,
                "user" => $user_id,
                "date" => $row->observed_on,
                "district" => $district_id,
            ];
        }
        $return_data = [
            "observations" => array_map('array_values', $op),
            "users" => $users
        ];
        return $return_data;
    }

    public function get_ibp_data($limit, $district_names)
    {
        $data = IBP::where('validated', 1)
            ->where(DB::raw('YEAR(observed_on)'), '>=', 2020)
            ->where(DB::raw('MONTH(observed_on)'), 9)
            ->limit($limit)
            ->get();

        $op = [];
        $users = [];
        foreach($data as $row){
            $user_id = -1;
            if(!in_array($row->user, $users)){
                $users[] = $row->user;
            } 
            $user_id = array_search($row->user, $users);
            $district_id = array_search($row->district, $district_names);
            $op[] = [
                "id" => $row->id,
                "taxa" => $row->taxa_id,
                "user" => $user_id,
                "date" => $row->observed_on,
                "district" => $district_id
            ];
        }
        $return_data = [
            "observations" => array_map('array_values', $op),
            "users" => $users
        ];
        return $return_data;
    }

    public function get_ifb_data($limit, $district_names)
    {
        $data = IFB::where("validated",1)
            ->where(DB::raw('YEAR(observed_on)'), '>=', 2020)
            ->where(DB::raw('MONTH(observed_on)'), 9)
            ->limit($limit)->get();
        $op = [];
        $users = [];
        foreach($data as $row){
            $user_id = -1;
            if(!in_array($row->user, $users)){
                $users[] = $row->user;
            } 
            $user_id = array_search($row->user, $users);
            $district_id = array_search($row->district, $district_names);
            $op[] = [
                "id" => $row->id,
                "taxa" => $row->taxa_id,
                "user" => $user_id,
                "date" => $row->observed_on,
                "district" => $district_id
            ];
        }
        $return_data = [
            "observations" => array_map('array_values', $op),
            "users" => $users
        ];
        return $return_data;
    }

    //import old data
    public function import()
    {
        $saved = [];
        for($i = 0; $i < 6; $i++){
            $startTime = microtime(true);
            $data = $this->getUsersFromBBMLive($i);
            $saved[$data["table"]] = $this->saveData($data);
            $endTime = microtime(true);
            $executionTime = $endTime - $startTime;
            $saved[$data["table"]]["time"] = $executionTime;
        }
        $total_time = array_reduce($saved, function($carry, $item){
            return $carry + $item["time"];
        });
        dd($saved, $total_time);
        

        return view('pages.data');
    }

    public function getUsersFromBBMLive($table_no)
    {
        config(['database.connections.bbm_live' => [
            'driver' => 'mysql',
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '3306'),
            'database' => 'bbm_live',
            'username' => env('DB_USERNAME', 'user'),
            'password' => env('DB_PASSWORD', '123654'),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'strict' => true,
            'engine' => null,
        ]]);
        $tables = [
            "i_nat_taxa22s",
            "count_forms",
            "form_rows",
            "i_nat22s",
            "i_b_p22_s",
            "b_o_i_s"
        ];
        

        $data = [
            "table" => $tables[$table_no],
            "data" => DB::connection('bbm_live')->table($tables[$table_no])->get()
        ];
        $data["data"]->transform(function($i) {
            unset($i->created_at);
            unset($i->updated_at);
            return $i;
        });
        $data["headers"] = array_keys((array) $data["data"][0]);
        return $data;
    }

    public function saveData($data)
    {
        switch($data["table"]){
            case "i_nat_taxa22s": $saved = $this->saveTaxa($data);
                break;
            case "count_forms": $saved = $this->saveCountForm($data);
                break;
            case "form_rows": $saved = $this->saveCountSpecies($data);
                break;
            case "i_nat22s": $saved = $this->saveINat($data);
                break;
            case "i_b_p22_s": $saved = $this->saveIBP($data);
                break;
            case "b_o_i_s": $saved = $this->saveIFB($data);
                break;
        }
        return $saved;
    }

    public function saveTaxa($data)
    {
        $saved = ["added" => 0, "skipped" => 0];
        foreach($data["data"] as $row){
            $existingTaxa = Taxa::where('id', $row->id)->first();
            if($existingTaxa){
                $saved["skipped"]++;
            } else {
                $taxa = new Taxa((array) $row);
                $taxa->save();
                $saved["added"]++;
            }
        }
        return $saved;
    }

    public function saveCountForm($data)
    {
        $saved = ["added" => 0, "skipped" => 0];
        foreach($data["data"] as $row){
            if($row->flag || $row->duplicate){
                $saved["skipped"]++;
            } else {
                $existingCountForm = CountForm::where('id', $row->id)->first();
                if($existingCountForm){
                    $saved["skipped"]++;
                } else {
                    $countForm = new CountForm((array) $row);
                    $countForm->status = "approved";
                    $countForm->save();
                    $saved["added"]++;
                }
            }
        }
        return  $saved;
    }

    public function saveCountSpecies($data)
    {
        $saved = ["added" => 0, "skipped" => 0];
        foreach($data["data"] as $row){
            if($row->flag){
                $saved["skipped"]++;
            } else {
                $existingCountForm = CountForm::where('id', $row->count_form_id)->first();
                $existingCountSpecies = CountSpecies::where('id', $row->id)->first();
                if(!$existingCountForm || $existingCountSpecies){
                    $saved["skipped"]++;
                } else {
                    $countSpecies = new CountSpecies((array) $row);
                    $countSpecies->no = $row->sl_no;
                    $countSpecies->taxa_id = (int)$row->inat_taxa_id;
                    $countSpecies->status = "approved";
                    $countSpecies->save();
                    $saved["added"]++;
                }
            }
        }
        return  $saved;
    }

    public function saveINat($data)
    {
        $saved = ["added" => 0, "skipped" => 0];
        foreach($data["data"] as $row){
            $existingINat = INat::where('id', $row->id)->first();
            if($existingINat){
                $saved["skipped"]++;
            } else {
                $location = explode(",", $row->location);
                $inat = new INat((array) $row);
                $inat->observed_on = $this->cleanDate($row->observed_on);
                $inat->latitude = $location[0];
                $inat->longitude = $location[1];
                $inat->state = $row->state;
                $inat->district = $row->district;
                $inat->user = $row->user_name;
                $inat->place = $row->place_guess;
                $inat->save();

                $saved["added"]++;
            }
        }
        return  $saved;
    }

    public function saveIBP($data)
    {
        $saved = ["added" => 0, "skipped" => 0];
        foreach($data["data"] as $row){
            $existingIBP = IBP::where('id', $row->id)->first();
            if($existingIBP){
                $saved["skipped"]++;
            } else {
                $ibp = new IBP((array) $row);
                $ibp->user = $row->createdBy;
                $ibp->observed_on = $this->cleanDate($row->fromDate);
                $ibp->latitude = $row->locationLat;
                $ibp->longitude = $row->locationLon;
                $ibp->place = $row->placeName;
                $ibp->state = $row->state;
                $ibp->district = $row->district;
                $ibp->img_url = $row->associatedMedia;
                $ibp->ibp_created_at = $this->cleanDate($row->createdOn);
                $ibp->save();

                $saved["added"]++;
            }
        }
        return  $saved;
    }

    public function saveIFB($data)
    {
        $saved = ["added" => 0, "skipped" => 0];
        foreach($data["data"] as $row){
            $existingIFB = IFB::where('id', $row->id)->first();
            if($existingIFB || $row->latitude == "" || $row->longitude == "" || $row->species_name == ""){
                $saved["skipped"]++;
            } else {
                $taxa = Taxa::where('name', trim($row->species_name))->first();

                $ifb = new IFB((array) $row);
                $ifb->ifb_id = $row->boi_id;
                $ifb->observed_on = $this->cleanDate($row->observed_date);
                $ifb->place = $row->location_name;
                $ifb->state = $row->state;
                $ifb->district = $row->district;
                $ifb->species = $row->species_name;
                if($taxa){
                    $ifb->taxa_id = $taxa->id;
                }
                $ifb->img_url = $row->media_code;
                $ifb->ifb_created_at = $this->cleanDate($row->created_date);
                $ifb->save();

                $saved["added"]++;
            }
        }
        return  $saved;
    }

    public function cleanDate($date)
    {
        if(strpos($date, "-")){
            return $date;
        } else if(strpos($date, "/")){
            $date = explode("/", $date);
            if((int) $date[2] < 25){
                $date[2] += 2000;
            }
            return $date[2]."-".$date[1]."-".$date[0];
        } else {
            dd("Date format not recognized", $date);
        }
    }

    public function cleanStateDistrict($str)
    {        
        return str_replace(" ", "_", strtolower($str));
    }

    public function get_all_logs()
    {
        return response()->json(Activity::all());
    }

    public function last_updated()
    {
        $counts = CountForm::orderBy('updated_at', 'desc')->first()->updated_at;
        $inat = INat::orderBy('inat_updated_at', 'desc')->first()->inat_updated_at;
        $op = [
            "counts" => explode(" ", $counts)[0],
            "inat" => explode("T", $inat)[0],
            "ibp" => IBP::orderBy('ibp_created_at', 'desc')->first()->ibp_created_at,
            "ifb" => ifb::orderBy('ifb_created_at', 'desc')->first()->ifb_created_at,
        ];
        
        return response()->json($op);
    }

    public function total_results()
    {
        $op = [];
        $observations_data = $this->observations();
        // return response()->json($observations_data->original);
        foreach($observations_data->original["observations"] as $portal => $data ){
            $op[$portal] = count($data);
        }
        return response()->json($op);
    }

    // store_taxa
    // store_inat_observations

    public function inat_new_total_2023(){
        $inat = INat::where("inat_created_at", "like", "%2023-09%")->count();
        return response()->json($inat);
    }

    public function store_taxa(Request $request)
    {
        $existing_taxa_ids = Taxa::all()->pluck("id")->toArray();
        $count = [
            "added" => 0,
            "skipped" => 0
        ];
        foreach($request->data as $t){
            if(in_array($t["id"], $existing_taxa_ids)){
                $count["skipped"]++;
            } else {
                $taxa = new Taxa();
                $taxa->id = $t["id"];
                $taxa->name = $t["name"];
                $taxa->common_name = $t["common_name"];
                $taxa->rank = $t["rank"];
                $taxa->ancestry = $t["ancestry"];
                $taxa->save();
                $count["added"]++;
            }
        }
        return response()->json(["status" => "success", "count" => $count]);
    }

    public function store_inat_observations(Request $request)
    {
        $count = [
            "added" => 0,
            "skipped" => 0
        ];
        foreach($request->data as $i){
            $i["place"] = Str::limit($i["place"], 195);
            
            $inat = INat::firstOrCreate(
                ['id' => $i["id"]],
                $i
            );
            $inat->save();
    
            if ($inat->wasRecentlyCreated) {
                $count["added"]++;
            } else {
                $count["skipped"]++;
            }
        }
        return response()->json(["status" => "success", "count" => $count]);
    }

    public function pull_inat()
    {
        ini_set('max_execution_time', 300);

        $existing_taxa_ids = Taxa::all()->pluck("id")->toArray();
        $districts = json_decode(file_get_contents(public_path('/json/districts_1.json')));
        
        $latest = INat::orderBy('id', 'desc')->first();        
        $base_url = "https://api.inaturalist.org/v1/observations?";
        $params = [
            "place_id" => "any",
            "project_id" => "big-butterfly-month-2023-india",
            "verifiable" => "any",
            "per_page" => 200,
        ];
        $page = 1;
        $totalPages = 1;
        
        $saved = ["added" => 0, "skipped" => 0, "taxa_added" => 0];
        

        do {
            $url = $base_url.http_build_query($params)."&page=".$page;
            echo "$url<br>";
            // dd($url);
            $data = json_decode(file_get_contents($url));
            
            foreach($data->results as $d){
                $existingINat = INat::where('id', $d->id)->first();
                if($existingINat){
                    $saved["skipped"]++;
                } else {
                    if(!in_array($d->taxon->id, $existing_taxa_ids)){
                        $this->addTaxa($d->taxon);
                        $existing_taxa_ids[] = $d->taxon->id;
                        $saved["taxa_added"]++;
                    }
                    $coordinates = explode(",", $d->location);
                    $inat = new INat();
                    $inat->id = $d->id;
                    $inat->user_id = $d->user->id;
                    $inat->user = $d->user->name ?? $d->user->login;
                    $inat->observed_on = $d->observed_on;
                    $inat->place = $d->place_guess;
                    $inat->latitude = $coordinates[0];
                    $inat->longitude = $coordinates[1];
                    $inat->taxa_id = $d->taxon->id;
                    $inat->img_url = $d->photos[0]->url;
                    $inat->inat_created_at = $d->created_at;
                    $inat->inat_updated_at = $d->updated_at;
        
                    foreach($districts->features as $district){
                        foreach($district->geometry->coordinates as $polygon){
                            
                            $result = $this->pointInPolygon($coordinates[1], $coordinates[0], $polygon);
                            if($result){
                                $inat->state = $district->properties->state;
                                $inat->district = $district->properties->district;
                                $inat->validated = true;
                            }
                        }
                    }
                    // dd($inat->toArray(), $d);
                    $inat->save();
                    $saved["added"]++;
                }
            }
            if($page === 1){
                $totalResults = $data->total_results;
                $perPage = $params['per_page'];
                $totalPages = ceil($totalResults / $perPage);
            }
            $page++;
        } while ($page <= $totalPages);
        return response()->json($saved);
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

    private function addTaxa($taxa){
        $taxa = new Taxa();
        //id, name, common_name, rank, ancestry
        $taxa->id = $taxa->id;
        $taxa->name = $taxa->name ?? "";
        $taxa->common_name = $taxa->preferred_common_name;
        $taxa->rank = $taxa->rank;
        $taxa->ancestry = $taxa->ancestry;
        $taxa->save();
    }

    public function portal_observations($portal){
        $op = [];
        $limit = -1;
        $page = 1;
        if(isset($_GET["per_page"])){
            $limit = $_GET["per_page"];
        }
        if(isset($_GET["page"])){
            $page = $_GET["page"];
        }
        
        switch($portal){
            case "inat": $op = INat::paginate($limit, ['*'], 'page', $page);
                break;
            case "ibp": $op = IBP::paginate($limit, ['*'], 'page', $page);
                break;
            case "ifb": $op = IFB::paginate($limit, ['*'], 'page', $page);
                break;
            case "counts": $count_data = CountForm::select("id", "name as user", "location as place", "country", "state", "district", "latitude", "longitude", "validated as form_validated", "date", "date_cleaned")
                ->limit($limit)
                ->get();
                $count_data->map(function ($item) {
                    if($item["date_cleaned"]){
                        $date = $item["date_cleaned"];
                    } else {
                        $date = $item["date"];
                    }
                    try {
                        $dateTime = DateTime::createFromFormat('d-m-Y', $date);
                        if ($dateTime instanceof DateTime) {
                            $item["observed_on"] = $dateTime->format('Y-m-d');
                        } else {
                            $item["observed_on"] = null;
                        }
                    } catch (Exception $e) {
                        $item["observed_on"] = null;
                    }
                    
                    unset($item["date_cleaned"]);
                    unset($item["date"]);
                    return $item;
                });
                $op = [];
                foreach($count_data as $form){
                    $observation_base = $form->toArray();
                    unset($observation_base["species_list"]);
                    foreach($form->species_list as $species){
                        $species_name = $species->scientific_name_cleaned;
                        if($species_name == ""){
                            $species_name = $species->scientific_name;
                        }
                        $validated = $species->validated || $species->status == "approved";
                        $observation = $observation_base;
                        $observation["id"] = $species->id;
                        $observation["taxa_id"] = $species->taxa_id;
                        $observation["species"] = $species_name;
                        $observation["validated"] = $validated;
                        $op[] = $observation;
                    }
                }
                break;
        }
        return response()->json($op);
    }

    public function update_portal_observation(Request $request) {
        $all_data = $request->all();
        $op = null;
        switch($all_data["portal"]){
            case "counts": $op = $this->update_count_observation($all_data);
                break;
            case "inat": $op = $this->update_inat_observation($all_data);
                break;
            case "ibp": $op = $this->update_ibp_observation($all_data);
                break;
            case "ifb": $op = $this->update_ifb_observation($all_data);
                break;
        }

        return response()->json($op);
    }
    
    public function update_count_observation($data){
        $count_species = CountSpecies::find($data["id"]);
        $count_form = $count_species->count_form;
        
        $count_form->name = $data["user"];
        $count_form->date = $data["observed_on"];
        $count_form->location = $data["place"];
        $count_form->country = $data["country"];
        $count_form->state = $data["state"];
        $count_form->district = $data["district"];
        $count_form->latitude = $data["latitude"];
        $count_form->longitude = $data["longitude"];
        $count_form->save();

        $count_species->taxa_id = $data["taxa_id"];
        $count_species->scientific_name_cleaned = $data["species"];
        $count_species->validated = $data["validated"];
        $count_species->save();
        

        $observation = [
            "id" => $count_species->id,
            "taxa_id" => $count_species->taxa_id,
            "species" => $count_species->scientific_name_cleaned, // You may need to adjust this based on your actual data structure
            "validated" => $count_species->validated || $count_species->status == "approved",
            "user" => $count_form->name,
            "place" => $count_form->location,
            "country" => $count_form->country,
            "state" => $count_form->state,
            "district" => $count_form->district,
            "latitude" => $count_form->latitude,
            "longitude" => $count_form->longitude,
            "form_validated" => $count_form->validated,
            "date" => $count_form->date,
            "date_cleaned" => $count_form->date_cleaned,
            "observed_on" => ($count_form->date_cleaned)
                ? DateTime::createFromFormat('d-m-Y', $count_form->date_cleaned)->format('Y-m-d')
                : null
        ];
    
        return $observation;
    }

    public function update_inat_observation($data){
        $observation = INat::find($data["id"]);
        $observation->user = $data["user"];
        $observation->observed_on = $data["observed_on"];
        $observation->place = $data["place"];
        $observation->country = $data["country"];
        $observation->state = $data["state"];
        $observation->district = $data["district"];
        $observation->latitude = $data["latitude"];
        $observation->longitude = $data["longitude"];
        $observation->taxa_id = $data["taxa_id"];
        $observation->validated = $data["validated"];

        $matching_updated = 0;
        if($observation->isDirty("district")){
            $matching_updated = $this->update_inat_matching_coords($observation);
        } else {
            $observation->save();
        }
        
        return [$observation, $matching_updated];
    }

    public function update_ibp_observation($data){
        $observation = IBP::find($data["id"]);
        $observation->user = $data["user"];
        $observation->observed_on = $data["observed_on"];
        $observation->place = $data["place"];
        $observation->country = $data["country"];
        $observation->state = $data["state"];
        $observation->district = $data["district"];
        $observation->latitude = $data["latitude"];
        $observation->longitude = $data["longitude"];
        $observation->taxa_id = $data["taxa_id"];
        $observation->species = $data["species"];
        $observation->validated = $data["validated"];

        $observation->save();
        return $observation;
        
    }

    public function update_ifb_observation($data){
        $observation = IFB::find($data["id"]);
        $observation->user = $data["user"];
        $observation->observed_on = $data["observed_on"];
        $observation->place = $data["place"];
        $observation->country = $data["country"];
        $observation->state = $data["state"];
        $observation->district = $data["district"];
        $observation->latitude = $data["latitude"];
        $observation->longitude = $data["longitude"];
        $observation->taxa_id = $data["taxa_id"];
        $observation->species = $data["species"];
        $observation->validated = $data["validated"];
        $observation->save();
        return $observation;
    }

    private function update_inat_matching_coords($observation){
        $data = INat::where("latitude", "=", $observation->latitude)
            ->where("longitude", "=", $observation->longitude)
            ->where("observed_on", "<>", null)
            ->where("taxa_id", "<>", null)
            ->where("validated", "=", null)
            ->get();
        foreach($data as $d){
            $d->country = $observation->country;
            $d->state = $observation->state;
            $d->district = $observation->district;
            $d->validated = true;
            $d->save();
        }
        return count($data);
    }
}
