<?php

namespace App\Listeners;

use App\Events\UserDeactivatedEvent;
use App\Models\User;
use App\Notifications\UserDeactivatedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Notification;

class UserDeactivatedListener
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
    public function handle(UserDeactivatedEvent $event): void
    {
        $admins = User::all();

        Notification::send($admins, new UserDeactivatedNotification($event->user));
    }
}
