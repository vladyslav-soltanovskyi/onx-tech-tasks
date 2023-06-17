<?php

namespace App\Http\Controllers;

use App\Models\Car;
use App\Models\Client;
use Illuminate\Http\Request;

class CarController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Car::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function store(Request $request)
    {
        $requestData = $request->only(['model', 'brand', 'color', 'year']);
        $newCar = Car::create($requestData);

        return response($newCar, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $car = Car::find($id);

        if (!$car) {
            return response(['message' => 'Car not Found'], 404);
        }

        return response($car);
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
        $requestData = $request->only(['model', 'brand', 'color', 'year']);
        $car = Car::find($id);

        if (!$car) {
            return response(['message' => 'Car not Found'], 404);
        }

        foreach ($requestData as $key => $data) {
            $car->$key = $data;
        }

        $car->save();

        return response($car);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $car = Car::find($id);

        if (!$car) {
            return response(['message' => 'Car not Found'], 404);
        }

        $car->delete();

        return response('', 204);
    }

    public function assign(Request $request)
    {
        $clientId = $request->input('client_id');
        $carId = $request->input('car_id');

        $user = Client::find($clientId);

        $isUsed = $this->verify($request)['status'];

        if (!$isUsed) {
            $user->cars()->attach($carId, ['start_time' => now()]);
        }

        return ['status' => !$isUsed];
    }

    public function verify(Request $request)
    {
        $clientId = $request->input('client_id');
        $carId = $request->input('car_id');

        $user = Client::find($clientId);
        $givenTime = now();

        $usage = $user->cars()->where('car_id', $carId)
            ->where('start_time', '<=', $givenTime)
            ->where(function ($query) use ($givenTime) {
                $query->where('end_time', '>=', $givenTime)
                    ->orWhereNull('end_time');
            })
            ->exists();

        return ['status' => !!$usage];
    }
}
