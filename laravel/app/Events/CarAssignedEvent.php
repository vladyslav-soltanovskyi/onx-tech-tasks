<?php

namespace App\Events;

use App\Models\Car;
use App\Models\Client;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class CarAssignedEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $client;
    public $car;
    /**
     * Create a new event instance.
     */
    public function __construct(Client $client, Car $car)
    {
        $this->client = $client;
        $this->car = $car;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('channel-name'),
        ];
    }
}
