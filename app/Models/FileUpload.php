<?php

namespace App\Models;

use Spatie\Activitylog\LogOptions;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FileUpload extends Model
{
    use HasFactory, LogsActivity;

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

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()->logOnly($this->fillable);
    }
}
