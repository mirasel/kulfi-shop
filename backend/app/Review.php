<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Review extends Model {
    protected $guarded = [];

    public function post() {
        return $this->belongsTo(Kulfi::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
