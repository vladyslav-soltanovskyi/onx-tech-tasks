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
        return response()->json([
            'total_items' => Employee::count(),
            'data' => Employee::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $requestData = $request->only(['name', 'surname', 'email']);
        $newEmployee = Employee::create($requestData);

        return response()
            ->json($newEmployee, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $employee = Employee::find($id);

        if (!$employee) {
            return response()
                ->json(['message' => 'Employee not Found'], 404);
        }

        return response()
            ->json($employee);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $requestData = $request->only(['name', 'surname', 'email']);
        $employee = Employee::find($id);

        if (!$employee) {
            return response()
                ->json(['message' => 'Employee not Found'], 404);
        }

        foreach ($requestData as $key => $data) {
            $employee->$key = $data;
        }

        $employee->save();

        return response()
            ->json($employee);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $employee = Employee::find($id);

        if (!$employee) {
            return response()
                ->json(['message' => 'Employee not Found'], 404);
        }

        $employee->delete();

        return response()->json('', 204);
    }
}
