-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 11 Nov 2025 pada 07.58
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `UKOM`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `addresses`
--

CREATE TABLE `addresses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `label` varchar(255) DEFAULT NULL,
  `recipient_name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `postal_code` varchar(255) NOT NULL,
  `is_default` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `province_id` varchar(255) DEFAULT NULL,
  `city_id` varchar(255) DEFAULT NULL,
  `district_id` varchar(255) DEFAULT NULL,
  `province_name` varchar(255) DEFAULT NULL,
  `city_name` varchar(255) DEFAULT NULL,
  `district_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `addresses`
--

INSERT INTO `addresses` (`id`, `user_id`, `label`, `recipient_name`, `phone`, `address`, `postal_code`, `is_default`, `created_at`, `updated_at`, `province_id`, `city_id`, `district_id`, `province_name`, `city_name`, `district_name`) VALUES
(5, 6, 'Alamat Utama', 'Raka', '081246774967', 'Gedang', '61274', 0, '2025-10-26 00:46:16', '2025-10-26 00:46:16', '18', '583', '6000', NULL, NULL, NULL),
(6, 6, 'a', 'Raka Aditya', '081246774967', 'Jln.Penitian Gedang Porong', '61274', 0, '2025-10-26 00:52:21', '2025-10-26 00:52:21', '18', '577', '5890', NULL, NULL, NULL),
(8, 11, 'Kantor', 'Raka Aditya', '081246774967', 'Jln.Penitian Gedang Porong', '61274', 1, '2025-10-26 18:18:57', '2025-10-26 18:18:57', '18', '583', '5994', NULL, NULL, NULL),
(9, 6, 'Teman', 'Raka Aditya', '081246774967', 'Jln.Penitian Gedang Porong', '61274', 1, '2025-10-27 22:47:35', '2025-10-27 22:47:35', '18', '580', '5954', NULL, NULL, NULL),
(11, 11, 'Teman', 'Darma', '081246774967', 'Jln.Penitian Gedang Porong', '61274', 0, '2025-11-06 18:46:49', '2025-11-06 18:46:49', '5', '56', '485', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `bank_accounts`
--

CREATE TABLE `bank_accounts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `bank_name` varchar(100) NOT NULL,
  `account_number` varchar(50) NOT NULL,
  `account_owner` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `bank_accounts`
--

INSERT INTO `bank_accounts` (`id`, `user_id`, `bank_name`, `account_number`, `account_owner`, `created_at`, `updated_at`) VALUES
(5, 6, 'BCA', '312312', 'Raka', '2025-10-20 22:36:01', '2025-10-20 22:36:01'),
(9, 6, 'BNI', '12312312', 'Raka', '2025-10-20 22:41:33', '2025-10-20 22:41:33');

-- --------------------------------------------------------

--
-- Struktur dari tabel `brands`
--

CREATE TABLE `brands` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `brands`
--

