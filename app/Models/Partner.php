<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Partner extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'partner_type',
        'description',
        'image',
        'link',
        'added_by'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'added_by');
    }

    public function partner_image(){
        return $this->hasOne(FileUpload::class, 'id', 'image');
    }
}
