<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DistrictCoordinator extends Model
{
    use HasFactory, LogsActivity;

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

    public function district_coordinator_image(){
        return $this->hasOne(FileUpload::class, 'id', 'image');
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()->logOnly($this->fillable);
    }
}
