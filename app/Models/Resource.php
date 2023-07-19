<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resource extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'link',
        'resource_type',
        'image',
        'description',
        'tags',
        'added_by'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'added_by');
    }

    public function resource_image(){
        return $this->hasOne(FileUpload::class, 'id', 'image');
    }
}
