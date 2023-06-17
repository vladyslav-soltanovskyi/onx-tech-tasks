<?php

namespace App\Http\Controllers;

use App\Events\UserDeactivatedEvent;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function signout(Request $request) {
        $userId = $request->input('user_id');
        $user = User::find($userId);

        if (!$user) {
            return response('User not found', 404);
        }

        $user->remember_token = null;
        $user->save();
        event(new UserDeactivatedEvent($user));

        return response('User successfully signout');
    }
}
