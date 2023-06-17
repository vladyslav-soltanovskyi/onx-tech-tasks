<?php

namespace App\Listeners;

use App\Events\CarAssignedEvent;
use App\Models\User;
use App\Notifications\CarAssignedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Notification;

class CarAssignedListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(CarAssignedEvent $event): void
    {
        $admins = User::where('role_id', 1)->get();

        Notification::send($admins, new CarAssignedNotification($event->client, $event->car));
        $event->client->notify(new CarAssignedNotification($event->client, $event->car));
    }
}
