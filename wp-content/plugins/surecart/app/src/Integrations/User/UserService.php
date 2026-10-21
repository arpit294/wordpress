<?php

namespace SureCart\Integrations\User;

use SureCart\Integrations\Contracts\IntegrationInterface;
use SureCart\Integrations\Contracts\PurchaseSyncInterface;
use SureCart\Integrations\IntegrationService;

/**
 * Controls the LearnDash integration.
 */
class UserService extends IntegrationService implements IntegrationInterface, PurchaseSyncInterface {
	/**
	 * Capabilities that make a role admin-equivalent.
	 *
	 * A role granting any of these must never be assignable through this
	 * integration — a purchase could otherwise escalate a customer to admin.
	 * `unfiltered_html` is deliberately not listed: editor/author legitimately
	 * carry it on single site, so granting such a role is an accepted risk here.
	 *
	 * @var string[]
	 */
	private const PRIVILEGED_CAPS = [
		'level_10',
		'manage_options',
		'promote_users',
		'edit_users',
		'delete_users',
		'create_users',
		'remove_users',
		'activate_plugins',
		'install_plugins',
		'edit_plugins',
		'delete_plugins',
		'update_plugins',
		'install_themes',
		'edit_themes',
		'delete_themes',
		'update_themes',
		'edit_files',
		'unfiltered_upload',
		'update_core',
		'manage_network',
		'manage_network_options',
		'manage_network_users',
		'manage_network_plugins',
		'manage_network_themes',
		'manage_sites',
		'setup_network',
		'upgrade_network',
	];

	/**
	 * Get the slug for the integration.
	 *
	 * @return string
	 */
	public function getName() {
		return 'surecart/user-role';
	}

	/**
	 * Get the SureCart model used for the integration.
	 * Only 'product' is supported at this time.
	 *
	 * @return string
	 */
	public function getModel() {
		return 'product';
	}

	/**
	 * Get the integration logo url.
	 * This can be to a png, jpg, or svg for example.
	 *
	 * @return string
	 */
	public function getLogo() {
		return esc_url_raw( trailingslashit( plugin_dir_url( SURECART_PLUGIN_FILE ) ) . 'images/integrations/wordpress.svg' );
	}

	/**
	 * The display name for the integration in the dropdown.
	 *
	 * @return string
	 */
	public function getLabel() {
		return __( 'WordPress User Role', 'surecart' );
	}

	/**
	 * The label for the integration item that will be chosen.
	 *
	 * @return string
	 */
	public function getItemLabel() {
		return __( 'Add User Role', 'surecart' );
	}

	/**
	 * Help text for the integration item chooser.
	 *
	 * @return string
	 */
	public function getItemHelp() {
		return __( 'Add the user role of the user who purchased the product.', 'surecart' );
	}

	/**
	 * Get item listing for the integration.
	 * These are a list of item the merchant can choose from when adding an integration.
	 *
	 * @param array  $items The integration items.
	 * @param string $search The search term.
	 *
	 * @return array The items for the integration.
	 */
	public function getItems( $items = [], $search = '' ) {
		$roles          = [];
		$editable_roles = \wp_roles()->roles;
		foreach ( $editable_roles as $role => $details ) {
			if ( $this->isPrivilegedRole( $role ) ) {
				continue; // never offer admin-equivalent roles.
			}
			$sub['id']      = esc_attr( $role );
			$sub['label']   = translate_user_role( $details['name'] );
			$roles[ $role ] = $sub;
		}
		return $roles;
	}

	/**
	 * Get the individual item.
	 *
	 * @param string $role The item role.
	 *
	 * @return array The item for the integration, or an empty array if the role is missing or admin-equivalent.
	 */
	public function getItem( $role ) {
		$names = wp_roles()->get_names();
		if ( ! isset( $names[ $role ] ) || $this->isPrivilegedRole( $role ) ) {
			return [];
		}
		return [
			'id'    => $role,
			'label' => $names[ $role ],
		];
	}

	/**
	 * Only roles this integration offers can be saved.
	 *
	 * @param string $id The role slug.
	 *
	 * @return bool
	 */
	public function isValidItem( $id ): bool {
		return isset( $this->getItems()[ $id ] );
	}

	/**
	 * Whether the role grants any admin-equivalent capability.
	 *
	 * @param string $role The role slug.
	 *
	 * @return bool
	 */
	private function isPrivilegedRole( $role ): bool {
		$role_object = get_role( $role );
		if ( ! $role_object ) {
			return false;
		}
		$enabled = array_keys( array_filter( (array) $role_object->capabilities ) );
		return ! empty( array_intersect( $enabled, self::PRIVILEGED_CAPS ) );
	}

	/**
	 * Add the role when the purchase is created.
	 *
	 * @param \SureCart\Models\Integration $integration The integrations.
	 * @param \WP_User                     $wp_user The user.
	 *
	 * @return boolean|void Returns true if the user course access updation was successful otherwise false.
	 */
	public function onPurchaseCreated( $integration, $wp_user ) {
		$this->toggleRole( $integration->integration_id, $wp_user, true );
	}

	/**
	 * Add the role when the purchase is invoked
	 *
	 * @param \SureCart\Models\Integration $integration The integrations.
	 * @param \WP_User                     $wp_user The user.
	 *
	 * @return boolean|void Returns true if the user course access updation was successful otherwise false.
	 */
	public function onPurchaseInvoked( $integration, $wp_user ) {
		$this->onPurchaseCreated( $integration, $wp_user );
	}

	/**
	 * Remove a user role when the purchase is revoked.
	 *
	 * @param \SureCart\Models\Integration $integration The integrations.
	 * @param \WP_User                     $wp_user The user.
	 *
	 * @return boolean|void Returns true if the user course access updation was successful otherwise false.
	 */
	public function onPurchaseRevoked( $integration, $wp_user ) {
		$this->toggleRole( $integration->integration_id, $wp_user, false );
	}

	/**
	 * Toggle the role
	 *
	 * @param string   $role The role.
	 * @param \WP_User $wp_user  The user object.
	 * @param boolean  $add  True to add the role, false to remove.
	 *
	 * @return \WP_Role|false
	 */
	public function toggleRole( $role, $wp_user, $add = true ) {
		// make sure the role exists.
		$role_object = get_role( $role );
		if ( ! $role_object ) {
			return;
		}
		// only ever add roles this integration offers — a stored admin-equivalent
		// role must stay inert. Removal is still allowed (revokes are safe).
		if ( $add && ! isset( $this->getItems()[ $role ] ) ) {
			return;
		}
		// add or remove the role.
		return $add ? $wp_user->add_role( $role ) : $wp_user->remove_role( $role );
	}
}
