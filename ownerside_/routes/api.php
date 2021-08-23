<?php
use App\Http\Controllers\OtherBrowserSessionsController;
use App\Http\Controllers\TokenAuthController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;
use App\Models\User;

//Route::middleware('api')->group(function () {
    Route::middleware('guest')->group(
        function () {
            $limiter = config('fortify.limiters.login');

            Route::post('/auth/token', [TokenAuthController::class, 'store'])->middleware(
                array_filter([$limiter ? 'throttle:' . $limiter : null])
            );
        }
    );

    Route::middleware('auth:sanctum')->group(
        function () {
            Route::delete('/auth/token', [TokenAuthController::class, 'destroy']);

            Route::get('/user/sessions', [OtherBrowserSessionsController::class, 'index']);
            Route::post('/user/sessions/purge', [OtherBrowserSessionsController::class, 'destroy']);
            Route::middleware('api')->group(function () {
                Route::resource('users', UserController::class);
            
                Route::get('/users/check_email_exists/{email}/{id}', function ($email, $id = null) {
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
            
        }
    );
//});