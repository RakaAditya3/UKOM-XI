<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\DiscountController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;

// == AUTH ==
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/verify-signup-otp', [AuthController::class, 'verifySignupOtp']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/verify-login-otp', [AuthController::class, 'verifyLoginOtp']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/verify-reset-otp', [AuthController::class, 'verifyResetOtp']);
Route::get('/products-home', [ProductController::class, 'productsHome']);





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

    // == ORDER SYSTEM ==
    Route::prefix('orders')->group(function () {
        Route::get('/', [OrderController::class, 'index']);
        Route::get('/{id}', [OrderController::class, 'show']);
        Route::post('/checkout', [OrderController::class, 'checkout']);

        //admin
        Route::patch('/{id}/status', [OrderController::class, 'updateStatus']); 
});
    // == Midtrans Payment ==
    Route::post('/payment/create', [PaymentController::class, 'createTransaction']);
    Route::post('/payment/notification', [PaymentController::class, 'handleNotification']);
});
