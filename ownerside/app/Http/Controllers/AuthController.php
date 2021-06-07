<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Models\User;

class AuthController extends Controller
{
    public function register(UserRequest $request)
    {
        if ($request->validated()) {
            $inputs['password'] = bcrypt($request['password']);
            $user = User::create($request->validated());
        } else {
            $this->errorResponse('Validation Error', $this->validated()->errors());
        }
    }
}
