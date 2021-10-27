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
    }

    public function store(CategoryCreateRequest $request) {
        $category = new Category();
        $category->name = ucwords(strtolower($request->name));
        $category->save();

        return $this->apiResponse("$request->name category is created", $category, Response::HTTP_OK, true);
    }
}
