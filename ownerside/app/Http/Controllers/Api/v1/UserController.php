<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\UserResource;
use App\Http\Requests\UserRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Arr;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::when(request('search'), function ($query) {
                $query->where('name', 'like', '%'. request('search'). '%');
                $query->whereOr('email', 'like', '%'. request('search'). '%');
                $query->whereOr('mobile_no', 'like', '%'. request('search'). '%');
            })->orderBy('id', 'desc')->get();
        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserRequest $request)
    {
        if ($request->validated()) {
            $inputs = [
                'name'=> $request->name,
                'email' => $request->email,
                //'password' => Hash::make($request->password),
                'password' => Hash::make(123456789),
                'mobile_no' => $request->mobile_no,
            ];
            $user = User::create($inputs);

            $token = $user->createToken('myapptoken')->plainTextToken;

            $response = [
                'success' => true,
                'message' => 'User created successfully.',
                'user' => $user,
                'token' => $token,
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


    public function edit(User $user)
    {
        $status = 200;
        if (!$user) {
            $status = 404;
        }
        $response = [
            'status' => $status,
            'user' => $user,
        ];
        return response()->json($response);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  object  $user
     * @return \Illuminate\Http\Response
     */
    public function update(UserRequest $request, User $user)
    {
        $inputs = $request->all();
        if(!empty($input['password'])){
            $inputs['password'] = Hash::make($inputs['password']);
        }
        else{
            $inputs = Arr::except($inputs,array('password')); 
        }

        if ($request->validated()) {
            $user->update($inputs);

            $response = [
                'success' => true,
                'message' => 'User updated successfully.',
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
     * @param  object  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $response = [
            'success' => false,
            'message' => null,
            'errors' => null,
        ];
        //$user->delete()
        if (true) {
            $response = [
                'success' => true,
                'message' => 'User deleted successfully.',
                'user' => $user,
                'users' => User::latest()->get(),
            ];
        }
        return response()->json($response);
    }

    public function show(User $user)
    {

    }
}
