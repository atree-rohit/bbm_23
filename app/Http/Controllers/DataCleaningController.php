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
    public function clean()
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
