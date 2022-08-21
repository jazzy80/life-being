<?php
  /* Script to fetch images from the gallery folder, which can be sent
  the client for showing in the SlideShow
  */
  define('DEFAULT_IMAGE_DIR', __DIR__ . '/home/');
  define('ROOT_GALLERY_URL', 'gallery');
  define('IMAGE_FILE_EXTENSIONS', ['jpg', 'jpeg', 'png']);

  function get_image_directory(string $page): string {
    // Gallery dir contains subdir which corresponds to the requested page
    // variable. All image files with the png or jpeg extension are retrieved
    $real_path = __DIR__ . '/' . $page . '/';
    // if directory not exists, just return empty array and exit.
    if (!is_dir($real_path)) {
      return DEFAULT_IMAGE_DIR;
    }
    return $real_path;
  }

  function convert_dir_to_url(string $dir): string {
    return str_replace(__DIR__, ROOT_GALLERY_URL, $dir);
  }

  function extract_images_from_dir_contents(array $dir_contents): array {
    return array_filter($dir_contents, function(string $file): bool {
      $file_info = pathinfo($file);
      if (array_key_exists('extension', $file_info)) {
        $extension = strtolower($file_info['extension']);
        return in_array($extension, IMAGE_FILE_EXTENSIONS);
      }
      return false;
    });
  }

  function get_image_files($page): array {
    $real_path = get_image_directory($page);
    $dir_contents = scandir($real_path);

    if (!$dir_contents) return [];

    $images = extract_images_from_dir_contents($dir_contents);
    $imagesWithFullPath = array_map(fn(string $file) =>
      convert_dir_to_url($real_path) . $file,
      $images
    );
   return array(
     'imageFiles' => array_values($imagesWithFullPath)
   );
 }

if (array_key_exists('page', $_GET)) {
  $page = filter_input(INPUT_GET, 'page', FILTER_SANITIZE_STRING);
  echo json_encode(get_image_files($page));
}
else {
  echo json_encode(['imageFiles' => []]);
}
?>
