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
        $clients = Client::with(['employee', 'cars'])->get();

        $data = [];

        foreach ($clients as $client) {
            $orders = $client->orders()
                ->orderBy('created_at', 'desc')
                ->with('orderedProducts.product')
                ->limit(3)
                ->get();

            $client = $client->toArray();
            $client['orders'] = $orders;

            $data[] = $client;
        }

        return $data;
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

        return response($client);
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
