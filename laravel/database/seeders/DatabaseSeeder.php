<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Car;
use App\Models\Client;
use App\Models\Employee;
use App\Models\Order;
use App\Models\OrderedProduct;
use App\Models\Product;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        Car::factory(10)->create();
        $products = Product::factory(10)->create();
        $employees = Employee::factory(3)->has(
            Client::factory(8)
        )->create();

        foreach ($employees as $employee) {
            $clients = $employee->clients;

            foreach ($clients as $client) {
                $countOrderes = rand(1, 5);

                for ($i = 0; $i < $countOrderes; $i++) {
                    $order = Order::factory()->make(['client_id' => $client->id]);
                    $client->orders()->save($order);

                    $countOrderedProducts = rand(1, 4);
                    $countProducts = count($products) - 1;
                    $fromProduct = rand(0, $countProducts);
                    $fromProduct = ($fromProduct + $countOrderedProducts > $countProducts)
                        ? $countProducts - $countOrderedProducts
                        : $fromProduct;

                    $randProducts = array_slice($products->toArray(), $fromProduct, $countOrderedProducts);

                    foreach ($randProducts as $product) {
                        $orderedProduct = OrderedProduct::factory()->make([
                            'order_id' => $order->id,
                            'product_id' => $product['id']
                        ]);

                        $order->orderedProducts()->save($orderedProduct);
                    }

                }

            }
        }
        $role = Role::factory()->create([
            'title' => 'Admin'
        ]);

        User::factory(3)->create([
            'role_id' => $role->id
        ]);

        User::factory()->create([
            'email' => 'admin@local.com',
            'role_id' => $role->id
        ]);
    }
}
