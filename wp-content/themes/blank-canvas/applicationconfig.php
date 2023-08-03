<?php
//Define home page.
const HOME_PAGE = 'be home';
// Define the other pages.
const BLOG_PAGE       = 'being blogs';
const POETRY_PAGE     = 'poetry';
const INSPIRE_PAGE    = 'inspire';
const CONTACT         = 'contact';
const GUESTBOOK       = 'guest book';
const VITALITY        = 'vitality';
const BEING_ME        = 'being me, being you';
const ATELIER_SHOP    = 'atelier & shop';
const PRODUCT_DETAILS = 'product details';

#  Define the `BASE_URL`(root) for the server.
define(
	'BASE_URL',
	( isset( $_SERVER['HTTPS'] ) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http' )
	. "://" . $_SERVER['SERVER_NAME']
);
define( 'ROOT_DIR', $_SERVER['DOCUMENT_ROOT'] );

const DEFAULT_HEADER_TITLE    = 'Life Being';
const DEFAULT_HEADER_SUBTITLE = 'Spirit of being you';
const HEADER_TITLES           = [];
const HEADER_SUBTITLES        = [
	ATELIER_SHOP => 'Atelier & Shop'
];


//Define the pages and their titles, that make up the right recent articles pane.
const PAGES_IN_RIGHT_PANE = [
	[ BLOG_PAGE, 'Meest recente blog' ],
	[ POETRY_PAGE, 'Meest recente gedicht' ],
	[ INSPIRE_PAGE, 'Meest recente inspire' ]
];

// Define the pagination size for blogs etc.
const PAGINATION_SIZE          = 5;
const PAGINATION_CHILD_BEING   = 9;
const PRODUCTS_PAGINATION_SIZE = 9;

//Javascript files prefix
const JS_FILE_PREFIX = '/scripts/dist/';

//Load javascript files for a specific page.
const LOAD_JAVASCRIPT = [
	BLOG_PAGE       => [ JS_FILE_PREFIX . 'blogsmain.js' ],
	POETRY_PAGE     => [ JS_FILE_PREFIX . 'poetrymain.js' ],
	GUESTBOOK       => [ JS_FILE_PREFIX . 'guestbookmain.js' ],
	ATELIER_SHOP    => [ JS_FILE_PREFIX . 'ateliershopmain.js' ],
	PRODUCT_DETAILS => [ JS_FILE_PREFIX . 'productdetailsmain.js' ],
];

// autoloader for classes and interfaces.
spl_autoload_register( function ( $class ): bool {
	$file = __DIR__ . '/' . str_replace( '\\', '/', $class ) . '.php';
	if ( file_exists( $file ) ) {
		require $file;

		return true;
	}

	return false;
} );
