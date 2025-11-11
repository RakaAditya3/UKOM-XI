<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    AuthController,
    AdminAuthController,
    ProductController,
    CategoryController,
    BrandController,
    CartController,
    DiscountController,
    OrderController,
    PaymentController,
    WishlistController,
    AddressController,
    BankAccountController,
    UserProfileController,
    ProductRatingController,
    RajaOngkirController
};

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES (Tidak Perlu Login)
|--------------------------------------------------------------------------
*/

// 🔹 Auth umum
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/verify-signup-otp', [AuthController::class, 'verifySignupOtp']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/verify-login-otp', [AuthController::class, 'verifyLoginOtp']);
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/verify-reset-otp', [AuthController::class, 'verifyResetOtp']);
Route::post('/auth/google', [AuthController::class, 'googleAuth']);

// 🔹 Login admin panel
Route::post('/admin/login', [AdminAuthController::class, 'login']);

// 🔹 Produk & Brand & Kategori publik
Route::get('/products-home', [ProductController::class, 'productsHome']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/products/{id}/ratings', [ProductRatingController::class, 'show']);
Route::get('/products/{id}/can-rate', [ProductRatingController::class, 'canRate'])->middleware('auth:sanctum');
Route::post('/products/{id}/rate', [ProductRatingController::class, 'store']);
Route::get('/products/{id}/ratings/me', [ProductRatingController::class, 'MyRating']);
Route::get('/brands', [BrandController::class, 'index']);
Route::get('/categories', [CategoryController::class, 'index']);


/*
|--------------------------------------------------------------------------
| RAJA ONGKIR (Perlu Login)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->prefix('rajaongkir')->group(function () {
    Route::get('/provinces', [RajaOngkirController::class, 'index']);
    Route::get('/cities/{provinceId}', [RajaOngkirController::class, 'getCities']);
    Route::get('/districts/{cityId}', [RajaOngkirController::class, 'getDistricts']);
    Route::post('/check-ongkir', [RajaOngkirController::class, 'checkOngkir']);
});


/*
|--------------------------------------------------------------------------
| USER & AUTHENTICATED ROUTES
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    // 👤 USER PROFILE
    Route::get('/user', fn(Request $r) => response()->json([
        'success' => true,
        'data' => [
            'id' => $r->user()->id,
            'name' => $r->user()->name,
            'email' => $r->user()->email,
            'phone' => $r->user()->phone ?? '-',
            'birth_date' => $r->user()->birth_date ?? '-',
            'photo_url' => $r->user()->photo_url,
            'role' => $r->user()->role,
            'created_at' => $r->user()->created_at,
        ],
    ]));

    Route::post('/user/upload-photo', [UserProfileController::class, 'updatePhoto']);
    Route::put('/user', [UserProfileController::class, 'updateProfile']);

    // 💖 WISHLIST
    Route::prefix('wishlist')->group(function () {
        Route::get('/', [WishlistController::class, 'index']);
        Route::post('/{product_id}', [WishlistController::class, 'store']);
        Route::delete('/{product_id}', [WishlistController::class, 'destroy']);
    });

    // 🛒 CART
    Route::prefix('cart')->group(function () {
        Route::get('/', [CartController::class, 'index']);
        Route::post('/add', [CartController::class, 'add']);
        Route::put('/item/{id}', [CartController::class, 'update']);
        Route::delete('/item/{id}', [CartController::class, 'remove']);
        Route::post('/apply-voucher', [DiscountController::class, 'applyVoucher']);
        Route::post('/update-shipping', [CartController::class, 'updateShipping']);
    });

    // 💰 PAYMENT
    Route::prefix('payment')->group(function () {
        Route::post('/create-transaction', [PaymentController::class, 'createTransaction']);
        Route::post('/notification', [PaymentController::class, 'handleNotification']);
    });

    // 📦 ORDERS (Semua role bisa akses)
    Route::prefix('orders')->group(function () {
        Route::get('/', [OrderController::class, 'index']); // user: miliknya, staff: semua
        Route::get('/{id}', [OrderController::class, 'show']);
        Route::post('/checkout', [OrderController::class, 'checkout']);
        Route::post('/create-from-cart', [OrderController::class, 'createFromCart']);
        Route::post('/{id}/confirm', [OrderController::class, 'confirmReceipt']);
        Route::get('/number/{order_number}', [OrderController::class, 'getByNumber']);
    });

    // 🏠 ADDRESSES
    Route::prefix('addresses')->group(function () {
        Route::get('/', [AddressController::class, 'index']);
        Route::post('/', [AddressController::class, 'store']);
        Route::put('/{address}', [AddressController::class, 'update']);
        Route::delete('/{address}', [AddressController::class, 'destroy']);
    });

    // 🏦 BANK ACCOUNTS
    Route::prefix('bank-accounts')->group(function () {
        Route::get('/', [BankAccountController::class, 'index']);
        Route::post('/', [BankAccountController::class, 'store']);
        Route::delete('/{bankAccount}', [BankAccountController::class, 'destroy']);
    });

    // 🏷️ DISCOUNT / VOUCHER
    Route::prefix('discounts')->group(function () {
        Route::get('/', [DiscountController::class, 'index']);
        Route::post('/', [DiscountController::class, 'store']);
        Route::put('/{id}', [DiscountController::class, 'update']);
        Route::delete('/{id}', [DiscountController::class, 'destroy']);
    });
});


/*
|--------------------------------------------------------------------------
| ADMIN PANEL ROUTES (Role-based)
|--------------------------------------------------------------------------
*/

// 🔸 ADMIN ONLY
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/users', [UserProfileController::class, 'index']);
    Route::post('/users', [UserProfileController::class, 'store']);
    Route::delete('/users/{id}', [UserProfileController::class, 'destroy']);
});

// 🔸 ADMIN & OPERATOR
Route::middleware(['auth:sanctum', 'role:admin,operator'])->group(function () {
    Route::apiResource('/products', ProductController::class)->except(['show', 'index']);
    Route::apiResource('/brands', BrandController::class)->except(['index']);
    Route::get('/admin/orders', [OrderController::class, 'adminIndex']);
});

// 🔸 ADMIN & DISPATCHER
Route::middleware(['auth:sanctum', 'role:admin,dispatcher'])->group(function () {
    Route::get('/admin/orders', [OrderController::class, 'adminIndex']);
    Route::patch('/orders/{id}/status', [OrderController::class, 'updateStatus']);
});

// 🔸 DASHBOARD (semua staff boleh)
Route::middleware(['auth:sanctum', 'role:admin,operator,dispatcher'])->prefix('admin')->group(function () {
    Route::get('/dashboard-stats', [OrderController::class, 'dashboardStats']);
});

