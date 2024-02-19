<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventories extends Model
{
    use HasFactory;

    public function author()
    {
        return $this->belongsTo(User::class, 'author_user_id');
    }
}
