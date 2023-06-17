<?php

namespace App\Notifications;

use App\Models\Car;
use App\Models\Client;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class CarAssignedNotification extends Notification
{
    use Queueable;

    protected $client;
    protected $car;

    /**
     * Create a new notification instance.
     */
    public function __construct($client, $car)
    {
        $this->client = $client;
        $this->car = $car;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'client_id' => $this->client->id,
            'car_id' => $this->car->id,
            'message' => "Client {$this->client->name} {$this->client->surname} assigned to {$this->car->brand} {$this->car->model}"
        ];
    }
}
