<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Client;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Client::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $requestData = $request->only(['name', 'surname', 'employee_id']);
        $newClient = Client::create($requestData);

        return response($newClient, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $client = Client::find($id);

        if (!$client) {
            return response(['message' => 'Client not Found'], 404);
        }

        $orders = $client->orders()
                ->orderBy('created_at', 'desc')
                ->with('orderedProducts.product')
                ->limit(3)
                ->get();

        $client['cars'] = $client->cars;
        $client['employee'] = $client->employee;
        $client['orders'] = $orders;

        return response($client, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $requestData = $request->only(['name', 'surname', 'employee_id']);
        $client = Client::find($id);

        if (!$client) {
            return response(['message' => 'Client not Found'], 404);
        }

        foreach ($requestData as $key => $data) {
            $client->$key = $data;
        }

        $client->save();

        return response($client);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $client = Client::find($id);

        if (!$client) {
            return response(['message' => 'Client not Found'], 404);
        }

        $client->delete();

        return response('', 204);
    }
}
