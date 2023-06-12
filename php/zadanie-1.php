<?php

class Pipeline {
  public function make(...$funcs) {
    return function ($val) use ($funcs) {
      $res = $val;

      foreach ($funcs as $callback) {
        $res = $callback($res);
      }

      return $res;
    };
  }
}

$instanse = new Pipeline();

$callback = $instanse->make(
  fn($val) => $val * 3,
  fn($val) => $val + 1,
  fn($val) => $val / 2
);

var_dump($callback(3));