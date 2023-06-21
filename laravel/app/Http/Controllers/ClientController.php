<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateClientRequest;
use App\Http\Requests\EditClientRequest;
use Illuminate\Http\Request;
use App\Models\Client;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $collection = Client::query();

        $allowedFilterFields = (new Client())->getFillable();
        $allowedSortFields = ['id', ...$allowedFilterFields];
        $allowedSortDirections = ['asc', 'desc'];

        //?sortBy=name&orderBy=desc
        $sortBy = $request->query('sortBy', 'id');
        $orderBy = strtolower($request->query('orderBy', 'asc'));

        if(!in_array($sortBy, $allowedSortFields)) $sortBy = $allowedSortFields[0];
        if(!in_array($orderBy, $allowedSortDirections)) $sortBy = $allowedSortDirections[0];

        $collection->orderBy($sortBy, $orderBy);

        //?query=John
        $querySearch = $request->query('query');

        if (!!$querySearch) {
            foreach($allowedFilterFields as $key){
                $querySearch = preg_replace("#([%_?+])#","\\$1",$querySearch);
                $collection->orWhere($key, 'LIKE', '%'.$querySearch.'%');
            }
        }

        $totalItems = $collection->count();
        //?limit=20
        $limit = intval($request->query('limit', 20));
        $limit = max(1, min($limit, 1000));
        $collection->limit($limit);

        //?offset=0
        $offset = intval($request->query('offset', 0));
        $offset = max($offset, 0);
        $collection->offset($offset);

        $items = $collection->get();

        return response([
            'total_items' => $totalItems,
            'data' => $items
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateClientRequest $request)
    {
        $requestData = $request->only(['name', 'surname', 'employee_id', 'email', 'address']);
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
    public function update(EditClientRequest $request, string $id)
    {
        $requestData = $request->only(['name', 'surname', 'employee_id', 'email', 'address']);
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
