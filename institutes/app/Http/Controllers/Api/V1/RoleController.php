<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Http\Resources\RoleResource;
use App\Http\Requests\RoleRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use DB;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $roles = RoleResource::collection(Role::latest()->simplePaginate(10));
        /*$roles = Role::when(request('search'), function ($query) {
                                                    $query->where('name', 'like', '%'. request('search'). '%');
                                                })->orderBy('id', 'desc')->get();*/
        return response()->json($roles);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(RoleRequest $request)
    {
        if ($request->validated()) {
            $inputs = [
                'name'=> $request->name,
                'permissions' => $request->permissions,
            ];
            $role = Role::create($inputs);
            $role->syncPermissions($inputs['permissions']);
            $response = [
                'success' => true,
                'message' => 'Permission created successfully.',
                'role' => $role,
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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(RoleRequest $request, Role $role)
    {
        if ($request->validated()) {
            $inputs = [
                'name'=> $request->name,
                'permissions' => $request->permissions,
            ];
            $role->save();
            $role->syncPermissions($inputs['permissions']);
//dd($role);
            $response = [
                'success' => true,
                'message' => 'Permission created successfully.',
                'role' => $role,
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
    public function destroy(Role $role)
    {
        $response = [
            'success' => false,
            'message' => null,
            'errors' => null,
        ];
        if (true) {
            $response = [
                'success' => true,
                'message' => 'Role deleted successfully.',
                'role' => $role,
                'roles' => RoleResource::collection(Role::latest()->simplePaginate(10)),
            ];
        }
        return response()->json($response);
    }
}
