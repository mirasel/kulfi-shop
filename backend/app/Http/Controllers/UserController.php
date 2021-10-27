<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginFormRequest;
use App\Http\Requests\RegistrationFormRequest;
use App\Http\Requests\ResetEmailLinkFormRequest;
use App\Http\Requests\ResetPasswordFormRequest;
use App\Jobs\ResetPasswordJob;
use App\Jobs\VerifyEmailJob;
use App\Mail\VerifyEmail;
use App\Review;
use App\Traits\CommonApiResponse;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller {
    use CommonApiResponse;

    public function __construct() {
        Auth::shouldUse('api');
    }

    public function register(RegistrationFormRequest $request) {
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->save();

        $credentials = $request->only('email', 'password');
        JWTAuth::factory()->setTTL(10080);
        $token  = JWTAuth::attempt($credentials);
        $encryptedToken = bcrypt($token);
        $user->setVerifyToken($encryptedToken);

        $url = $this->verifyUrl($user, $encryptedToken);

        VerifyEmailJob::dispatch($user, $url);

        $data = ['access_token' => $token, 'user' => Auth::user()];

        return $this->apiResponse('Registration Successful', $data, Response::HTTP_OK, true);
    }

    public function login(LoginFormRequest $request) {
        $input = $request->only('email', 'password');
        JWTAuth::factory()->setTTL(10080);

        $token = JWTAuth::attempt($input);
        if (!$token) {
            return $this->apiResponse("Login Failed", null, Response::HTTP_UNAUTHORIZED, false, "This credentials doesn't match our records");
        }

        $data = [
            'access_token' => $token,
            'user' => Auth::user(),
        ];

        return $this->apiResponse('Login Successful', $data, Response::HTTP_OK, true);
    }

    public function logout() {
        if (Auth::check()) {
            $token = Auth::getToken();
            JWTAuth::setToken($token);
            JWTAuth::invalidate();
            Auth::logout();
            return $this->apiResponse('Logout Successful', null, Response::HTTP_OK, true);
        } else {
            return $this->apiResponse('Logout Error', null, Response::HTTP_UNAUTHORIZED, false);
        }
    }

    public function verify(Request $request, $id) {
        $user = User::findOrFail($id);
        // dd($request->token, $user->getVerifyToken());
        if ($request->token != $user->getVerifyToken()) {
            return $this->apiResponse('Verify Error', null, Response::HTTP_UNAUTHORIZED, false);
        }
        if (Carbon::now()->getTimestamp() > $request->expire) {
            return $this->apiResponse('This Link is no longer valid', null, Response::HTTP_UNAUTHORIZED, false);
        }

        $user->markEmailAsVerified();
        $user->setVerifyToken();
        return redirect()->away(env('APP_FRONTEND_URL') . "/verified/$user->id");
        // return $this->apiResponse('verification Successful', null, Response::HTTP_OK, true);
    }

    public function verifyResend() {
        if (Auth::check()) {
            $token = Auth::getToken();
            $encryptedToken = bcrypt($token);
            $user = User::findOrFail(Auth::id());
            $user->setVerifyToken($encryptedToken);
            $url = $this->verifyUrl($user, $encryptedToken);

            VerifyEmailJob::dispatch($user, $url);
            return $this->apiResponse('A fresh verification link has been sent to your email address.', null, Response::HTTP_OK, true);
        } else {
            return $this->apiResponse("", null, Response::HTTP_UNAUTHORIZED, false, "Verification Resend Failed");
        }
    }

    protected function verifyUrl($user, $token) {
        return route(
            'verify',
            [
                'id' => $user->getJWTIdentifier(),
                'expire' => Carbon::now()->addMinutes(Config::get('auth.verification.expire'))->getTimestamp(),
                'token' => $token
            ]
        );
    }

    public function sendResetPasswordLink(ResetEmailLinkFormRequest $request) {
        //
        $token = Str::random(64);
        DB::table('password_resets')->where(['email' => $request->email])->delete();
        DB::table('password_resets')->insert([
            'email' => $request->email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);

        $url = env('APP_FRONTEND_URL') . "/password/reset/$token?email=" . rawurlencode($request->email);

        ResetPasswordJob::dispatch($request->email, $url);

        return $this->apiResponse('We have e-mailed your password reset link!', null, Response::HTTP_OK, true);
    }

    public function resetPassword(ResetPasswordFormRequest $request) {
        //
        $updatePassword = DB::table('password_resets')
            ->where([
                'email' => $request->email,
                'token' => $request->token
            ])
            ->first();
        if (!$updatePassword) {
            return $this->apiResponse('Unauthorized Request', null, Response::HTTP_UNAUTHORIZED, false);
        }
        if (Carbon::now()->diffInMinutes($updatePassword->created_at) > Config::get('auth.passwords.users.expire')) {
            return $this->apiResponse('Reset Password Link Expired', null, Response::HTTP_UNAUTHORIZED, false);
        }

        $user = User::where('email', $request->email)
            ->update(['password' => Hash::make($request->password)]);

        DB::table('password_resets')->where(['email' => $request->email])->delete();
        return $this->apiResponse('Password Reset successfully', null, Response::HTTP_OK, true);
    }

    public function test() {
        $review = Review::where(['kulfi_id' => 17, 'user_id' => 2])->first();
        dd($review === null);
    }
}
