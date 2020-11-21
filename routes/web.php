<?php

use Illuminate\Support\Facades\Route;


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

Route::redirect('/', 'admin');

Route::namespace('Admin')->prefix('admin')->middleware(['auth'])->group(function () {
    Route::get('/', 'DashboardController@show');
//    content =====================================
    Route::namespace('Admin')->get('content/pages', 'PagesController@show')->name('pages_settings');
    Route::get('content/categories', 'Categories\CategoriesController@show')->name('categories_settings');
    Route::namespace('Admin')->get('content/menu', 'MenuController@show')->name('menu_settings');
//    main admin settings
    Route::namespace('Admin')->get('settings/color_shema', 'PagesController@show')->name('color_shema');
    Route::namespace('Admin\Categories')->get('settings/admin_menu', 'CategoriesController@show')->name('admin_menu');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
