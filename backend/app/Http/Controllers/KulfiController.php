<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Category;
use App\Http\Requests\KulfiCreateRequest;
use App\Kulfi;
use App\Traits\CommonApiResponse;
use Symfony\Component\HttpFoundation\Response;
// use Symfony\Component\HttpFoundation\File\UploadedFile;

class KulfiController extends Controller {
    use CommonApiResponse;


    public function index() {
        $kulfis = Kulfi::all();
        return $this->apiResponse('send all kulfis', $kulfis, Response::HTTP_OK, true);
    }

    public function show($id) {
        $kulfi = Kulfi::findOrFail($id);
        return $this->apiResponse('send a kulfi', $kulfi, Response::HTTP_OK, true);
    }

    // public function create() {
    //     $categories = Category::all();
    //     return view('kulfis.create', compact('categories'));
    // }

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

    public function get_kulfi($id) {
        $kulfi = Kulfi::findOrFail($id);
        $categories = Category::all();
        $kulfiCategoriesId = [];
        foreach ($kulfi->categories as $category) {
            $kulfiCategoriesId[] = $category->id;
        }
        return view('kulfis.edit', compact('kulfi', 'categories', 'kulfiCategoriesId'));
    }

    public function update($id) {
        $kulfiData = request()->validate([
            'name' => 'required|ends_with:kulfi',
            'price' => 'required|gte:10',
        ]);
        $categoryData = request()->validate([
            'categories' => 'required',
        ]);

        $kulfi = Kulfi::findOrFail($id);
        $kulfi->update([
            'name' => request()->name,
            'price' => request()->price,
        ]);
        if (request()->image !== null) {
            $image_path = public_path('storage/') . $kulfi->image;
            if (\File::exists($image_path)) {
                \File::delete($image_path);
            }
            $kulfi->update([
                'image' => request()->image->store('uploadImages', 'public'),
            ]);
        }
        $kulfi->categories()->sync($categoryData['categories']);
        return redirect(route('kulfis.show', $kulfi->id));
    }

    public function destroy($id) {
        $kulfi = Kulfi::findOrFail($id);
        $image_path = public_path('storage/') . $kulfi->image;
        if (\File::exists($image_path)) {
            \File::delete($image_path);
        }
        $kulfi->delete();
        $kulfi->categories()->detach();
        return redirect(route('kulfis.index'));
    }
}
