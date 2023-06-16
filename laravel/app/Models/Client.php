<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'surname',
        'employee_id'
    ];
    
    public function employee() {
        return $this->belongsTo(Employee::class);
    }

    public function orders() {
        return $this->hasMany(Order::class);
    }
}
