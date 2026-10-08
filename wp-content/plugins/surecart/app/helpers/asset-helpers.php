<?php

if ( ! function_exists( 'sc_get_asset_file' ) ) {
	/**
	 * Read a webpack-generated `*.asset.php` manifest.
	 *
	 * Falls back to an empty manifest when the bundle hasn't been built
	 * (fresh checkout, partial deploy, CI running PHP tests without a JS
	 * build) instead of raising include warnings.
	 *
	 * @param string $path Absolute path to the `*.asset.php` file.
	 *
	 * @return array{dependencies: array<string>, version: string|null}
	 */
	function sc_get_asset_file( $path ) {
		if ( ! file_exists( $path ) ) {
			return [
				'dependencies' => [],
				'version'      => null,
			];
		}

		$asset = include $path;

		return is_array( $asset ) ? $asset : [
			'dependencies' => [],
			'version'      => null,
		];
	}
}
