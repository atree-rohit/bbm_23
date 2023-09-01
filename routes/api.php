<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PartnerController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\PressLinkController;
use App\Http\Controllers\CountFormController;
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

Route::get('/partners', [PartnerController::class, 'all_data']);
Route::post('/store_partners', [PartnerController::class, 'store']);
Route::post('/update_partner/{id}', [PartnerController::class, 'update']);
Route::delete('/delete_partner/{id}', [PartnerController::class, 'delete']);

Route::get('/testimonials', [TestimonialController::class, 'all_data']);
Route::post('/store_testimonials', [TestimonialController::class, 'store']);
Route::delete('/delete_testimonial/{id}', [TestimonialController::class, 'delete']);

Route::get('/press_links', [PressLinkController::class, 'all_data']);
Route::post('/store_press_link', [PressLinkController::class, 'store']);
Route::delete('/delete_press_link/{id}', [PressLinkController::class, 'delete']);

Route::get('/resources', [ResourceController::class, 'all_data']);
Route::post('/store_resource', [ResourceController::class, 'store']);
Route::post('/update_resource/{id}', [ResourceController::class, 'update']);
Route::delete('/delete_resource/{id}', [ResourceController::class, 'delete']);

Route::get('/district_coordinators', [DistrictCoordinatorController::class, 'all_data']);
Route::post('/store_district_coordinator', [DistrictCoordinatorController::class, 'store']);
Route::delete('/delete_district_coordinator/{id}', [DistrictCoordinatorController::class, 'delete']);

Route::get('/maps/geojson', [MapsController::class, 'index']);


Route::get('/data/observations', [DataController::class, 'observations']);
Route::get('/data/taxa', [DataController::class, 'taxa']);
Route::get('/data/pull_inat', [DataController::class, 'pull_inat']);


Route::get('/get_all_users', [UserController::class, 'get_all_users']);
Route::post('/update_user', [UserController::class, 'update']);
Route::delete('/delete_user/{id}', [UserController::class, 'delete']);
Route::get('/get_all_logs', [DataController::class, 'get_all_logs']);
Route::get('/count_forms', [CountFormController::class, 'count_forms']);
Route::get('/user_count_forms', [CountFormController::class, 'user_count_forms']);
Route::post('/count_forms/set_form_status', [CountFormController::class, 'set_form_status']);
Route::post('/count_forms/set_species_status', [CountFormController::class, 'set_species_status']);

Route::get('/get_district/{slug}', [CountFormController::class, 'get_district']);

Route::post('/butterfly-counts/submit-form', [CountFormController::class, 'submit_form']);
