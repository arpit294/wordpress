<?php

namespace SureCart\Controllers\Rest;

/**
 * First-party relay for affiliate click tracking.
 */
class VisitsController extends RestController {
	/**
	 * The attribution cookie name.
	 *
	 * @var string
	 */
	const COOKIE_NAME = 'sc_click_id';

	/**
	 * Record an affiliate click.
	 *
	 * @param \WP_REST_Request $request The REST request.
	 *
	 * @return object|\WP_Error The created click object, or an error.
	 */
	public function create( \WP_REST_Request $request ) {
		$account = \SureCart::account();

		if ( ! $account->isAffiliateTrackingEnabled() ) {
			return new \WP_Error( 'affiliate_tracking_disabled', __( 'Affiliate tracking is not enabled.', 'surecart' ), [ 'status' => 403 ] );
		}

		$public_token = $account->public_token;
		if ( empty( $public_token ) ) {
			// 503: the store is disconnected — a server-side state, not a client error.
			return new \WP_Error( 'missing_public_token', __( 'The store is not connected.', 'surecart' ), [ 'status' => 503 ] );
		}

		if ( $this->isThrottled() ) {
			return new \WP_Error( 'too_many_requests', __( 'Too many requests.', 'surecart' ), [ 'status' => 429 ] );
		}

		$response = wp_remote_post(
			esc_url_raw( untrailingslashit( SURECART_API_URL ) . '/v1/public/clicks' ),
			[
				'timeout' => 5,
				'headers' => [
					'Authorization' => 'Bearer ' . $public_token,
					'Content-Type'  => 'application/json',
				],
				'body'    => wp_json_encode(
					[
						'click' => [
							'affiliation_code' => sanitize_text_field( $request->get_param( 'affiliation_code' ) ),
							'url'              => esc_url_raw( $request->get_param( 'url' ) ),
							'referrer'         => esc_url_raw( $request->get_param( 'referrer' ) ?? '' ),
							'previous_click'   => $this->getPreviousClickId(),
						],
					]
				),
			]
		);

		if ( is_wp_error( $response ) ) {
			return new \WP_Error( 'click_relay_failed', __( 'Could not record the click.', 'surecart' ), [ 'status' => 502 ] );
		}

		$code  = (int) wp_remote_retrieve_response_code( $response );
		$click = json_decode( wp_remote_retrieve_body( $response ) );

		if ( ! in_array( $code, [ 200, 201 ], true ) || empty( $click->id ) ) {
			return new \WP_Error( 'click_relay_failed', __( 'Could not record the click.', 'surecart' ), [ 'status' => $code >= 400 ? $code : 502 ] );
		}

		$this->setClickCookie( $click );

		return $click;
	}

	/**
	 * The previous click id from the attribution cookie, if it looks like one.
	 *
	 * @return string|null
	 */
	protected function getPreviousClickId() {
		$id = sanitize_text_field( wp_unslash( $_COOKIE[ self::COOKIE_NAME ] ?? '' ) );
		return preg_match( '/^[A-Za-z0-9_-]{1,64}$/', $id ) ? $id : null;
	}

	/**
	 * Basic per-IP flood protection.
	 *
	 * Soft limit only: REMOTE_ADDR may be a shared proxy/CDN IP, the transient get/set isn't atomic, and X-Forwarded-For is deliberately not trusted (spoofable).
	 *
	 * @return boolean True when this IP has exceeded the limit.
	 */
	protected function isThrottled(): bool {
		$ip = sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ?? '' ) );
		if ( ! $ip ) {
			return false;
		}

		$key   = 'sc_visits_' . md5( $ip );
		$count = (int) get_transient( $key );
		if ( $count >= 10 ) {
			return true;
		}

		set_transient( $key, $count + 1, MINUTE_IN_SECONDS );
		return false;
	}

	/**
	 * Set the attribution cookie from the created click.
	 *
	 * @param object $click The click object from the API.
	 *
	 * @return void
	 */
	protected function setClickCookie( $click ) {
		if ( empty( $click->expires_at ) ) {
			return;
		}

		// Not httponly — the cookie was previously set with document.cookie and may have JS readers.
		sc_setcookie( self::COOKIE_NAME, $click->id, (int) $click->expires_at, is_ssl(), false );
	}
}
