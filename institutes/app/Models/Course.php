<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use \Conner\Tagging\Taggable;


class Course extends Model
{
    use HasFactory;
    use Taggable;
    

    protected $guarded = [];

    protected $fillable = array('name', 'course_code', 'created_by', 'updated_by');

    protected $searchable = [
        'name',
        'course_code',
    ];

    protected $sortable = [
        'id',
        'name',
        'course_code',
    ];

}
