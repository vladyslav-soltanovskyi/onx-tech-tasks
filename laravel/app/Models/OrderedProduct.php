<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderedProduct extends Model
{
    use HasFactory;

    protected $fillable = [
        'qty',
        'order_id',
        'product_id'
    ];

    public function client() {
        return $this->belongsTo(Client::class);
    }

    public function product() {
        return $this->belongsTo(Product::class);
    }
}
