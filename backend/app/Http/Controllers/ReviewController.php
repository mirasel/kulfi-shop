<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReviewRequest;
use App\Kulfi;
use App\Review;
use App\Traits\CommonApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class ReviewController extends Controller {
    use CommonApiResponse;

    public function store(ReviewRequest $request) {
        $review = Review::where(['kulfi_id' => json_decode($request->kulfiId), 'user_id' => Auth::id()])->first();
        if ($review === null) {
            $kulfi = Kulfi::findOrFail(json_decode($request->kulfiId));
            $newReview = Review::create([
                'kulfi_id' => $kulfi->id,
                'user_id' => Auth::id(),
                'rating' => json_decode($request->rating)
            ]);
            $newReview->user;
            return $this->apiResponse('Review is saved', $newReview, Response::HTTP_OK, true);
        } else {
            $review->update([
                'rating' => $request->rating
            ]);
            $review->user;
            return $this->apiResponse('Review is saved', $review, Response::HTTP_OK, true);
        }
    }

    public function show($id) {
        $review = Review::where(['kulfi_id' => $id, 'user_id' => Auth::id()])->first();
        if ($review === null) {
            return $this->apiResponse('Review is sent', ['rating' => 0], Response::HTTP_OK, true);
        } else {
            return $this->apiResponse('Review is saved', $review, Response::HTTP_OK, true);
        }
    }

    public function destroy(Request $request) {
        $review = Review::where(['kulfi_id' => json_decode($request->kulfiId), 'user_id' => Auth::id()])->first();
        if ($review !== null) {
            $review->delete();
            return $this->apiResponse('Review is removed', null, Response::HTTP_OK, true);
        }
        return $this->apiResponse('Review is not found', null, Response::HTTP_NOT_FOUND, false);
    }
}
