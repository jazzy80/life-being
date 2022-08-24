<?php
//Define home page.
define('HOME_PAGE', 'be home');
// Define the other pages.
define('BLOG_PAGE',     'being blogs');
define('POETRY_PAGE',   'poetry');
define('INSPIRE_PAGE',  'inspire');
define('CONTACT',       'contact');
define('GUESTBOOK',     'guest book');
define('VITALITY',      'vitality');
define('BEINGME',       'being me, being you');

define(
  'BASE_URL',
  $_SERVER['HTTPS'] === 'on' ? 'https' : 'http' . "://" . $_SERVER['SERVER_NAME']
);
define('ROOT_DIR', $_SERVER['DOCUMENT_ROOT']);

//Define the pages that need the vitality menu.
define(
  'PAGES_NEEDING_VITALITY', [VITALITY]
);

define('PAGES_NEEDING_LITE_HEADER', [HOME_PAGE]);

// Define the pagination size for blogs etc.
define('PAGINATION_SIZE', 5);

//Javascript files prefix
define('JS_FILE_PREFIX', '/scripts/dist/');

//Load javascript files for a specific page.
define('LOAD_JAVASCRIPT', [
  BLOG_PAGE => [JS_FILE_PREFIX . 'blogs.js'],
  POETRY_PAGE => [JS_FILE_PREFIX . 'poetry.js'],
  GUESTBOOK => [JS_FILE_PREFIX . 'guestbook.js']
]);
?>
