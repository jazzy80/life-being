<?php

namespace Api;

use Domain\Models\Page;
use Domain\Repositories\IPageRepository;
use WP_REST_Request;

class Article {

	private IPageRepository $page_repository;

	/**
	 * @param IPageRepository $page_repository
	 */
	public function __construct( IPageRepository $page_repository ) {
		$this->page_repository = $page_repository;
	}

	public function get_articles( WP_REST_Request $req ): array {
		$page_number   = intval( filter_var( $req->get_param('page'), FILTER_SANITIZE_STRING ) ) ?? 0;
		$article_pages = array_map( fn( Page $page ) => $page->get_id(), array_filter(
			$this->page_repository->get_pages(),
			fn( Page $page ) => in_array( strtolower( $page->get_title() ), [
				BLOG_PAGE,
				POETRY_PAGE,
				INSPIRE_PAGE
			] )
		) );

		$articles = array_filter(
			$this->page_repository->get_pages(),
			fn( Page $page ) => in_array( $page->get_post_parent(), $article_pages, true )
		);

		$offset = $page_number * PAGINATION_SIZE;

		// Get the articles for the specified `$page_number`.
		$paginated_articles = array_slice( $articles, $offset, PAGINATION_SIZE );

		return [
			'count' => count( $articles ),
			'has_next' => count($articles) > $offset + PAGINATION_SIZE,
			'articles' => array_reduce(
				$paginated_articles,
				fn( array $acc, Page $article ) => array(
					...$acc,
					[
						'title'              => $article->get_title(),
						'date'               => date_format( date_create( $article->get_date() ), 'd-M-Y' ),
						'excerpt'            => $article->get_excerpt(),
						'url'                => $article->get_url(),
						'featured_image_url' => $article->get_featured_image_url(),
					]
				),
				[] )
		];
	}
}
