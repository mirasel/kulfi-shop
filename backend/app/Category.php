<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model {
    //if want to override table name
    // protected $table = 'some_name'

    //fillable example
    // protected $fillable = ['name','price'];

    protected $guarded = [];

    public function kulfis() {
        return $this->belongsToMany(Kulfi::class)->withTimestamps();
    }
}
