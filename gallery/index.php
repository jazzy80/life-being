<?php
  if (array_key_exists('page', $_GET)) {
    $real_path = realpath('.') . '/' . $_GET['page'] . '/';
    $images = array_filter(scandir($real_path), function($x){
      $file_info = pathinfo($x);
      $extension = strtolower($file_info['extension']);
      $valid_extension = $extension == 'jpg' || $extension == 'png';
      return $valid_extension;
    });
    $imagesWithFullPath = array_map(function($file) {
      return "\"" . 'gallery/' . $_GET['page'] . '/' .$file . "\"";
    }, $images );
  }
  echo '{"imageFiles": [' . implode($imagesWithFullPath, ',') . ']}';
 ?>
