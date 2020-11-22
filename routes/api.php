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

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});
Route::prefix('admin')->namespace('Admin')->middleware('web')->group(function ($request) {
    Route::post('/get_submenu', 'GeMenuController@getSubmenuJson');
    Route::post('/categories/add_category', 'Categories\FormController@getData');
    Route::post('/categories/get_list', 'Categories\ListController@getList');
    Route::post('/categories/category_delete', 'Categories\ListController@categoryDelete');
    Route::post('/categories/category_restore', 'Categories\ListController@categoryRestore');
    Route::post('/categories/get_text_field', function (){
        return view('admin.content.categories.text_field');
    });
});
