<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use \Conner\Tagging\Taggable;

class Subject extends Model
{
    use HasFactory;
    use Taggable;
    
    protected $guarded = [];

    protected $fillable = array('label', 'description', 'icon', 'language_id', 'created_by', 'updated_by');

    protected $searchable = [
        'label',
        'icon',
    ];

    protected $sortable = [
        'id',
        'label',
    ];
}
