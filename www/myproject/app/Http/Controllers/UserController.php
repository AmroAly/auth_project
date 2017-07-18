<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\SignUserInRequest;
use App\User;
use GuzzleHttp\Client;
use Validator;

class UserController extends Controller
{
    public function create(CreateUserRequest $request)
    {
        $data = $request->only('name', 'email', 'password');
        
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        return $this->sendTokens($request->only('email', 'password'));
    }


    public function signin(SignUserInRequest $request)
    {
        $credentials = [
            'email' => $request->email,
            'password' => $request->password
        ];

        if (Auth::validate($credentials)) {
            return $this->sendTokens($credentials);
        }

        return response()->json(['error_message' => 'Invalid email or password'], 401);
    }


    private function sendTokens($data)
    {
        $client = \Laravel\Passport\Client::where('password_client', 1)->first();

        $http = new Client();
        $response = $http->post('http://172.28.128.10/oauth/token', [
            'form_params' => [
                'grant_type'    => 'password',
                'client_id'     => $client->id,
                'client_secret' => $client->secret,
                'username'      => $data["email"],
                'password'      => $data["password"],
                'scope'         => '',
            ]
        ]);

        return $response;
    }
}
