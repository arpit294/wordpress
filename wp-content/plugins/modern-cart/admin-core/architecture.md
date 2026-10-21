---
module: admin-core
---

# admin-core

## Responsibility

Owns the Modern Cart admin settings screen: WP submenu registration and asset/data bootstrap (`Admin_Menu`), the declarative field/tab schema (`Settings_Fields`), the four AJAX endpoints backing the screen, and the React SPA (settings form, live cart preview, onboarding wizard, license tab, pro upsells).

Ownership stops at persistence and defaults — the option schema, defaults, sanitization types, pro status, and plugin installation all live in `ModernCart\Inc\Helper`. The license and product tabs are injected by the Pro plugin through filters. Note that the schema is not admin-private: `inc/cart.php` reads `Settings_Fields::get_fields()` on the frontend.

## Why it is this way

The screen auto-saves rather than offering a Save button, which is why field components mutate the shared state object in place instead of cloning it. Each field debounces independently at 500 ms; if each produced an immutable copy from the same base, two fields edited inside one debounce window would overwrite each other's change. The in-place mutation is the mechanism that keeps concurrent field edits coherent, at the cost of no rollback.
