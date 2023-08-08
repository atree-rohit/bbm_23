<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CountForm;
use App\Models\CountSpecies;
use App\Models\INat;
use App\Models\IBP;
use App\Models\IFB;

class DataCleaningController extends Controller
{
    public function clean_x()
    {
        ini_set('max_execution_time', 300);
        $districts = json_decode(file_get_contents(public_path('/json/districts_1.json')));        
        $limit = -1;
        $result = [
            'counts' => $this->clean_counts($districts, $limit),
            'inat' => $this->clean_inat($districts, $limit),
            'ibp' => $this->clean_ibp($districts, $limit),
            'ifb' => $this->clean_ifb($districts, $limit)
        ];
        $fields = ["cleaned", "validated", "skipped", "unmatched", "time"];
        $result["total"]["cleaned"] = array_reduce($result, function($carry, $item){
            return $carry + $item["cleaned"];
        });
        $result["total"]["validated"] = array_reduce($result, function($carry, $item){
            if(!isset($item["validated"]))
                return $carry;
            return $carry + $item["validated"];
        });
        $result["total"]["skipped"] = array_reduce($result, function($carry, $item){
            if(!isset($item["skipped"]))
                return $carry;
            return $carry + $item["skipped"];
        });
        $result["total"]["unmatched"] = array_reduce($result, function($carry, $item){
            if(!isset($item["unmatched"]))
                return $carry;
            return $carry + $item["unmatched"];
        });
        $result["total"]["time"] = array_reduce($result, function($carry, $item){
            if(!isset($item["time"]))
                return $carry;
            return $carry + $item["time"];
        });
        // foreach($fields as $f){
        // }
        dd($result);
    }

    public function clean(){
        ini_set('max_execution_time', 300);
        $districts = json_decode(file_get_contents(public_path('/json/districts_1.json')));        
        $names = [
            "states" => [],
            "districts" => []
        ];
        foreach($districts->features as $district){
            if(!in_array($district->properties->state, $names["states"])){
                array_push($names["states"], $district->properties->state);
            }
            if(!in_array($district->properties->district, $names["districts"])){
                array_push($names["districts"], $district->properties->district);
            }
        }
        $limit = -1;
        $result = [
            'counts' => $this->fix_counts_places($districts, $names),
            'inat' => $this->fix_inat_places($districts, $names),
            'ibp' => $this->fix_ibp_places($districts, $names),
            'ifb' => $this->fix_ifb_places($districts, $names)
        ];
        dd($result);
    }

    public function fix_counts_places($districts, $names){
        $data = CountForm::get();
        $counts = [
            "corrected" => 0,
            "skipped" => 0
        ];
        foreach($data as $d){
            $name_matches = true;
            if(!in_array($d->state, $names["states"])){
                $name_matches = false;
                echo "state: " . $d->state;
            }
            if(!in_array($d->district, $names["districts"])){
                $name_matches = false;
                echo "district: " . $d->district;
            }
            if($name_matches){
                $counts["skipped"]++;
                continue;
            } else {
                $counts["corrected"]++;
                dd($d);
                // $d->state = $d->district = null;
                // $d->save();
            }

        }
        // dd($counts, $d->toArray());
        return $counts;
    }

    public function fix_inat_places($districts, $names){
        $data = INat::get();
        $counts = [
            "corrected" => 0,
            "skipped" => 0
        ];
        foreach($data as $d){
            $name_matches = true;
            if(!in_array($d->state, $names["states"])){
                $name_matches = false;
                echo "<br>state: " . $d->state;
            }
            if(!in_array($d->district, $names["districts"])){
                $name_matches = false;
                echo "<br>district: " . $d->district;
            }
            if($name_matches){
                $counts["skipped"]++;
                continue;
            } else {
                $fixed_name = [
                    "state" => ucwords(str_replace("_", " ", $d->state)),
                    "district" => ucwords(str_replace("_", " ", $d->district))
                ];
                if($fixed_name["state"] == "Andaman And Nicobar"){
                    $fixed_name["state"] = "Andaman and Nicobar";
                }
                if(in_array($fixed_name["state"], $names["states"]) && in_array($fixed_name["district"], $names["districts"])){
                    $d->state = $fixed_name["state"];
                    $d->district = $fixed_name["district"];
                    $d->save();
                    $counts["corrected"]++;
                } else {
                    dd($fixed_name, $d->toArray());
                    // $counts["skipped"]++;
                }
            }

        }
        return $counts;
    }

