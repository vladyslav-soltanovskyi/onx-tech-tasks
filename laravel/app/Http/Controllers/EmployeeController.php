<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $requestData = $request->only(['name', 'surname']);
        $newEmployee = Employee::create($requestData);

        return response($newEmployee, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $employee = Employee::find($id);

        if (!$employee) {
            return response(['message' => 'Employee not Found'], 404);
        }

        return response($employee);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $requestData = $request->only(['name', 'surname']);
        $employee = Employee::find($id);

        if (!$employee) {
            return response(['message' => 'Employee not Found'], 404);
        }

        foreach ($requestData as $key => $data) {
            $employee->$key = $data;
        }

        $employee->save();

        return response($employee);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $employee = Employee::find($id);

        if (!$employee) {
            return response(['message' => 'Employee not Found'], 404);
        }

        $employee->delete();

        return response('', 204);
    }
}