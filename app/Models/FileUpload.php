<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FileUpload extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'path',
        'description',
        'added_by',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'added_by');
    }

    public function press_link_image()
    {
        return $this->belongsTo(PressLink::class, 'id', 'image');
    }

    public function partner_image()
    {
        return $this->belongsTo(Partner::class, 'id', 'image');
    }

    public function resource_image()
    {
        return $this->belongsTo(Resource::class, 'id', 'image');
    }

    public function district_coordinator_image()
    {
        return $this->belongsTo(DistrictCoordinator::class, 'id', 'image');
    }
}
