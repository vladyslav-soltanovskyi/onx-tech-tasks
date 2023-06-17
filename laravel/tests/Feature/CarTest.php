<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CarTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_car_crud()
    {
        // Create
        $response = $this->post("/api/cars", [
            'brand' => 'Audi',
            'model' => 'A6',
            'year' => 2015,
            'color' => 'black'
        ]);

        $response->assertStatus(201); // Check if the car was successfully created

        $carId = $response->json('id');

        // Read
        $response = $this->get("/api/cars/$carId");
        $response->assertStatus(200); // Check if the car details are correctly displayed

        // Update
        $response = $this->put("/api/cars/$carId", [
            'make' => 'Honda',
            'model' => 'Accord'
        ]);

        $response->assertStatus(200); // Check if the car was successfully updated

        // Delete
        $response = $this->delete("/api/cars/$carId");
        $response->assertStatus(204); // Check if the car was successfully deleted
    }
}
