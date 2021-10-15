<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return response('App is running');
});

Route::get('login', function () {
    return redirect()->away(env('APP_FRONTEND_URL') . '/login');
})->name('login');

Route::get('test', 'UserController@test');
