<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class EmployeeTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_employee_crud()
    {
        // Create
        $response = $this->post("/api/employees", [
            'name' => 'Michal',
            'surname' => 'Mazur'
        ]);

        $response->assertStatus(201); // Check if the employee was successfully created

        $employeeId = $response->json('id');

        // Read
        $response = $this->get("/api/employees/$employeeId");
        $response->assertStatus(200); // Check if the employee details are correctly displayed

        // Update
        $response = $this->put("/api/employees/$employeeId", [
            'name' => 'Miłosz'
        ]);

        $response->assertStatus(200); // Check if the employee was successfully updated

        // Delete
        $response = $this->delete("/api/employees/$employeeId");
        $response->assertStatus(204); // Check if the employee was successfully deleted
    }
}
