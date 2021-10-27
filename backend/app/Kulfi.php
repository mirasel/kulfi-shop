<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Kulfi extends Model {
    //if want to override table name
    // protected $table = 'some_name'

    //fillable example
    // protected $fillable = ['name','price'];

    protected $guarded = [];

    public function categories() {
        return $this->belongsToMany(Category::class)->withTimestamps();
    }

    public function comments() {
        return $this->hasMany(Comment::class);
    }

    public function reviews() {
        return $this->hasMany(Review::class);
    }
}
