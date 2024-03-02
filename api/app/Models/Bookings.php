<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bookings extends Model {
    use HasFactory;
    protected $fillable = [
        'bookDate',
        'bookTime',
        'serviceID',
        'name',
        'email',
        'contact',
        'countryCode',
        'zoomMeetingID',
        'googleEventID',
        'metadata',
    ];

    // Define the relationship with the Service model
    public function service() {
        return $this->belongsTo(Services::class, 'serviceID');
    }
}
