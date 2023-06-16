<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientCar extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'car_id',
        'start_time',
        'end_time'
    ];
}