    public function fix_ibp_places($districts, $names){
        $data = IBP::all();
        $counts = [
            "corrected" => 0,
            "skipped" => 0
        ];
        foreach($data as $d){
            $names_match = true;
            if(!in_array($d->state, $names["states"])){
                $names_match = false;
                echo "<br>state: " . $d->state;
            }
            if(!in_array($d->district, $names["districts"])){
                $names_match = false;
                echo "<br>district: " . $d->district;
            }
            if($names_match){
                $counts["skipped"]++;
            } else {
                $fixed_name = [
                    "state" => ucwords(str_replace("_", " ", $d->state)),
                    "district" => ucwords(str_replace("_", " ", $d->district))
                ];
                if($fixed_name["state"] == "Andaman And Nicobar"){
                    $fixed_name["state"] = "Andaman and Nicobar";
                }
                if(in_array($fixed_name["state"], $names["states"]) && in_array($fixed_name["district"], $names["districts"])){
                    $d->state = $fixed_name["state"];
                    $d->district = $fixed_name["district"];
                    $d->save();
                    $counts["corrected"]++;
                } else {
                    dd($fixed_name, $d->toArray());
                    // $counts["skipped"]++;
                }
            }
        }
        return $counts;
    }

    public function fix_ifb_places($districts, $names){
        $data = IFB::all();
        $counts = [
            "corrected" => 0,
            "skipped" => 0
        ];
        foreach($data as $d){
            $names_match = true;
            if(!in_array($d->state, $names["states"])){
                $names_match = false;
                echo "<br>state: " . $d->state;
            }
            if(!in_array($d->district, $names["districts"])){
                $names_match = false;
                echo "<br>district: " . $d->district;
            }
            if($names_match){
                $counts["skipped"]++;
            } else {
                $fixed_name = [
                    "state" => ucwords(str_replace("_", " ", $d->state)),
                    "district" => ucwords(str_replace("_", " ", str_replace("_district", "", $d->district)))
                ];
                if($fixed_name["state"] == "Andaman And Nicobar" || $fixed_name["state"] == "Andaman & Nicobar"){
                    $fixed_name["state"] = "Andaman and Nicobar";
                }
                if(in_array($fixed_name["state"], $names["states"]) && in_array($fixed_name["district"], $names["districts"])){
                    $d->state = $fixed_name["state"];
                    $d->district = $fixed_name["district"];
                    $d->save();
                    $counts["corrected"]++;
                } else {
                    // dd($fixed_name, $d->toArray());
                    $counts["skipped"]++;
                }
            }
        }
        return $counts;
    }

    public function clean_validate(){
        $inat = $this->inat_validate();
        $counts = $this->counts_validate();
        $ibp = $this->ibp_validate();
        $ifb = $this->ifb_validate();
    }

    public function inat_validate(){
        $data = INat::where('validated', null)->get();
        $counts = [
            "validated" => 0,
            "skipped" => 0
        ];
        foreach($data as $d){
            $valid = true;
            //date
            $date = $d->observed_on;
            $date = explode("-", $date);
            if((int)$date[1] != 9 || (int)$date[0] < 2020 || (int)$date[0] > 2022){
                $valid = false;
                echo "date: " . $d->observed_on;
            }
            
            //place
            if($d->state == null || $d->district == null){
                $valid = false;
                echo "location: " . $d->state . ", " . $d->district ;
            }
            //taxa_id
            if($d->taxa_id == null){
                $valid = false;
                echo "taxa_id: " . $d->taxa_id;
            }
            if($valid){
                $d->validated = true;
                $d->save();
                $counts["validated"]++;
            } else {
                $d->validated = false;
                $d->save();
                $counts["skipped"]++;
            }

        }
        return $counts;
    }

