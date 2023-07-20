<?php

namespace App\Http\Controllers;


use Illuminate\Support\Facades\DB;
use App\Models\CountForm;
use App\Models\CountSpecies;
use App\Models\INat;
use App\Models\IBP;
use App\Models\IFB;
use App\Models\Taxa;


use Illuminate\Http\Request;

class DataController extends Controller
{
    public function index()
    {
        return view('pages.data');
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
                $inat = new INat((array) $row);
                $inat->observed_on = $this->cleanDate($row->observed_on);
                $inat->state = $this->cleanStateDistrict($row->state);
                $inat->district = $this->cleanStateDistrict($row->district);
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
                $ibp->state = $this->cleanStateDistrict($row->state);
                $ibp->district = $this->cleanStateDistrict($row->district);
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
                $ifb->state = $this->cleanStateDistrict($row->state);
                $ifb->district = $this->cleanStateDistrict($row->district);
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



}