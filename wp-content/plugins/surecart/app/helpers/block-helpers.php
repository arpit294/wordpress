<?php
if ( ! function_exists( 'sc_do_early_blocks' ) ) {
	/**
	 * Run the early blocks.
	 * We need to remove the debug notice that is triggered by the `doing_it_wrong` function.
	 *
	 * We use this function in page builders that can sometimes render the blocks out of order, causing the debug notice to be displayed.
	 *
	 * @param string $content The content.
	 *
	 * @return string
	 */
	function sc_pre_render_blocks( $content ) {
		add_filter( 'doing_it_wrong_trigger_error', 'sc_remove_interactivity_debug_notice', 10, 2 );

		$content = do_blocks( $content );

		remove_filter( 'doing_it_wrong_trigger_error', 'sc_remove_interactivity_debug_notice', 10 );

		return $content;
	}
}

if ( ! function_exists( 'sc_remove_interactivity_debug_notice' ) ) {
	/**
	 * Remove interactivity doing it wrong.
	 *
	 * This is because we need to render blocks out of order in order to
	 * add the attributes from bricks to the block.
	 *
	 * @param string $trigger Trigger.
	 * @param string $function_name Function name.
	 *
	 * @return string|false
	 */
	function sc_remove_interactivity_debug_notice( $trigger, $function_name ) {
		if ( 'WP_Interactivity_API::evaluate' !== $function_name ) {
			return $trigger;
		}
		return false;
	}
}

if ( ! function_exists( 'sc_has_interactive_content' ) ) {
	/**
	 * Does this markup contain an element that cannot legally sit inside a link?
	 *
	 * Narrower than "is anything clickable": a role="button" div nests inside an anchor
	 * fine and cancels its own click, so only real controls force the stretched overlay.
	 *
	 * @param string $html The rendered markup to inspect.
	 *
	 * @return bool
	 */
	function sc_has_interactive_content( $html ) {
		if ( empty( $html ) ) {
			return false;
		}

		// `label` and `details` count because both act on a click without being form controls.
		$interactive_tags = [ 'A', 'BUTTON', 'SELECT', 'INPUT', 'TEXTAREA', 'DETAILS', 'LABEL' ];
		$tags             = new \WP_HTML_Tag_Processor( $html );

		while ( $tags->next_tag() ) {
			if ( in_array( $tags->get_tag(), $interactive_tags, true ) ) {
				return true;
			}
		}

		// Truncated markup stops the scan before the end of the string. Answer yes rather
		// than let a caller wrap controls we simply never reached in a link.
		return $tags->paused_at_incomplete_token();
	}
}

if ( ! function_exists( 'sc_variant_pills_overflow_count' ) ) {
	/**
	 * How many variant option pills should hide behind the "+N more" toggle?
	 *
	 * Deliberately literal — a cap of 3 shows 3 pills and "+1 more" even though
	 * the toggle takes the hidden pill's slot, because a setting that sometimes
	 * shows more than it says reads as broken. 0 means no cap.
	 *
	 * @param int $total       Total number of option values.
	 * @param int $max_visible Maximum pills to show before capping (0 = no cap).
	 *
	 * @return int Number of pills to hide. 0 when everything should show.
	 */
	function sc_variant_pills_overflow_count( $total, $max_visible ) {
		$max_visible = max( 0, (int) $max_visible );

		if ( $max_visible < 1 ) {
			return 0;
		}

		return max( 0, (int) $total - $max_visible );
	}
}
