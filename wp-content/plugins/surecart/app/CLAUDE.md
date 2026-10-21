# SureCart PHP Backend Patterns

Patterns and conventions for working in the `app/` directory. See root `CLAUDE.md` for architecture overview.

## Adding a New Model

```php
// app/src/Models/MyModel.php
namespace SureCart\Models;

class MyModel extends Model {
    protected $endpoint = 'my_models';     // -> https://api.surecart.com/v1/my_models
    protected $object_name = 'my_model';   // request body wrapper key + hook namespace
}
```

The `/v1` segment comes from `RequestService::getBaseUrl()` (`app/src/Request/RequestService.php:131-133`), not from `$endpoint`.

Three base classes, not two:

- `Model` — API-backed (96 models).
- `DatabaseModel` — WP custom table. **Also requires `protected $table_name`** (e.g. `Integration.php:15`); its inherited `$endpoint` is vestigial, since queries go through `Query::init($this->object_name)->from($this->table_name)` (`DatabaseModel.php:169`).
- `ExternalApiModel` — third-party API. Different contract: `protected $base_url` plus `$endpoint`, its own `makeRequest()` with transient caching, never touches `RequestService` or `SURECART_API_URL`. One subclass repo-wide (`IntegrationCatalog.php`).

Traits live in `SureCart\Models\Traits` and must be imported by FQCN — `use SureCart\Models\Traits\HasDates;`.

48 traits exist. The ones most used across real models: `HasDates`, `HasCustomer`, `HasPrice`, `HasCheckout`, `HasProduct`, `HasSubscription`, `HasPurchases`, `HasLineItem`, `HasAffiliation`, `CanFilter`, `HasBillingAddress`, `HasShippingAddress`, `HasPaymentIntent`, `HasPaymentMethod`, `HasImageSizes`, `CanDuplicate`, `HasOrder`, `HasCharge`, `HasLicense`, `CanResendNotifications`, `SyncsCustomer` (the Customer↔WP_User sync), `HasAttributes` (fillable/guarded machinery).

Note the singular/plural pairs are different traits: `HasSubscription` (4 uses) vs `HasSubscriptions` (1), `HasPurchase` (2) vs `HasPurchases` (3). Check which one you actually want. Rarely used but real: `HasDiscount`, `CanFinalize`, `HasProcessorType`, `HasShippingChoices`, `HasCommissionStructure`. `HasServiceFee` exists but is dead.

## Adding a New REST Endpoint

Three-file pattern, then register in `app/config.php`:

```php
// 1. Model (see above)

// 2. app/src/Controllers/Rest/MyModelController.php
class MyModelController extends RestController {
    protected $class = MyModel::class;
}

// 3. app/src/Rest/MyModelRestServiceProvider.php
class MyModelRestServiceProvider extends RestServiceProvider {
    protected $endpoint = 'my_models';           // /wp-json/surecart/v1/my_models
    protected $controller = MyModelController::class;
    protected $methods = ['index', 'create', 'find', 'edit', 'delete'];
}

// 4. Add MyModelRestServiceProvider::class to 'providers' array in app/config.php
```

`$methods` supports exactly these five — there is no `batch` or `archive`. **Extra endpoints do not go in `$methods`**; override `registerRoutes()` and call `register_rest_route()` directly (44 providers do this, e.g. `ProductsRestServiceProvider.php:41-54` for `products/{id}/sync/`).

Most real providers omit `$methods` entirely and inherit the default.

Permission callbacks are plain `current_user_can()`, but with **one capability verb per callback**, not a single capability for the endpoint:

```php
get_item_permissions_check    -> read_sc_coupons
get_items_permissions_check   -> read_sc_coupons
create_item_permissions_check -> publish_sc_coupons
update_item_permissions_check -> edit_sc_coupons
delete_item_permissions_check -> delete_sc_coupons
```

The capability is not always derived from the endpoint name — `manage_sc_shop_settings` (39 uses) and `manage_options` (22) are the two most common strings overall, used by settings and protocol providers.

