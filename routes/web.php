<?php

use App\Http\Controllers\InventoriesController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/', [InventoriesController::class, 'index']);

Route::middleware('auth')->group(function () {
    // Profiles
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    // Inventories
    Route::post('/inventories', [InventoriesController::class, 'store'])->name('inventories.create');
    Route::get('/inventories', [InventoriesController::class, 'show'])->name('my.inventories');
    Route::get('/inventories/edit', [InventoriesController::class, 'edit'])->name('inventories.edit');
    Route::put('/inventories/update', [InventoriesController::class, 'update'])->name('inventories.update');
    Route::delete('/inventories/delete', [InventoriesController::class, 'destroy'])->name('inventories.delete');
    Route::get('/inventories/search', [InventoriesController::class, 'search'])->name('inventories.search');
});

require __DIR__.'/auth.php';
