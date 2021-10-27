<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;
use App\Http\Requests\KulfiCreateRequest;
use App\Kulfi;
use App\Traits\CommonApiResponse;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Controllers\CategoryController;
use App\Http\Requests\UpdateKulfiRequest;
use Illuminate\Support\Facades\Auth;

class KulfiController extends Controller {
    use CommonApiResponse;


    public function index() {
        $kulfis = Kulfi::all();
        $reviews = [];
        foreach ($kulfis as $kulfi) {
            $kulfi->categories;
            $reviews[] = $this->getReviewAerage($kulfi->reviews);;
        }
        return $this->apiResponse('Getting all kulfis', ['kulfis' => $kulfis, 'reviews' => $reviews], Response::HTTP_OK, true);
    }

    public function show($id) {
        $kulfi = Kulfi::findOrFail($id);
        $kulfi->categories;
        $kulfi->comments;
        $reviews = $this->getReviewAerage($kulfi->reviews);
        foreach ($kulfi->comments as $comment) {
            $comment->user;
        }
        return $this->apiResponse('Get a kulfi', ['kulfi' => $kulfi, 'reviews' => $reviews], Response::HTTP_OK, true);
    }

    public function create(KulfiCreateRequest $request) {
        $kulfi = new Kulfi();
        $kulfi->name = ucwords(strtolower($request->name));
        $kulfi->description = $request->description;
        $kulfi->price = json_decode($request->price);
        $kulfi->image = $request->image->store('images', 'public');
        $kulfi->save();
        $kulfi->categories()->attach(array_map(function ($v) {
            return (int) $v;
        }, explode(",", $request->categories)));

        return $this->apiResponse("$request->name is added Successfully", $kulfi, Response::HTTP_OK, true);
    }

    public function getKulfiToUpdate($id) {
        $kulfi = Kulfi::findOrFail($id);
        $kulfi->categories;
        $categories = CategoryController::getAllCategories();
        $data = ['kulfi' => $kulfi, 'categories' => $categories];
        return $this->apiResponse('Getting a kulfi', $data, Response::HTTP_OK, true);
    }

    public function update(UpdateKulfiRequest $request, $id) {
        $kulfi = Kulfi::findOrFail($id);
        // dd($request->image);
        $kulfi->update([
            'name' => ucwords(strtolower($request->name)),
            'description' => $request->description,
            'price' => json_decode($request->price),
        ]);
        if ($request->image !== null && gettype($request->image) !== 'string') {
            $image_path = public_path('storage/') . $kulfi->image;
            if (\File::exists($image_path)) {
                \File::delete($image_path);
            }
            $kulfi->update([
                'image' => $request->image->store('images', 'public'),
            ]);
        }
        $kulfi->categories()->sync(array_map(function ($v) {
            return (int) $v;
        }, explode(",", $request->categories)));

        return $this->apiResponse("Kulfi is updated Successfully", $kulfi, Response::HTTP_OK, true);
    }

    public function destroy($id) {
        $kulfi = Kulfi::findOrFail($id);
        $image_path = public_path('storage/') . $kulfi->image;
        if (\File::exists($image_path)) {
            \File::delete($image_path);
        }
        $kulfi->delete();
        $kulfi->categories()->detach();
        return $this->apiResponse("$kulfi->name is deleted", null, Response::HTTP_OK, true);
    }

    public function getReviewAerage($reviews) {
        $ratings = [];
        foreach ($reviews as $review) {
            $ratings[] = (int)$review->rating;
        }
        if (count($ratings) !== 0) {
            return ['total' => array_sum($ratings), 'count' => count($ratings), 'avg' => round(array_sum($ratings) / count($ratings), 2)];
        } else {
            return ['total' => 0, 'count' => 0, 'avg' => 0];
        }
    }
}
