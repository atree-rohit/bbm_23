<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DistrictCoordinator extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'designation',
        'district',
        'state',
        'coordinates',
        'email',
        'phone',
        'image',
        'added_by'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'added_by');
    }
}
