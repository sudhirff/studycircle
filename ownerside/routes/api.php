<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\v1\UserController;
use App\Http\Controllers\Api\v1\InstituteController;

use App\Models\User;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::middleware('api')->group(function () {
    Route::middleware('auth:sanctum')->group(
        function () {
            Route::resource('v1/users', UserController::class);  
            Route::resource('v1/institutes', InstituteController::class);    

            Route::get('/v1/users/check_email_exists/{email}/{id}', function ($email, $id = null) {
                if ($id != null) {
                    $user = User::where([['email', '=', $email], ['id', '!=', $id]])->get()->toArray();
                } else {
                    $user = User::where('email', $email)->get()->toArray();
                }
                
                
                if (!empty($user)) {
                    return true;
                }
                return false;
            })->name('check_email_exists');
        });
    
});
