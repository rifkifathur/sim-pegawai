<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataGaji extends Model
{
    use HasFactory;
    protected $table = 'datagaji';
    protected $primaryKey = 'id_datagaji';
}
