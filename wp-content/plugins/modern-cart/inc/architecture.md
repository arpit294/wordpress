---
module: inc
---

# inc

## Responsibility

Owns the Modern Cart runtime: settings resolution (defaults merged over DB), the WooCommerce cart-reading and rendering layer (slide-out, floating launcher, totals, coupons, recommendations), the six `wp_ajax`/`wp_ajax_nopriv` cart-mutation endpoints, order attribution, BSF Analytics payload assembly, and the WordPress Abilities/MCP surface.

Ownership stops at markup — HTML lives in `templates/` and is reached through `moderncart_get_template_part()` — and at the admin UI, which belongs to `admin-core/`.

## Why it is this way

Settings reads intersect against a defaults map rather than returning the stored row, so an uninstalled extension's leftover keys cannot leak into a live read. The cost is that every new key must be registered through `moderncart_default_settings` before it is readable at all.

The AJAX handlers mutate `$_POST` before delegating to WooCommerce so that third-party add-to-cart add-ons, which read the superglobal directly, see the payload they expect. Merging the genuine superglobals last is what keeps an attacker-supplied `formEntries` from overriding a real value on this `nopriv` endpoint.
