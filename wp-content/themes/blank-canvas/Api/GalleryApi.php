<?php
/* API to fetch images from the gallery folder, which can be sent
  to the client for retrieval.
  */

namespace Api;

use Data\Page\PageRepository;
use Domain\Repositories\IPageRepository;
use Utils\Utils;
use WP_REST_Request;

class GalleryApi
{
	const GALLERY_URL = '/gallery/';
	const GALLERY_DIR = ROOT_DIR . GalleryApi::GALLERY_URL;
	const IMAGE_FILE_EXTENSIONS = ['jpg', 'jpeg', 'png'];
	const IMAGE_FILES_KEY = 'imageFiles';
	const DEFAULT_IMAGE_DIR = GalleryApi::GALLERY_DIR . 'home/';

	private IPageRepository $page_repository;

	/**
	 * @param IPageRepository $page_repository
	 */
	public function __construct(IPageRepository $page_repository)
	{
		$this->page_repository = $page_repository;
	}

	public function get_gallery_images(WP_REST_Request $req): array
	{
		$page = filter_var($req->get_param('page'), FILTER_SANITIZE_STRING) . "/";

		return $this->get_images_files($page);
	}

	private function get_images_files(string $page): array
	{
		$dir_path     = GalleryApi::GALLERY_DIR . $page;
		$dir_contents = glob($dir_path . '*');

		// If there is no directory for images, return the featured image for the page
		// or else the default image.
		if (!$dir_contents) {
			return $this->get_featured_image($page) ?? $this->get_default_image() ?: $this->empty_result();
		}

		$image_urls = array_map(
			[$this, 'strip_dirname_prefix'],
			$this->extract_images_from_dir_contents($dir_contents)
		);

		return array(
			// array_values is used to get rid of the numeric keys.
			GalleryApi::IMAGE_FILES_KEY => array_values($image_urls)
		);
	}

	private function extract_images_from_dir_contents(array $dir_contents): array
	{
		return array_filter($dir_contents, function (string $file): bool {
			$file_info = pathinfo($file);
			if (array_key_exists('extension', $file_info)) {
				$extension = strtolower($file_info['extension']);

				return in_array($extension, GalleryApi::IMAGE_FILE_EXTENSIONS);
			}

			return false;
		});
	}

	private function empty_result(): array
	{
		return [GalleryApi::IMAGE_FILES_KEY => []];
	}

	private function get_default_image(): array
	{
		return
			Utils::array_flat_map(
				fn ($dir_contents) => [
					GalleryApi::IMAGE_FILES_KEY => array_map(
						'strip_dirname_prefix',
						$dir_contents
					)
				],
				glob(GalleryApi::DEFAULT_IMAGE_DIR . "*")
			);
	}

	function get_featured_image(string $page): array
	{
		$page = $this->page_repository->get_post_from_url(BASE_URL . $page);
		$featured_image = $this->page_repository->get_featured_image($page);
		return $featured_image ? [GalleryApi::IMAGE_FILES_KEY => [$featured_image]] : [];
	}

	function strip_dirname_prefix(string $dirname): string
	{
		return str_replace(ROOT_DIR, '', $dirname);
	}
}

add_action('rest_api_init', function () {
	register_rest_route('api/', '/gallery-images/', array(
		'methods'  => 'GET',
		'callback' => [new GalleryApi(new PageRepository()), 'get_gallery_images'],
	));
});
