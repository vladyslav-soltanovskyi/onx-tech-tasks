<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id'
    ];

    public function client() {
        return $this->belongsTo(Client::class);
    }

    public function orderedProducts() {
        return $this->hasMany(OrderedProduct::class);
    }
}