**The base class defaults every permission check to `false`** (`RestServiceProvider.php:349-399`), so a provider that omits them registers a fully locked endpoint rather than an open one.

## Error Handling

```php
// Controllers: propagate WP_Error upward — REST layer auto-converts to response
$result = MyModel::create($data);
if (is_wp_error($result)) {
    return $result;
}

```

The conversion to an HTTP response is WordPress core's (`WP_REST_Server::error_to_response()`), not SureCart's — the route callback just returns the `WP_Error` untouched (`RestServiceProvider.php:245-249`). It carries a correct status because `ErrorsTranslationService::translate()` sets one (`:213-220`).

**A throwing integration does take down the rest of the chain.** Integration handlers are invoked through `IntegrationService::callMethod()` (`app/src/Integrations/IntegrationService.php:339-367`), which has **no** try-catch. Only one of the five `surecart/purchase_created` dispatch sites wraps the `do_action` (`DraftCheckoutsController.php:92-97`); the other four do not (`DraftCheckoutsController.php:43`, `CheckoutsController.php:159,243`, `AsyncWebhookService.php:102`). Do not assume you are isolated.

`ErrorsTranslationService` translates API error codes to user messages automatically — every non-200/201 API response is funnelled through it (`app/src/Request/RequestService.php:365-371`), nothing opt-in. Lookup files are in `Support/Errors/Translations/` (`codes.php`, `attributes.php`, `types.php`, `types-replaceable.php`). Do not duplicate translation logic; extend via the `surecart/translated_error` / `surecart/translated_errors` filters.

## Adding a New Integration

**Purchase-sync** integrations extend `IntegrationService` and implement `PurchaseSyncInterface` — 7 of the 24 directories under `app/src/Integrations/` (LifterLMS, LearnDash, LearnDashGroup, TutorLMS, MemberPress, BuddyBoss, User). The rest are not this shape: AffiliateWP extends `\Affiliate_WP_Base`, Yoast extends `NoIndexService`, and the page-builder/SEO integrations are plain service classes.

```php
// Contract from IntegrationInterface — EIGHT methods, not six:
getName(), getModel(), getLogo(), getLabel(), getItemLabel(), getItemHelp(),
getItems($items = [], $search = ''), getItem($id)

// Required from PurchaseSyncInterface:
onPurchaseCreated($integration, $wp_user)
onPurchaseInvoked($integration, $wp_user)
onPurchaseRevoked($integration, $wp_user)
```

**These are not abstract methods.** `IntegrationService` declares zero abstract methods — the word `abstract` appears once in the file, on the class declaration (`IntegrationService.php:13`). All eight are concrete stubs returning `''` (`:33-104`), satisfying `IntegrationInterface` on the subclass's behalf. So PHP will **not** error if you omit one: the integration silently registers under an empty name/model, and omitting `getItems()`/`getItem()` renders an empty item picker in the admin UI. That is a very different failure mode from a fatal.

The dispatcher passes a **third** argument the interface does not declare — `$this->$method($integration, $purchase->getWPUser(), $purchase)` (`IntegrationService.php:365`). Every shipped implementation declares only two, so `$purchase` is available but invisible.

Implementing `PurchaseSyncInterface` also auto-subscribes you to a **fourth** event: `surecart/purchase_updated` → `onPurchaseUpdated(Purchase $purchase, $request)` (`IntegrationService.php:143`, method at `:179-248`), which fans out to `onPurchaseProductAdded`, `onPurchaseProductRemoved`, `onPurchaseQuantityUpdated` and `onPurchaseProductUpdated`. This is the plan-change path — an integration that ignores it will not revoke access on a product swap.

