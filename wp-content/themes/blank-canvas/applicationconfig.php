<?php
//Define home page.
define('HOME_PAGE', 'be home');
// Define the other pages.
define('BLOG_PAGE',           'being blogs');
define('POETRY_PAGE',         'poetry');
define('INSPIRE_PAGE',        'inspire');
define('CONTACT',             'contact');
define('GUESTBOOK',           'guest book');
define('VITALITY',            'vitality');
define('BEINGME',             'being me, being you');
define('ATELIERSHOP',         'atelier & shop');
define('PRODUCTDETAILS',      'product details');

#  Define the `BASE_URL`(root) for the server.
define(
  'BASE_URL',
  (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http')
    . "://" . $_SERVER['SERVER_NAME']
);
define('ROOT_DIR', $_SERVER['DOCUMENT_ROOT']);

define('DEFAULT_HEADER_TITLE', 'Life Being');
define('DEFAULT_HEADER_SUBTITLE', 'Spirit of being you');
define('HEADER_TITLES', []);
define(
  'HEADER_SUBTITLES',
  [
    ATELIERSHOP => 'Atelier & Shop'
  ]
);


//Define the pages and their titles, that make up the right recent articles pane.
define(
  'PAGES_IN_RIGHT_PANE',
  [
    [BLOG_PAGE, 'Meest recente blog'],
    [POETRY_PAGE, 'Meest recente gedicht'],
    [INSPIRE_PAGE, 'Meest recente inspire']
  ]
);

// Define the pagination size for blogs etc.
define('PAGINATION_SIZE', 5);
define('PAGINATION_CHILD_BEING', 9);
define('PRODUCTS_PAGINATION_SIZE', 9);

//Javascript files prefix
define('JS_FILE_PREFIX', '/scripts/dist/');

//Load javascript files for a specific page.
define('LOAD_JAVASCRIPT', [
  BLOG_PAGE          => [JS_FILE_PREFIX . 'blogsmain.js'],
  POETRY_PAGE        => [JS_FILE_PREFIX . 'poetrymain.js'],
  GUESTBOOK          => [JS_FILE_PREFIX . 'guestbookmain.js'],
  ATELIERSHOP        => [JS_FILE_PREFIX . 'ateliershopmain.js'],
  PRODUCTDETAILS     => [JS_FILE_PREFIX . 'productdetailsmain.js'],
]);

// autoloader for classes and interfaces.
spl_autoload_register(function ($class): bool {
  $file = __DIR__ . '/' . strtolower(str_replace('\\', '/', $class)) . '.php';
  if (file_exists($file)) {
    require $file;
    return true;
  }
  return false;
});

function group_by(array $arr, callable $key_func)
{
  $new = [];
  foreach ($arr as $item) {
    $group_by_key = $key_func($item);
    if (array_safe_get($group_by_key, $new)) {
      array_push($new[$group_by_key], $item);
    } else {
      $new[$group_by_key] = [$item];
    }
  }
  return $new;
}

function array_flat_map(callable $fn, array $array): array
{
  $result = [];
  $xss = array_map($fn, $array);
  foreach ($xss as $xs) {
    array_push($result, $xs);
  }
  return $result;
}

function array_safe_get(string|int $key, array $array): mixed
{
  if (!key_exists($key, $array)) {
    return null;
  }
  return $array[$key];
}
