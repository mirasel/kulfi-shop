<?php

namespace App\Http\Requests;

use App\Traits\CommonApiResponse;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Symfony\Component\HttpFoundation\Response;

class UpdateKulfiRequest extends FormRequest {
    use CommonApiResponse;
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize() {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules() {
        return [
            'name' => 'required|min:3',
            'description' => 'required|min:3',
            'price' => 'required|numeric',
            'categories' => 'required',
        ];
    }

    public function failedValidation(Validator $validator) {
        throw new HttpResponseException($this->apiResponse('Updating the Kulfi Failed', null, Response::HTTP_UNPROCESSABLE_ENTITY, false, $validator->errors()));
    }
}
