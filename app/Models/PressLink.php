<?php

namespace App\Models;

use Spatie\Activitylog\LogOptions;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PressLink extends Model
{
    use HasFactory, LogsActivity;

    protected $fillable = [
        'title',
        'link_type',
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

    public function press_link_image(){
        return $this->hasOne(FileUpload::class, 'id', 'image');
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()->logOnly($this->fillable);
    }
}
