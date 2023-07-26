<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PartnerController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\PressLinkController;
use App\Http\Controllers\ResourceController;
use App\Http\Controllers\DistrictCoordinatorController;
use App\Http\Controllers\MapsController;
use App\Http\Controllers\DataController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/logout', [UserController::class, 'logout']);

Route::get('/partners', [PartnerController::class, 'all_data']);
Route::post('/store_partners', [PartnerController::class, 'store']);
Route::delete('/delete_partner/{id}', [PartnerController::class, 'delete']);

Route::get('/testimonials', [TestimonialController::class, 'all_data']);
Route::post('/store_testimonials', [TestimonialController::class, 'store']);
Route::delete('/delete_testimonial/{id}', [TestimonialController::class, 'delete']);

Route::get('/press_links', [PressLinkController::class, 'all_data']);
Route::post('/store_press_link', [PressLinkController::class, 'store']);
Route::delete('/delete_press_link/{id}', [PressLinkController::class, 'delete']);

Route::get('/resources', [ResourceController::class, 'all_data']);
Route::post('/store_resource', [ResourceController::class, 'store']);
Route::delete('/delete_resource/{id}', [ResourceController::class, 'delete']);

Route::get('/district_coordinators', [DistrictCoordinatorController::class, 'all_data']);
Route::post('/store_district_coordinator', [DistrictCoordinatorController::class, 'store']);
Route::delete('/delete_district_coordinator/{id}', [DistrictCoordinatorController::class, 'delete']);

Route::get('/maps/{slug}', [MapsController::class, 'index']);


Route::get('/data/observations', [DataController::class, 'observations']);
Route::get('/data/taxa', [DataController::class, 'taxa']);


Route::get('/get_all_users', [UserController::class, 'get_all_users']);
Route::post('/update_user', [UserController::class, 'store']);
Route::delete('/delete_user/{id}', [UserController::class, 'delete']);
