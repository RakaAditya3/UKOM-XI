<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;
use App\Models\Brand;
use App\Models\ProductImage;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::all()->keyBy('name');
        $brands = Brand::all()->keyBy('name');

        $products = [
            'Entry Level' => [
                ['Casio MTP-V002D', 'Casio', 450000],
                ['Timex Easy Reader', 'Timex', 650000],
                ['Q&Q Analog Classic', 'Q&Q', 350000],
                ['Seiko 5 SNK809', 'Seiko', 1200000],
                ['Swatch Originals Gent', 'Swatch', 980000],
            ],
            'Mid Range' => [
                ['Citizen Eco-Drive BM7100', 'Citizen', 2800000],
                ['Seiko Presage SRPB43', 'Seiko', 3500000],
                ['Orient Bambino Gen 2', 'Orient', 2500000],
                ['Tissot PRX Quartz', 'Tissot', 5500000],
                ['Bulova Classic Automatic', 'Bulova', 4800000],
            ],
            'Luxury' => [
                ['TAG Heuer Carrera', 'TAG Heuer', 55000000],
                ['Omega Seamaster Diver 300M', 'Omega', 80000000],
                ['Longines Master Collection', 'Longines', 42000000],
                ['Montblanc 1858 Automatic', 'Montblanc', 47000000],
                ['Rado Captain Cook', 'Rado', 39000000],
            ],
            'Ultra Luxury' => [
                ['Rolex Submariner Date', 'Rolex', 180000000],
                ['Audemars Piguet Royal Oak', 'Audemars Piguet', 380000000],
                ['Patek Philippe Nautilus', 'Patek Philippe', 520000000],
                ['Vacheron Constantin Overseas', 'Vacheron Constantin', 470000000],
                ['Richard Mille RM 11-03', 'Richard Mille', 1800000000],
            ],
        ];

        foreach ($products as $categoryName => $items) {
            $category = $categories[$categoryName];

            foreach ($items as [$name, $brandName, $price]) {
                $brand = $brands[$brandName];

                $product = Product::create([
                    'category_id' => $category->id,
                    'brand_id' => $brand->id,
                    'name' => $name,
                    'slug' => Str::slug($name),
                    'description' => "Jam tangan {$brandName} dari kategori {$categoryName}.",
                    'price' => $price,
                    'stock' => rand(1, 20),
                    'is_active' => true,
                ]);

                ProductImage::create([
                    'product_id' => $product->id,
                    'image_url' => "https://placehold.co/600x600?text=" . urlencode($brandName),
                    'is_main' => true,
                ]);
            }
        }
    }
}
