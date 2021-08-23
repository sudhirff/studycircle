<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => ['required'],
            'email' => [
                'required',
                'email',
                'sometimes',
                Rule::unique('users')->ignore($this->user),
            ],
            'password' => ['nullable', 'required_with:cpassword', 'min:8'],
            'cpassword' => ['sometimes', 'same:password'],
            'mobile_no' => ['max:10'],
            'avatar' => ['mimes:jpg,bmp,png'],
        ];
    }
}
