<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\GmeetController;
use App\Http\Controllers\ResourcesController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ZoomController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

/* Manage Resources Crud */
Route::group(['prefix' => 'services'], function () {
    Route::get('/all', [ServiceController::class, 'getAllServices'])->name('allServices');
    Route::get('/active', [ServiceController::class, 'getActiveServices'])->name('activeServices');
    Route::get('/single/{serviceslug}', [ServiceController::class, 'getServiceBySlug'])->name('serviceBySlug');
    Route::post('/create', [ServiceController::class, 'CreateService'])->name('createService');
    Route::put('/update/{serviceID}', [ServiceController::class, 'UpdateService'])->name('updateService');
    Route::patch('/activate/{serviceID}', [ServiceController::class, 'ActivateService'])->name('activateservice');
    Route::delete('/delete/{serviceID}', [ServiceController::class, 'DeleteService'])->name('deleteservice');
});

/* Manage Resources Crud */
Route::group(['prefix' => 'resources'], function () {
    Route::post('/upload', [ResourcesController::class, 'uploadResource'])->name('uploadresource');
    Route::delete('/delete', [ResourcesController::class, 'deleteResource'])->name('deleteresource');
    Route::get('/all', [ResourcesController::class, 'getAllResources'])->name('getallresources');
    Route::get('/{resourceID}', [ResourcesController::class, 'getSingleResource'])->name('getresource');
});

/* Manage Course Booking */
Route::group(['prefix' => 'gmeet'], function () {
    Route::get('/all', [GmeetController::class, 'getAllBookings'])->name('getbookings');
    Route::get('/single/{eventID}', [GmeetController::class, 'getGEventByID'])->name('getbookings');
    Route::put('/update', [GmeetController::class, 'updateBooking'])->name('updatebooking');
    Route::delete('/delete', [GmeetController::class, 'deleteBooking'])->name('deletebooking');
});

/* Create Zoom Link */
Route::group(['prefix' => 'zoom'], function () {
    Route::get('/get/{meetingId}', [ZoomController::class, 'getZoomMeeting']);
    Route::put('/update/{meetingId}', [ZoomController::class, 'updateZoomMeeting']);
    Route::post('/create', [ZoomController::class, 'createZoomMeeting']);
    Route::delete('/delete', [ZoomController::class, 'deleteZoomMeeting']);
});

/* Create Bookings */
Route::group(['prefix' => 'booking'], function () {
    Route::post('/create', [BookingController::class, 'createBooking']);
    Route::get('/all', [BookingController::class, 'getAllBookings']);
    Route::get('/mybooking/{bookEmail}', [BookingController::class, 'getPersonalBookings']);
});

Route::any('{any}', function () {
    return apiResponse('Page Not Found', 'error', 404);
})->where('any', '.*');