- Any provider whose `integration_id` is later used to grant access/roles/memberships must implement `isValidItem($id)` to validate the id against its real items — the base default returns `true` and validates nothing, so arbitrary ids are silently accepted
- Never gate on a provider slug with a plain string compare alone — `provider` is a `varchar` under the site collation, so `andWhere('provider', ...)` on dispatch matches `SureCart/User-Role` to `surecart/user-role`. The REST layer only accepts slugs with a registered `surecart/integrations/providers/find/{slug}` filter; keep that as the canonicalization point
- Integration data (product/price/variant -> third-party item mapping) stored in `surecart_integrations` table via `Integration` model (DatabaseModel)
- Register service provider in `app/config.php` under `'providers'`
- Actions fire from **five** places, not two: `DraftCheckoutsController::finalize()` (`:94`) and `::manuallyPay()` (`:43`), `CheckoutsController::finalize()` (`:243`) and `::manuallyPay()` (`:159`), and the webhook processor (`AsyncWebhookService.php:102`). Do not hook them manually — and when tracing "where does this fire", do not stop at the draft controller

## Routes and Middleware

The dominant pattern in `app/routes/admin.php` is a `->group()` with `->setNamespace()`, and the inner routes discriminated by the `action` URL var — not a flat chain:

```php
\SureCart::route()
    ->where( 'admin', 'sc-products' )
    ->middleware( 'user.can:edit_sc_products' )
    ->middleware( 'assets.components' )        // loads Stencil component assets
    ->middleware( 'assets.admin_colors' )
    ->setNamespace( '\\SureCart\\Controllers\\Admin\\Products\\' )
    ->group( function () {
        \SureCart::route()->get()->where( 'sc_url_var', false, 'action' )->handle( 'ProductsController@index' );
        \SureCart::route()->get()->where( 'sc_url_var', 'edit', 'action' )->handle( 'ProductsController@edit' );
        \SureCart::route()->get()->where( 'sc_url_var', 'toggle_archive', 'action' )
            ->middleware( 'archive_model:product' )->handle( 'ProductsController@toggleArchive' );
    } );
```

`->setNamespace()` is what makes the bare `'ProductsController@index'` string resolve. Without it that handler will not resolve.

App-level middleware aliases — this is the complete registry (`app/config.php:384-390`):
`archive_model`, `edit_model`, `nonce`, `webhooks`, `assets.components`, `assets.brand_colors`, `assets.admin_colors`. Note `edit_model` is registered but used by **zero** routes.

Six more come from the framework (`core/core/src/Kernels/KernelsServiceProvider.php:31-36`): `flash`, `old_input`, `csrf`, `user.logged_in`, `user.logged_out`, and `user.can` — the most-used middleware in the routes. The argument after the colon is a capability (`user.can:edit_sc_products`), parsed in `core/core/src/Middleware/UserCanMiddleware.php:41-49`.

Much of `app/routes/web.php` applies middleware by FQCN rather than alias, so the alias table is only part of the picture.

## Webhook Event -> WordPress Action Mapping

| API Event | WordPress Action |
|---|---|
| `purchase.created` | `surecart/purchase_created` |
| `purchase.revoked` | `surecart/purchase_revoked` |
| `purchase.invoked` | `surecart/purchase_invoked` |
| `purchase.updated` | `surecart/purchase_updated` |
| `customer.updated` | `surecart/customer_updated` |
| `account.updated` | `surecart/account_updated` |
| `subscription.renewed` | `surecart/subscription_renewed` |

Price/product CRUD events also fire but are rarely hooked externally.

The mapping is **derived, not a lookup table** — `AsyncWebhookService::createEventName()` (`:117-120`) is `str_replace('.', '_', $type)` prefixed with `surecart/`. So any event follows the same rule and the table above is convenience, not the contract.

Two gates decide whether a documented event actually fires:

1. **Subscription allowlist** — only events listed in `app/config.php:451-466` (`'webhook_events'`) are subscribed. This, not the derivation, is the authority on what arrives.
2. **Object-model gate** — `AsyncWebhookService::handle()` bails before `do_action` if the payload's `object` has no entry in its `$models` map (`:93-99`). An unmapped object is marked processed and **dropped silently**.

Handlers receive two arguments, `($model, $webhook->data)` (`:102`) — which is why `onPurchaseUpdated()` takes a `$request` second parameter.
