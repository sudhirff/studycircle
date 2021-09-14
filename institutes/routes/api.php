<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\V1\PermissionController;
use App\Http\Controllers\Api\V1\RoleController;
use App\Http\Controllers\Api\V1\CourseController;
use App\Http\Controllers\Api\V1\CoursesTypeController;

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
            Route::get('v1/permissions/modules', [PermissionController::class, 'modules'])->name('permissions.modules');
            Route::resource('v1/permissions', PermissionController::class);
            
            Route::resource('v1/roles', RoleController::class);
            Route::resource('v1/courses_type', CoursesTypeController::class);
            Route::resource('v1/courses', CourseController::class);
        });
    
});
