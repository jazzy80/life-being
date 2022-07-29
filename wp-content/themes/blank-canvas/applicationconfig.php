<?php
//Define home page.
define('HOME_PAGE', 'be home');
// Define the blogs parent page title.
define('BLOG_PAGE',     'being blogs');
define('POETRY_PAGE',   'poetry');
define('INSPIRE_PAGE',  'inspire');
define('CONTACT',       'contact');
define('GUESTBOOK',     'guest book');
define('VITALITY',      'vitality');
define('BEINGME',       'being me, being you');

 //Define which pages should get a sidebar and a "most recent" bar.
define('PAGES_NEEDING_LEFT_SIDEBAR', []);
define(
  'PAGES_NEEDING_RIGHT_SIDEBAR',
  [
    BLOG_PAGE,
    POETRY_PAGE,
    VITALITY,
    BEINGME
  ]
);

//Define the pages that need the vitality menu.
define(
  'PAGES_NEEDING_VITALITY', [VITALITY]
);

define('PAGINATION_SIZE', 5);

?>
