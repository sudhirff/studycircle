<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use \Conner\Tagging\Taggable;
use App\Models\CoursesType;


class Course extends Model
{
    use HasFactory;
    use Taggable;
    

    protected $guarded = [];

    protected $fillable = array('name', 'course_code', 'language_id', 'created_by', 'updated_by');

    protected $searchable = [
        'name',
        'course_code',
    ];

    protected $sortable = [
        'id',
        'name',
        'course_code',
    ];

    /**
     * The roles that belong to the user.
     */
    public function courses_types()
    {
        return $this->belongsToMany(CoursesType::class, 'course_type', 'course_id', 'type_id');
    }

    

    public static function getApiData() {
        $ch = curl_init();
        $headers = array(
            'Accept: application/json',
            'Content-Type: application/json',

        );
        curl_setopt($ch, CURLOPT_URL, "https://services.india.gov.in/service/listing?cat_id=1&ln=en");
        //curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

        // Timeout in seconds
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);

        $response = curl_exec($ch);


        //curl_setopt($ch, CURLOPT_URL, "https://services.india.gov.in/service/listing?cat_id=1&ln=en");


        // $output contains the output string
        $response = curl_exec($ch);

        // close curl resource to free up system resources
        curl_close($ch);   
        dd($response);



dd($response);
        return $response;
    }

}
