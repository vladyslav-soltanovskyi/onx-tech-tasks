<?php

namespace App\Http\Controllers;

use App\Events\UserDeactivatedEvent;
use App\Http\Requests\SignInRequest;
use App\Http\Requests\SignUpRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->only(['getUser', 'signOut']);
    }

    public function signIn(SignInRequest $request) {
        if (!Auth::attempt($request->validated())) {
            return response()->json([
                'message' => 'Invalid singin data'
            ], 401);
        }

        $token = $request->user()->createToken('api-token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $request->user()

        ]);
    }

    public function signUp(SignUpRequest $request) {
        $user = User::create($request->validated());

        Auth::attempt($request->validated());

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user
        ]);
    }

    public function getUser(Request $request) {
        return response()->json($request->user());
    }

    public function signOut(Request $request) {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        event(new UserDeactivatedEvent($user));

        return response()->json([
            'message' => 'User successfully logout'
        ]);
    }
}
