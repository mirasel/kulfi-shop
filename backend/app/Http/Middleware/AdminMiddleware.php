<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware {
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next) {
        if (Auth::check()) {
            if (Auth::user()->isAdmin) {
                return $next($request);
            } else {
                return redirect()->away(env('APP_FRONTEND_URL') . '/denied');
            }
        } else {
            return redirect(route('login'));
        }
    }
}
