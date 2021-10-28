<?php

namespace App\Http\Controllers;

use App\Category;
use App\Http\Requests\CategoryCreateRequest;
use App\Traits\CommonApiResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CategoryController extends Controller {
    use CommonApiResponse;


    public static function getAllCategories() {
        $categories = Category::all();
        $data = [];
        foreach ($categories as $category) {
            $data[] = ["value" => $category->id, "label" => $category->name];
        }
        return $data;
    }

    public function index() {
        $categories = $this->getAllCategories();
        return $this->apiResponse('All category', $categories, Response::HTTP_OK, true);
    }

    public function show($id) {
        $category = Category::findOrFail($id);
        $reviews = [];
        foreach ($category->kulfis as $kulfi) {
            $reviews[] = KulfiController::getReviewAerage($kulfi->reviews);;
        }
        return $this->apiResponse('Getting all kulfis', ['category' => $category, 'kulfis' => $category->kulfis, 'reviews' => $reviews], Response::HTTP_OK, true);
    }

    public function store(CategoryCreateRequest $request) {
        $category = new Category();
        $category->name = ucwords(strtolower($request->name));
        $category->save();

        return $this->apiResponse("$request->name category is created", $category, Response::HTTP_OK, true);
    }

    public function getCategoryToUpdate($id) {
        $category = Category::findOrFail($id);
        return $this->apiResponse('get a category', $category, Response::HTTP_OK, true);
    }

    public function update(CategoryCreateRequest $request, $id) {
        $category = Category::findOrFail($id);
        $category->update([
            'name' => $request->name,
        ]);
        return $this->apiResponse("Category is updated", null, Response::HTTP_OK, true);
    }

    public function destroy($id) {
        $category = Category::findOrFail($id);
        $category->delete();
        $category->kulfis()->detach();
        return $this->apiResponse("Category is deleted", null, Response::HTTP_OK, true);
    }
}
