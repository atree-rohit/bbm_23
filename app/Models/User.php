<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'user_type',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function testimonials(){
        return $this->hasMany(Testimonial::class, 'added_by');
    }

    public function pressLinks(){
        return $this->hasMany(PressLink::class, 'added_by');
    }

    public function partners(){
        return $this->hasMany(Partner::class, 'added_by');
    }

    public function districtCoordinators(){
        return $this->hasMany(DistrictCoordinator::class, 'added_by');
    }

    public function resources()
    {
        return $this->hasMany(Resource::class, 'added_by');
    }

    public function files()
    {
        return $this->hasMany(FileUpload::class, 'added_by');
    }
}
