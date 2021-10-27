<?php

namespace App\Http\Controllers;

use App\Comment;
use App\Http\Requests\CommentRequest;
use App\Kulfi;
use App\Traits\CommonApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CommentController extends Controller {
    use CommonApiResponse;

    public function store(CommentRequest $request) {
        $kulfi = Kulfi::findOrFail($request->kulfiId);
        $comment = Comment::create([
            'kulfi_id' => $kulfi->id,
            'user_id' => Auth::id(),
            'body' => $request->body
        ]);
        $comment->user;
        return $this->apiResponse('Comment Added', $comment, Response::HTTP_OK, true);
    }

    public function destroy($id) {
        $comment = Comment::findOrFail($id);
        if ($comment->user->id === Auth::id()) {
            $comment->delete();
            return $this->apiResponse('Comment is deleted', null, Response::HTTP_OK, true);
        }
        return $this->apiResponse('Unauthrized Action', null, Response::HTTP_UNAUTHORIZED, false);
    }
}
