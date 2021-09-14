<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Kalnoy\Nestedset\NodeTrait;

class Course extends Model
{
    use HasFactory, NodeTrait;

    protected $guarded = [];

    protected $fillable = array('name', 'parent_id', 'created_by', 'updated_by');
    
    public function subcategory(){

        return $this->hasMany('App\Category', 'parent_id');

    }
}
