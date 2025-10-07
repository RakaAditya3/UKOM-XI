<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Brand;
use Illuminate\Support\Str;

class BrandSeeder extends Seeder
{
    public function run(): void
    {
        $brands = [
            'Casio', 'Timex', 'Q&Q', 'Seiko', 'Swatch',
            'Citizen', 'Orient', 'Tissot', 'Bulova',
            'TAG Heuer', 'Omega', 'Longines', 'Montblanc', 'Rado',
            'Rolex', 'Audemars Piguet', 'Patek Philippe', 'Vacheron Constantin', 'Richard Mille'
        ];

        foreach ($brands as $brand) {
            Brand::create([
                'name' => $brand,
                'slug' => Str::slug($brand),
                'description' => "Jam tangan dari brand {$brand} dengan reputasi tinggi.",
            ]);
        }
    }
}
