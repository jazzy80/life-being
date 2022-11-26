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
define('ATELIER',             'life being atelier');
define('ATELIERGALLERY',      'life being gallery');
define('CHILD_ILLUSTRATIONS', 'being child illustrations');

define(
  'BASE_URL',
  (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http')
    . "://" . $_SERVER['SERVER_NAME']
);
define('ROOT_DIR', $_SERVER['DOCUMENT_ROOT']);

define('DEFAULT_HEADER_SUBTITLE', 'Spirit of being you');
define(
  'HEADER_SUBTITLES',
  [
    ATELIER => 'Atelier',
    CHILD_ILLUSTRATIONS => 'Illustrations'
  ]
);

//Define the pages that need the vitality menu.
define(
  'PAGES_NEEDING_VITALITY', [VITALITY]
);

// Define the pages that need a header without the lower navbar.
define('PAGES_NEEDING_LITE_HEADER', [HOME_PAGE, ATELIER, ATELIERGALLERY, CHILD_ILLUSTRATIONS]);

// Define the pagination size for blogs etc.
define('PAGINATION_SIZE', 5);

//Javascript files prefix
define('JS_FILE_PREFIX', '/scripts/dist/');

//Load javascript files for a specific page.
define('LOAD_JAVASCRIPT', [
  BLOG_PAGE          => [JS_FILE_PREFIX . 'blogsmain.js'],
  POETRY_PAGE        => [JS_FILE_PREFIX . 'poetrymain.js'],
  GUESTBOOK          => [JS_FILE_PREFIX . 'guestbookmain.js'],
  ATELIER            => [JS_FILE_PREFIX . 'ateliermain.js'],
  ATELIERGALLERY     => [JS_FILE_PREFIX . 'ateliermain.js'],
]);

// autoloader for classes and interfaces.
spl_autoload_register(function ($class) {
  $file = __DIR__ . '/' . strtolower(str_replace('\\', '/', $class)) . '.php';
  if (file_exists($file)) {
    require $file;
    return true;
  }
  return false;
});
?>