    public function counts_validate(){
        $data = CountForm::where('validated', null)->with("species_list")->get();
        $counts = [
            "validated" => 0,
            "skipped" => 0
        ];
        foreach($data as $d){
            echo "<br>";
            $valid = true;
            //date
            $date = $d->date_cleaned;
            $date = explode("-", $date);
            if((int)$date[1] != 9 || (int)$date[2] < 2020 || (int)$date[2] > 2022){
                $valid = false;
                echo "date: " . $d->date_cleaned;
            }
            
            //place
            if($d->state == null || $d->district == null){
                $valid = false;
                echo "location: " . $d->state . ", " . $d->district ;
            }
            //taxa_id
            if($d->species_list->count() == 0){
                $valid = false;
                echo "taxa_id: " . $d->species_list->count();
            }
            if($valid){
                $d->validated = true;
                $d->save();
                $counts["validated"]++;
            } else {
                $d->validated = false;
                $d->save();
                $counts["skipped"]++;
            }
            
        }
        return $counts;
    }
    
    public function ibp_validate(){
        $data = IBP::where('validated', null)->get();
        $count = [
            "validated" => 0,
            "skipped" => 0
        ];
        foreach($data as $d){
            echo "<br>";
            $valid = true;
            //dates are september from 2020 to 2022
            $date = $d->observed_on;
            $date = explode("-", $date);
            if((int)$date[1] != 9 || (int)$date[0] < 2020 || (int)$date[0] > 2022){
                $valid = false;
                echo "date: " . $d->observed_on;
                continue;
            }

            //state and district are set
            if($d->state == null || $d->district == null){
                $valid = false;
                echo "location: " . $d->state . ", " . $d->district ;
                continue;
            }
            //species is set
            if($d->taxa_id == null){
                $valid = false;
                echo "taxa_id: " . $d->taxa_id;
                continue;
            }
            if($valid){
                $d->validated = true;
                $d->save();
                $count["validated"]++;
            } else {
                $count["skipped"]++;
            }
        }
        return $count;
    }

    public function ifb_validate(){
        $data = IFB::where('validated', null)->get();
        $counts = [
            "validated" => 0,
            "skipped" => 0
        ];
        foreach($data as $d){
            echo "<br>";
            $valid = true;
            //date
            $date = $d->observed_on;
            $date = explode("-", $date);
            if((int)$date[1] != 9 || (int)$date[0] < 2020 || (int)$date[0] > 2022){
                $valid = false;
                echo "date: " . $d->observed_on;
            }
            //location
            if($d->state == null || $d->district == null){
                $valid = false;
                echo "location: " . $d->state . ", " . $d->district ;
            }
            //taxa_id
            if($d->taxa_id == null){
                $valid = false;
                echo "taxa_id: " . $d->taxa_id;
            }
            if($valid){
                $d->validated = true;
                $d->save();
                $counts["validated"]++;
            } else {
                $d->validated = false;
                $d->save();
                $counts["skipped"]++;
            }
        }
        dd($counts, $data->toArray());
    }

    public function clean_counts($districts, $limit)
    {
        $startTime = microtime(true);
        $all_data = CountForm::where('validated', false)->orWhere('validated', null)->limit($limit)->get();
        $cleaned = ["cleaned" => 0, "validated" => 0, "skipped" => 0, "unmatched" => 0, "time" => 0];
        foreach($all_data as $data){
            $lat = $data->latitude;
            $lon = $data->longitude;
            $result = null;
            $flag = true;
            foreach($districts->features as $district){
                foreach($district->geometry->coordinates as $polygon){
                    $result = $this->pointInPolygon($lon, $lat, $polygon);
                    if($result){
                        $flag = false;
                        if($data->state != $district->properties->state || $data->district != $district->properties->district){
                            $data->state = $district->properties->state;
                            $data->district = $district->properties->district;
                            $data->validated = true;
                            $data->save();
                            $cleaned["cleaned"]++;
                        } else {
                            if(!$data->validated){
                                $data->validated = true;
                                $data->save();
                                $cleaned["validated"]++;
                            } else {
                                $cleaned["skipped"]++;
                            }
                        }
                        break;
                    }
                }
            }
            if($flag){
                $cleaned["unmatched"]++;
            }
        }
        $endTime = microtime(true);
        $cleaned["time"] = $endTime - $startTime;

        return $cleaned;
    }

