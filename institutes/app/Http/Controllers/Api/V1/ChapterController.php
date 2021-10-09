<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Chapter;
use App\Models\Language;
use App\Models\Subject;
use Illuminate\Http\Request;

class ChapterController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //Get all courses list
        $chapters = Chapter::when(request('search'), function ($query) {
                        $query->where('label', 'like', '%'. request('search'). '%');
                        $query->orWhere('description', 'like', '%'. request('search'). '%');
                    })
                    ->where('parent_id', '!=', null)
                    ->with('tagged')->orderBy(request('field'), request('sort'))->paginate(10);
        
        $languages = Language::all()->pluck('name', 'id');

        $subjects = Subject::all()->pluck('label', 'id')->where('parent_id', null);

        $tags = Chapter::with('tagged')->first();
        
        $response = [
            'chapters' => $chapters,
            'languages' => $languages,
            'tags' => $tags,
            'subjects' => $subjects,
        ];
    
        return response()->json($response);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
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
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
