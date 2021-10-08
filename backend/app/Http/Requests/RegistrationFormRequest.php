<?php

namespace App\Http\Requests;

use App\Traits\CommonApiResponse;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Symfony\Component\HttpFoundation\Response;

class RegistrationFormRequest extends FormRequest {
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
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8|confirmed'
        ];
    }

    protected function failedValidation(Validator $validator) {
        throw new HttpResponseException($this->apiResponse('Registation Failed', null, Response::HTTP_UNPROCESSABLE_ENTITY, false, $validator->errors()));
    }
}
