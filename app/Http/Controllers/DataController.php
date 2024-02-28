<?php

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;
use App\Models\CountForm;
use App\Models\CountSpecies;
use App\Models\INat;
use App\Models\IBP;
use App\Models\IFB;
use App\Models\Taxa;

use App\Jobs\PullInatData;

use Illuminate\Support\Facades\Cache;


use Spatie\Activitylog\Models\Activity;


use Illuminate\Http\Request;

class DataController extends Controller
{
    public function index()
    {
        return view('pages.data');
    }

    public function index_new()
    {
        return view('pages.data_new');
    }
    
    public function json_for_new_data()
    {
        $species = Taxa::where("rank", "=","species")->with("count_observations","inat_observations","ibp_observations","ifb_observations")->get();
        $all_species = [];
        foreach($species as $s){
            $observations = [];
            foreach($s->count_observations as $o){
                $observations[] = [
                    "id" => $o->id,
                    "taxa" => $o->taxa_id,
                    "user" => $o->count_form->name,
                    "date" => $this->fix_date($o->count_form->date_cleaned),
                    "latitude" => (float) $o->count_form->latitude,
                    "longitude" => (float) $o->count_form->longitude,
                    "state" => $o->count_form->state,
                    "district" => $o->count_form->district,
                    "portal" => "counts"
                ];
            }
            foreach($s->inat_observations as $o){
                $observations[] = [
                    "id" => $o->id,
                    "taxa" => $o->taxa_id,
                    "user" => $o->user,
                    "date" => $this->fix_date($o->observed_on),
                    "latitude" => (float) $o->latitude,
                    "longitude" => (float) $o->longitude,
                    "state" => $o->state,
                    "district" => $o->district,
                    "portal" => "inat"
                ];
            }
            foreach($s->ibp_observations as $o){
                $observations[] = [
                    "id" => $o->id,
                    "taxa" => $o->taxa_id,
                    "user" => $o->user,
                    "date" => $this->fix_date($o->observed_on),
                    "latitude" => (float) $o->latitude,
                    "longitude" => (float) $o->longitude,
                    "state" => $o->state,
                    "district" => $o->district,
                    "portal" => "ibp"
                ];
            }
            foreach($s->ifb_observations as $o){
                $observations[] = [
                    "id" => $o->id,
                    "taxa" => $o->taxa_id,
                    "user" => $o->user,
                    "date" => $this->fix_date($o->observed_on),
                    "latitude" => (float) $o->latitude,
                    "longitude" => (float) $o->longitude,
                    "state" => $o->state,
                    "district" => $o->district,
                    "portal" => "ifb"
                ];
            }
            $all_species[] = [
                "id" => $s->id,
                "name" => $s->name,
                "common_name" => $s->common_name,
                "rank" => $s->rank,
                "ancestry" => $s->ancestry,
                "observations" => $observations
            ];

        }
        file_put_contents(public_path("data/species_data.json"), json_encode($all_species));
    }

    public function fix_date($date)
    {
        $date_arr = explode("-", $date);
        if((int) $date_arr[0] < 32 && (int) $date_arr[2] > 2000){
            return $date;
        } else {
            return implode("-", array_reverse($date_arr));
        }
    }

    public function observations()
    {
        ini_set('memory_limit', '256M');

        // $cacheKey = 'observations_data';
        // $cacheDuration = now()->addSeconds(600);

        // $cachedData = Cache::get($cacheKey);

        // if ($cachedData) {
        //     return response()->json($cachedData);
        // }

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
                "inats" => $get["inats"]["observations"],
                "ibps" => $get["ibps"]["observations"],
                "ifbs" => $get["ifbs"]["observations"],
            ],
            "users" => [
                "counts" => $get["counts"]["users"],
                "inats" => $get["inats"]["users"],
                "ibps" => $get["ibps"]["users"],
                "ifbs" => $get["ifbs"]["users"],
            ],
            "districts" => $district_names,
        ];

        // Cache::put($cacheKey, $data, $cacheDuration);
        
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
        $data = IBP::limit($limit)->where('validated',1)->get();
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
        $data = IFB::where("validated",1)->limit($limit)->get();
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

    public function pull_inat()
    {
        // ini_set('max_execution_time', 300);

        PullInatData::dispatch();
        
        // return response()->json($saved);
        return response()->json(['message' => 'iNat Data pull job has been queued.']);
    }

}
