<?php

namespace App\Http\Middleware;

use Illuminate\Support\Facades\Auth;
use Closure;

class UserVerifiedMiddleware {
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next) {
        if (Auth::check()) {
            if (Auth::user()->email_verified_at !== null) {
                return $next($request);
            } else {
                return redirect()->away(env('APP_FRONTEND_URL') . '/email/verify');
            }
        } else {
            return redirect(route('login'));
        }
    }
}
