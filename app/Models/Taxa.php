<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Taxa extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'id',
        'name',
        'common_name',
        'rank',
        'ancestry'
    ];

    public function count_observations(){
        return $this->hasMany(CountSpecies::class);
    }

    public function inat_observations(){
        return $this->hasMany(INat::class);
    }

    public function ibp_observations(){
        return $this->hasMany(IBP::class);
    }

    public function ifb_observations(){
        return $this->hasMany(IFB::class);
    }
}
