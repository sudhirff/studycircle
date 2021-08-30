<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use App\Http\Requests\PermissionRequest;


class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $permissions = Permission::when(request('search'), function ($query) {
            $query->where('name', 'like', '%'. request('search'). '%');
        })->orderBy('id', 'desc')->get();
        return response()->json($permissions);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PermissionRequest $request)
    {
        if ($request->validated()) {
            $inputs = [
                'name'=> $request->name,
            ];
            $permission = Permission::create($inputs);

            $response = [
                'success' => true,
                'message' => 'Permission created successfully.',
                'permission' => $permission,
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
    public function update(PermissionRequest $request, Permission $permission)
    {
        $inputs = $request->all();
        if ($request->validated()) {
            $permission->update($inputs);

            $response = [
                'success' => true,
                'message' => 'Permission updated successfully.',
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
     * @param  object  $permission
     * @return \Illuminate\Http\Response
     */
    public function destroy(Permission $permission)
    {
        $response = [
            'success' => false,
            'message' => null,
            'errors' => null,
        ];
        
        if ($permission->delete()) {
            $response = [
                'success' => true,
                'message' => 'Permission deleted successfully.',
                'permission' => $permission,
                'permissions' => Permission::latest()->get(),
            ];
        }
        return response()->json($response);
    }
}
