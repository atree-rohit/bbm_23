<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IFB extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'ifb_id',
        'user',
        'observed_on',
        'place',
        'latitude',
        'longitude',
        'country',
        'state',
        'district',
        'species',
        'taxa_id',
        'img_url',
        'ifb_created_at'
    ];

    public function taxa(){
        return $this->belongsTo(Taxa::class);
    }
}
