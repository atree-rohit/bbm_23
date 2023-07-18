<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [PageController::class, 'home']);
Route::get('/data', [PageController::class, 'data']);
Route::get('/about', [PageController::class, 'about']);
Route::get('/participate', [PageController::class, 'participate']);
Route::get('/registration', [PageController::class, 'registration']);
Route::get('/resources', [PageController::class, 'resources']);
Route::get('/calendar', [PageController::class, 'calendar']);
Route::get('/register', [PageController::class, 'register']);
Route::post('/register', [UserController::class, 'register']);
Route::get('/login', [PageController::class, 'login'])->name('login');
Route::post('/login', [UserController::class, 'login']);
Route::get('/logout', [PageController::class, 'logout']);
// Route::get('/{any}', [PageController::class, 'home']);
