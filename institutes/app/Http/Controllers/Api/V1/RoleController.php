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
        $roles = Role::when(request('search'), function ($query) {
            $query->where('name', 'like', '%'. request('search'). '%');
        })->orderBy('id', 'desc')->get();
        return response()->json($roles);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $permission = Permission::get();
        return response()->json($permission);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(RoleRequest $request)
    {
        $this->validate($request, ['name' => 'required|unique:roles,name','permission' => 'required',]);
        $role = Role::create([
                'name' => $request->input('name')
                ]);
        $role->syncPermissions($request->input('permission'));
        $response = [];
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
    public function edit(Role $role)
    {
        $permission = Permission::get();
        $response = DB::table("role_has_permissions")
                            ->where("role_has_permissions.role_id",$role->id)
                            ->pluck('role_has_permissions.permission_id','role_has_permissions.permission_id')
                            ->all();
        return response()->json($response);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(RoleRequest $request, $role)
    {
        $this->validate($request, ['name' => 'required','permission' => 'required',]);
        //$role = Role::find($id);
        $role->name = $request->input('name');
        $role->save();
        $role->syncPermissions($request->input('permission'));
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
                'roles' => Role::latest()->get(),
            ];
        }
        return response()->json($response);
    }
}
