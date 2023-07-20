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
}
