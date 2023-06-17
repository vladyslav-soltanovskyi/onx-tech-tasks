<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ClientTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_client_crud()
    {
        // Create
        $response = $this->post("/api/clients", [
            'name' => 'Jan',
            'surname' => 'Nowak',
            'employee_id' => 1
        ]);

        $response->assertStatus(201); // Check if the client was successfully created

        $clientId = $response->json('id');

        // Read
        $response = $this->get("/api/clients/$clientId");
        $response->assertStatus(200); // Check if the client details are correctly displayed

        // Update
        $response = $this->put("/api/clients/$clientId", [
            'name' => 'Grzegorz',
            'employee_id' => 2
        ]);

        $response->assertStatus(200); // Check if the client was successfully updated

        // Delete
        $response = $this->delete("/api/clients/$clientId");
        $response->assertStatus(204); // Check if the client was successfully deleted
    }
}
