<?php

use Illuminate\Http\Request;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:api')->group(function () {
Route::get('/', function () {
    return response()->json([
        'user' => [
            'first' => 'Amr',
            'second' => 'Aly'
        ]
    ]);
});
});
Route::post('/signin', 'UserController@signin');
Route::post('/signup', 'UserController@create');

Route::get('/test', function () {
	return response()->json([
		'user' => [
			'first' => 'Amr',
			'second' => 'Aly'
		]
	]);
});
