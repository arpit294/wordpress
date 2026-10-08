<?php

namespace SureCart\Middleware;

use Closure;
use SureCartCore\Requests\RequestInterface;

/**
 * Middleware for handling model archiving.
 */
class BrandColorMiddleware {
	/**
	 * Enqueue component assets.
	 *
	 * @param RequestInterface $request Request.
	 * @param Closure          $next Next.
	 * @return function
	 */
	public function handle( RequestInterface $request, Closure $next ) {
		\SureCart::assets()->printBrandColors();

		// The styles are scoped to this class so client-side swaps in the
		// unified admin app can toggle branding per screen.
		add_filter(
			'admin_body_class',
			function ( $classes ) {
				return $classes . ' sc-brand-ui';
			}
		);

		return $next( $request );
	}
}