INSERT INTO `brands` (`id`, `name`, `slug`, `description`, `logo`, `created_at`, `updated_at`) VALUES
(1, 'Casio', 'casio', 'Jam tangan dari brand Casio dengan reputasi tinggi.', 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/brands/GHK2FEx1LXfSbUtdfSUeMcVnYQM68Cw9gqPGEcvu.png', '2025-10-06 21:48:25', '2025-10-22 19:55:13'),
(2, 'Timex', 'timex', 'Jam tangan dari brand Timex dengan reputasi tinggi.', 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/brands/lVEz73lHFD6cDoXnqMKeaQqnekDreiGFWU84PFr6.png', '2025-10-06 21:48:25', '2025-10-22 19:56:29'),
(3, 'Q&Q', 'qq', 'Jam tangan dari brand Q&Q dengan reputasi tinggi.', 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/brands/rd1wJjYZ9Wp7N8yGHFWLqgTf4z9aO9D2eTzl8zcr.png', '2025-10-06 21:48:25', '2025-10-22 19:57:25'),
(4, 'Seiko', 'seiko', 'Jam tangan dari brand Seiko dengan reputasi tinggi.', 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/brands/q137tlhy0gYDlQoSQn04tZdLgoTN95hQXXofq9tG.png', '2025-10-06 21:48:25', '2025-10-23 05:08:30'),
(5, 'Swatch', 'swatch', 'Jam tangan dari brand Swatch dengan reputasi tinggi.', 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/brands/judmlPrYJePK2OnaE6cVXVorLyUGMnYazHbrLoNi.png', '2025-10-06 21:48:25', '2025-10-23 05:08:56'),
(6, 'Citizen', 'citizen', 'Jam tangan dari brand Citizen dengan reputasi tinggi.', 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/brands/eE0xVb593lhgBf6J4QqQQZ1MJcG2pcqsaK4Y16IO.png', '2025-10-06 21:48:25', '2025-10-23 05:09:39'),
(7, 'Orient', 'orient', 'Jam tangan dari brand Orient dengan reputasi tinggi.', 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/brands/K1GciU4UjV8kt1o3MSYRTLHFeOIBlH9nEiZJYZEA.jpg', '2025-10-06 21:48:25', '2025-10-23 05:10:04'),
(8, 'Tissot', 'tissot', 'Jam tangan dari brand Tissot dengan reputasi tinggi.', 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/brands/HVp4B91QsTNOHchEjxUe3k3DQva1DgtNEliselmG.png', '2025-10-06 21:48:25', '2025-10-23 05:10:26'),
(9, 'Bulova', 'bulova', 'Jam tangan dari brand Bulova dengan reputasi tinggi.', 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/brands/OHIOfMz3AfFC5iRVWeriU0Tz16gAkpfZ1xA1sDMO.png', '2025-10-06 21:48:25', '2025-10-23 05:10:50'),
(10, 'TAG Heuer', 'tag-heuer', 'Jam tangan dari brand TAG Heuer dengan reputasi tinggi.', 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/brands/xe1EFG19hw6RrUFOyrM5V6w0qvQjNDzvC2Lb7Z5J.png', '2025-10-06 21:48:25', '2025-10-23 05:11:07'),
(11, 'Omega', 'omega', 'Jam tangan dari brand Omega dengan reputasi tinggi.', 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/brands/RspF5YEy1z9cSSshcwE9IBzrZfLulxMHYNmQVSfB.png', '2025-10-06 21:48:25', '2025-10-23 05:11:25'),
(12, 'Longines', 'longines', 'Jam tangan dari brand Longines dengan reputasi tinggi.', 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/brands/CqDg8Ip7UEcZVNDnklo2QMS3cGnzmTSlg4reUpqD.png', '2025-10-06 21:48:25', '2025-10-23 05:11:53'),
(13, 'Montblanc', 'montblanc', 'Jam tangan dari brand Montblanc dengan reputasi tinggi.', 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/brands/hEiEnR6jmdCN6t4PNXC4qXjbcVxKVm0LvRc2xG3T.png', '2025-10-06 21:48:25', '2025-10-23 05:12:15'),
(14, 'Rado', 'rado', 'Jam tangan dari brand Rado dengan reputasi tinggi.', 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/brands/E4JqMKwn2t6XEMsHRGSf3xZhixG73TkvGmBZAb6F.png', '2025-10-06 21:48:25', '2025-10-23 05:12:41'),
(15, 'Rolex', 'rolex', 'Jam tangan dari brand Rolex dengan reputasi tinggi.', 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/brands/lndcvpnuO0pM45xaZZyCzWPM0sxZbL1Z5Bi7soda.png', '2025-10-06 21:48:25', '2025-10-23 05:12:48'),
(16, 'Audemars Piguet', 'audemars-piguet', 'Jam tangan dari brand Audemars Piguet dengan reputasi tinggi.', 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/brands/iryh3d7zfGh8XdfNpL61KXifdf3GvxKMuH2uaGea.png', '2025-10-06 21:48:25', '2025-10-23 05:13:08'),
(17, 'Patek Philippe', 'patek-philippe', 'Jam tangan dari brand Patek Philippe dengan reputasi tinggi.', 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/brands/lUmot88l731I57CUTMjvTe2AnEI4kdFXTeci9V4F.jpg', '2025-10-06 21:48:25', '2025-10-23 05:13:48'),
(18, 'Vacheron Constantin', 'vacheron-constantin', 'Jam tangan dari brand Vacheron Constantin dengan reputasi tinggi.', 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/brands/0YnLRg1XIZyVEl9NClq6wUuKbJxVibVjHPMvphMQ.png', '2025-10-06 21:48:25', '2025-10-23 05:14:16'),
(19, 'Richard Mille', 'richard-mille', 'Jam tangan dari brand Richard Mille dengan reputasi tinggi.', 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/brands/rbcfk2FNvwBmumUOtIPOOzr4Gb6G6iNM7jBRByXY.png', '2025-10-06 21:48:25', '2025-10-23 05:14:51');

-- --------------------------------------------------------

--
-- Struktur dari tabel `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `carts`
--

CREATE TABLE `carts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `voucher_id` bigint(20) UNSIGNED DEFAULT NULL,
  `total` decimal(15,2) NOT NULL DEFAULT 0.00,
  `shipping_cost` int(11) NOT NULL DEFAULT 0,
  `courier` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `carts`
--

INSERT INTO `carts` (`id`, `user_id`, `voucher_id`, `total`, `shipping_cost`, `courier`, `created_at`, `updated_at`) VALUES
(3, 6, NULL, 0.00, 33000, 'jnt', '2025-10-25 20:03:54', '2025-11-10 22:42:21'),
(4, 11, NULL, 360032000.00, 32000, 'jnt', '2025-10-26 18:17:13', '2025-11-10 22:34:36');

-- --------------------------------------------------------

--
-- Struktur dari tabel `cart_items`
--

CREATE TABLE `cart_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cart_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `price` decimal(15,2) NOT NULL,
  `subtotal` decimal(15,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `cart_items`
--

INSERT INTO `cart_items` (`id`, `cart_id`, `product_id`, `quantity`, `price`, `subtotal`, `created_at`, `updated_at`) VALUES
(57, 4, 16, 1, 180000000.00, 360000000.00, '2025-11-10 22:34:31', '2025-11-10 22:34:33');

-- --------------------------------------------------------

--
-- Struktur dari tabel `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Entry Level', 'entry-level', 'Jam tangan terjangkau untuk pemula.', '2025-10-06 21:47:34', '2025-10-06 21:47:34'),
(2, 'Mid Range', 'mid-range', 'Jam tangan kelas menengah dengan kualitas tinggi.', '2025-10-06 21:47:34', '2025-10-06 21:47:34'),
(3, 'Luxury', 'luxury', 'Jam tangan mewah dengan desain elegan dan presisi tinggi.', '2025-10-06 21:47:34', '2025-10-06 21:47:34'),
(4, 'Ultra Luxury', 'ultra-luxury', 'Jam tangan eksklusif dari brand premium dunia.', '2025-10-06 21:47:34', '2025-10-06 21:47:34');

-- --------------------------------------------------------

--
-- Struktur dari tabel `discounts`
--

CREATE TABLE `discounts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `percentage` decimal(5,2) DEFAULT NULL,
  `fixed_amount` decimal(15,2) DEFAULT NULL,
  `starts_at` datetime DEFAULT NULL,
  `ends_at` datetime DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_10_06_033628_create_personal_access_tokens_table', 1),
(5, '2025_10_07_024830_create_addresses_table', 2),
(6, '2025_10_07_024854_create_brands_table', 2),
(7, '2025_10_07_024924_create_categories_table', 2),
(8, '2025_10_07_024954_create_products_table', 2),
(9, '2025_10_07_025041_create_product_images_table', 2),
(10, '2025_10_07_025102_create_discounts_table', 2),
(11, '2025_10_07_025121_create_vouchers_table', 2),
(12, '2025_10_07_025150_create_carts_table', 2),
(13, '2025_10_07_025240_create_cart_items_table', 2),
(14, '2025_10_07_025338_create_orders_table', 2),
(15, '2025_10_07_025405_create_order_items_table', 2),
(16, '2025_10_07_025423_create_payments_table', 2),
(17, '2025_10_07_025446_create_shipments_table', 2),
(18, '2025_10_07_030826_create_otps_table', 3),
(19, '2025_10_09_021045_add_is_highlighted_to_products_table', 4),
(20, '2025_10_21_043107_create_whislist_table', 5),
(21, '2025_10_21_043204_create_bank_accounts_table', 5),
(22, '2025_10_21_045652_add_photo_url_to_users_table', 6),
(23, '2025_10_21_055010_add_phone_to_users_table', 7),
(24, '2025_10_23_020640_add_modal_cost_to_products_table', 8),
(25, '2025_10_23_124306_add_role_to_users_table', 9),
(26, '2025_10_26_052409_add_city_id_to_addresses_table', 10),
(27, '2025_10_26_061731_add_rajaongkir_columns_to_addresses_table', 11),
(28, '2025_10_26_084303_add_shipping_cost_to_carts_table', 12),
(29, '2025_10_26_085907_add_shipping_to_orders_table', 13),
(30, '2025_10_27_014405_add_confirmation_to_orders_table', 14),
(31, '2025_10_27_021402_create_product_ratings_table', 15),
(32, '2025_11_11_034815_add_sku_to_products_table', 16),
(33, '2025_11_11_041327_add_roles_to_users_table', 17);

-- --------------------------------------------------------

--
-- Struktur dari tabel `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `address_id` bigint(20) UNSIGNED DEFAULT NULL,
  `voucher_id` bigint(20) UNSIGNED DEFAULT NULL,
  `order_number` varchar(255) NOT NULL,
  `status` enum('pending','paid','shipped','delivered','cancelled') NOT NULL DEFAULT 'pending',
  `is_confirmed` tinyint(1) NOT NULL DEFAULT 0,
  `confirmed_at` timestamp NULL DEFAULT NULL,
  `subtotal` decimal(15,2) NOT NULL,
  `discount_total` decimal(15,2) NOT NULL DEFAULT 0.00,
  `courier` varchar(255) DEFAULT NULL,
  `shipping_cost` decimal(15,2) NOT NULL DEFAULT 0.00,
  `total` decimal(15,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `address_id`, `voucher_id`, `order_number`, `status`, `is_confirmed`, `confirmed_at`, `subtotal`, `discount_total`, `courier`, `shipping_cost`, `total`, `created_at`, `updated_at`) VALUES
(15, 6, NULL, NULL, 'ORD-NZUWDBBRSH', 'pending', 0, NULL, 45000000.00, 0.00, NULL, 0.00, 45000000.00, '2025-10-25 21:36:23', '2025-10-25 21:36:23'),
(16, 6, NULL, NULL, 'ORD-G0RGA3NXYS', 'pending', 0, NULL, 45000000.00, 0.00, NULL, 0.00, 45000000.00, '2025-10-25 21:39:12', '2025-10-25 21:39:12'),
(17, 6, NULL, NULL, 'ORD-RTD36RVTL3', 'pending', 0, NULL, 45000000.00, 0.00, NULL, 0.00, 45000000.00, '2025-10-25 21:46:32', '2025-10-25 21:46:32'),
(18, 6, NULL, NULL, 'ORD-O24TQYMNVD', 'pending', 0, NULL, 49900000.00, 0.00, NULL, 0.00, 49900000.00, '2025-10-25 21:47:46', '2025-10-25 21:47:46'),
(19, 6, NULL, NULL, 'ORD-BHTUZPFHYR', 'pending', 0, NULL, 49900000.00, 0.00, NULL, 0.00, 49900000.00, '2025-10-25 21:48:50', '2025-10-25 21:48:50'),
(20, 6, NULL, NULL, 'ORD-NCPQWEK37S', 'pending', 0, NULL, 49900000.00, 0.00, NULL, 0.00, 49900000.00, '2025-10-25 21:53:38', '2025-10-25 21:53:38'),
(21, 6, NULL, NULL, 'ORD-M08AOBYUG7', 'pending', 0, NULL, 49900000.00, 0.00, NULL, 0.00, 49900000.00, '2025-10-25 21:54:42', '2025-10-25 21:54:42'),
(22, 6, NULL, NULL, 'ORD-7Y2JSDDWP9', 'pending', 0, NULL, 49900000.00, 0.00, NULL, 0.00, 49900000.00, '2025-10-25 21:55:08', '2025-10-25 21:55:08'),
(23, 6, NULL, NULL, 'ORD-8EAHKWV62W', 'pending', 0, NULL, 49900000.00, 0.00, NULL, 0.00, 49900000.00, '2025-10-25 21:56:26', '2025-10-25 21:56:26'),
(24, 6, NULL, NULL, 'ORD-0W8THOLCDI', 'paid', 0, NULL, 49900000.00, 0.00, NULL, 0.00, 49900000.00, '2025-10-25 21:57:29', '2025-10-25 21:59:45'),
(25, 6, NULL, NULL, 'ORD-7CAXHYB1MR', 'paid', 0, NULL, 94900000.00, 0.00, NULL, 0.00, 94900000.00, '2025-10-25 22:12:08', '2025-10-25 22:12:08'),
(26, 6, 5, NULL, 'ORD-XIW4JUAUY3', 'paid', 0, NULL, 49900000.00, 0.00, NULL, 0.00, 49900000.00, '2025-10-26 01:23:15', '2025-10-26 01:23:15'),
(27, 6, 5, NULL, 'ORD-42RXD0DKFB', 'paid', 0, NULL, 99800000.00, 0.00, NULL, 0.00, 99800000.00, '2025-10-26 01:33:02', '2025-10-26 01:33:02'),
(28, 6, 5, NULL, 'ORD-ZGMMXWFOPW', 'paid', 0, NULL, 49900000.00, 0.00, NULL, 0.00, 49900000.00, '2025-10-26 01:33:58', '2025-10-26 01:33:58'),
(29, 6, 5, NULL, 'ORD-YW834KHQRB', 'paid', 0, NULL, 49900000.00, 0.00, NULL, 0.00, 49932000.00, '2025-10-26 01:59:54', '2025-10-26 01:59:54'),
(30, 6, 5, NULL, 'ORD-9BVG4VTRNO', 'paid', 0, NULL, 49900000.00, 0.00, NULL, 0.00, 49932000.00, '2025-10-26 02:05:23', '2025-10-26 02:05:23'),
(31, 6, 5, NULL, 'ORD-LKU1ZHTSAQ', 'cancelled', 0, NULL, 49900000.00, 0.00, NULL, 0.00, 50000000.00, '2025-10-26 02:06:10', '2025-10-27 21:09:24'),
(32, 6, 5, NULL, 'ORD-0Q8QAE6RTT', 'cancelled', 0, NULL, 47000000.00, 0.00, NULL, 0.00, 47032000.00, '2025-10-26 02:06:53', '2025-10-27 21:09:23'),
(33, 6, 5, NULL, 'ORD-RT1G5DRFBI', 'cancelled', 0, NULL, 47000000.00, 0.00, NULL, 0.00, 47032000.00, '2025-10-26 02:08:53', '2025-10-27 21:09:21'),
(34, 6, 5, NULL, 'ORD-GT13IUU7MC', 'cancelled', 0, NULL, 47000000.00, 0.00, NULL, 0.00, 47032000.00, '2025-10-26 02:11:15', '2025-10-27 21:09:20'),
(35, 6, 5, NULL, 'ORD-GPIQ4WRIXC', 'cancelled', 0, NULL, 49900000.00, 0.00, NULL, 0.00, 49932000.00, '2025-10-26 02:12:09', '2025-10-27 21:09:18'),
(36, 11, 8, NULL, 'ORD-ME41NEQP5Y', 'cancelled', 0, NULL, 47000000.00, 0.00, NULL, 0.00, 47032000.00, '2025-10-26 18:23:22', '2025-10-26 19:22:02'),
(37, 11, 8, NULL, 'ORD-NU0IXBP8QM', 'delivered', 1, '2025-10-26 19:00:15', 180000000.00, 0.00, NULL, 0.00, 180032000.00, '2025-10-26 18:27:47', '2025-10-26 19:00:15'),
(38, 11, 8, NULL, 'ORD-VYZ8OUHYYB', 'delivered', 1, '2025-10-27 06:27:16', 80000000.00, 0.00, NULL, 0.00, 80031000.00, '2025-10-27 06:17:46', '2025-10-27 06:27:16'),
(39, 6, 5, NULL, 'ORD-5JJVLERQWA', 'delivered', 1, '2025-10-27 20:48:26', 80000000.00, 0.00, NULL, 0.00, 80031000.00, '2025-10-27 20:43:45', '2025-10-27 20:48:26'),
(40, 11, 8, NULL, 'ORD-KR98V7EWR4', 'delivered', 1, '2025-10-27 22:43:05', 47000000.00, 0.00, NULL, 0.00, 47032000.00, '2025-10-27 22:42:35', '2025-10-27 22:43:05'),
(41, 11, 11, NULL, 'ORD-3VHK7KJKLU', 'delivered', 1, '2025-11-06 18:49:42', 180000000.00, 0.00, NULL, 0.00, 180032000.00, '2025-11-06 18:47:57', '2025-11-06 18:49:42'),
(42, 11, 11, NULL, 'ORD-V8GGRATESM', 'delivered', 1, '2025-11-09 19:12:17', 94000000.00, 0.00, NULL, 0.00, 94032000.00, '2025-11-09 19:11:36', '2025-11-09 19:12:17'),
(43, 6, 9, NULL, 'ORD-ERGB0I5TUO', 'delivered', 1, '2025-11-10 22:36:22', 360000000.00, 0.00, NULL, 0.00, 360145000.00, '2025-11-10 22:36:12', '2025-11-10 22:36:22'),
(44, 6, 9, NULL, 'ORD-IRJR0EHWWW', 'paid', 0, NULL, 180000000.00, 0.00, NULL, 0.00, 180033000.00, '2025-11-10 22:42:21', '2025-11-10 22:42:21');

-- --------------------------------------------------------

--
-- Struktur dari tabel `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(15,2) NOT NULL,
  `subtotal` decimal(15,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price`, `subtotal`, `created_at`, `updated_at`) VALUES
(15, 15, 60, 1, 45000000.00, 45000000.00, '2025-10-25 21:36:23', '2025-10-25 21:36:23'),
(16, 16, 60, 1, 45000000.00, 45000000.00, '2025-10-25 21:39:12', '2025-10-25 21:39:12'),
(17, 17, 60, 1, 45000000.00, 45000000.00, '2025-10-25 21:46:32', '2025-10-25 21:46:32'),
(18, 18, 59, 1, 49900000.00, 49900000.00, '2025-10-25 21:47:46', '2025-10-25 21:47:46'),
(19, 19, 59, 1, 49900000.00, 49900000.00, '2025-10-25 21:48:50', '2025-10-25 21:48:50'),
(20, 20, 59, 1, 49900000.00, 49900000.00, '2025-10-25 21:53:38', '2025-10-25 21:53:38'),
(21, 21, 59, 1, 49900000.00, 49900000.00, '2025-10-25 21:54:42', '2025-10-25 21:54:42'),
(22, 22, 59, 1, 49900000.00, 49900000.00, '2025-10-25 21:55:08', '2025-10-25 21:55:08'),
(23, 23, 59, 1, 49900000.00, 49900000.00, '2025-10-25 21:56:26', '2025-10-25 21:56:26'),
(24, 24, 59, 1, 49900000.00, 49900000.00, '2025-10-25 21:57:29', '2025-10-25 21:57:29'),
(25, 25, 59, 1, 49900000.00, 49900000.00, '2025-10-25 22:12:08', '2025-10-25 22:12:08'),
(26, 25, 60, 1, 45000000.00, 45000000.00, '2025-10-25 22:12:08', '2025-10-25 22:12:08'),
(27, 26, 59, 1, 49900000.00, 49900000.00, '2025-10-26 01:23:15', '2025-10-26 01:23:15'),
(28, 27, 59, 2, 49900000.00, 99800000.00, '2025-10-26 01:33:02', '2025-10-26 01:33:02'),
(29, 28, 59, 1, 49900000.00, 49900000.00, '2025-10-26 01:33:58', '2025-10-26 01:33:58'),
(30, 29, 59, 1, 49900000.00, 49900000.00, '2025-10-26 01:59:54', '2025-10-26 01:59:54'),
(31, 30, 59, 1, 49900000.00, 49900000.00, '2025-10-26 02:05:23', '2025-10-26 02:05:23'),
(32, 31, 59, 1, 49900000.00, 49900000.00, '2025-10-26 02:06:10', '2025-10-26 02:06:10'),
(33, 32, 14, 1, 47000000.00, 47000000.00, '2025-10-26 02:06:53', '2025-10-26 02:06:53'),
(34, 33, 14, 1, 47000000.00, 47000000.00, '2025-10-26 02:08:53', '2025-10-26 02:08:53'),
(35, 34, 14, 1, 47000000.00, 47000000.00, '2025-10-26 02:11:15', '2025-10-26 02:11:15'),
(36, 35, 59, 1, 49900000.00, 49900000.00, '2025-10-26 02:12:09', '2025-10-26 02:12:09'),
(37, 36, 14, 1, 47000000.00, 47000000.00, '2025-10-26 18:23:22', '2025-10-26 18:23:22'),
(38, 37, 16, 1, 180000000.00, 180000000.00, '2025-10-26 18:27:47', '2025-10-26 18:27:47'),
(39, 38, 12, 1, 80000000.00, 80000000.00, '2025-10-27 06:17:46', '2025-10-27 06:17:46'),
(40, 39, 12, 1, 80000000.00, 80000000.00, '2025-10-27 20:43:45', '2025-10-27 20:43:45'),
(41, 40, 14, 1, 47000000.00, 47000000.00, '2025-10-27 22:42:35', '2025-10-27 22:42:35'),
(42, 41, 16, 1, 180000000.00, 180000000.00, '2025-11-06 18:47:57', '2025-11-06 18:47:57'),
(43, 42, 14, 2, 47000000.00, 94000000.00, '2025-11-09 19:11:36', '2025-11-09 19:11:36'),
(44, 43, 16, 2, 180000000.00, 360000000.00, '2025-11-10 22:36:12', '2025-11-10 22:36:12'),
(45, 44, 16, 3, 180000000.00, 180000000.00, '2025-11-10 22:42:21', '2025-11-10 22:42:21');

-- --------------------------------------------------------

--
-- Struktur dari tabel `otps`
--

CREATE TABLE `otps` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `code` varchar(255) NOT NULL,
  `type` varchar(20) NOT NULL,
  `expires_at` datetime NOT NULL,
  `is_used` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `otps`
--

INSERT INTO `otps` (`id`, `user_id`, `code`, `type`, `expires_at`, `is_used`, `created_at`, `updated_at`) VALUES
(26, 6, '283039', 'signup', '2025-10-13 02:46:27', 1, '2025-10-12 19:41:27', '2025-10-12 19:42:20'),
(27, 6, '645696', 'login', '2025-10-13 02:47:41', 1, '2025-10-12 19:42:41', '2025-10-12 19:43:11'),
(28, 6, '767043', 'login', '2025-10-13 04:07:21', 1, '2025-10-12 21:02:21', '2025-10-12 21:02:48'),
(34, 6, '419004', 'login', '2025-10-14 06:24:05', 1, '2025-10-13 23:19:05', '2025-10-13 23:19:32'),
(35, 6, '450307', 'login', '2025-10-14 06:37:05', 1, '2025-10-13 23:32:05', '2025-10-13 23:32:19'),
(36, 6, '728632', 'login', '2025-10-21 04:47:15', 1, '2025-10-20 21:42:15', '2025-10-20 21:42:35'),
(41, 11, '571096', 'signup', '2025-10-27 00:55:31', 1, '2025-10-26 17:50:31', '2025-10-26 17:51:39'),
(42, 11, '174266', 'login', '2025-10-27 00:56:56', 1, '2025-10-26 17:51:56', '2025-10-26 17:52:33'),
(43, 11, '965913', 'login', '2025-10-27 12:56:36', 1, '2025-10-27 05:51:36', '2025-10-27 05:52:32'),
(45, 11, '783613', 'login', '2025-10-27 13:59:27', 1, '2025-10-27 06:54:27', '2025-10-27 06:54:42'),
(46, 6, '965635', 'login', '2025-10-28 03:46:48', 1, '2025-10-27 20:41:48', '2025-10-27 20:42:40'),
(47, 6, '778554', 'login', '2025-10-28 03:52:12', 1, '2025-10-27 20:47:12', '2025-10-27 20:47:54'),
(49, 11, '243002', 'login', '2025-10-28 04:22:55', 1, '2025-10-27 21:17:55', '2025-10-27 21:18:19'),
(53, 11, '884174', 'login', '2025-10-28 05:46:52', 1, '2025-10-27 22:41:52', '2025-10-27 22:42:04'),
(54, 6, '389487', 'reset', '2025-10-28 05:54:21', 1, '2025-10-27 22:49:21', '2025-10-27 22:49:47'),
(55, 6, '179899', 'login', '2025-10-28 05:55:10', 1, '2025-10-27 22:50:10', '2025-10-27 22:50:26'),
(56, 11, '254096', 'login', '2025-11-07 01:16:39', 1, '2025-11-06 18:11:39', '2025-11-06 18:15:04'),
(58, 11, '861658', 'login', '2025-11-10 01:21:07', 1, '2025-11-09 18:16:07', '2025-11-09 18:16:36'),
(59, 11, '582548', 'login', '2025-11-10 02:15:22', 1, '2025-11-09 19:10:22', '2025-11-09 19:10:35'),
(60, 6, '106909', 'login', '2025-11-11 01:59:38', 1, '2025-11-10 18:54:38', '2025-11-10 18:55:22'),
(68, 11, '439359', 'login', '2025-11-11 02:28:34', 1, '2025-11-10 19:23:34', '2025-11-10 19:23:47'),
(70, 11, '369989', 'login', '2025-11-11 03:06:39', 1, '2025-11-10 20:01:39', '2025-11-10 20:02:00'),
(71, 11, '186471', 'login', '2025-11-11 03:45:50', 1, '2025-11-10 20:40:50', '2025-11-10 20:41:25'),
(72, 11, '753711', 'login', '2025-11-11 05:18:58', 1, '2025-11-10 22:13:58', '2025-11-10 22:14:21'),
(73, 11, '388968', 'login', '2025-11-11 05:37:53', 1, '2025-11-10 22:32:53', '2025-11-10 22:33:12'),
(75, 6, '255489', 'login', '2025-11-11 05:45:35', 1, '2025-11-10 22:40:35', '2025-11-10 22:41:04');

-- --------------------------------------------------------

--
-- Struktur dari tabel `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `payments`
--

CREATE TABLE `payments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `method` enum('bank_transfer','credit_card','e_wallet','cod') NOT NULL DEFAULT 'bank_transfer',
  `amount` decimal(15,2) NOT NULL,
  `status` enum('pending','success','failed') NOT NULL DEFAULT 'pending',
  `transaction_id` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `payments`
--

INSERT INTO `payments` (`id`, `order_id`, `method`, `amount`, `status`, `transaction_id`, `created_at`, `updated_at`) VALUES
(14, 15, 'credit_card', 45000000.00, 'pending', NULL, '2025-10-25 21:36:24', '2025-10-25 21:36:24'),
(15, 16, 'credit_card', 45000000.00, 'pending', NULL, '2025-10-25 21:39:13', '2025-10-25 21:39:13'),
(16, 17, 'credit_card', 45000000.00, 'pending', NULL, '2025-10-25 21:46:32', '2025-10-25 21:46:32'),
(17, 18, 'credit_card', 49900000.00, 'pending', NULL, '2025-10-25 21:47:46', '2025-10-25 21:47:46'),
(18, 19, 'credit_card', 49900000.00, 'pending', NULL, '2025-10-25 21:48:50', '2025-10-25 21:48:50'),
(19, 20, 'credit_card', 49900000.00, 'pending', NULL, '2025-10-25 21:53:38', '2025-10-25 21:53:38'),
(20, 21, 'credit_card', 49900000.00, 'pending', NULL, '2025-10-25 21:54:43', '2025-10-25 21:54:43'),
(21, 22, 'credit_card', 49900000.00, 'pending', NULL, '2025-10-25 21:55:08', '2025-10-25 21:55:08'),
(22, 23, 'credit_card', 49900000.00, 'pending', NULL, '2025-10-25 21:56:26', '2025-10-25 21:56:26'),
(23, 24, 'credit_card', 49900000.00, 'pending', NULL, '2025-10-25 21:57:29', '2025-10-25 21:57:29');

-- --------------------------------------------------------

--
-- Struktur dari tabel `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 3, 'auth_token', '7f9d108b4dd7e16b945cab451766299ccdfb313471e86589a6d41a9029a04274', '[\"*\"]', '2025-10-12 19:39:34', NULL, '2025-10-06 21:03:32', '2025-10-12 19:39:34'),
(2, 'App\\Models\\User', 3, 'auth_token', 'fb9507135d7b3e998cd12f526ddd951165cf26be09026401f852bf4f9b7c36bc', '[\"*\"]', NULL, NULL, '2025-10-07 18:07:51', '2025-10-07 18:07:51'),
(3, 'App\\Models\\User', 3, 'auth_token', 'a3e0200bd39302411923e03fc7fd2c7f3abbb42dee05418cb46ba7f40b706b0b', '[\"*\"]', NULL, NULL, '2025-10-08 18:23:49', '2025-10-08 18:23:49'),
(4, 'App\\Models\\User', 3, 'auth_token', 'd2605cb1ed9a8c6e9e2eb61cd14833efa342ed977289ece9f475294a7964f150', '[\"*\"]', NULL, NULL, '2025-10-08 18:33:56', '2025-10-08 18:33:56'),
(5, 'App\\Models\\User', 3, 'auth_token', '062aadcb185f5840a69b986f8818612ef2a1eb940d6d534b5e23285f324194bd', '[\"*\"]', NULL, NULL, '2025-10-08 18:37:02', '2025-10-08 18:37:02'),
(6, 'App\\Models\\User', 3, 'auth_token', '9eb8f66b91425dea6843824be1bcbe3548613de9de8722817fd6aca2759536b4', '[\"*\"]', NULL, NULL, '2025-10-08 18:38:31', '2025-10-08 18:38:31'),
(7, 'App\\Models\\User', 6, 'auth_token', 'd4516ccdf52d132b8639d3ccb1747d7ddce821e982c71b57ae4897d7f5d125a0', '[\"*\"]', '2025-10-12 20:02:53', NULL, '2025-10-12 19:43:11', '2025-10-12 20:02:53'),
(8, 'App\\Models\\User', 6, 'auth_token', 'dc35d523579230a611f445961bab07a5c445d95c78bf8648a9b1d56983a79014', '[\"*\"]', '2025-10-12 21:38:48', NULL, '2025-10-12 21:02:48', '2025-10-12 21:38:48'),
(9, 'App\\Models\\User', 6, 'auth_token', '06f2e36d168e4569d40e02a05a99ac23286b7b7d3a967e42969e92d3670600e2', '[\"*\"]', NULL, NULL, '2025-10-13 23:19:32', '2025-10-13 23:19:32'),
(10, 'App\\Models\\User', 6, 'auth_token', '4dd0962d2942af3373916ef2f3cc43250aa05b72dc239e9a8dac521dccf2f427', '[\"*\"]', NULL, NULL, '2025-10-13 23:32:19', '2025-10-13 23:32:19'),
(11, 'App\\Models\\User', 6, 'auth_token', '24a8f8b7b69dcb6afd1ec0c2fef774b3396c7aed3bd1a90717123bcedf86795e', '[\"*\"]', '2025-10-23 05:53:32', NULL, '2025-10-20 21:42:35', '2025-10-23 05:53:32'),
(12, 'App\\Models\\User', 6, 'admin_token', '38c28ddeb72c47bc7e8218e5639a571d52700f795875a330ac61543706bc1879', '[\"*\"]', '2025-10-23 05:57:03', NULL, '2025-10-23 05:54:30', '2025-10-23 05:57:03'),
(13, 'App\\Models\\User', 6, 'admin_token', '1e5f982508eba4c41741ec74b440de70f87234a733281f486a322bec851948cd', '[\"*\"]', '2025-10-23 06:51:48', NULL, '2025-10-23 06:48:55', '2025-10-23 06:51:48'),
(14, 'App\\Models\\User', 6, 'admin_token', '7b0c46992fe38ecc8a488599322ad9c7f8ec9621b12a1d0fc648a175cc48b711', '[\"*\"]', '2025-10-23 06:56:00', NULL, '2025-10-23 06:52:53', '2025-10-23 06:56:00'),
(15, 'App\\Models\\User', 6, 'admin_token', '34c7a1386a127370242547b738fc390f5608fef3b027ca3c847a764a114431f8', '[\"*\"]', '2025-10-23 19:45:29', NULL, '2025-10-23 06:57:06', '2025-10-23 19:45:29'),
(16, 'App\\Models\\User', 6, 'admin_token', '8ad9e83eb9c6f534905156a571edb3691708563c7805065b82fa24256e455c2f', '[\"*\"]', '2025-10-23 19:47:30', NULL, '2025-10-23 19:47:28', '2025-10-23 19:47:30'),
(17, 'App\\Models\\User', 6, 'admin_token', '12e77f2b08d9e39e8bffd712834013e52cb5e456ce351c856ce05f5d86e9d7f5', '[\"*\"]', '2025-10-23 20:11:24', NULL, '2025-10-23 19:57:04', '2025-10-23 20:11:24'),
(18, 'App\\Models\\User', 10, 'auth_token', 'b86f07d6c98540df1e178ca03808819729fab732e1591b5ea088e64beba6f43f', '[\"*\"]', '2025-10-25 22:03:33', NULL, '2025-10-25 19:45:41', '2025-10-25 22:03:33'),
(19, 'App\\Models\\User', 6, 'admin_token', '4c790cb3e491b04793b95a5c832860bd43a40cef4cd51eba4fd7274152965e72', '[\"*\"]', '2025-10-26 19:07:55', NULL, '2025-10-25 20:00:40', '2025-10-26 19:07:55'),
(20, 'App\\Models\\User', 11, 'auth_token', 'a98d3f92b97782c0c54ceb8cec30d0b789adbf5e6be179ea400a280621d1d0cd', '[\"*\"]', '2025-10-26 19:28:45', NULL, '2025-10-26 17:52:33', '2025-10-26 19:28:45'),
(21, 'App\\Models\\User', 11, 'auth_token', '3e6954afb164f013a0e4b887faa3632c44806dd5c9c9b97b99c60589432bf50d', '[\"*\"]', '2025-10-27 06:51:40', NULL, '2025-10-27 05:52:32', '2025-10-27 06:51:40'),
(22, 'App\\Models\\User', 11, 'auth_token', '3dec7d0b42bbc53bc21bbce97976955395e5e216d26a060f7f3a7f1ed4ffc23a', '[\"*\"]', '2025-10-27 19:29:20', NULL, '2025-10-27 06:54:42', '2025-10-27 19:29:20'),
(23, 'App\\Models\\User', 6, 'auth_token', '9f71327e498fbd5d845e99f42b5b2f111611fffed75f8e17bdaee565b7734836', '[\"*\"]', '2025-10-27 20:45:40', NULL, '2025-10-27 20:42:40', '2025-10-27 20:45:40'),
(24, 'App\\Models\\User', 6, 'admin_token', 'eef0303cf3fb3afbff65a5047542dbe71378ba714b396f27d5f96cb4532b0e9d', '[\"*\"]', '2025-10-27 20:46:39', NULL, '2025-10-27 20:45:51', '2025-10-27 20:46:39'),
(25, 'App\\Models\\User', 6, 'auth_token', 'e6678a5053391425e0f2c5958396dac8ff645e1d7c6f9b0981237717abb4a423', '[\"*\"]', '2025-10-27 21:13:31', NULL, '2025-10-27 20:47:54', '2025-10-27 21:13:31'),
(26, 'App\\Models\\User', 11, 'auth_token', '0388877f1a24b017ac95cc991b34cabcdf70207d39caf7a522df623fa0493c71', '[\"*\"]', '2025-10-27 21:18:32', NULL, '2025-10-27 21:18:19', '2025-10-27 21:18:32'),
(27, 'App\\Models\\User', 14, 'auth_token', '861532fda80fb42356900a61429ee718d76459d6e685699453a105e95656f577', '[\"*\"]', '2025-10-27 21:29:52', NULL, '2025-10-27 21:28:15', '2025-10-27 21:29:52'),
(28, 'App\\Models\\User', 11, 'auth_token', '3d223b755dc0afce294949e2b9f5cc76c19f2430bc396d74cb8fc8441465b76c', '[\"*\"]', '2025-10-27 22:43:45', NULL, '2025-10-27 22:42:04', '2025-10-27 22:43:45'),
(29, 'App\\Models\\User', 6, 'admin_token', '32b92919858665d4aac7374cf236b14fbed0735c8478960a38333c12e78689d9', '[\"*\"]', '2025-10-27 22:49:08', NULL, '2025-10-27 22:44:03', '2025-10-27 22:49:08'),
(30, 'App\\Models\\User', 6, 'auth_token', '3083ad8032ae27a0b96f89a74cbb120bd9328e00ba9834665aef1da3c8bd8e1d', '[\"*\"]', '2025-10-28 17:01:30', NULL, '2025-10-27 22:50:26', '2025-10-28 17:01:30'),
(31, 'App\\Models\\User', 6, 'admin_token', 'b4e2e620fd79fc05546c0d3e8a2ce1ffd14a31121b368ae59755a89d8743d5e8', '[\"*\"]', '2025-11-06 18:08:07', NULL, '2025-10-28 17:01:45', '2025-11-06 18:08:07'),
(32, 'App\\Models\\User', 11, 'auth_token', '5477a91f2334eac5aef5199ade967b628f2a0014d2818d29f86fb1f4a370140c', '[\"*\"]', '2025-11-06 19:54:15', NULL, '2025-11-06 18:15:04', '2025-11-06 19:54:15'),
(33, 'App\\Models\\User', 11, 'auth_token', 'e1018890f2f1c9337ec12134d3efccbae7433ffd380e8af18cdbb17db9e94411', '[\"*\"]', '2025-11-09 19:05:48', NULL, '2025-11-09 18:16:36', '2025-11-09 19:05:48'),
(34, 'App\\Models\\User', 11, 'auth_token', '5dc4205d1c1b7199fd6fdef82f7336c63cbae92aae09b3f20175a0a849eae489', '[\"*\"]', '2025-11-10 17:29:36', NULL, '2025-11-09 19:10:35', '2025-11-10 17:29:36'),
(35, 'App\\Models\\User', 6, 'auth_token', 'e6aaf3e8afb2d6c3a9321684b1d274b94ad199e855712ecf798cecd13eb8eb45', '[\"*\"]', '2025-11-10 18:55:31', NULL, '2025-11-10 18:55:22', '2025-11-10 18:55:31'),
(36, 'App\\Models\\User', 11, 'auth_token', '3e40592813f0f16c2a1abb225003f2886c30ab287d2245a175326bd14242b4af', '[\"*\"]', '2025-11-10 19:56:47', NULL, '2025-11-10 19:23:47', '2025-11-10 19:56:47'),
(37, 'App\\Models\\User', 11, 'auth_token', '5c261bbc8a17a2b8ed70830d282d9ac597f8abda15131c10e5023fefcf378aaa', '[\"*\"]', '2025-11-10 20:29:28', NULL, '2025-11-10 20:02:00', '2025-11-10 20:29:28'),
(38, 'App\\Models\\User', 11, 'auth_token', 'c9bcfded626f0168dce358273b949f5749821c44849e5c3da58fb0f19c08240f', '[\"*\"]', '2025-11-10 21:22:42', NULL, '2025-11-10 20:41:25', '2025-11-10 21:22:42'),
(39, 'App\\Models\\User', 6, 'admin_token', '5614d643d0710df78a30f07cf7655c6a3155cbb99ef41d01cabc26d3b0d086a7', '[\"*\"]', '2025-11-10 21:33:42', NULL, '2025-11-10 21:23:22', '2025-11-10 21:33:42'),
(40, 'App\\Models\\User', 19, 'admin_token', 'e95e527d527ca658f68d35631e837ef245d28ad4979fbee84e55efd75af6979b', '[\"*\"]', NULL, NULL, '2025-11-10 21:35:35', '2025-11-10 21:35:35'),
(41, 'App\\Models\\User', 19, 'admin_token', 'ff2549cb96be8097a1d2012fdfacfe945e391d37effaf51ee8028ff5b2c2129e', '[\"*\"]', '2025-11-10 21:40:29', NULL, '2025-11-10 21:36:16', '2025-11-10 21:40:29'),
(42, 'App\\Models\\User', 18, 'admin_token', '325393f7aa60801d5c355fe20f16271bf4f4f26eea31afa381d5956064002053', '[\"*\"]', NULL, NULL, '2025-11-10 21:40:51', '2025-11-10 21:40:51'),
(43, 'App\\Models\\User', 18, 'admin_token', '47ad659e859716b1c0c0acc4a2851f09438b1edb0a91c79741dd8f7e7a9230bc', '[\"*\"]', NULL, NULL, '2025-11-10 21:41:08', '2025-11-10 21:41:08'),
(44, 'App\\Models\\User', 6, 'admin_token', '436c48a27db8c52801138bd7cd00dc6c8faaf7f059f2e1272a3820e024d0ba39', '[\"*\"]', '2025-11-10 21:41:18', NULL, '2025-11-10 21:41:15', '2025-11-10 21:41:18'),
(45, 'App\\Models\\User', 19, 'admin_token', '6355431cedc90c04656ebb8ce795981b6e7908c86422f5bb22893c96a374812f', '[\"*\"]', NULL, NULL, '2025-11-10 21:41:32', '2025-11-10 21:41:32'),
(46, 'App\\Models\\User', 19, 'admin_token', '8dbc755a0ad662605e27d1da47e30cc15b6843a59efd7a719021d45e82703538', '[\"*\"]', '2025-11-10 21:42:46', NULL, '2025-11-10 21:42:34', '2025-11-10 21:42:46'),
(47, 'App\\Models\\User', 18, 'admin_token', '61c14467b0289b14f8952ceedfc2aa1d851c0cccba58d09b3e59bd2fde856d36', '[\"*\"]', '2025-11-10 21:45:06', NULL, '2025-11-10 21:43:28', '2025-11-10 21:45:06'),
(48, 'App\\Models\\User', 19, 'admin_token', 'ab93ed67666eb1cf0da2b985fe0aef1621b7f6f1851a75b3923b03123e7773be', '[\"*\"]', NULL, NULL, '2025-11-10 21:45:19', '2025-11-10 21:45:19'),
(49, 'App\\Models\\User', 19, 'admin_token', 'a99d9515f0ad5f8352159d9738b925ba10610b2a94b0ead02e72a0d947bb1f3a', '[\"*\"]', '2025-11-10 21:48:31', NULL, '2025-11-10 21:45:42', '2025-11-10 21:48:31'),
(50, 'App\\Models\\User', 19, 'admin_token', '0a2738e7cce1f3c20193b27f964b3c01dda1b148a559c2642ea990071558d3f3', '[\"*\"]', '2025-11-10 21:48:47', NULL, '2025-11-10 21:48:45', '2025-11-10 21:48:47'),
(51, 'App\\Models\\User', 18, 'admin_token', '2c5dbb75fba6b1241c48bbb935e688114206368d638a726c4632d776201e695d', '[\"*\"]', '2025-11-10 22:03:17', NULL, '2025-11-10 21:49:21', '2025-11-10 22:03:17'),
(52, 'App\\Models\\User', 6, 'admin_token', '4c76b4c031150ca5972428573d776c1fde2d778ddc8b88438ed838221460a73f', '[\"*\"]', '2025-11-10 22:12:03', NULL, '2025-11-10 22:03:33', '2025-11-10 22:12:03'),
(53, 'App\\Models\\User', 19, 'admin_token', '69ef0bcd65769f49227c87ee8d1ba147d4a431fb4117e5372dc67ab29bb67888', '[\"*\"]', '2025-11-10 22:12:16', NULL, '2025-11-10 22:12:14', '2025-11-10 22:12:16'),
(54, 'App\\Models\\User', 18, 'admin_token', '10b7625f9346a701f94ce1180f4afe955b9203545cc38317c92176856396d30c', '[\"*\"]', '2025-11-10 22:13:17', NULL, '2025-11-10 22:12:36', '2025-11-10 22:13:17'),
(55, 'App\\Models\\User', 11, 'auth_token', '9e16eed502f9a4d2162728961bf6caf301f35ab008fa738759cd1c618df6a5c5', '[\"*\"]', '2025-11-10 22:14:26', NULL, '2025-11-10 22:14:21', '2025-11-10 22:14:26'),
(56, 'App\\Models\\User', 6, 'admin_token', '0fb06e59d73cb69ed1cd4ab905f29e263cc5da95c831fb2d6a724e04de1a4477', '[\"*\"]', '2025-11-10 22:18:01', NULL, '2025-11-10 22:17:53', '2025-11-10 22:18:01'),
(57, 'App\\Models\\User', 19, 'admin_token', '9c165e2f0baf1c0638c755d2902d28aae1a22e0e9934f132d2dfedf941f733bc', '[\"*\"]', '2025-11-10 22:19:13', NULL, '2025-11-10 22:19:12', '2025-11-10 22:19:13'),
(58, 'App\\Models\\User', 6, 'admin_token', '69c9b231d64835070f7004c4924e65f3b3ac37764fdaa20c88d9cb96bdeea111', '[\"*\"]', '2025-11-10 22:20:41', NULL, '2025-11-10 22:20:28', '2025-11-10 22:20:41'),
(59, 'App\\Models\\User', 18, 'admin_token', 'dc15782e9238946cddc69774c3325e38f0b876fd462c3cb8e19c9cd0a0558b8c', '[\"*\"]', '2025-11-10 22:21:19', NULL, '2025-11-10 22:20:58', '2025-11-10 22:21:19'),
(60, 'App\\Models\\User', 6, 'admin_token', '5ede5d583d02bc41c9d59ff593534f6adfbd2cb2af865064b0eea9a1521b61e7', '[\"*\"]', '2025-11-10 22:32:30', NULL, '2025-11-10 22:22:15', '2025-11-10 22:32:30'),
(61, 'App\\Models\\User', 11, 'auth_token', '85856f92935bd782dba02ba9492dd509204591f8e72a87618588ec74db9a3bae', '[\"*\"]', '2025-11-10 22:34:36', NULL, '2025-11-10 22:33:12', '2025-11-10 22:34:36'),
(62, 'App\\Models\\User', 6, 'admin_token', '90113df8b4f2fb7414b25f24160276eab2eded81cd1b69899de932efe7a7f9fe', '[\"*\"]', '2025-11-10 22:36:37', NULL, '2025-11-10 22:35:03', '2025-11-10 22:36:37'),
(63, 'App\\Models\\User', 6, 'auth_token', 'ca20fa07b0641c3549fcea0f00a926250ae12c0ac004491c2ed0f5971e0da2c5', '[\"*\"]', '2025-11-10 22:49:13', NULL, '2025-11-10 22:41:04', '2025-11-10 22:49:13'),
(64, 'App\\Models\\User', 18, 'admin_token', 'dc706411c788fe8dfe3975ad18d8cdd4351ebf35634fcb972002ab6d7d7c4ba7', '[\"*\"]', '2025-11-10 22:49:39', NULL, '2025-11-10 22:49:37', '2025-11-10 22:49:39'),
(65, 'App\\Models\\User', 19, 'admin_token', '59b0baae457eee59ea3c66062b742161cec25ec6ca85dd3ae63ab2d7d4c8cda5', '[\"*\"]', '2025-11-10 22:50:01', NULL, '2025-11-10 22:50:00', '2025-11-10 22:50:01');

-- --------------------------------------------------------

--
-- Struktur dari tabel `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `brand_id` bigint(20) UNSIGNED DEFAULT NULL,
  `category_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `sku` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(15,2) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `is_highlighted` tinyint(1) NOT NULL DEFAULT 0,
  `discount_price` decimal(15,2) DEFAULT NULL,
  `modal_cost` decimal(12,2) NOT NULL DEFAULT 0.00,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `products`
--

INSERT INTO `products` (`id`, `brand_id`, `category_id`, `name`, `slug`, `sku`, `description`, `price`, `stock`, `is_highlighted`, `discount_price`, `modal_cost`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'Casio MTP-V002D', 'casio-mtp-v002d', 'SKU-31212', 'Jam tangan Casio dari kategori Entry Level.', 4500000.00, 8, 0, NULL, 4000000.00, 1, '2025-10-06 21:48:33', '2025-10-23 05:17:44'),
(2, 2, 1, 'Timex Easy Reader', 'timex-easy-reader', 'SKU-21312', 'Jam tangan Timex dari kategori Entry Level.', 1000.00, 97, 0, NULL, 0.00, 1, '2025-10-06 21:48:33', '2025-10-25 20:03:58'),
(3, 3, 1, 'Q&Q Analog Classic', 'qq-analog-classic', 'SKU-589312', 'Jam tangan Q&Q dari kategori Entry Level.', 350000.00, 16, 0, NULL, 2900000.00, 1, '2025-10-06 21:48:33', '2025-10-23 19:57:31'),
(4, 4, 1, 'Seiko 5 SNK809', 'seiko-5-snk809', 'SKU-57913', 'Jam tangan Seiko dari kategori Entry Level.', 1200000.00, 14, 0, NULL, 1000000.00, 1, '2025-10-06 21:48:33', '2025-10-23 19:57:42'),
(5, 5, 1, 'Swatch Originals Gent', 'swatch-originals-gent', 'SKU-03125', 'Jam tangan Swatch dari kategori Entry Level.', 980000.00, 20, 0, NULL, 660000.00, 1, '2025-10-06 21:48:33', '2025-10-23 19:57:51'),
(6, 6, 2, 'Citizen Eco-Drive BM7100', 'citizen-eco-drive-bm7100', 'SKU-48012', 'Jam tangan Citizen dari kategori Mid Range.', 2800000.00, 20, 0, NULL, 2000000.00, 1, '2025-10-06 21:48:33', '2025-10-23 19:58:04'),
(7, 4, 2, 'Seiko Presage SRPB43', 'seiko-presage-srpb43', 'SKU-41231', 'Jam tangan Seiko dari kategori Mid Range.', 3500000.00, 5, 0, NULL, 3000000.00, 1, '2025-10-06 21:48:33', '2025-10-23 19:58:15'),
(8, 7, 2, 'Orient Bambino Gen 2', 'orient-bambino-gen-2', 'SKU-4131', 'Jam tangan Orient dari kategori Mid Range.', 2500000.00, 13, 0, NULL, 2000000.00, 1, '2025-10-06 21:48:33', '2025-10-23 19:58:26'),
(9, 8, 2, 'Tissot PRX Quartz', 'tissot-prx-quartz', 'SKU-3121', 'Jam tangan Tissot dari kategori Mid Range.', 5500000.00, 5, 0, NULL, 4500000.00, 1, '2025-10-06 21:48:33', '2025-10-23 19:58:39'),
(10, 9, 2, 'Bulova Classic Automatic', 'bulova-classic-automatic', 'SKU-21321', 'Jam tangan Bulova dari kategori Mid Range.', 4800000.00, 7, 0, NULL, 4000000.00, 1, '2025-10-06 21:48:33', '2025-10-23 19:58:49'),
(12, 11, 3, 'Omega Seamaster Diver 300M', 'omega-seamaster-diver-300m', 'SKU-31251', 'Jam tangan Omega dari kategori Luxury.', 80000000.00, 14, 1, NULL, 76000000.00, 1, '2025-10-06 21:48:33', '2025-10-27 20:43:45'),
(13, 12, 3, 'Longines Master Collection', 'longines-master-collection', 'SKU-38192', 'Jam tangan Longines dari kategori Luxury.', 42000000.00, 9, 0, NULL, 39000000.00, 1, '2025-10-06 21:48:33', '2025-10-23 19:59:20'),
(14, 13, 3, 'Montblanc 1858 Automatic', 'montblanc-1858-automatic', 'SKU-591841', 'Jam tangan Montblanc dari kategori Luxury.', 47000000.00, -6, 1, NULL, 43000000.00, 1, '2025-10-06 21:48:33', '2025-11-09 19:11:36'),
(15, 14, 3, 'Rado Captain Cook', 'rado-captain-cook', 'SKU-018921', 'Jam tangan Rado dari kategori Luxury.', 39000000.00, 4, 0, NULL, 34000000.00, 1, '2025-10-06 21:48:33', '2025-10-23 19:59:37'),
(16, 15, 4, 'Rolex Submariner Date', 'rolex-submariner-date', 'SKU-58012', 'Jam tangan Rolex dari kategori Ultra Luxury.', 180000000.00, 0, 1, NULL, 170000000.00, 1, '2025-10-06 21:48:33', '2025-11-10 22:42:21'),
(17, 16, 4, 'Audemars Piguet Royal Oak', 'audemars-piguet-royal-oak', 'SKU-5917', 'Jam tangan Audemars Piguet dari kategori Ultra Luxury.', 380000000.00, 17, 0, NULL, 365000000.00, 1, '2025-10-06 21:48:33', '2025-10-23 20:00:10'),
(18, 17, 4, 'Patek Philippe Nautilus', 'patek-philippe-nautilus', 'SKU-591741', 'Jam tangan Patek Philippe dari kategori Ultra Luxury.', 520000000.00, 7, 1, NULL, 500000000.00, 1, '2025-10-06 21:48:33', '2025-10-23 20:00:22'),
(19, 18, 4, 'Vacheron Constantin Overseas', 'vacheron-constantin-overseas', 'SKU-5912', 'Jam tangan Vacheron Constantin dari kategori Ultra Luxury.', 470000000.00, 8, 0, NULL, 450000000.00, 1, '2025-10-06 21:48:33', '2025-10-23 20:00:32'),
(20, 19, 4, 'Richard Mille RM 11-03', 'richard-mille-rm-11-03', 'SKU-50141', 'Jam tangan Richard Mille dari kategori Ultra Luxury.', 1800000000.00, 10, 1, NULL, 170000000.00, 1, '2025-10-06 21:48:33', '2025-10-23 20:00:45'),
(48, 10, 3, 'TAG Heuer Formula 1 Solargraph', 'tag-heuer-formula-1-solargraph', 'SKU-98141', 'The TAG Heuer Formula 1 Solargraph (38mm) delivers a bold, eye-catching look with its red TH-Polylight case. Designed for daring urban adventures, this exclusive timepiece blends vibrant colors and cutting-edge solar-powered technology, making it a standout in the TAG Heuer Formula 1 collection.', 55900000.00, 20, 0, 54500000.00, 48000000.00, 1, '2025-10-23 06:51:48', '2025-10-23 06:58:00'),
(56, 10, 3, 'TAG Heuer Formula 1 Solargraph Green', 'tag-heuer-formula-1-solargraph-green', 'SKU-94791', 'With its bold green accents and advanced Solargraph technology, the TAG Heuer Formula 1 Solargraph (38mm) injects fresh energy into the collection. Showcasing a contemporary design, this exclusive timepiece combines innovation with modern-day versatility.', 59900000.00, 17, 0, NULL, 49000000.00, 1, '2025-10-23 07:07:15', '2025-10-23 07:07:15'),
(57, 10, 3, 'TAG Heuer Formula 1 Solargraph White', 'tag-heuer-formula-1-solargraph-white', 'SKU-9541', 'The TAG Heuer Formula 1 Solargraph, now in a versatile 38mm size, showcases its energetic allure. With a solar-powered quartz movement and contemporary design, it reinterprets the original Series 1 watch with modern materials and vibrant colors, offering a dynamic timepiece for the new generation.', 57000000.00, 45, 0, 55000000.00, 40900000.00, 1, '2025-10-23 07:09:46', '2025-10-23 07:09:46'),
(58, 10, 3, 'TAG Heuer Formula 1 Date Grey', 'tag-heuer-formula-1-date-grey', 'SKU-9441', 'Powered by the robust TAG Heuer Calibre 5 movement and loaded with passion for racing, this TAG Heuer Formula 1 comes to the fore in this energetic timepiece, designed for a fast-paced life—a standard-bearer of TAG Heuer’s continuing engagement with motorsports. The steel bracelet’s folding clasp with a double safety system makes this watch suitable for fearless racing endeavors.', 65000000.00, 9, 0, NULL, 57900000.00, 1, '2025-10-23 19:32:41', '2025-10-23 19:37:53'),
(59, 10, 3, 'TAG Heuer Formula 1 Date Blue', 'tag-heuer-formula-1-date-blue', 'SKU-12121', 'A classic three-hand men’s quartz watch with oversized “6” and “12” on a sunray blue dial – inspired by Formula One, embodying TAG Heuer’s unique racing heritage and commitment to excellence under pressure.', 49900000.00, 19, 0, NULL, 40900000.00, 1, '2025-10-23 19:39:00', '2025-10-26 02:12:09'),
(60, 10, 3, 'TAG Heuer Formula 1 Date Black', 'tag-heuer-formula-1-date-black', 'SKU-984813', 'A black watch with a unique dial design and true motor-racing spirit. The 41mm brushed steel case is matched with a steel black PVD unidirectional turning bezel and a brushed steel bracelet. Sporty, shock-resistant, water resistant to 200 meters.', 45000000.00, 10, 0, NULL, 39900000.00, 1, '2025-10-23 19:45:18', '2025-11-10 22:21:06');

-- --------------------------------------------------------

--
-- Struktur dari tabel `product_images`
--

CREATE TABLE `product_images` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `is_main` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `product_images`
--

INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `is_main`, `created_at`, `updated_at`) VALUES
(15, 14, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/52nuTP7jBSDeHOlkHtDWvPoTTOF7kmbnUOPzJpds.png', 1, '2025-10-12 21:10:46', '2025-10-12 21:10:46'),
(16, 14, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/kY9pkuPIVFYHFQEwXmxeXJnscWiJsPwIB3vi7OUC.png', 0, '2025-10-12 21:10:47', '2025-10-12 21:10:47'),
(17, 12, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/fMKaZ36GEah0DrA8ARes4tnsHBIcnOoNw0ACmI3t.png', 1, '2025-10-12 21:25:40', '2025-10-12 21:25:40'),
(18, 12, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/MjyaXBieoKXLdoCosEjLyEsBoZZ3bhk6LPpnyM4X.png', 0, '2025-10-12 21:25:42', '2025-10-12 21:25:42'),
(19, 12, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/LmdDmrzLC2RrXH3NkQiCW0crUGkIZ4eLEyOwSu6H.png', 0, '2025-10-12 21:25:44', '2025-10-12 21:25:44'),
(20, 16, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/1PD0zRyGQxCXq75qVCSHgsgsnmvTzFksHwsWawAY.png', 1, '2025-10-12 21:28:31', '2025-10-12 21:28:31'),
(21, 16, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/LS5z18LEuFub2QY9q0HWGJuNIP1db96Mbj7MrYJO.png', 0, '2025-10-12 21:28:32', '2025-10-12 21:28:32'),
(26, 18, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/YU8SlqkReXjktCbyGztJlohAKc9hhBJhi0vzld2X.png', 1, '2025-10-12 21:35:30', '2025-10-12 21:35:30'),
(27, 18, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/iXUEJLiAJtnyA2YtOznmGDpJODaYIuJLhAbD0yC2.png', 0, '2025-10-12 21:35:37', '2025-10-12 21:35:37'),
(28, 18, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/mZGas2DmyspnCIyOe3gQS0TNgyNrY7wUIkMQOCU1.png', 0, '2025-10-12 21:35:39', '2025-10-12 21:35:39'),
(29, 18, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/RcRfBKKCChqesCaMbsUoSCTRcx8LHzrLdqBCdEH3.png', 0, '2025-10-12 21:35:41', '2025-10-12 21:35:41'),
(30, 18, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/sBmjGNM4B7XjgvNGFVCrACxI0X5Xl6gMIyIhVyRU.png', 0, '2025-10-12 21:35:43', '2025-10-12 21:35:43'),
(31, 20, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/hsiWTNkLMxirBMn6YedZP3zTsCslKYrW9zHavjz7.png', 1, '2025-10-12 21:38:51', '2025-10-12 21:38:51'),
(38, 1, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/Q6G5rxgzVndTEC33KOuuFOdEuRuzREpoJ9CUMiEE.png', 1, '2025-10-23 05:17:45', '2025-10-23 05:17:45'),
(39, 1, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/5tvZL9rZXPjYsuIyIr5NiiN3kEjKTU8LWpEN4sTQ.png', 0, '2025-10-23 05:17:46', '2025-10-23 05:17:46'),
(40, 1, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/i77dBmOoz1Cx61nzlZoQXySU4OPUEb45dOytyHwL.png', 0, '2025-10-23 05:17:46', '2025-10-23 05:17:46'),
(41, 1, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/2GbbH4BxsMdx6886X1RcHoh5MlFFqfOV3YuOG6Oo.png', 0, '2025-10-23 05:17:46', '2025-10-23 05:17:46'),
(42, 2, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/HvWxMRiVdBS0S33HKCBunp0aNgiqozbeFUxPjlGB.png', 1, '2025-10-23 05:19:41', '2025-10-23 05:19:41'),
(43, 2, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/eBKR1pOpaxyXtVhKhBVEBruVfA1JfOwd7CZkloeh.png', 0, '2025-10-23 05:19:42', '2025-10-23 05:19:42'),
(44, 2, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/LEUTiRzr3MbA1Ub8dNU3hty9sptkRckFZoF6QyUA.png', 0, '2025-10-23 05:19:42', '2025-10-23 05:19:42'),
(45, 3, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/bTUrEX5D0kqg9D17rSRvn6Z0siR309YnoG4ZGfdT.png', 1, '2025-10-23 05:20:50', '2025-10-23 05:20:50'),
(46, 4, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/ncFCil2e6qxEk3QK7mqrPUkKJLs0b9Dan5GAtDwj.png', 1, '2025-10-23 05:21:53', '2025-10-23 05:21:53'),
(47, 4, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/nvcjXhZpYvJNa2XmUHPbDEBDBgoEfi329IyRqFbk.png', 0, '2025-10-23 05:21:53', '2025-10-23 05:21:53'),
(48, 5, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/ewsEWbbKflkbatot6F9rbVQMNA8OoA9ChgC6sx0r.png', 1, '2025-10-23 05:23:57', '2025-10-23 05:23:57'),
(49, 5, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/MLo4fbMTKCmmGpp42ionnpuTcs15G1twr2pnwTNR.png', 0, '2025-10-23 05:23:57', '2025-10-23 05:23:57'),
(50, 5, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/sCMqhEFv3ZTUy7GERWOscvEj06skaOhb0VZjJ7ZC.png', 0, '2025-10-23 05:23:57', '2025-10-23 05:23:57'),
(51, 6, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/K7n1x9lMpaLz8keZMfOLOJ0sY1qVkLjcVP6AeQlp.png', 1, '2025-10-23 05:24:42', '2025-10-23 05:24:42'),
(52, 6, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/OSax1OVUI4XcLbFlOKQxE404EvIGAF5vbbmchm0d.png', 0, '2025-10-23 05:24:42', '2025-10-23 05:24:42'),
(53, 7, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/YelmXX7lXqBCKtfWGYyX6C0IUcgM0sqFKvbXi6Ht.png', 1, '2025-10-23 05:26:10', '2025-10-23 05:26:10'),
(54, 7, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/JM70FT8QxUnHUFG2PLy1WQ8YBjOAbvtvSb3utv1K.png', 0, '2025-10-23 05:26:11', '2025-10-23 05:26:11'),
(55, 7, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/ao9V9Ea0Iq6sYBTBOrpGYCA3iNGAq8ax3lEmAzL5.png', 0, '2025-10-23 05:26:11', '2025-10-23 05:26:11'),
(56, 8, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/kSisCtWSzwdVa3QNaMmGlXi2ZljlT5QUPtKKr5SE.png', 1, '2025-10-23 05:27:34', '2025-10-23 05:27:34'),
(57, 8, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/sVkivPqMJoTI5MgpuTJinlq8Bn0Yj8WFwQvdmtTz.png', 0, '2025-10-23 05:27:34', '2025-10-23 05:27:34'),
(58, 8, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/t7JZstdRRlR5aI9hI6mdUn2uIsBDWzU1OJdRF8w8.png', 0, '2025-10-23 05:27:35', '2025-10-23 05:27:35'),
(59, 9, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/flljScEbE5ibJ99JCCiNT83GMUzNqa63hbOuS1PK.png', 1, '2025-10-23 05:28:15', '2025-10-23 05:28:15'),
(60, 9, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/gxsL6N1iJhLp1kxmYIR3JnBIiWoumAm6Ys8EzMnD.png', 0, '2025-10-23 05:28:15', '2025-10-23 05:28:15'),
(61, 9, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/TqlR5xd288rjEZ2ClJjXGEEYDzhZwbuoJJZLh8qH.png', 0, '2025-10-23 05:28:16', '2025-10-23 05:28:16'),
(62, 10, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/qHFOc1ujkClAqZ1jmAk0uduEu8kJ8iFC8ck94Rtb.png', 1, '2025-10-23 05:29:27', '2025-10-23 05:29:27'),
(63, 10, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/mtV2ylEwtawi8KriX7c3VgCz91zioBDr4JW2yIoz.png', 0, '2025-10-23 05:29:27', '2025-10-23 05:29:27'),
(64, 10, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/TcJDwABMkpTanL7vGJz15Mff05Bng5riKlnyOL9d.png', 0, '2025-10-23 05:29:28', '2025-10-23 05:29:28'),
(68, 13, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/8CU02WHWr2EffmQEJadPSv1y8vvt0iEA6j34d4iz.png', 1, '2025-10-23 05:35:26', '2025-10-23 05:35:26'),
(69, 13, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/9jIeVRZNeyRp7C5uUqt1YmJCgzoUc4DoSzWUi47k.png', 0, '2025-10-23 05:35:26', '2025-10-23 05:35:26'),
(70, 13, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/ERhQd5H0A14gc3koCMfTc2sfGcgXZxV5XM06cEma.png', 0, '2025-10-23 05:35:27', '2025-10-23 05:35:27'),
(71, 15, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/Tj2tQ1IAVpbulycZBeR7dD2Gl52lOCEw6o8bip6s.png', 1, '2025-10-23 05:36:24', '2025-10-23 05:36:24'),
(72, 15, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/IG4B5fW29WYNP9C0IUK1if2iuZPmTHBumKkaU9tM.png', 0, '2025-10-23 05:36:24', '2025-10-23 05:36:24'),
(73, 15, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/Ip3PjxLih3FPvrZ2sA7Q63udNxkDzzoOtSpHrzEc.png', 0, '2025-10-23 05:36:25', '2025-10-23 05:36:25'),
(74, 17, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/cmfIvi7YZWPrDnzoyEP9HTLIQijKbcewDo79s0Zz.png', 1, '2025-10-23 05:37:02', '2025-10-23 05:37:02'),
(75, 17, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/uqo4zVwirfcEuM6mvXn4DSlFGIxnXo0OAvjv9lkL.png', 0, '2025-10-23 05:37:02', '2025-10-23 05:37:02'),
(76, 17, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/CfcN0lWgGHSxsyRfBJnWvErPXCnCUwu4n0VG2LA4.png', 0, '2025-10-23 05:37:04', '2025-10-23 05:37:04'),
(77, 19, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/fobaXJoVAzCeHmjKQ3vTw4xnpbYZma0l3dT4vCRz.png', 1, '2025-10-23 05:37:52', '2025-10-23 05:37:52'),
(78, 19, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/rBd5icTg2C5qoXQdCGqpWwHu977etxXOElU6oWzA.png', 0, '2025-10-23 05:37:52', '2025-10-23 05:37:52'),
(79, 19, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/8M5wBTKfA7DcKL2YYwUyE6Pc6kuVRgJhinLsSImE.png', 0, '2025-10-23 05:37:53', '2025-10-23 05:37:53'),
(86, 48, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/KHk4h9SqL0YTUmdh2N7RpWCMiw0qTByb4kPn1t7x.png', 0, '2025-10-23 06:59:36', '2025-10-23 06:59:36'),
(87, 48, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/4mP7vuxYYQol0TToI5QIv7rSd6r4LfcWzLEFGkos.png', 1, '2025-10-23 07:00:36', '2025-10-23 07:00:36'),
(88, 48, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/ynFDImLYpDM3cdJjRcR9z1X9nZ6Xb4mTuNRj6MLo.png', 0, '2025-10-23 07:00:36', '2025-10-23 07:00:36'),
(89, 48, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/PcsGLGwRlJmV4620cVXLxnUxCQG3cFfEQnNE51qQ.png', 0, '2025-10-23 07:00:37', '2025-10-23 07:00:37'),
(94, 56, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/epp82mXoPobMaEDe1Km4xjvYvcHvs3qUGcDzR5vL.png', 1, '2025-10-23 07:07:53', '2025-10-23 07:07:53'),
(95, 56, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/7sWJoObiLaPTxvz85FCcD2kKfl0SUPishR6IUaIN.png', 1, '2025-10-23 07:08:00', '2025-10-23 07:08:00'),
(96, 56, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/w5eptwnNGf7RONdbdEyiK1BWGT1x828CJ5K7E6W8.png', 0, '2025-10-23 07:08:00', '2025-10-23 07:08:00'),
(97, 57, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/brLF4jPyGh5MkXXoLMqToplCHO8beYT5w4Ew9CsD.png', 1, '2025-10-23 07:09:47', '2025-10-23 07:09:47'),
(98, 57, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/nC3HAwK6Y3yrgxdyFDaeT1xqVIHA7KIefcTBKZCJ.png', 1, '2025-10-23 07:09:54', '2025-10-23 07:09:54'),
(99, 57, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/xKMM5z1xpYYurXg9XjqjzVa8ojUDAsXmjslzgnx6.png', 0, '2025-10-23 07:09:54', '2025-10-23 07:09:54'),
(100, 58, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/u9H3wZI6u02kGfTVMKN6Gl4GUsN3cNBmZUf8vg8G.png', 1, '2025-10-23 19:32:47', '2025-10-23 19:32:47'),
(101, 58, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/uGsgknk1C7IHm7vkqm4fmmgULzgnDOGheqUKpsEm.png', 1, '2025-10-23 19:33:04', '2025-10-23 19:33:04'),
(102, 58, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/vzitjYPBZPmWdgWk4v3ss7OWFgVBFEC6dDjR7Il2.png', 0, '2025-10-23 19:33:08', '2025-10-23 19:33:08'),
(103, 59, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/1AOtM2TVKo0XdFiH42n1MluVfU5sQzf17KYHCBd4.png', 1, '2025-10-23 19:39:03', '2025-10-23 19:39:03'),
(104, 59, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/27F8CrfUCTj4Dkhmt0zN1deCUaTAQFX76JNaXkKY.png', 1, '2025-10-23 19:39:12', '2025-10-23 19:39:12'),
(105, 59, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/HNKEWvuBencIfEBg59HBPPNvNPZeXZkgxBjFDtsl.png', 0, '2025-10-23 19:39:15', '2025-10-23 19:39:15'),
(106, 60, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/M5EbzH6uQbQB0KVGjMZL9U6EJuyEo7E5fUXcjcjG.png', 1, '2025-10-23 19:45:23', '2025-10-23 19:45:23'),
(107, 60, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/OMSb8W2IzESi9gcNGOOqrO0W3jxIP95XucW71Jpo.png', 1, '2025-10-23 19:45:32', '2025-10-23 19:45:32'),
(108, 60, 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/products/cRJyMkLJC3WqaGiDOlBNKsJpGA6pplm5BFapJCpG.png', 0, '2025-10-23 19:45:36', '2025-10-23 19:45:36');

-- --------------------------------------------------------

--
-- Struktur dari tabel `product_ratings`
--

CREATE TABLE `product_ratings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `rating` tinyint(4) NOT NULL COMMENT '1-5',
  `review` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `product_ratings`
--

INSERT INTO `product_ratings` (`id`, `user_id`, `product_id`, `rating`, `review`, `created_at`, `updated_at`) VALUES
(1, 11, 12, 5, 'Bagus', '2025-10-27 06:27:20', '2025-10-27 06:27:20'),
(2, 6, 12, 5, 'Goooddd', '2025-10-27 21:06:21', '2025-10-27 21:13:21'),
(3, 11, 14, 5, 'BARANG BAGUS SEKALI GOOD', '2025-10-27 22:43:12', '2025-11-09 19:12:32'),
(4, 11, 16, 5, 'josjis', '2025-11-06 18:49:50', '2025-11-06 18:49:50');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('0ruhDXDQYx5dUxGTwP0mge1lVo7WZN2L6wrc6yl7', NULL, '127.0.0.1', 'PostmanRuntime/7.49.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNzNPZk85ZlcxMVpmNm95TEFIaG40ZjNoV3A0RFlBTEdTb1pXazdoOCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1761457149),
('6b2ong9EMybl6PcJqcuEAJUbkgYfYHB2N82qMiPZ', NULL, '127.0.0.1', 'PostmanRuntime/7.49.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVGIzbTFxODV4bGJOMWRZYVlaeXpKcXJuWnVmV1o1TUt5cnhrc1JzNyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1761464565),
('jrqbBfCIamkNTkGfW6ATJqNSHBfWfwfad57y9ehx', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiaGdCaTJEalpUek1LV1VnUm42Qno1TEpzd3g4NWpUSFFnNEswYXlpMSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1761021642),
('NhdBl10H5mWH8E1T3AUWmigS9bnXAA1AVaMwYYKI', NULL, '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUFdDbUZ4ZHVTUHVGeFdSRnU2T3YzMUJqcHNVTXBzS3FjWWRkZWZLMSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1762825665);

-- --------------------------------------------------------

--
-- Struktur dari tabel `shipments`
--

CREATE TABLE `shipments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `tracking_number` varchar(255) DEFAULT NULL,
  `courier` varchar(255) DEFAULT NULL,
  `status` enum('processing','shipped','delivered') NOT NULL DEFAULT 'processing',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `role` enum('owner','admin','operator','dispatcher','user') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `photo_url`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `birth_date`, `role`) VALUES
(6, 'Raka Aditya', 'rakafury.ar@gmail.com', '081246774967', 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/users/hhqayMU1jdZb2DXNW0vrHd4P0VSazty2nCUqj0no.png', '2025-10-12 19:42:20', '$2y$12$Wp45/XnCWUCosX38Nw1jkuLAv8/3AwQz5.0CxfVZFWN..strUEZ6.', NULL, '2025-10-12 19:41:27', '2025-11-10 22:35:34', '2003-01-21', 'admin'),
(11, 'Chronova Official', 'officialchronova@gmail.com', '-', 'https://kmzmzmrdwbaaibcgqowh.supabase.co/storage/v1/object/public/images/users/XiVlQAk8e5feug2WpUjK09SRyQgKgyMytpAWxoBD.png', '2025-10-26 17:51:39', NULL, NULL, '2025-10-26 17:50:31', '2025-11-10 20:04:29', '2007-07-11', 'user'),
(18, 'Darma SM', 'rakaxaditya.ar@gmail.com', NULL, NULL, NULL, '$2y$12$FLFK.jW8b2ML85FmysV2d.SDm1XsC.bS0303HvbQjjQfw5Im.iDE2', NULL, '2025-11-10 21:33:18', '2025-11-10 21:33:18', NULL, 'operator'),
(19, 'Aryanto', 'raka987.ar@gmail.com', NULL, NULL, NULL, '$2y$12$0aIwoqtLJNcOHncvzHQ8LeESapSc/HQ8B/Usr1yzIe1Lew3yoYsnS', NULL, '2025-11-10 21:33:41', '2025-11-10 21:33:41', NULL, 'dispatcher');

-- --------------------------------------------------------

--
-- Struktur dari tabel `vouchers`
--

CREATE TABLE `vouchers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `percentage` decimal(5,2) DEFAULT NULL,
  `fixed_amount` decimal(15,2) DEFAULT NULL,
  `usage_limit` int(11) DEFAULT NULL,
  `used_count` int(11) NOT NULL DEFAULT 0,
  `starts_at` datetime DEFAULT NULL,
  `ends_at` datetime DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `wishlist`
--

CREATE TABLE `wishlist` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `wishlist`
--

INSERT INTO `wishlist` (`id`, `user_id`, `product_id`, `created_at`, `updated_at`) VALUES
(2, 6, 12, NULL, NULL),
(3, 6, 60, NULL, NULL),
(4, 6, 19, NULL, NULL),
(7, 11, 14, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `addresses_user_id_foreign` (`user_id`);

--
-- Indeks untuk tabel `bank_accounts`
--
ALTER TABLE `bank_accounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bank_accounts_user_id_foreign` (`user_id`);

--
-- Indeks untuk tabel `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `brands_slug_unique` (`slug`);

--
-- Indeks untuk tabel `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indeks untuk tabel `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indeks untuk tabel `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `carts_user_id_foreign` (`user_id`),
  ADD KEY `carts_voucher_id_foreign` (`voucher_id`);

--
-- Indeks untuk tabel `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_items_cart_id_foreign` (`cart_id`),
  ADD KEY `cart_items_product_id_foreign` (`product_id`);

--
-- Indeks untuk tabel `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categories_slug_unique` (`slug`);

--
-- Indeks untuk tabel `discounts`
--
ALTER TABLE `discounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `discounts_product_id_foreign` (`product_id`);

--
-- Indeks untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indeks untuk tabel `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indeks untuk tabel `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `orders_order_number_unique` (`order_number`),
  ADD KEY `orders_user_id_foreign` (`user_id`),
  ADD KEY `orders_address_id_foreign` (`address_id`),
  ADD KEY `orders_voucher_id_foreign` (`voucher_id`);

--
-- Indeks untuk tabel `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_items_order_id_foreign` (`order_id`),
  ADD KEY `order_items_product_id_foreign` (`product_id`);

--
-- Indeks untuk tabel `otps`
--
ALTER TABLE `otps`
  ADD PRIMARY KEY (`id`),
  ADD KEY `otps_user_id_foreign` (`user_id`);

--
-- Indeks untuk tabel `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indeks untuk tabel `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `payments_order_id_foreign` (`order_id`);

--
-- Indeks untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indeks untuk tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `products_slug_unique` (`slug`),
  ADD UNIQUE KEY `products_sku_unique` (`sku`),
  ADD KEY `products_brand_id_foreign` (`brand_id`),
  ADD KEY `products_category_id_foreign` (`category_id`);

--
-- Indeks untuk tabel `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_images_product_id_foreign` (`product_id`);

--
-- Indeks untuk tabel `product_ratings`
--
ALTER TABLE `product_ratings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_ratings_user_id_product_id_unique` (`user_id`,`product_id`),
  ADD KEY `product_ratings_product_id_foreign` (`product_id`);

--
-- Indeks untuk tabel `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indeks untuk tabel `shipments`
--
ALTER TABLE `shipments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `shipments_order_id_foreign` (`order_id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indeks untuk tabel `vouchers`
--
ALTER TABLE `vouchers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `vouchers_code_unique` (`code`);

--
-- Indeks untuk tabel `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `wishlist_user_id_product_id_unique` (`user_id`,`product_id`),
  ADD KEY `wishlist_product_id_foreign` (`product_id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT untuk tabel `bank_accounts`
--
ALTER TABLE `bank_accounts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `brands`
--
ALTER TABLE `brands`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT untuk tabel `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT untuk tabel `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `discounts`
--
ALTER TABLE `discounts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT untuk tabel `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT untuk tabel `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT untuk tabel `otps`
--
ALTER TABLE `otps`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT untuk tabel `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT untuk tabel `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT untuk tabel `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT untuk tabel `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT untuk tabel `product_ratings`
--
ALTER TABLE `product_ratings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `shipments`
--
ALTER TABLE `shipments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT untuk tabel `vouchers`
--
ALTER TABLE `vouchers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `bank_accounts`
--
ALTER TABLE `bank_accounts`
  ADD CONSTRAINT `bank_accounts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `carts_voucher_id_foreign` FOREIGN KEY (`voucher_id`) REFERENCES `vouchers` (`id`) ON DELETE SET NULL;

--
-- Ketidakleluasaan untuk tabel `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_cart_id_foreign` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `discounts`
--
ALTER TABLE `discounts`
  ADD CONSTRAINT `discounts_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_address_id_foreign` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_voucher_id_foreign` FOREIGN KEY (`voucher_id`) REFERENCES `vouchers` (`id`) ON DELETE SET NULL;

--
-- Ketidakleluasaan untuk tabel `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `otps`
--
ALTER TABLE `otps`
  ADD CONSTRAINT `otps_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_brand_id_foreign` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;

--
-- Ketidakleluasaan untuk tabel `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `product_ratings`
--
ALTER TABLE `product_ratings`
  ADD CONSTRAINT `product_ratings_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_ratings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `shipments`
--
ALTER TABLE `shipments`
  ADD CONSTRAINT `shipments_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `wishlist_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `wishlist_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
