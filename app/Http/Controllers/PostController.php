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

    public function get(Request $request) {
        $token = $request['token'];
        $user = $this->getUser($token);
        $posts = $user->posts()->orderBy('created_at', 'desc')->get();

        return response()->json($posts);
    }

    public function store(Request $request)
    {
        $token = $request['token'];
        $user = $this->getUser($token);
        $post = Post::create([
            'content' => $request['content'],
            'user_id' => $user->id
        ]);

        return response()->json($post);
    }

    public function delete($id)
    {
        Post::destroy($id);

        return response()->json("ok");
    }

    public function up(Request $request, $id)
    {
        $post = Post::find($id);
        $post->content = $request['content'];

        $post->save();

        return response()->json($post);
    }

    public function update(Request $request, $id) {
        // $post = Post::find($id)->update(['content' => $request['content']]);
        $post = [
            'content' => $request['content'],
            'requestid' => $request['id'],
            'id' => $id,
            'c' => $request->input('content')
        ];

        return response()->json($post);
    }

    private function getUser(String $token) {
        return User::where('token', '=', $token)->firstOrFail();
    }
}
