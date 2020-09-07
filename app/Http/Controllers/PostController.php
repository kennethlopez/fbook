<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Post;

class PostController extends Controller
{
     public function index()
    {
        return view('posts');
    }

    public function store(Request $request)
    {
        $token = $request['token'];
        $user = $this->getUser($token);
        $post = Post::create([
            'content' => strip_tags($request['content']),
            'user_id' => $user->id
        ]);

        return response()->json($post);
    }

    public function delete($id)
    {
        Post::destroy($id);

        return response()->json("ok");
    }

    private function getUser(String $token) {
        return User::where('token', '=', $token)->firstOrFail();
    }
}
