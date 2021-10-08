<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'auth'], function () {
    Route::post('login', 'UserController@login');
    Route::post('register', 'UserController@register');
    Route::post('logout', 'UserController@logout')->middleware('auth:api');


    Route::group(['prefix' => 'password'], function () {
        Route::post('email', 'UserController@sendResetPasswordLink');
        Route::post('reset', 'UserController@resetPassword');
    });

    Route::group(['prefix' => 'email'], function () {
        Route::get('resend', 'UserController@verifyResend')->middleware('auth:api');
        Route::get('verify/{id}', 'UserController@verify')->name('verify');
    });
});
