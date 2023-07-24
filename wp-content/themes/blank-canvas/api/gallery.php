<?php
/* API to fetch images from the gallery folder, which can be sent
  to the client for retrieval.
  */
define('GALLERY_URL', '/gallery/');
define('GALLERY_DIR', ROOT_DIR . GALLERY_URL);
define('IMAGE_FILE_EXTENSIONS', ['jpg', 'jpeg', 'png']);
define('IMAGE_FILES_KEY', 'imageFiles');
define('DEFAULT_IMAGE_DIR', GALLERY_DIR . 'home/');

add_action('rest_api_init', function () {
  register_rest_route('api/', '/gallery-images/', array(
    'methods' => 'GET',
    'callback' => 'get_gallery_images',
  ));
});

function get_gallery_images(WP_REST_Request $req): array
{
  $page = filter_var($req->get_param('page'), FILTER_SANITIZE_STRING);
  return get_images_files($page);
}

function get_images_files(string $page): array
{
  $dir_path = GALLERY_DIR . $page . '/';
  $dir_contents = glob($dir_path . '*');

  // If there is no directory for images, return the featured image for the page
  // or else the default image.
  if (!$dir_contents) return get_featured_image($page)
    ->or_else(get_default_image())->get_or_else(empty_result());

  $image_urls = array_map(
    'strip_dirname_prefix',
    extract_images_from_dir_contents($dir_contents)
  );
  return array(
    // array_values is used to get rid of the numeric keys.
    IMAGE_FILES_KEY => array_values($image_urls)
  );
}

function extract_images_from_dir_contents(array $dir_contents): array
{
  return array_filter($dir_contents, function (string $file): bool {
    $file_info = pathinfo($file);
    if (array_key_exists('extension', $file_info)) {
      $extension = strtolower($file_info['extension']);
      return in_array($extension, IMAGE_FILE_EXTENSIONS);
    }
    return false;
  });
}

function empty_result(): array
{
  return [IMAGE_FILES_KEY => []];
}

function get_default_image(): array
{
  return
    array_flat_map(
      fn ($dir_contents) => [
        IMAGE_FILES_KEY => array_map(
          'strip_dirname_prefix',
          $dir_contents
        )
      ],
      glob(DEFAULT_IMAGE_DIR . "*")
    );
}

function get_featured_image(string $page): string|null
{
  $page_model = (new \serviceproviders\ModelProviderImpl)->get_page_model();
  $post = $page_model->get_post_from_url(BASE_URL . $page);
  return $post->bind(
    fn (WP_Post $p) =>
    $page_model->get_featured_image($p)->map(
      fn ($image_url) =>
      [IMAGE_FILES_KEY => [$image_url]]
    )
  );
}

function strip_dirname_prefix(string $dirname): string
{
  return str_replace(ROOT_DIR, '', $dirname);
}
