<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model {
    protected $guarded = [];

    public function kulfi() {
        return $this->belongsTo(Kulfi::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
