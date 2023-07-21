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
    public function clean(){
        $districts = json_decode(file_get_contents(public_path('/json/districts.json')));        
        $result = [
            'counts' => $this->clean_counts($districts),
            'inat' => [],
            'ibp' => [],
            'ifb' => [],
        ];
    }
        

    public function clean_counts($districts){
        $counts = INat::limit(100)->get();
        $cleaned = [];
        foreach($counts as $count){
            $lat = $count->latitude;
            $lon = $count->longitude;
            $district = null;
            $state = null;
            $result = null;
            foreach($districts->features as $district){
                foreach($district->geometry->coordinates as $polygon){
                    $result = $this->pointInPolygon($lat, $lon, $polygon);
                    // if(strtolower($district->properties->state) == $count->state){
                    //     dd($lat, $lon, $district);
                    // }
                    if($result){
                        dd($result);
                        $district = $district->properties->DISTRICT;
                        $state = $district->properties->STATE;
                        break;
                    }
                }

            }
            echo $count->state . ", " . $count->district. "->" . $result . "<br>";
        }
        return $cleaned;
    }

    function pointInPolygon($x, $y, $polygon) {
        $intersections = 0;
    
        for ($i = 0, $j = count($polygon) - 1; $i < count($polygon); $j = $i++) {
            $xi = $polygon[$i][1];
            $yi = $polygon[$i][0];
            $xj = $polygon[$j][1];
            $yj = $polygon[$j][0];
    
            // Check if the point is on an edge of the polygon
            if (($yi == $y && $yj == $y && (($xi <= $x && $x <= $xj) || ($xj <= $x && $x <= $xi))) ||
                ($xi == $x && $xj == $x && (($yi <= $y && $y <= $yj) || ($yj <= $y && $y <= $yi)))) {
                return true; // Point is on the edge
            }
    
            // Check for an intersection with the polygon edge
            if (($yi > $y) !== ($yj > $y) && $x < ($xj - $xi) * ($y - $yi) / ($yj - $yi) + $xi) {
                $intersections++;
            }
        }
    
        return $intersections % 2 !== 0; // Point is inside the polygon if the number of intersections is odd
    }
    

    function pointInPolygon2($x, $y, $polygon) {
        $wn = 0; // Winding number
    
        for ($i = 0, $j = count($polygon) - 1; $i < count($polygon); $j = $i++) {
            $xi = $polygon[$i][0];
            $yi = $polygon[$i][1];
            $xj = $polygon[$j][0];
            $yj = $polygon[$j][1];
    
            // Check if the point is on an edge of the polygon
            if (($yi == $y && $yj == $y && (($xi <= $x && $x <= $xj) || ($xj <= $x && $x <= $xi))) ||
                ($xi == $x && $xj == $x && (($yi <= $y && $y <= $yj) || ($yj <= $y && $y <= $yi)))) {
                return true; // Point is on the edge
            }
    
            // Check if the point is above the current edge and to the left
            if ($yi < $y && $yj >= $y && ($xj - $xi) * ($y - $yi) - ($yj - $yi) * ($x - $xi) > 0) {
                $wn++;
            }
    
            // Check if the point is below the current edge and to the right
            if ($yi >= $y && $yj < $y && ($xj - $xi) * ($y - $yi) - ($yj - $yi) * ($x - $xi) < 0) {
                $wn--;
            }
        }
        return $wn !== 0; // Point is inside the polygon if winding number is non-zero
    }
    



    function pointInPolygon1($lat, $lon, $polygon) {
        $x = $lon;
        $y = $lat;
        $n = count($polygon);
        $inside = false;
    
        for ($i = 0, $j = $n - 1; $i < $n; $j = $i++) {
            $xi = $polygon[$i][1];
            $yi = $polygon[$i][0];
            $xj = $polygon[$j][1];
            $yj = $polygon[$j][0];
    
            $intersect = (($yi > $y) !== ($yj > $y)) &&
                ($x < ($xj - $xi) * ($y - $yi) / ($yj - $yi) + $xi);
            if ($intersect) {
                $inside = !$inside;
            }
        }
    
        return $inside;
    }
    

    /*

    private function isWithinBounds($lon, $lat, $polygon) {
        // dd($lon, $lat, $polygon);
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
    */
}
