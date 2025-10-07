<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\DiscountController;

// == AUTH ==
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/verify-signup-otp', [AuthController::class, 'verifySignupOtp']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/verify-login-otp', [AuthController::class, 'verifyLoginOtp']);



Route::middleware('auth:sanctum')->group(function () {
    // == CRUD PRODUCT ===
    Route::apiResource('products', ProductController::class);
    Route::apiResource('categories', CategoryController::class);

    // == CART ==
    Route::post('/cart/add', [CartController::class, 'add']);
    Route::get('/cart', [CartController::class, 'index']);
    Route::put('/cart/item/{id}', [CartController::class, 'update']);
    Route::delete('/cart/item/{id}', [CartController::class, 'remove']);

   // == DISCOUNT / VOUCHER ==
    Route::prefix('discounts')->group(function () {
        Route::get('/', [DiscountController::class, 'index']);
        Route::post('/', [DiscountController::class, 'store']);
        Route::put('/{id}', [DiscountController::class, 'update']);
        Route::delete('/{id}', [DiscountController::class, 'destroy']);
    });

    // == APPLY DISCOUNT ==
    Route::post('/cart/apply-voucher', [DiscountController::class, 'applyVoucher']);
});
