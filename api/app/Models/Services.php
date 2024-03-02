<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Services extends Model
{
    use HasFactory;
    protected $fillable = [
        'name', 'slug', 'mainprice', 'discountedprice', 'category', 'language', 'thumbnail', 'modules', 'duration', 'description', 'content', 'trainerID'
    ];
}
