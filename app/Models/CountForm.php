<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CountForm extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'affiliation',
        'phone',
        'email',
        'team_members',
        'photo_link',
        'location',
        'country',
        'state',
        'district',
        'coordinates',
        'latitude',
        'longitude',
        'date',
        'date_cleaned',
        'start_time',
        'end_time',
        'altitude',
        'distance',
        'weather',
        'comments',
        'file',
        'original_filename',
        'status',
        'validated',
        'open_access',
    ];

    public function species_list(){
        return $this->hasMany(CountSpecies::class);
    }
}
