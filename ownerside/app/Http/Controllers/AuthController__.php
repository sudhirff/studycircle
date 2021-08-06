<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Session;

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

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);
        $token = null;
        if (Auth::attempt($credentials)) {
            $user = User::where('email', $credentials['email'])->first();
            $token = $user->createToken(env('MY_APP_TOKEN'))->plainTextToken;
            $success = true;
            $message = 'User login successfully';
        } else {
            $success = false;
            $message = 'Please enter your correct credentials.';
        }

        $response = [
            'success' => $success,
            'message' => $message,
            'token' => $token,
        ];
        return response()->json($response);
    }


    public function logout(Request $request)
    {
        try {
            Session::flush();
            
            $success = true;
            $message = 'Successfully logged out';
        } catch (\Illuminate\Database\QueryException $ex) {
            $success = false;
            $message = $ex->getMessage();
        }

        // response
        $response = [
            'success' => $success,
            'message' => $message,
        ];
        return response()->json($response);
    }
}