    public function clean_inat($districts, $limit)
    {
        $startTime = microtime(true);
        $all_data = INat::where('validated', false)->orWhere('validated', null)->limit($limit)->get();
        $cleaned = ["cleaned" => 0, "validated" => 0, "skipped" => 0, "unmatched" => 0, "time" => 0];
        foreach($all_data as $data){
            $lat = $data->latitude;
            $lon = $data->longitude;
            $result = null;
            $flag = true;
            foreach($districts->features as $district){
                foreach($district->geometry->coordinates as $polygon){
                    $result = $this->pointInPolygon($lon, $lat, $polygon);
                    if($result){
                        $flag = false;
                        if($data->state != $district->properties->state || $data->district != $district->properties->district){
                            $data->state = $district->properties->state;
                            $data->district = $district->properties->district;
                            $data->validated = true;
                            $data->save();
                            $cleaned["cleaned"]++;
                        } else {
                            if(!$data->validated){
                                $data->validated = true;
                                $data->save();
                                $cleaned["validated"]++;
                            } else {
                                $cleaned["skipped"]++;
                            }
                        }
                        break;
                    }
                }
            }
            if($flag == true){
                $cleaned["unmatched"]++;
            }
        }
        $endTime = microtime(true);
        $cleaned["time"] = $endTime - $startTime;

        return $cleaned;
    }

    public function clean_ibp($districts, $limit)
    {
        $startTime = microtime(true);
        $all_data = IBP::where('validated', false)->orWhere('validated', null)->limit($limit)->get();
        $cleaned = ["cleaned" => 0, "validated" => 0, "skipped" => 0, "unmatched" => 0, "time" => 0];
        foreach($all_data as $data){
            $lat = $data->latitude;
            $lon = $data->longitude;
            $result = null;
            $flag = true;
            foreach($districts->features as $district){
                foreach($district->geometry->coordinates as $polygon){
                    $result = $this->pointInPolygon($lon, $lat, $polygon);
                    if($result){
                        $flag = false;
                        if($data->state != $district->properties->state || $data->district != $district->properties->district){
                            $data->state = $district->properties->state;
                            $data->district = $district->properties->district;
                            $data->validated = true;
                            $data->save();
                            $cleaned["cleaned"]++;
                        } else {
                            if(!$data->validated){
                                $data->validated = true;
                                $data->save();
                                $cleaned["validated"]++;
                            } else {
                                $cleaned["skipped"]++;
                            }
                        }
                        break;
                    }
                }
            }
            if($flag){
                $cleaned["unmatched"]++;
            }
        }
        $endTime = microtime(true);
        $cleaned["time"] = $endTime - $startTime;

        return $cleaned;
    }

    public function clean_ifb($districts, $limit)
    {
        $startTime = microtime(true);
        $all_data = IFB::where('validated', false)->orWhere('validated', null)->limit($limit)->get();
        $cleaned = ["cleaned" => 0, "validated" => 0, "skipped" => 0, "unmatched" => 0, "time" => 0];
        foreach($all_data as $data){
            $lat = $data->latitude;
            $lon = $data->longitude;
            $result = null;
            $flag = true;
            foreach($districts->features as $district){
                foreach($district->geometry->coordinates as $polygon){
                    $result = $this->pointInPolygon($lon, $lat, $polygon);
                    if($result){
                        $flag = false;
                        if($data->state != $district->properties->state || $data->district != $district->properties->district){
                            $data->state = $district->properties->state;
                            $data->district = $district->properties->district;
                            $data->validated = true;
                            $data->save();
                            $cleaned["cleaned"]++;
                        } else {
                            if(!$data->validated){
                                $data->validated = true;
                                $data->save();
                                $cleaned["validated"]++;
                            } else {
                                $cleaned["skipped"]++;
                            }
                        }
                        break;
                    }
                }
            }
            if($flag){
                $cleaned["unmatched"]++;
            }
        }
        $endTime = microtime(true);
        $cleaned["time"] = $endTime - $startTime;

        return $cleaned;
    }



    private function pointInPolygon($lon, $lat, $polygon) {
        $intersections = 0;

        $vertices = count($polygon);
        for ($i = 0; $i < $vertices; $i++) {
            $j = ($i + 1) % $vertices;

            if ($polygon[$i][1] == $polygon[$j][1]) {
                continue;
            }

            if ($lat < min($polygon[$i][1], $polygon[$j][1])) {
                continue;
            }

            if ($lat >= max($polygon[$i][1], $polygon[$j][1])) {
                continue;
            }

            $x = ($lat - $polygon[$i][1]) * ($polygon[$j][0] - $polygon[$i][0]) / ($polygon[$j][1] - $polygon[$i][1]) + $polygon[$i][0];

            if ($x > $lon) {
                $intersections++;
            }
        }

        return ($intersections % 2) == 1;
    }
}
