---
module: templates
---

# templates

## Responsibility

Owns the presentation-only PHP partials for the Modern Cart slide-out, floating launcher, and cart sub-components. Renders escaped markup from variables the caller supplies and fires `moderncart_*` extension hooks.

Owns no data fetching, no settings reads, and no state — every value (`$classes`, `$notice`, `$quantity`, `$recommended_products`) is prepared in `inc/slide-out.php`, `inc/cart.php` and `inc/floating*.php` and passed through `moderncart_get_template_part()`.

## Why it is this way

The loader extracts with `EXTR_SKIP` and unsets a fixed blocklist of keys before extraction because the loader's own locals (`$template`, `$slug`, `$template_path`) live in the same scope as the extracted args. Without the blocklist, a caller passing `'name' => …` would silently change which file gets loaded. The cost is that those key names are permanently unavailable to templates, which is not visible from any call site.
