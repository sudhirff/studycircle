<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\Language;
use App\Models\CoursesType;
use App\Http\Requests\CourseRequest;
use App\Http\Resources\CourseResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //Get all courses list
        $courses = Course::when(request('search'), function ($query) {
            $query->where('name', 'like', '%'. request('search'). '%');
        })->orderBy('id', 'desc')->paginate();
        
        $languages = Language::all()->pluck('name', 'id');

        $courseTypes = CoursesType::all()->pluck('label', 'id');
        
        $response = [
            'courses' => $courses,
            'languages' => $languages,
            'courseTypes' => $courseTypes,
        ];
        //$apiData = Course::getApiData();
        return response()->json($response);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CourseRequest $request)
    {

        if ($request->validated()) {
            $inputs = [
                'name'=> $request->name,
                'course_code' => $request->name,
                'language_id' => $request->language_id,
                'created_by' => Auth::user()->id,
                'updated_by' => Auth::user()->id,
            ];
            
    	    $tags = $request->tags;
            $course = Course::create($inputs);
            $course->tag($tags);

            $response = [
                'success' => true,
                'message' => 'Course category created successfully.',
                'course' => $course,
            ];
        } else {
            $response = [
                'success' => false,
                'message' => 'Oops, there seems to have some errors.',
                'errors' => $this->validated()->errors(),
            ];
        }
        return response()->json($response);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CourseRequest $request, Course $courseCategory)
    {
        $inputs = $request->all();
        if ($request->validated()) {
            $courseCategory->update($inputs);

            $response = [
                'success' => true,
                'message' => 'Course category updated successfully.',
            ];
        } else {
            $response = [
                'success' => false,
                'message' => 'Oops, there seems to have some errors.',
                'errors' => $this->validated()->errors(),
            ];
        }
        return response()->json($response);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Course $courseCategory)
    {
        $response = [
            'success' => false,
            'message' => null,
            'errors' => null,
        ];
        
        if ($courseCategory->delete()) {
            $response = [
                'success' => true,
                'message' => 'Permission deleted successfully.',
                'courseCategory' => $courseCategory,
                'courseCategories' => Course::latest()->get(),
            ];
        }
        return response()->json($response);
    }
}
