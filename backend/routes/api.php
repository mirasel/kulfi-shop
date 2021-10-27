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

Route::group(['prefix' => 'kulfi'], function () {
    Route::get('/read', 'KulfiController@index');
    Route::get('/getKulfiToUpdate/{id}', 'KulfiController@getKulfiToUpdate');
    Route::get('/show/{id}', 'KulfiController@show');

    Route::group(['middleware' => ['auth:api', 'admin', 'apiVerified']], function () {
        Route::post('/create', 'KulfiController@create');
        Route::post('/update/{id}', 'KulfiController@update');
        Route::delete('/delete/{id}', 'KulfiController@destroy');
    });
    // Route::get('/kulfis/edit/{id}', 'KulfiController@get_kulfi');
});

Route::group(['prefix' => 'category'], function () {

    Route::group(['middleware' => ['auth:api', 'admin', 'apiVerified']], function () {
        Route::post('create', 'CategoryController@store');
    });

    Route::get('read', 'CategoryController@index');
    Route::get('show/{id}', 'CategoryController@show');
});

Route::group(['prefix' => 'comment', 'middleware' => 'auth:api'], function () {
    Route::post('create', 'CommentController@store');
    Route::delete('delete/{id}', 'CommentController@destroy');
});

Route::group(['prefix' => 'review', 'middleware' => 'auth:api'], function () {
    Route::post('create', 'ReviewController@store');
    Route::post('delete', 'ReviewController@destroy');
    Route::get('get/{id}', 'ReviewController@show');
});
