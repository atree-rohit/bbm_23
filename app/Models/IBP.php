<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IBP extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'user',
        'observed_on',
        'place',
        'latitude',
        'longitude',
        'country',
        'state',
        'district',
        'taxa_id',
        'species',
        'img_url',
        'ibp_created_at',
    ];

    public function taxa(){
        return $this->belongsTo(Taxa::class);
    }
}
