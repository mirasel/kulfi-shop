<?php

namespace App\Http\Requests;

use App\Traits\CommonApiResponse;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Symfony\Component\HttpFoundation\Response;

class ResetEmailLinkFormRequest extends FormRequest {

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
            'email' => 'required|email|exists:users'
        ];
    }

    protected function failedValidation(Validator $validator) {
        throw new HttpResponseException($this->apiResponse('Send password reset link failed', null, Response::HTTP_UNPROCESSABLE_ENTITY, false, $validator->errors()));
    }
}