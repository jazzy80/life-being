<?php

namespace Views\ViewModels;

class MenuItemViewModel {
	private string $title;
	private string $url;
	private bool $is_active;
	private array $children;

	/**
	 * @return string
	 */
	public function get_title(): string {
		return $this->title;
	}

	/**
	 * @return string
	 */
	public function get_url(): string {
		return $this->url;
	}

	/**
	 * @return bool
	 */
	public function is_is_active(): bool {
		return $this->is_active;
	}

	/**
	 * @return array<MenuItemViewModel>
	 */
	public function get_children(): array {
		return $this->children;
	}

	public function __construct( string $title, string $url, bool $is_active, array $children ) {
		$this->title     = $title;
		$this->url       = $url;
		$this->is_active = $is_active;
		$this->children  = $children;
	}

	public function to_html(): string {
		$tag_name    = $this->url === '#' || $this->url === '' ? 'span' : 'a';
		$active_link = $this->is_active ? "active-link" : "";

		if ( count( $this->children ) !== 0 ) {
			$child_html = join( "", array_map( fn( $child ) => $child->to_html(), $this->children ) );

			return
				"<div class=\"dropdown\">
					<li>
						<$tag_name href=\"#\" class=\"link-like dropbtn\">
							$this->title
					    </$tag_name>
				    </li>
					<div class=\"dropdown-content\">
						$child_html
					</div>
                </div>";
		}

		return
			"<li> 
				<a class=\"$active_link\" href=\"$this->url\">
					$this->title
				</a>
			</li>";
	}
}
