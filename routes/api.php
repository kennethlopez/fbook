<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Post api
Route::post('/posts', 'PostController@store');
Route::get('/posts', 'PostController@get');
Route::delete('/posts/{id}', 'PostController@delete');
Route::post('/posts/{id}/update', 'PostController@up');
Route::post('register');