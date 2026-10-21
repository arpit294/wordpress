<?php

namespace SureCart\Integrations\Core;

use SureCart\Integrations\Abstracts\NoIndexService;

/**
 * Controls the noindex fallback for sites with no SEO plugin.
 *
 * Every SEO plugin we integrate with replaces core's `wp_robots` output with
 * its own, so this only ever renders when none of them is active.
 */
class CoreNoIndexService extends NoIndexService {
	/**
	 * The filter hook name for the robots meta.
	 *
	 * @var string
	 */
	protected $hook_name = 'wp_robots';

	/**
	 * The noindex robots.
	 *
	 * Core renders a string value as `directive:value`, so these have to be
	 * booleans to come out as a bare `noindex, nofollow`.
	 *
	 * @var array
	 */
	protected $noindex_robots = [
		'noindex'  => true,
		'nofollow' => true,
	];
}
