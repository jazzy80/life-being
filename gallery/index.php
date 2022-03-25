<?php
  /* Script to fetch images from the gallery folder, which can be sent
  the client for showing in the SlideShow
  */
  if (array_key_exists('page', $_GET)) {
    // Gallery dir contains subdir which corresponds to the requested page
    // variable. All image files with the png or jpeg extension are retrieved
    $real_path = realpath('.') . '/' . $_GET['page'] . '/';
    $dir_contents = scandir($real_path);
    $images = $dir_contents ? array_filter($dir_contents, function($x){
      $file_info = pathinfo($x);
      if (array_key_exists('extension', $file_info)) {
        $extension = strtolower($file_info['extension']);
        return $extension === 'jpg' || $extension === 'png' || $extension === 'jpeg';
      }
      return false;
    }) : [];
    $imagesWithFullPath = array_map(function($file) {
      return "\"" . 'gallery/' . $_GET['page'] . '/' .$file . "\"";
    }, $images );
  }
  echo '{"imageFiles": [' . implode($imagesWithFullPath, ',') . ']}';
 ?>
