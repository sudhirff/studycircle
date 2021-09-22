<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CoursesType;
use App\Http\Requests\CoursesTypeRequest;

class CoursesTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $coursesType = CoursesType::when(request('search'), function ($query) {
            $query->where('label', 'like', '%'. request('search'). '%');
        })->orderBy('id', 'desc')->get();
        return response()->json($coursesType);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CoursesTypeRequest $request)
    {
        if ($request->validated()) {
            $inputs = [
                'label'=> json_encode($request->label),
                'description' => json_encode($request->description),
                'icon'=> $request->icon,
            ];
            $coursesType = CoursesType::create($inputs);
            $response = [
                'success' => true,
                'message' => 'Courses type created successfully.',
                'coursesType' => $coursesType,
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
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
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
    public function update(CoursesTypeRequest $request, CoursesType $coursesType)
    {
        if ($request->validated()) {

            $coursesType->label = json_encode($request->label);
            $coursesType->description = json_encode($request->description);
            $coursesType->icon = $request->icon;

            $coursesType->save();
            $response = [
                'success' => true,
                'message' => 'Courses type updated successfully.',
                'coursesType' => $coursesType,
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
    public function destroy(CoursesType $coursesType)
    {
        $response = [
            'success' => false,
            'message' => null,
            'errors' => null,
        ];
        if ($coursesType->delete()) {
            $response = [
                'success' => true,
                'message' => 'courses type deleted successfully.',
                'coursesType' => $coursesType,
            ];
        }
        return response()->json($response);
    }
}
