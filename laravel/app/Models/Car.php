<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Car extends Model
{
    use HasFactory;

    protected $fillable = ['model', 'brand', 'year', 'color'];

    public function clients()
    {
        return $this->belongsToMany(Client::class, 'client_cars');
    }
}
