<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

use App\Models\INat;
use App\Models\Taxa;

class PullInatData implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $existing_taxa_ids = Taxa::pluck('id');
        $districts = json_decode(file_get_contents(public_path('/json/districts_1.json')));
        
        $latest = INat::orderBy('id', 'desc')->first();        
        $base_url = "https://api.inaturalist.org/v1/observations?";
        $params = [
            "place_id" => "any",
            "project_id" => "big-butterfly-month-2023",
            "verifiable" => "any",
            "per_page" => 100,
        ];
        $page = 1;
        $totalPages = 1;
        
        $saved = ["added" => 0, "skipped" => 0, "taxa_added" => 0];
        

        do {
            $url = $base_url.http_build_query($params)."&page=".$page;
            echo "$url<br>";
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
        } while ($page <= 2);
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
}
