<?php
  /* Script to fetch images from the gallery folder, which can be sent
  the client for showing in the SlideShow
  */
  if (array_key_exists('page', $_GET)) {
    $page = filter_input(INPUT_GET, 'page', FILTER_SANITIZE_STRING);
    // Gallery dir contains subdir which corresponds to the requested page
    // variable. All image files with the png or jpeg extension are retrieved
    $real_path = realpath('.') . '/' . $page . '/';
    // if Directory not exists, just return empty array and exit.
    if (!is_dir($real_path)) {
      echo '{"imageFiles": []}';
      return;
    }
    $dir_contents = scandir($real_path);
    $images = $dir_contents ? array_filter($dir_contents, function($x){
      $file_info = pathinfo($x);
      if (array_key_exists('extension', $file_info)) {
        $extension = strtolower($file_info['extension']);
        return $extension === 'jpg' || $extension === 'png' || $extension === 'jpeg';
      }
      return false;
    }) : [];
    $imagesWithFullPath = array_map(function($file) use($page) {
      return "\"" . 'gallery/' . $page . '/' .$file . "\"";
    }, $images );
  }
  echo '{"imageFiles": [' . implode($imagesWithFullPath, ',') . ']}';
 ?>
