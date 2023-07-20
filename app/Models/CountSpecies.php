<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CountSpecies extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'count_form_id',
        'no',
        'common_name',
        'scientific_name',
        'scientific_name_cleaned',
        'taxa_id',
        'individuals',
        'remarks',
        'img_url',
        'status'
    ];

    public function count_form(){
        return $this->belongsTo(CountForm::class);
    }

    public function taxa(){
        return $this->belongsTo(Taxa::class);
    }
}
