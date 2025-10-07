<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Entry Level', 'description' => 'Jam tangan terjangkau untuk pemula.'],
            ['name' => 'Mid Range', 'description' => 'Jam tangan kelas menengah dengan kualitas tinggi.'],
            ['name' => 'Luxury', 'description' => 'Jam tangan mewah dengan desain elegan dan presisi tinggi.'],
            ['name' => 'Ultra Luxury', 'description' => 'Jam tangan eksklusif dari brand premium dunia.'],
        ];

        foreach ($categories as $category) {
            Category::create([
                'name' => $category['name'],
                'slug' => Str::slug($category['name']),
                'description' => $category['description'],
            ]);
        }
    }
}
