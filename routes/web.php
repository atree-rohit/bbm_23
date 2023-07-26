<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;
use App\Http\Controllers\DataController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\DataCleaningController;

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
Route::get('/data', [DataController::class, 'index']);
Route::get('/data/import', [DataController::class, 'import']);
Route::get('/data/clean', [DataCleaningController::class, 'clean']);
Route::get('/about', [PageController::class, 'about']);
Route::get('/participate', [PageController::class, 'participate']);
Route::get('/registration', [PageController::class, 'registration']);
Route::get('/resources', [PageController::class, 'resources']);
Route::get('/calendar', [PageController::class, 'calendar']);
Route::post('/register', [UserController::class, 'register']);
Route::get('/register', [PageController::class, 'register']);
Route::get('/login', [PageController::class, 'login'])->name('login');
Route::get('/manage-users', [PageController::class, 'manage'])->name('manage-users');
Route::post('/login', [UserController::class, 'login']);
Route::get('/logout', [PageController::class, 'logout']);
Route::get('/fileupload', [FileController::class, 'index']);
Route::post('/fileupload', [FileController::class, 'upload'])->name('upload');
// Route::get('/{any}', [PageController::class, 'home']);
