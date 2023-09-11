<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class INat extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'id',
        'user_id',
        'user',
        'observed_on',
        'place',
        'latitude',
        'longitude',
        'country',
        'state',
        'district',
        'taxa_id',
        'img_url',
        'inat_created_at',
        'inat_updated_at'
    ];

    public function taxa(){
        return $this->belongsTo(Taxa::class);
    }
}
