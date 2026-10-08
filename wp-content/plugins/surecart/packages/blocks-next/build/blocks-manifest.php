<?php
// This file is generated. Do not modify it manually.
return array(
	'cart' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/slide-out-cart',
		'title' => 'Cart',
		'description' => 'Display SureCart slide out cart',
		'version' => '1.0.0',
		'category' => 'surecart-cart',
		'icon' => 'media-interactive',
		'example' => array(
			
		),
		'attributes' => array(
			'title' => array(
				'type' => 'string'
			),
			'width' => array(
				'type' => 'string',
				'default' => '525px'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'layout' => array(
				'__experimentalDefault' => 'grid',
				'__experimentalDefaultControls' => array(
					'layout' => true
				)
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true,
				'__experimentalDefaultControls' => array(
					'color' => true,
					'radius' => true,
					'style' => true,
					'width' => true
				)
			),
			'html' => false,
			'multiple' => false,
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'blockGap' => true
			),
			'currencyConversion' => true,
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => false,
				'textAlign' => false
			),
			'color' => array(
				'text' => true,
				'background' => true,
				'enableContrastChecker' => true
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'surecart-drawer',
			'surecart-block-ui',
			'surecart-alert',
			'file:./style-index.css',
			'surecart-theme-base'
		),
		'editorStyle' => array(
			'file:./index.css'
		),
		'viewScript' => array(
			'wp-url',
			'wp-api-fetch',
			'wp-i18n',
			'wp-a11y'
		),
		'viewScriptModule' => array(
			'@surecart/checkout',
			'@surecart/cart'
		)
	),
	'cart-bump-line-item' => array(
		'$schema' => 'https://json.schemastore.org/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/slide-out-cart-bump-line-item',
		'title' => 'Cart Bump Line Item',
		'description' => 'Display the cart bump line item',
		'category' => 'surecart-cart',
		'textdomain' => 'surecart',
		'ancestor' => array(
			'surecart/slide-out-cart'
		),
		'attributes' => array(
			'label' => array(
				'type' => 'string'
			),
			'border' => array(
				'type' => 'boolean',
				'default' => true
			),
			'padding' => array(
				'type' => 'object',
				'default' => array(
					'top' => '1.25em',
					'left' => '1.25em',
					'bottom' => '1.25em',
					'right' => '1.25em'
				)
			),
			'backgroundColor' => array(
				'type' => 'string'
			),
			'textColor' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'html' => false,
			'multiple' => false,
			'inserter' => false,
			'currencyConversion' => true
		),
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'surecart-line-item',
			'file:./style-index.css'
		)
	),
	'cart-close-button' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/cart-close-button',
		'title' => 'Close Cart Button',
		'description' => 'Display the close cart button.',
		'version' => '1.0.0',
		'category' => 'surecart-cart',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/slide-out-cart'
		),
		'attributes' => array(
			'label' => array(
				'type' => 'string'
			),
			'showLabel' => array(
				'type' => 'boolean',
				'default' => false
			),
			'icon' => array(
				'type' => 'string',
				'default' => 'arrow'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true
			),
			'color' => array(
				'text' => true,
				'background' => true,
				'enableContrastChecker' => true
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'cart-count' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/cart-count',
		'title' => 'Cart Items Count',
		'description' => 'Display the number of items in the cart.',
		'version' => '1.0.0',
		'category' => 'surecart-cart',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/slide-out-cart'
		),
		'supports' => array(
			'interactivity' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true
			),
			'color' => array(
				'text' => true,
				'background' => true,
				'enableContrastChecker' => true
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'cart-coupon' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/slide-out-cart-coupon',
		'title' => 'Cart Coupon',
		'description' => 'Display a coupon form in the cart',
		'keywords' => array(
			'coupon',
			'promo'
		),
		'version' => '1.0.0',
		'category' => 'surecart-cart',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/slide-out-cart'
		),
		'attributes' => array(
			'text' => array(
				'type' => 'string'
			),
			'button_text' => array(
				'type' => 'string'
			),
			'placeholder' => array(
				'type' => 'string'
			),
			'collapsed' => array(
				'type' => 'boolean',
				'default' => true
			),
			'disabled' => array(
				'type' => 'boolean'
			),
			'border' => array(
				'type' => 'boolean',
				'default' => true
			),
			'padding' => array(
				'type' => 'object',
				'default' => array(
					'top' => '1.25em',
					'left' => '1.25em',
					'bottom' => '1.25em',
					'right' => '1.25em'
				)
			),
			'backgroundColor' => array(
				'type' => 'string'
			),
			'textColor' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'html' => false,
			'multiple' => false,
			'inserter' => false,
			'currencyConversion' => true
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'surecart-line-item',
			'surecart-coupon-form',
			'surecart-form-control',
			'file:./style-index.css'
		)
	),
	'cart-header' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/slide-out-cart-header',
		'title' => 'Cart Header',
		'description' => 'Display a cart header',
		'version' => '1.0.0',
		'category' => 'surecart-cart',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/slide-out-cart'
		),
		'attributes' => array(
			'text' => array(
				'type' => 'string'
			),
			'border' => array(
				'type' => 'boolean',
				'default' => true
			),
			'padding' => array(
				'type' => 'object',
				'default' => array(
					'top' => '1.25em',
					'left' => '1.25em',
					'bottom' => '1.25em',
					'right' => '1.25em'
				)
			),
			'backgroundColor' => array(
				'type' => 'string'
			),
			'textColor' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'html' => false,
			'multiple' => false,
			'inserter' => false
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'surecart-tag',
			'file:./style-index.css'
		)
	),
	'cart-icon' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/cart-icon',
		'title' => 'Floating Cart Icon',
		'description' => 'The cart icon that shows your cart quantity.',
		'version' => '1.0.0',
		'category' => 'surecart-cart',
		'example' => array(
			
		),
		'attributes' => array(
			
		),
		'supports' => array(
			'interactivity' => true,
			'inserter' => false,
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'__experimentalDefaultControls' => array(
					'padding' => true,
					'margin' => true
				)
			),
			'color' => array(
				'text' => true,
				'background' => true
			),
			'__experimentalBorder' => array(
				'width' => true,
				'color' => true,
				'__experimentalDefaultControls' => array(
					'width' => true,
					'color' => true
				)
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'file:./style-index.css'
		),
		'viewScriptModule' => array(
			'@surecart/checkout'
		)
	),
	'cart-items' => array(
		'$schema' => 'https://json.schemastore.org/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/slide-out-cart-items',
		'title' => 'Cart Items',
		'description' => 'The slide-out cart items',
		'category' => 'surecart-cart',
		'version' => '1.0.0',
		'example' => array(
			
		),
		'textdomain' => 'surecart',
		'ancestor' => array(
			'surecart/slide-out-cart'
		),
		'attributes' => array(
			'removable' => array(
				'type' => 'boolean',
				'default' => true
			),
			'editable' => array(
				'type' => 'boolean',
				'default' => true
			),
			'border' => array(
				'type' => 'boolean',
				'default' => true
			),
			'padding' => array(
				'type' => 'object',
				'default' => array(
					'top' => '1.25em',
					'left' => '1.25em',
					'bottom' => '1.25em',
					'right' => '1.25em'
				)
			),
			'backgroundColor' => array(
				'type' => 'string'
			),
			'textColor' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'html' => false,
			'multiple' => false,
			'inserter' => false,
			'currencyConversion' => true
		),
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'surecart-line-item',
			'surecart-product-line-item',
			'surecart-input-group',
			'surecart-quantity-selector',
			'file:./style-index.css'
		),
		'viewScriptModule' => array(
			'@surecart/cart'
		)
	),
	'cart-items-submit' => array(
		'$schema' => 'https://json.schemastore.org/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/slide-out-cart-items-submit',
		'title' => 'Cart Submit Button',
		'description' => 'The cart submit button',
		'textdomain' => 'surecart',
		'version' => '1.0.0',
		'category' => 'surecart-cart',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/slide-out-cart'
		),
		'attributes' => array(
			'text' => array(
				'type' => 'string'
			),
			'width' => array(
				'type' => 'number',
				'default' => 100
			)
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'align' => false,
			'alignWide' => false,
			'html' => false,
			'multiple' => false,
			'__experimentalSelector' => '.wp-block-button .wp-block-button__link',
			'spacing' => array(
				'__experimentalSkipSerialization' => true,
				'padding' => array(
					'horizontal',
					'vertical'
				),
				'margin' => array(
					'top',
					'bottom'
				)
			),
			'color' => array(
				'__experimentalSkipSerialization' => true,
				'gradients' => true,
				'__experimentalDefaultControls' => array(
					'background' => true,
					'text' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true
			),
			'reusable' => false,
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true,
				'__experimentalSkipSerialization' => true,
				'__experimentalDefaultControls' => array(
					'color' => true,
					'radius' => true,
					'style' => true,
					'width' => true
				)
			)
		),
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'surecart-wp-buttons',
			'surecart-wp-button',
			'file:./style-index.css',
			'wp-block-button'
		)
	),
	'cart-items-subtotal' => array(
		'$schema' => 'https://json.schemastore.org/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/slide-out-cart-items-subtotal',
		'title' => 'Cart Subtotal',
		'description' => 'Display the cart subtotal',
		'keywords' => array(
			'cart',
			'subtotal'
		),
		'category' => 'surecart-cart',
		'textdomain' => 'surecart',
		'version' => '1.0.0',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/slide-out-cart'
		),
		'supports' => array(
			'interactivity' => true,
			'html' => false,
			'multiple' => false,
			'layout' => array(
				'allowSwitching' => false,
				'allowInheriting' => false,
				'allowSizingOnChildren' => true,
				'default' => array(
					'type' => 'flex',
					'justifyContent' => 'space-between'
				)
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true
			)
		),
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js'
	),
	'cart-line-item-amount' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/cart-line-item-amount',
		'title' => 'Line item amount',
		'description' => 'Display the product line item amount.',
		'version' => '1.0.0',
		'category' => 'surecart-cart',
		'ancestor' => array(
			'surecart/slide-out-cart-items',
			'surecart/slide-out-cart-line-items'
		),
		'example' => array(
			
		),
		'textdomain' => 'surecart',
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => true,
				'__experimentalDefaultControls' => array(
					'text' => true,
					'background' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			)
		),
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'cart-line-item-details' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/cart-line-item-details',
		'title' => 'Line item details',
		'description' => 'Collapsible container for the line item\'s extra details (variant, bundle items, note) shown under a cart line item.',
		'version' => '1.0.0',
		'category' => 'surecart-cart',
		'ancestor' => array(
			'surecart/slide-out-cart-items',
			'surecart/slide-out-cart-line-items'
		),
		'attributes' => array(
			'expanded' => array(
				'type' => 'boolean',
				'default' => false
			),
			'collapseAfter' => array(
				'type' => 'number',
				'default' => 2
			)
		),
		'example' => array(
			
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => true,
				'__experimentalDefaultControls' => array(
					'text' => true,
					'background' => true
				)
			),
			'spacing' => array(
				'padding' => true,
				'margin' => array(
					'top',
					'bottom'
				),
				'blockGap' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'viewScriptModule' => array(
			'@surecart/line-item-details'
		)
	),
	'cart-line-item-fees' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/cart-line-item-fees',
		'title' => 'Line item fees',
		'description' => 'Display the product line item fees.',
		'version' => '1.0.0',
		'category' => 'surecart-cart',
		'ancestor' => array(
			'surecart/slide-out-cart-items',
			'surecart/slide-out-cart-line-items'
		),
		'example' => array(
			
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => true,
				'__experimentalDefaultControls' => array(
					'text' => true,
					'background' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'cart-line-item-image' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/cart-line-item-image',
		'title' => 'Line Item Image',
		'description' => 'Display the product line item image.',
		'version' => '1.0.0',
		'category' => 'surecart-cart',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/slide-out-cart-items',
			'surecart/slide-out-cart-line-items'
		),
		'attributes' => array(
			'sizing' => array(
				'type' => 'string',
				'default' => 'cover'
			),
			'aspectRatio' => array(
				'type' => 'string'
			),
			'width' => array(
				'type' => 'string'
			),
			'height' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'align' => array(
				'left',
				'center',
				'right',
				'wide',
				'full'
			),
			'color' => array(
				'text' => false,
				'background' => false
			),
			'filter' => array(
				'duotone' => true
			),
			'spacing' => array(
				'margin' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'width' => true,
				'__experimentalSkipSerialization' => true,
				'__experimentalDefaultControls' => array(
					'color' => true,
					'radius' => true,
					'width' => true
				)
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'cart-line-item-interval' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/cart-line-item-interval',
		'title' => 'Line item interval',
		'description' => 'Display the product line item interval.',
		'version' => '1.0.0',
		'category' => 'surecart-cart',
		'ancestor' => array(
			'surecart/slide-out-cart-items',
			'surecart/slide-out-cart-line-items'
		),
		'example' => array(
			
		),
		'textdomain' => 'surecart',
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => true,
				'__experimentalDefaultControls' => array(
					'text' => true,
					'background' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			)
		),
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'cart-line-item-note' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/cart-line-item-note',
		'title' => 'Line item note',
		'description' => 'Display the product line item note.',
		'version' => '1.0.0',
		'category' => 'surecart-cart',
		'ancestor' => array(
			'surecart/slide-out-cart-items',
			'surecart/slide-out-cart-line-items'
		),
		'example' => array(
			
		),
		'textdomain' => 'surecart',
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => true,
				'__experimentalDefaultControls' => array(
					'text' => true,
					'background' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			)
		),
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'viewScriptModule' => array(
			'@surecart/line-item-note'
		)
	),
	'cart-line-item-price-name' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/cart-line-item-price-name',
		'title' => 'Line item price name',
		'description' => 'Display the product line item price name.',
		'version' => '1.0.0',
		'category' => 'surecart-cart',
		'ancestor' => array(
			'surecart/slide-out-cart-items',
			'surecart/slide-out-cart-line-items'
		),
		'example' => array(
			
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => true,
				'__experimentalDefaultControls' => array(
					'text' => true,
					'background' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'cart-line-item-quantity' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/cart-line-item-quantity',
		'title' => 'Line item quantity',
		'description' => 'Display the product line item quantity.',
		'version' => '1.0.0',
		'category' => 'surecart-cart',
		'ancestor' => array(
			'surecart/slide-out-cart-items',
			'surecart/slide-out-cart-line-items'
		),
		'usesContext' => array(
			'editable'
		),
		'example' => array(
			
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => true,
				'__experimentalDefaultControls' => array(
					'text' => true,
					'background' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'cart-line-item-remove' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/cart-line-item-remove',
		'title' => 'Line item remove',
		'description' => 'Display the product line item remove.',
		'version' => '1.0.0',
		'category' => 'surecart-cart',
		'ancestor' => array(
			'surecart/slide-out-cart-items',
			'surecart/slide-out-cart-line-items'
		),
		'usesContext' => array(
			'removable'
		),
		'example' => array(
			
		),
		'attributes' => array(
			'show_label' => array(
				'type' => 'boolean',
				'default' => true
			),
			'label' => array(
				'type' => 'string'
			),
			'icon' => array(
				'type' => 'string',
				'default' => 'x'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => true,
				'__experimentalDefaultControls' => array(
					'text' => true,
					'background' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'style' => 'file:./style-index.css',
		'editorScript' => 'file:./index.js'
	),
	'cart-line-item-scratch-amount' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/cart-line-item-scratch-amount',
		'title' => 'Line item scratch amount',
		'description' => 'Display the product line item scratch amount.',
		'version' => '1.0.0',
		'category' => 'surecart-cart',
		'ancestor' => array(
			'surecart/slide-out-cart-items',
			'surecart/slide-out-cart-line-items'
		),
		'example' => array(
			
		),
		'textdomain' => 'surecart',
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => true,
				'__experimentalDefaultControls' => array(
					'text' => true,
					'background' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			)
		),
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'cart-line-item-status' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/cart-line-item-status',
		'title' => 'Line item status',
		'description' => 'Display the product line item status.',
		'version' => '1.0.0',
		'category' => 'surecart-cart',
		'ancestor' => array(
			'surecart/slide-out-cart-items',
			'surecart/slide-out-cart-line-items'
		),
		'example' => array(
			
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => true,
				'__experimentalDefaultControls' => array(
					'text' => true,
					'background' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'cart-line-item-title' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/cart-line-item-title',
		'title' => 'Line Item Title',
		'description' => 'Display the product line item title.',
		'version' => '1.0.0',
		'category' => 'surecart-cart',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/slide-out-cart-items',
			'surecart/slide-out-cart-line-items'
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => true,
				'__experimentalDefaultControls' => array(
					'text' => true,
					'background' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'cart-line-item-trial' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/cart-line-item-trial',
		'title' => 'Line item trial',
		'description' => 'Display the product line item trial.',
		'version' => '1.0.0',
		'category' => 'surecart-cart',
		'ancestor' => array(
			'surecart/slide-out-cart-items',
			'surecart/slide-out-cart-line-items'
		),
		'example' => array(
			
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => true,
				'__experimentalDefaultControls' => array(
					'text' => true,
					'background' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'cart-line-item-variant' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/cart-line-item-variant',
		'title' => 'Line item variant',
		'description' => 'Display the product line item variant, or the included items when the product is a bundle.',
		'version' => '1.0.0',
		'category' => 'surecart-cart',
		'ancestor' => array(
			'surecart/cart-line-item-details',
			'surecart/slide-out-cart-items',
			'surecart/slide-out-cart-line-items'
		),
		'example' => array(
			
		),
		'attributes' => array(
			'showAllBundleItems' => array(
				'type' => 'boolean',
				'default' => true
			),
			'separator' => array(
				'type' => 'string',
				'default' => '·'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => true,
				'__experimentalDefaultControls' => array(
					'text' => true,
					'background' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'cart-line-items' => array(
		'$schema' => 'https://json.schemastore.org/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/slide-out-cart-line-items',
		'title' => 'Cart Items',
		'description' => 'The cart items',
		'category' => 'surecart-cart',
		'version' => '1.0.0',
		'example' => array(
			
		),
		'textdomain' => 'surecart',
		'ancestor' => array(
			'surecart/slide-out-cart'
		),
		'providesContext' => array(
			'editable' => 'editable',
			'removable' => 'removable'
		),
		'attributes' => array(
			'removable' => array(
				'type' => 'boolean',
				'default' => true
			),
			'editable' => array(
				'type' => 'boolean',
				'default' => true
			),
			'border' => array(
				'type' => 'boolean',
				'default' => true
			),
			'padding' => array(
				'type' => 'object',
				'default' => array(
					'top' => '1.25em',
					'left' => '1.25em',
					'bottom' => '1.25em',
					'right' => '1.25em'
				)
			),
			'backgroundColor' => array(
				'type' => 'string'
			),
			'textColor' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'html' => false,
			'multiple' => false,
			'layout' => array(
				'allowSizingOnChildren' => false
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'blockGap' => array(
					'__experimentalDefault' => '1.25em'
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true
			),
			'color' => array(
				'text' => true,
				'background' => true,
				'enableContrastChecker' => true
			)
		),
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'surecart-line-item',
			'surecart-product-line-item',
			'surecart-input-group',
			'surecart-quantity-selector',
			'surecart-toggle',
			'file:./style-index.css'
		),
		'editorStyle' => array(
			'file:./index.css'
		),
		'viewScriptModule' => array(
			'@surecart/cart'
		)
	),
	'cart-menu-button' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/cart-menu-icon-button',
		'title' => 'Cart Toggle Icon',
		'description' => 'The cart menu icon that shows your cart quantity.',
		'version' => '1.0.0',
		'category' => 'surecart-cart',
		'example' => array(
			
		),
		'attributes' => array(
			'cart_icon' => array(
				'type' => 'string',
				'default' => 'shopping-bag'
			),
			'cart_menu_always_shown' => array(
				'type' => 'boolean',
				'default' => true
			)
		),
		'supports' => array(
			'interactivity' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'__experimentalDefaultControls' => array(
					'padding' => true,
					'margin' => true
				)
			),
			'color' => array(
				'text' => true,
				'background' => false
			),
			'__experimentalBorder' => array(
				'width' => true,
				'color' => true,
				'__experimentalDefaultControls' => array(
					'width' => true,
					'color' => true
				)
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'file:./style-index.css'
		),
		'editorStyle' => array(
			'surecart-choice',
			'file:./index.css'
		),
		'viewScriptModule' => array(
			'@surecart/checkout'
		)
	),
	'cart-message' => array(
		'$schema' => 'https://json.schemastore.org/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/slide-out-cart-message',
		'title' => 'Cart Message',
		'description' => 'Display a custom message in the cart',
		'category' => 'surecart-cart',
		'version' => '1.0.0',
		'example' => array(
			
		),
		'textdomain' => 'surecart',
		'ancestor' => array(
			'surecart/slide-out-cart'
		),
		'attributes' => array(
			'text' => array(
				'type' => 'string'
			),
			'border' => array(
				'type' => 'boolean',
				'default' => true
			),
			'padding' => array(
				'type' => 'object',
				'default' => array(
					'top' => '1.25em',
					'left' => '1.25em',
					'bottom' => '1.25em',
					'right' => '1.25em'
				)
			),
			'backgroundColor' => array(
				'type' => 'string'
			),
			'textColor' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'html' => false,
			'multiple' => false,
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			)
		),
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'surecart-text',
			'file:./style-index.css'
		)
	),
	'cart-order-bump-add-button' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/cart-order-bump-add-button',
		'title' => 'Order Bump Add Button',
		'description' => 'Button to add the order bump to cart.',
		'version' => '1.0.0',
		'category' => 'surecart-cart',
		'ancestor' => array(
			'surecart/cart-order-bump-template'
		),
		'supports' => array(
			'interactivity' => true,
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true
				)
			),
			'color' => array(
				'text' => true,
				'background' => true,
				'__experimentalDefaultControls' => array(
					'background' => true,
					'text' => true
				)
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'width' => true,
				'__experimentalDefaultControls' => array(
					'color' => true,
					'width' => true
				)
			),
			'spacing' => array(
				'padding' => true
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'cart-order-bump-amount' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/cart-order-bump-amount',
		'title' => 'Order Bump Amount',
		'description' => 'Display the order bump price.',
		'version' => '1.0.0',
		'category' => 'surecart-cart',
		'keywords' => array(
			'order bump',
			'amount',
			'price'
		),
		'ancestor' => array(
			'surecart/cart-order-bump-template'
		),
		'example' => array(
			
		),
		'textdomain' => 'surecart',
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => true,
				'__experimentalDefaultControls' => array(
					'text' => true,
					'background' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			)
		),
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js'
	),
	'cart-order-bump-cta' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/cart-order-bump-cta',
		'title' => 'Order Bump CTA',
		'description' => 'Display the order bump call to action text.',
		'version' => '1.0.0',
		'keywords' => array(
			'cta',
			'order bump'
		),
		'category' => 'surecart-cart',
		'ancestor' => array(
			'surecart/cart-order-bump-template'
		),
		'supports' => array(
			'interactivity' => true,
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true
			),
			'color' => array(
				'text' => true,
				'background' => true
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'cart-order-bump-description' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/cart-order-bump-description',
		'title' => 'Order Bump Description',
		'description' => 'Display the order bump description.',
		'version' => '1.0.0',
		'category' => 'surecart-cart',
		'keywords' => array(
			'order bump',
			'description'
		),
		'ancestor' => array(
			'surecart/cart-order-bump-template'
		),
		'supports' => array(
			'interactivity' => true,
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true
			),
			'color' => array(
				'text' => true,
				'background' => true
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'cart-order-bump-discount-badge' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/cart-order-bump-discount-badge',
		'title' => 'Order Bump Discount Badge',
		'description' => 'Display the order bump discount badge.',
		'version' => '1.0.0',
		'category' => 'surecart-cart',
		'ancestor' => array(
			'surecart/cart-order-bump-template'
		),
		'example' => array(
			
		),
		'textdomain' => 'surecart',
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => true,
				'__experimentalDefaultControls' => array(
					'text' => true,
					'background' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true
			),
			'__experimentalBorder' => array(
				'radius' => true,
				'width' => true,
				'color' => true,
				'style' => true
			)
		),
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'cart-order-bump-image' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/cart-order-bump-image',
		'title' => 'Order Bump Image',
		'description' => 'Display the order bump product image.',
		'version' => '1.0.0',
		'category' => 'surecart-cart',
		'ancestor' => array(
			'surecart/cart-order-bump-template'
		),
		'attributes' => array(
			'sizing' => array(
				'type' => 'string',
				'default' => 'cover'
			),
			'aspectRatio' => array(
				'type' => 'string',
				'default' => '1'
			),
			'width' => array(
				'type' => 'string'
			),
			'height' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'align' => array(
				'left',
				'center',
				'right',
				'wide',
				'full'
			),
			'color' => array(
				'text' => false,
				'background' => false
			),
			'filter' => array(
				'duotone' => true
			),
			'spacing' => array(
				'margin' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'width' => true,
				'__experimentalSkipSerialization' => true,
				'__experimentalDefaultControls' => array(
					'color' => true,
					'radius' => true,
					'width' => true
				)
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'cart-order-bump-pagination' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/cart-order-bump-pagination',
		'title' => 'Order Bump Pagination',
		'description' => 'Pagination controls for order bumps.',
		'version' => '1.0.0',
		'category' => 'surecart-cart',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/cart-order-bumps'
		),
		'allowedBlocks' => array(
			'surecart/cart-order-bump-pagination-previous',
			'surecart/cart-order-bump-pagination-next'
		),
		'providesContext' => array(
			'paginationArrow' => 'paginationArrow',
			'paginationArrowSize' => 'paginationArrowSize'
		),
		'attributes' => array(
			'paginationArrow' => array(
				'type' => 'string',
				'default' => 'chevron'
			),
			'paginationArrowSize' => array(
				'type' => 'number',
				'default' => 20
			)
		),
		'supports' => array(
			'interactivity' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => array(
					'top',
					'bottom'
				),
				'blockGap' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true
			),
			'color' => array(
				'text' => true,
				'background' => false,
				'enableContrastChecker' => true
			),
			'layout' => array(
				'allowSwitching' => false,
				'allowInheriting' => false,
				'default' => array(
					'type' => 'flex',
					'justifyContent' => 'center'
				)
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'cart-order-bump-pagination-next' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/cart-order-bump-pagination-next',
		'title' => 'Order Bump Next',
		'description' => 'Navigate to the next page of order bumps.',
		'version' => '1.0.0',
		'category' => 'surecart-cart',
		'ancestor' => array(
			'surecart/cart-order-bump-pagination'
		),
		'usesContext' => array(
			'paginationArrow',
			'paginationArrowSize'
		),
		'supports' => array(
			'interactivity' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => array(
					'top',
					'bottom'
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true
			),
			'color' => array(
				'text' => true,
				'background' => true,
				'enableContrastChecker' => true
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'cart-order-bump-pagination-previous' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/cart-order-bump-pagination-previous',
		'title' => 'Order Bump Previous',
		'description' => 'Navigate to the previous page of order bumps.',
		'version' => '1.0.0',
		'category' => 'surecart-cart',
		'ancestor' => array(
			'surecart/cart-order-bump-pagination'
		),
		'usesContext' => array(
			'paginationArrow',
			'paginationArrowSize'
		),
		'supports' => array(
			'interactivity' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => array(
					'top',
					'bottom'
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true
			),
			'color' => array(
				'text' => true,
				'background' => true,
				'enableContrastChecker' => true
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'cart-order-bump-scratch-amount' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/cart-order-bump-scratch-amount',
		'title' => 'Order Bump Scratch Amount',
		'description' => 'Display the order bump original price (strikethrough).',
		'version' => '1.0.0',
		'category' => 'surecart-cart',
		'ancestor' => array(
			'surecart/cart-order-bump-template'
		),
		'example' => array(
			
		),
		'textdomain' => 'surecart',
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => true,
				'__experimentalDefaultControls' => array(
					'text' => true,
					'background' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			)
		),
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'cart-order-bump-template' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/cart-order-bump-template',
		'title' => 'Order Bump Template',
		'description' => 'Template for rendering each order bump item.',
		'version' => '1.0.0',
		'category' => 'surecart-cart',
		'ancestor' => array(
			'surecart/cart-order-bumps'
		),
		'usesContext' => array(
			'surecart/order-bumps/perPage'
		),
		'supports' => array(
			'interactivity' => true,
			'inserter' => false,
			'layout' => array(
				'default' => array(
					'type' => 'grid',
					'columnCount' => 3
				),
				'allowSwitching' => true
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'blockGap' => true
			),
			'color' => array(
				'background' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'width' => true
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'cart-order-bump-title' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/cart-order-bump-title',
		'title' => 'Order Bump Title',
		'description' => 'Display the order bump product title.',
		'version' => '1.0.0',
		'category' => 'surecart-cart',
		'ancestor' => array(
			'surecart/cart-order-bump-template'
		),
		'supports' => array(
			'interactivity' => true,
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true
			),
			'color' => array(
				'text' => true,
				'background' => true
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'cart-order-bumps' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/cart-order-bumps',
		'title' => 'Order Bumps',
		'description' => 'Display recommended order bumps in the cart.',
		'version' => '1.0.0',
		'category' => 'surecart-cart',
		'ancestor' => array(
			'surecart/slide-out-cart'
		),
		'attributes' => array(
			'hideAddedItems' => array(
				'type' => 'boolean',
				'default' => true
			),
			'style' => array(
				'type' => 'object',
				'default' => array(
					'spacing' => array(
						'margin' => array(
							'bottom' => '1em',
							'top' => '1em'
						),
						'padding' => array(
							'top' => '1.5em',
							'bottom' => '1.5em',
							'left' => '2em',
							'right' => '2em'
						)
					),
					'border' => array(
						'top' => array(
							'color' => '#b0b0b069',
							'width' => '1px'
						)
					)
				)
			)
		),
		'supports' => array(
			'interactivity' => true,
			'html' => false,
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'blockGap' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true
			),
			'color' => array(
				'text' => true,
				'background' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'width' => true,
				'style' => true,
				'__experimentalDefaultControls' => array(
					'color' => true,
					'width' => true
				)
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'viewScriptModule' => array(
			'@surecart/checkout',
			'@surecart/order-bumps'
		),
		'style' => 'file:./style-index.css'
	),
	'cart-submit' => array(
		'$schema' => 'https://json.schemastore.org/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/slide-out-cart-submit',
		'title' => 'Cart Submit Button',
		'description' => 'The cart submit button',
		'textdomain' => 'surecart',
		'version' => '1.0.0',
		'category' => 'surecart-cart',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/slide-out-cart'
		),
		'attributes' => array(
			'text' => array(
				'type' => 'string'
			),
			'border' => array(
				'type' => 'boolean'
			),
			'sectionBackgroundColor' => array(
				'type' => 'string'
			),
			'padding' => array(
				'type' => 'object',
				'default' => array(
					'top' => '1.25em',
					'left' => '1.25em',
					'bottom' => '1.25em',
					'right' => '1.25em'
				)
			)
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'align' => false,
			'alignWide' => false,
			'html' => false,
			'inserter' => false,
			'multiple' => false,
			'__experimentalSelector' => '.wp-block-button .wp-block-button__link',
			'color' => array(
				'__experimentalSkipSerialization' => true,
				'background' => true,
				'text' => true
			)
		),
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'surecart-wp-buttons',
			'surecart-wp-button',
			'file:./style-index.css',
			'wp-block-button'
		)
	),
	'cart-subtotal' => array(
		'$schema' => 'https://json.schemastore.org/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/slide-out-cart-subtotal',
		'title' => 'Cart Subtotal',
		'description' => 'Display the cart subtotal',
		'keywords' => array(
			'cart',
			'subtotal'
		),
		'category' => 'surecart-cart',
		'textdomain' => 'surecart',
		'version' => '1.0.0',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/slide-out-cart'
		),
		'attributes' => array(
			'label' => array(
				'type' => 'string'
			),
			'border' => array(
				'type' => 'boolean',
				'default' => true
			),
			'padding' => array(
				'type' => 'object',
				'default' => array(
					'top' => '1.25em',
					'left' => '1.25em',
					'bottom' => '1.25em',
					'right' => '1.25em'
				)
			),
			'backgroundColor' => array(
				'type' => 'string'
			),
			'textColor' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'html' => false,
			'multiple' => false,
			'inserter' => false,
			'currencyConversion' => true
		),
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'surecart-line-item',
			'surecart-product-line-item'
		)
	),
	'cart-subtotal-amount' => array(
		'$schema' => 'https://json.schemastore.org/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/cart-subtotal-amount',
		'title' => 'Cart Subtotal Amount',
		'description' => 'Display the cart subtotal amount',
		'keywords' => array(
			'cart',
			'subtotal',
			'amount'
		),
		'category' => 'surecart-cart',
		'textdomain' => 'surecart',
		'version' => '1.0.0',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/slide-out-cart'
		),
		'supports' => array(
			'interactivity' => true,
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => true,
				'__experimentalDefaultControls' => array(
					'text' => true,
					'background' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			)
		),
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'cart-subtotal-scratch-amount' => array(
		'$schema' => 'https://json.schemastore.org/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/cart-subtotal-scratch-amount',
		'title' => 'Cart Subtotal Scratch Amount',
		'description' => 'Display the cart subtotal scratch amount (original price before discount).',
		'keywords' => array(
			'cart',
			'subtotal',
			'scratch',
			'discount'
		),
		'category' => 'surecart-cart',
		'textdomain' => 'surecart',
		'version' => '1.0.0',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/slide-out-cart'
		),
		'supports' => array(
			'interactivity' => true,
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => true,
				'__experimentalDefaultControls' => array(
					'text' => true,
					'background' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			)
		),
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'currency-switcher' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/currency-switcher',
		'title' => 'Currency Switcher',
		'description' => 'Display a currency switcher dropdown.',
		'version' => '1.0.0',
		'category' => 'surecart',
		'example' => array(
			
		),
		'attributes' => array(
			'position' => array(
				'type' => 'string',
				'default' => 'right'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => array(
					'top',
					'bottom'
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true
			),
			'color' => array(
				'text' => true,
				'background' => false,
				'enableContrastChecker' => true
			),
			'currencyConversion' => true
		),
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'render' => 'file:./view.php',
		'style' => array(
			'surecart-dropdown',
			'surecart-button',
			'file:./style-index.css'
		),
		'viewScriptModule' => array(
			'@surecart/dropdown',
			'file:./view.js'
		)
	),
	'icon' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/icon',
		'title' => 'Icon',
		'description' => 'Display an icon from the SureCart icon library.',
		'version' => '1.0.0',
		'category' => 'surecart',
		'icon' => 'star-filled',
		'keywords' => array(
			'icon',
			'svg',
			'graphic'
		),
		'example' => array(
			
		),
		'attributes' => array(
			'icon_name' => array(
				'type' => 'string',
				'default' => 'star'
			),
			'size' => array(
				'type' => 'number',
				'default' => 24
			),
			'stroke_width' => array(
				'type' => 'number',
				'default' => 2
			),
			'link_url' => array(
				'type' => 'string'
			),
			'link_target' => array(
				'type' => 'string',
				'default' => '_self'
			),
			'link_rel' => array(
				'type' => 'string'
			),
			'nofollow' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'supports' => array(
			'html' => false,
			'align' => true,
			'color' => array(
				'gradients' => true,
				'link' => false,
				'__experimentalDefaultControls' => array(
					'background' => true,
					'text' => true
				)
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true,
				'__experimentalDefaultControls' => array(
					'padding' => true,
					'margin' => true
				)
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true,
				'__experimentalDefaultControls' => array(
					'radius' => true
				)
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./controller.php',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'price-amount' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/price-amount',
		'title' => 'Price Amount',
		'description' => 'Displays amount of a price.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'usesContext' => array(
			'surecart/priceId',
			'surecart/price'
		),
		'ancestor' => array(
			'surecart/product-price-choice-template'
		),
		'icon' => 'money-alt',
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => true,
				'__experimentalDefaultControls' => array(
					'text' => true,
					'background' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true,
					'textAlign' => true
				)
			),
			'currencyConversion' => true
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js'
	),
	'price-interval' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/price-interval',
		'title' => 'Price Interval',
		'description' => 'Displays the price interval.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'icon' => 'money-alt',
		'usesContext' => array(
			'surecart/priceId',
			'surecart/price'
		),
		'ancestor' => array(
			'surecart/product-price-choice-template'
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => true,
				'__experimentalDefaultControls' => array(
					'text' => true,
					'background' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true,
					'textAlign' => true
				)
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js'
	),
	'price-name' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/price-name',
		'title' => 'Price Name',
		'description' => 'Displays the name of a price.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'usesContext' => array(
			'surecart/priceId',
			'surecart/price',
			'postId'
		),
		'ancestor' => array(
			'surecart/product-price-choice-template'
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => true,
				'__experimentalDefaultControls' => array(
					'text' => true,
					'background' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js'
	),
	'price-scratch-amount' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/price-scratch-amount',
		'title' => 'Price Scratch Amount',
		'description' => 'Displays scratch amount of a price.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'icon' => 'money-alt',
		'usesContext' => array(
			'surecart/priceId',
			'surecart/price'
		),
		'ancestor' => array(
			'surecart/product-price-choice-template'
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => true,
				'__experimentalDefaultControls' => array(
					'text' => true,
					'background' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true,
					'textAlign' => true
				)
			),
			'currencyConversion' => true
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'file:./style-index.css'
		)
	),
	'price-setup-fee' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/price-setup-fee',
		'title' => 'Price Setup Fee',
		'description' => 'Displays the setup fee of a price.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'icon' => 'money-alt',
		'usesContext' => array(
			'surecart/priceId',
			'surecart/price'
		),
		'ancestor' => array(
			'surecart/product-price-choice-template'
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => true,
				'__experimentalDefaultControls' => array(
					'text' => true,
					'background' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			),
			'currencyConversion' => true
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js'
	),
	'price-trial' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/price-trial',
		'title' => 'Price Trial',
		'description' => 'Displays trial of a price.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'icon' => 'clock',
		'usesContext' => array(
			'surecart/priceId',
			'surecart/price'
		),
		'ancestor' => array(
			'surecart/product-price-choice-template'
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => true,
				'__experimentalDefaultControls' => array(
					'text' => true,
					'background' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			),
			'currencyConversion' => true
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js'
	),
	'product-buy-button' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-buy-button',
		'title' => 'Product Buy Button',
		'description' => 'Display the product buy button.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'icon' => 'media-interactive',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-buy-buttons'
		),
		'usesContext' => array(
			'surecart/product',
			'postId',
			'providerBlock'
		),
		'attributes' => array(
			'add_to_cart' => array(
				'type' => 'boolean',
				'default' => false
			),
			'show_sticky_purchase_button' => array(
				'type' => 'string',
				'enum' => array(
					'never',
					'in_stock',
					'always'
				),
				'default' => 'never'
			),
			'text' => array(
				'type' => 'string'
			),
			'out_of_stock_text' => array(
				'type' => 'string'
			),
			'unavailable_text' => array(
				'type' => 'string'
			),
			'width' => array(
				'type' => 'number',
				'default' => 100
			)
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'spacing' => array(
				'__experimentalSkipSerialization' => true,
				'padding' => array(
					'horizontal',
					'vertical'
				),
				'margin' => array(
					'top',
					'bottom'
				)
			),
			'color' => array(
				'__experimentalSkipSerialization' => true,
				'gradients' => true,
				'__experimentalDefaultControls' => array(
					'background' => true,
					'text' => true
				)
			),
			'__experimentalSelector' => '.wp-block-button .wp-block-button__link',
			'typography' => array(
				'fontSize' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true
			),
			'reusable' => false,
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true,
				'__experimentalSkipSerialization' => true,
				'__experimentalDefaultControls' => array(
					'color' => true,
					'radius' => true,
					'style' => true,
					'width' => true
				)
			),
			'__experimentalStyle' => array(
				'variations' => array(
					'outline' => array(
						'border' => array(
							'color' => 'currentColor',
							'width' => '2px',
							'style' => 'solid'
						),
						'color' => array(
							'text' => 'currentColor',
							'gradient' => 'transparent none'
						)
					)
				)
			)
		),
		'variations' => array(
			array(
				'name' => 'cart',
				'title' => 'Add To Cart Button',
				'icon' => 'cart',
				'description' => 'Add a button to add the product to the cart.',
				'attributes' => array(
					'add_to_cart' => true,
					'text' => 'Add To Cart'
				),
				'isDefault' => true,
				'isActive' => array(
					'add_to_cart'
				),
				'scope' => array(
					'inserter',
					'block',
					'transform'
				)
			),
			array(
				'name' => 'buy',
				'title' => 'Buy Now Button',
				'icon' => 'store',
				'description' => 'Add a button to buy the product.',
				'attributes' => array(
					'add_to_cart' => false,
					'text' => 'Buy Now'
				),
				'isActive' => array(
					'add_to_cart'
				),
				'scope' => array(
					'inserter',
					'block',
					'transform'
				)
			)
		),
		'styles' => array(
			array(
				'name' => 'fill',
				'label' => 'Fill',
				'isDefault' => true
			),
			array(
				'name' => 'outline',
				'label' => 'Outline'
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'editorStyle' => array(
			'surecart-wp-button'
		),
		'style' => array(
			'surecart-wp-button',
			'surecart-spinner'
		),
		'viewScriptModule' => array(
			'@surecart/checkout',
			'@surecart/cart'
		)
	),
	'product-buy-buttons' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-buy-buttons',
		'title' => 'Buy Buttons',
		'description' => 'Displays product buy and add to cart buttons',
		'category' => 'surecart-product-page',
		'keywords' => array(
			'button',
			'buy',
			'product'
		),
		'ancestor' => array(
			'surecart/product-page',
			'surecart/product-quick-view',
			'surecart/product-template',
			'surecart/sticky-purchase'
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'align' => array(
				'wide',
				'full'
			),
			'html' => false,
			'__experimentalExposeControlsToChildren' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'blockGap' => true,
				'__experimentalDefaultControls' => array(
					'padding' => true,
					'margin' => true,
					'blockGap' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true
				)
			),
			'__experimentalLayout' => array(
				'allowSwitching' => false,
				'allowInheriting' => false,
				'default' => array(
					'type' => 'flex'
				)
			),
			'layout' => array(
				'allowSwitching' => false,
				'allowInheriting' => false,
				'default' => array(
					'type' => 'flex'
				)
			)
		),
		'style' => array(
			'surecart-wp-buttons',
			'file:./style-index.css'
		),
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'textdomain' => 'surecart'
	),
	'product-collection-tag' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-collection-tag',
		'title' => 'Tag',
		'description' => 'A product collection tag for a product.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'ancestor' => array(
			'surecart/product-collection-tags'
		),
		'usesContext' => array(
			'surecart/productCollectionTag/name'
		),
		'attributes' => array(
			'isLink' => array(
				'type' => 'boolean',
				'default' => true
			)
		),
		'supports' => array(
			'interactivity' => true,
			'inserter' => false,
			'anchor' => true,
			'color' => array(
				'gradients' => true,
				'__experimentalDefaultControls' => array(
					'background' => true,
					'text' => true
				),
				'enableContrastChecker' => true
			),
			'spacing' => array(
				'padding' => true,
				'margin' => array(
					'top',
					'bottom'
				)
			),
			'typography' => array(
				'lineHeight' => true,
				'fontSize' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true
			),
			'__experimentalBorder' => array(
				'width' => true,
				'color' => true,
				'radius' => true,
				'__experimentalDefaultControls' => array(
					'radius' => true,
					'color' => true,
					'width' => true
				)
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'file:./style-index.css',
			'surecart-tag'
		)
	),
	'product-collection-tags' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-collection-tags',
		'title' => 'Collection Tags',
		'description' => 'Displays collection selectors for a product.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'ancestor' => array(
			'surecart/product-page',
			'surecart/product-template',
			'surecart/product-quick-view',
			'surecart/sticky-purchase'
		),
		'usesContext' => array(
			'postId'
		),
		'attributes' => array(
			'count' => array(
				'type' => 'number',
				'default' => 1
			)
		),
		'supports' => array(
			'interactivity' => true,
			'html' => false,
			'anchor' => true,
			'layout' => array(
				'allowSwitching' => false,
				'allowInheriting' => false,
				'default' => array(
					'type' => 'flex'
				)
			),
			'color' => array(
				'__experimentalDefaultControls' => array(
					'background' => true,
					'text' => true
				)
			),
			'spacing' => array(
				'blockGap' => array(
					'__experimentalDefault' => '3px'
				),
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => array(
					'horizontal',
					'vertical'
				)
			),
			'__experimentalBorder' => array(
				'width' => true,
				'color' => true,
				'radius' => true,
				'__experimentalDefaultControls' => array(
					'radius' => true,
					'color' => true,
					'width' => true
				)
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'file:./style-index.css'
		)
	),
	'product-description' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-description',
		'title' => 'Product Description',
		'description' => 'Display the product description.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'ancestor' => array(
			'surecart/product-page',
			'surecart/product-template',
			'surecart/product-quick-view',
			'surecart/sticky-purchase'
		),
		'usesContext' => array(
			'postId'
		),
		'supports' => array(
			'interactivity' => true,
			'reusable' => false,
			'html' => false,
			'color' => array(
				'gradients' => true,
				'link' => false,
				'__experimentalDefaultControls' => array(
					'background' => true,
					'text' => true,
					'link' => true
				)
			),
			'spacing' => array(
				'margin' => array(
					'top',
					'bottom'
				),
				'padding' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'style' => array(
			'surecart-prose'
		),
		'editorScript' => 'file:./index.js'
	),
	'product-image' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-image',
		'title' => 'Image',
		'description' => 'Display the product image.',
		'version' => '1.0.0',
		'category' => 'surecart-product-list',
		'example' => array(
			
		),
		'usesContext' => array(
			'postId'
		),
		'ancestor' => array(
			'surecart/product-list'
		),
		'attributes' => array(
			'sizing' => array(
				'type' => 'string',
				'default' => 'cover'
			),
			'aspectRatio' => array(
				'type' => 'string'
			),
			'width' => array(
				'type' => 'string'
			),
			'height' => array(
				'type' => 'string'
			),
			'isLink' => array(
				'type' => 'boolean',
				'default' => false
			),
			'rel' => array(
				'type' => 'string',
				'attribute' => 'rel',
				'default' => ''
			),
			'linkTarget' => array(
				'type' => 'string',
				'default' => '_self'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'inserter' => false,
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'__experimentalDefaultControls' => array(
					'padding' => true,
					'margin' => true
				)
			),
			'color' => array(
				'text' => false,
				'background' => false
			),
			'__experimentalBorder' => array(
				'width' => true,
				'color' => true,
				'radius' => true,
				'__experimentalDefaultControls' => array(
					'width' => true,
					'color' => true,
					'radius' => true
				)
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'product-line-item-note' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-line-item-note',
		'title' => 'Product Note',
		'description' => 'Allow customers to add a note to the product',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'ancestor' => array(
			'surecart/product-page',
			'surecart/product-template'
		),
		'keywords' => array(
			'note',
			'comment',
			'message',
			'product'
		),
		'attributes' => array(
			'label' => array(
				'type' => 'string'
			),
			'placeholder' => array(
				'type' => 'string'
			),
			'help_text' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'typography' => array(
				'fontSize' => true
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'__experimentalDefaultControls' => array(
					'padding' => true,
					'margin' => true
				)
			),
			'color' => array(
				'gradients' => false,
				'background' => false,
				'link' => false,
				'__experimentalDefaultControls' => array(
					'background' => true,
					'text' => true
				)
			),
			'__experimentalBorder' => array(
				'radius' => true,
				'__experimentalDefaultControls' => array(
					'radius' => true
				)
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'surecart-form-control',
			'file:./style-index.css'
		)
	),
	'product-list' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-list',
		'title' => 'Product List',
		'description' => 'Display a list of products.',
		'version' => '1.0.0',
		'category' => 'surecart-product-list',
		'example' => array(
			'innerBlocks' => array(
				array(
					'name' => 'surecart/product-list',
					'attributes' => array(
						'metadata' => array(
							'categories' => array(
								'surecart_shop'
							),
							'patternName' => 'surecart-list-standard',
							'name' => 'Standard'
						),
						'align' => 'wide',
						'style' => array(
							'spacing' => array(
								'blockGap' => '10px',
								'margin' => array(
									'left' => '0px',
									'right' => '0px'
								)
							)
						)
					),
					'innerBlocks' => array(
						array(
							'name' => 'core/group',
							'attributes' => array(
								'style' => array(
									'spacing' => array(
										'margin' => array(
											'bottom' => '10px'
										),
										'padding' => array(
											'top' => '0',
											'bottom' => '0',
											'left' => '0',
											'right' => '0'
										)
									)
								),
								'layout' => array(
									'type' => 'flex',
									'justifyContent' => 'space-between'
								)
							),
							'innerBlocks' => array(
								array(
									'name' => 'core/group',
									'attributes' => array(
										'style' => array(
											'spacing' => array(
												'padding' => array(
													'top' => '0',
													'bottom' => '0',
													'left' => '0',
													'right' => '0'
												)
											)
										),
										'layout' => array(
											'type' => 'flex',
											'flexWrap' => 'nowrap'
										)
									),
									'innerBlocks' => array(
										array(
											'name' => 'surecart/product-list-sort'
										),
										array(
											'name' => 'surecart/product-list-filter'
										)
									)
								),
								array(
									'name' => 'surecart/product-list-search',
									'attributes' => array(
										'style' => array(
											'layout' => array(
												'selfStretch' => 'fixed',
												'flexSize' => '250px'
											)
										)
									)
								)
							)
						),
						array(
							'name' => 'core/group',
							'attributes' => array(
								'style' => array(
									'spacing' => array(
										'margin' => array(
											'bottom' => '10px'
										),
										'padding' => array(
											'top' => '0',
											'bottom' => '0',
											'left' => '0',
											'right' => '0'
										)
									)
								),
								'layout' => array(
									'type' => 'flex',
									'flexWrap' => 'nowrap'
								)
							),
							'innerBlocks' => array(
								array(
									'name' => 'surecart/product-list-filter-tags',
									'innerBlocks' => array(
										array(
											'name' => 'surecart/product-list-filter-tag'
										)
									)
								)
							)
						),
						array(
							'name' => 'surecart/product-template',
							'attributes' => array(
								'style' => array(
									'spacing' => array(
										'blockGap' => '2rem'
									)
								),
								'layout' => array(
									'type' => 'grid',
									'columnCount' => null,
									'minimumColumnWidth' => '14rem'
								)
							),
							'innerBlocks' => array(
								array(
									'name' => 'core/group',
									'innerBlocks' => array(
										array(
											'name' => 'core/group',
											'attributes' => array(
												'style' => array(
													'color' => array(
														'background' => '#0000000d'
													),
													'border' => array(
														'radius' => '10px'
													)
												),
												'layout' => array(
													'type' => 'constrained'
												)
											),
											'innerBlocks' => array(
												array(
													'name' => 'core/cover',
													'attributes' => array(
														'useFeaturedImage' => true,
														'dimRatio' => 0,
														'isUserOverlayColor' => true,
														'focalPoint' => array(
															'x' => 0.5,
															'y' => 0.5
														),
														'contentPosition' => 'top right',
														'isDark' => false,
														'style' => array(
															'dimensions' => array(
																'aspectRatio' => '3/4'
															),
															'layout' => array(
																'selfStretch' => 'fit',
																'flexSize' => null
															),
															'spacing' => array(
																'margin' => array(
																	'bottom' => '15px'
																)
															),
															'border' => array(
																'radius' => '10px'
															)
														)
													),
													'innerBlocks' => array(
														array(
															'name' => 'surecart/product-sale-badge',
															'attributes' => array(
																'style' => array(
																	'typography' => array(
																		'fontSize' => '12px'
																	),
																	'border' => array(
																		'radius' => '100px'
																	)
																)
															)
														)
													)
												)
											)
										),
										array(
											'name' => 'surecart/product-title',
											'attributes' => array(
												'level' => 2,
												'style' => array(
													'typography' => array(
														'fontSize' => '15px',
														'fontStyle' => 'normal',
														'fontWeight' => '400'
													),
													'spacing' => array(
														'margin' => array(
															'bottom' => '5px',
															'top' => '0px'
														)
													)
												)
											)
										),
										array(
											'name' => 'core/group',
											'attributes' => array(
												'style' => array(
													'spacing' => array(
														'blockGap' => '0.5em',
														'margin' => array(
															'top' => '0px',
															'bottom' => '0px'
														),
														'padding' => array(
															'top' => '0',
															'bottom' => '0',
															'left' => '0',
															'right' => '0'
														)
													),
													'margin' => array(
														'top' => '0px',
														'bottom' => '0px'
													),
													'typography' => array(
														'lineHeight' => '1'
													)
												),
												'layout' => array(
													'type' => 'flex',
													'flexWrap' => 'nowrap'
												)
											),
											'innerBlocks' => array(
												array(
													'name' => 'surecart/product-list-price',
													'attributes' => array(
														'style' => array(
															'typography' => array(
																'fontSize' => '18px',
																'fontStyle' => 'normal',
																'fontWeight' => '600'
															),
															'spacing' => array(
																'margin' => array(
																	'top' => '5px',
																	'bottom' => '5px'
																)
															)
														)
													)
												),
												array(
													'name' => 'surecart/product-scratch-price',
													'attributes' => array(
														'style' => array(
															'typography' => array(
																'fontSize' => '18px',
																'fontStyle' => 'normal',
																'fontWeight' => '600'
															),
															'spacing' => array(
																'margin' => array(
																	'top' => '5px',
																	'bottom' => '5px'
																)
															)
														)
													)
												)
											)
										)
									)
								)
							)
						),
						array(
							'name' => 'surecart/product-pagination',
							'attributes' => array(
								'style' => array(
									'elements' => array(
										'link' => array(
											'color' => array(
												'text' => '#000000'
											)
										)
									),
									'spacing' => array(
										'padding' => array(
											'top' => '15px',
											'bottom' => '15px'
										)
									)
								),
								'textColor' => 'black'
							),
							'innerBlocks' => array(
								array(
									'name' => 'surecart/product-pagination-previous'
								),
								array(
									'name' => 'surecart/product-pagination-numbers'
								),
								array(
									'name' => 'surecart/product-pagination-next'
								)
							)
						)
					)
				)
			)
		),
		'providesContext' => array(
			'query' => 'query',
			'surecart/product-list/limit' => 'limit',
			'surecart/product-list/offset' => 'offset',
			'surecart/product-list/type' => 'type',
			'surecart/product-list/ids' => 'ids'
		),
		'attributes' => array(
			'ids' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'type' => array(
				'type' => 'string',
				'default' => 'all'
			),
			'limit' => array(
				'type' => 'number'
			),
			'collection_id' => array(
				'type' => 'string',
				'default' => ''
			),
			'query' => array(
				'type' => 'object',
				'default' => array(
					'perPage' => 15,
					'pages' => 0,
					'offset' => 0,
					'postType' => 'sc_product',
					'order' => 'desc',
					'orderBy' => 'date',
					'author' => '',
					'search' => '',
					'exclude' => array(
						
					),
					'include' => array(
						
					),
					'sticky' => '',
					'inherit' => true,
					'taxQuery' => null,
					'parents' => array(
						
					)
				)
			)
		),
		'supports' => array(
			'interactivity' => true,
			'layout' => true,
			'align' => true,
			'currencyConversion' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'blockGap' => true
			)
		),
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'file:./style-index.css',
			'surecart-block-ui',
			'surecart-tag',
			'surecart-theme-base'
		)
	),
	'product-list-content' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-list-content',
		'title' => 'Content',
		'description' => 'Display the product list content.',
		'version' => '1.0.0',
		'category' => 'surecart-product-list',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-list'
		),
		'attributes' => array(
			
		),
		'supports' => array(
			'interactivity' => true,
			'layout' => array(
				'allowSwitching' => false,
				'allowInheriting' => false,
				'allowSizingOnChildren' => true,
				'default' => array(
					'type' => 'flex',
					'orientation' => 'horizontal',
					'verticalAlignment' => 'top',
					'flexWrap' => 'nowrap'
				)
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'blockGap' => true,
				'default' => array(
					'blockGap' => '0'
				)
			)
		),
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'render' => 'file:./view.php'
	),
	'product-list-filter' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-list-filter',
		'title' => 'Filter (Dropdown)',
		'description' => 'Display the product filter.',
		'version' => '1.0.0',
		'category' => 'surecart-product-list',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-list'
		),
		'attributes' => array(
			'label' => array(
				'type' => 'string'
			),
			'taxonomy' => array(
				'type' => 'string',
				'default' => 'sc_collection'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => array(
					'top',
					'bottom'
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true
			),
			'color' => array(
				'text' => true,
				'background' => false,
				'enableContrastChecker' => true
			)
		),
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'surecart-dropdown',
			'surecart-button'
		),
		'viewScriptModule' => '@surecart/dropdown'
	),
	'product-list-filter-checkbox' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-list-filter-checkbox',
		'title' => 'Checkbox',
		'description' => 'Display the filter checkbox.',
		'version' => '1.0.0',
		'category' => 'surecart-product-list',
		'example' => array(
			
		),
		'usesContext' => array(
			'surecart/checkbox/name'
		),
		'ancestor' => array(
			'surecart/product-list-filter-checkboxes-template'
		),
		'supports' => array(
			'interactivity' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => array(
					'top',
					'bottom'
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalFontWeight' => true
			),
			'color' => array(
				'text' => true,
				'background' => true,
				'enableContrastChecker' => true
			)
		),
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'render' => 'file:./view.php',
		'style' => array(
			'surecart-radio-checkbox'
		)
	),
	'product-list-filter-checkboxes' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-list-filter-checkboxes',
		'title' => 'Filter Checkboxes',
		'description' => 'Display the product list filter checkboxes.',
		'version' => '1.0.0',
		'category' => 'surecart-product-list',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-list'
		),
		'attributes' => array(
			'taxonomy' => array(
				'type' => 'string',
				'default' => 'sc_collection'
			)
		),
		'providesContext' => array(
			'taxonomySlug' => 'taxonomy'
		),
		'supports' => array(
			'interactivity' => true,
			'layout' => array(
				'allowSwitching' => false,
				'allowInheriting' => false,
				'allowSizingOnChildren' => true,
				'default' => array(
					'type' => 'flex',
					'orientation' => 'horizontal',
					'verticalAlignment' => 'top',
					'flexWrap' => 'nowrap'
				)
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'blockGap' => true,
				'default' => array(
					'blockGap' => '0'
				)
			)
		),
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'render' => 'file:./view.php'
	),
	'product-list-filter-checkboxes-label' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-list-filter-checkboxes-label',
		'title' => 'Label',
		'description' => 'Display the product list filter checkboxes label.',
		'version' => '1.0.0',
		'category' => 'surecart-product-list',
		'icon' => 'media-interactive',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-list-filter-checkboxes'
		),
		'usesContext' => array(
			'taxonomySlug'
		),
		'attributes' => array(
			'label' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => array(
					'top',
					'bottom'
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true
			),
			'color' => array(
				'text' => true,
				'background' => false,
				'enableContrastChecker' => true
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js'
	),
	'product-list-filter-checkboxes-template' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-list-filter-checkboxes-template',
		'title' => 'Template',
		'description' => 'Display the filter checkboxes.',
		'version' => '1.0.0',
		'category' => 'surecart-product-list',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-list-filter-checkboxes'
		),
		'usesContext' => array(
			'taxonomySlug'
		),
		'supports' => array(
			'interactivity' => true,
			'layout' => array(
				'allowSwitching' => false,
				'allowInheriting' => false,
				'default' => array(
					'type' => 'flex',
					'orientation' => 'vertical'
				)
			),
			'spacing' => array(
				'padding' => true,
				'margin' => array(
					'top',
					'bottom'
				),
				'blockGap' => true,
				'default' => array(
					'blockGap' => '0'
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true
			),
			'color' => array(
				'text' => true,
				'background' => true,
				'enableContrastChecker' => true
			),
			'style' => array(
				'spacing' => array(
					'blockGap' => '0'
				)
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'file:./style-index.css'
		)
	),
	'product-list-filter-tag' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-list-filter-tag',
		'title' => 'Tag',
		'description' => 'Display the filter tag.',
		'version' => '1.0.0',
		'category' => 'surecart-product-list',
		'example' => array(
			
		),
		'usesContext' => array(
			'surecart/filterTag/name'
		),
		'ancestor' => array(
			'surecart/product-list-filter-tags-template'
		),
		'supports' => array(
			'interactivity' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => array(
					'top',
					'bottom'
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true
			),
			'color' => array(
				'text' => true,
				'background' => true,
				'enableContrastChecker' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true,
				'__experimentalDefaultControls' => array(
					'color' => true,
					'radius' => true,
					'style' => true,
					'width' => true
				)
			)
		),
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'surecart-checkbox'
		),
		'render' => 'file:./view.php'
	),
	'product-list-filter-tags' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-list-filter-tags',
		'title' => 'Applied Filters',
		'description' => 'Display the applied filters.',
		'version' => '1.0.0',
		'category' => 'surecart-product-list',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-list'
		),
		'attributes' => array(
			
		),
		'supports' => array(
			'interactivity' => true,
			'layout' => array(
				'allowSwitching' => false,
				'allowInheriting' => false,
				'allowSizingOnChildren' => true,
				'default' => array(
					'type' => 'flex',
					'orientation' => 'horizontal',
					'verticalAlignment' => 'top',
					'flexWrap' => 'nowrap'
				)
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'blockGap' => true,
				'default' => array(
					'blockGap' => '0'
				)
			)
		),
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'file:./style-index.css'
		),
		'render' => 'file:./view.php'
	),
	'product-list-filter-tags-clear-all' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-list-filter-tags-clear-all',
		'title' => 'Clear All',
		'description' => 'Display the product list filter tags clear all link.',
		'version' => '1.0.0',
		'category' => 'surecart-product-list',
		'icon' => 'media-interactive',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-list-filter-tags'
		),
		'attributes' => array(
			'label' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => array(
					'top',
					'bottom'
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true
			),
			'color' => array(
				'text' => true,
				'background' => false,
				'enableContrastChecker' => true
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js'
	),
	'product-list-filter-tags-label' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-list-filter-tags-label',
		'title' => 'Label',
		'description' => 'Display the product list filter tags label',
		'version' => '1.0.0',
		'category' => 'surecart-product-list',
		'icon' => 'media-interactive',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-list-filter-tags'
		),
		'attributes' => array(
			'label' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => array(
					'top',
					'bottom'
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true
			),
			'color' => array(
				'text' => true,
				'background' => false,
				'enableContrastChecker' => true
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js'
	),
	'product-list-filter-tags-template' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-list-filter-tags-template',
		'title' => 'Template',
		'description' => 'Display the filter tags.',
		'version' => '1.0.0',
		'category' => 'surecart-product-list',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-list-filter-tags'
		),
		'attributes' => array(
			'label' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'layout' => array(
				'allowSwitching' => false,
				'allowInheriting' => false,
				'default' => array(
					'type' => 'flex'
				)
			),
			'spacing' => array(
				'padding' => true,
				'margin' => array(
					'top',
					'bottom'
				),
				'blockGap' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true
			),
			'color' => array(
				'text' => true,
				'background' => true,
				'enableContrastChecker' => true
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'file:./style-index.css'
		)
	),
	'product-list-no-products' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-list-no-products',
		'title' => 'No products',
		'category' => 'surecart',
		'description' => 'Contains the block elements used to render content when no products are found.',
		'ancestor' => array(
			'surecart/product-list'
		),
		'textdomain' => 'surecart',
		'usesContext' => array(
			'query'
		),
		'example' => array(
			'innerBlocks' => array(
				array(
					'name' => 'core/paragraph',
					'attributes' => array(
						'content' => 'No products found.'
					)
				)
			)
		),
		'supports' => array(
			'align' => true,
			'reusable' => false,
			'html' => false,
			'color' => array(
				'gradients' => true,
				'link' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true
				)
			),
			'interactivity' => array(
				'clientNavigation' => true
			)
		),
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js'
	),
	'product-list-related' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-list-related',
		'title' => 'Related Products',
		'description' => 'Display a list of products related to the current product.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'providesContext' => array(
			'query' => 'query',
			'surecart/product-list/limit' => 'limit'
		),
		'attributes' => array(
			'limit' => array(
				'type' => 'number'
			),
			'query' => array(
				'type' => 'object',
				'default' => array(
					'perPage' => 4,
					'pages' => 3,
					'offset' => 0,
					'postType' => 'sc_product',
					'order' => 'desc',
					'orderBy' => 'date',
					'taxonomy' => 'sc_collection',
					'related' => true,
					'fallback' => true
				)
			)
		),
		'supports' => array(
			'interactivity' => true,
			'layout' => true,
			'align' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'blockGap' => true
			)
		),
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'file:./style-index.css',
			'surecart-block-ui',
			'surecart-tag',
			'surecart-theme-base'
		)
	),
	'product-list-search' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-list-search',
		'title' => 'Search',
		'description' => 'Display the product search.',
		'version' => '1.0.0',
		'category' => 'surecart-product-list',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-list'
		),
		'usesContext' => array(
			'query',
			'surecart/product-list/limit',
			'surecart/product-list/type',
			'surecart/product-list/ids'
		),
		'supports' => array(
			'interactivity' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => array(
					'top',
					'bottom'
				)
			),
			'color' => array(
				'text' => true,
				'background' => true,
				'enableContrastChecker' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true,
				'__experimentalDefaultControls' => array(
					'color' => true,
					'radius' => true,
					'style' => true,
					'width' => true
				)
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'surecart-input-group',
			'surecart-form-label',
			'surecart-form-control',
			'surecart-spinner',
			'file:./index.css'
		)
	),
	'product-list-sidebar' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-list-sidebar',
		'title' => 'Sidebar',
		'description' => 'Display the product list sidebar.',
		'version' => '1.0.0',
		'category' => 'surecart-product-list',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-list'
		),
		'attributes' => array(
			'label' => array(
				'type' => 'string'
			),
			'open' => array(
				'type' => 'boolean',
				'default' => true
			)
		),
		'usesContext' => array(
			'query'
		),
		'supports' => array(
			'interactivity' => true,
			'layout' => array(
				'allowSwitching' => false,
				'allowInheriting' => false,
				'default' => array(
					'type' => 'flex',
					'orientation' => 'vertical'
				)
			),
			'position' => array(
				'sticky' => true
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'blockGap' => true,
				'default' => array(
					'blockGap' => '0'
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true
			),
			'color' => array(
				'text' => true,
				'background' => true,
				'enableContrastChecker' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true,
				'__experimentalDefaultControls' => array(
					'color' => true,
					'radius' => true,
					'style' => true,
					'width' => true
				)
			)
		),
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'file:./style-index.css',
			'surecart-drawer',
			'surecart-block-ui',
			'wp-a11y'
		),
		'render' => 'file:./view.php',
		'viewScriptModule' => array(
			'@surecart/sidebar',
			'wp-a11y'
		)
	),
	'product-list-sidebar-toggle' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-list-sidebar-toggle',
		'title' => 'Sidebar Toggle Button',
		'description' => 'Display the product list sidebar toggle.',
		'version' => '1.0.0',
		'category' => 'surecart-product-list',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-list'
		),
		'attributes' => array(
			'label' => array(
				'type' => 'string'
			),
			'icon' => array(
				'type' => 'string',
				'default' => 'sliders'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true
			),
			'color' => array(
				'text' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true,
				'__experimentalDefaultControls' => array(
					'color' => true,
					'radius' => true,
					'style' => true,
					'width' => true
				)
			)
		),
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'file:./style-index.css'
		),
		'render' => 'file:./view.php',
		'viewScriptModule' => array(
			'@surecart/sidebar'
		)
	),
	'product-list-sort' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-list-sort',
		'title' => 'Sort (Dropdown)',
		'description' => 'Display the product sort.',
		'version' => '1.0.0',
		'category' => 'surecart-product-list',
		'icon' => 'media-interactive',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-list'
		),
		'attributes' => array(
			'label' => array(
				'type' => 'string'
			)
		),
		'usesContext' => array(
			'query'
		),
		'supports' => array(
			'interactivity' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => array(
					'top',
					'bottom'
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true
			),
			'color' => array(
				'text' => true,
				'background' => false,
				'enableContrastChecker' => true
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'surecart-dropdown',
			'surecart-button'
		),
		'viewScriptModule' => '@surecart/dropdown'
	),
	'product-list-sort-radio' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-list-sort-radio',
		'title' => 'Radio',
		'description' => 'Display the sort radio.',
		'version' => '1.0.0',
		'category' => 'surecart-product-list',
		'example' => array(
			
		),
		'usesContext' => array(
			'surecart/radio/name'
		),
		'ancestor' => array(
			'surecart/product-list-sort-radio-group-template'
		),
		'supports' => array(
			'interactivity' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => array(
					'top',
					'bottom'
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalFontWeight' => true
			),
			'color' => array(
				'text' => true,
				'background' => true,
				'enableContrastChecker' => true
			)
		),
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'render' => 'file:./view.php',
		'style' => array(
			'surecart-radio-checkbox'
		)
	),
	'product-list-sort-radio-group' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-list-sort-radio-group',
		'title' => 'Sort (Radio Group)',
		'description' => 'Display the Product List Sort Radio Group.',
		'version' => '1.0.0',
		'category' => 'surecart-product-list',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-list'
		),
		'attributes' => array(
			
		),
		'supports' => array(
			'interactivity' => true,
			'layout' => array(
				'allowSwitching' => false,
				'allowInheriting' => false,
				'allowSizingOnChildren' => true,
				'default' => array(
					'type' => 'flex',
					'orientation' => 'horizontal',
					'verticalAlignment' => 'top',
					'flexWrap' => 'nowrap'
				)
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'blockGap' => true,
				'default' => array(
					'blockGap' => '0'
				)
			),
			'style' => array(
				'spacing' => array(
					'blockGap' => '0'
				)
			)
		),
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'render' => 'file:./view.php'
	),
	'product-list-sort-radio-group-label' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-list-sort-radio-group-label',
		'title' => 'Label',
		'description' => 'Display the product list sort radio group label',
		'version' => '1.0.0',
		'category' => 'surecart-product-list',
		'icon' => 'media-interactive',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-list-sort-radio-group'
		),
		'attributes' => array(
			'label' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => array(
					'top',
					'bottom'
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true
			),
			'color' => array(
				'text' => true,
				'background' => false,
				'enableContrastChecker' => true
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js'
	),
	'product-list-sort-radio-group-template' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-list-sort-radio-group-template',
		'title' => 'Template',
		'description' => 'Display the sort radio group template.',
		'version' => '1.0.0',
		'category' => 'surecart-product-list',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-list-sort-radio-group'
		),
		'attributes' => array(
			'taxonomy' => array(
				'type' => 'string',
				'default' => 'sc_collection'
			)
		),
		'usesContext' => array(
			'query'
		),
		'supports' => array(
			'interactivity' => true,
			'layout' => array(
				'allowSwitching' => false,
				'allowInheriting' => false,
				'default' => array(
					'type' => 'flex',
					'orientation' => 'vertical'
				)
			),
			'spacing' => array(
				'padding' => true,
				'margin' => array(
					'top',
					'bottom'
				),
				'blockGap' => true,
				'default' => array(
					'blockGap' => '0'
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true
			),
			'color' => array(
				'text' => true,
				'background' => true,
				'enableContrastChecker' => true
			),
			'style' => array(
				'spacing' => array(
					'blockGap' => '0'
				)
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'file:./style-index.css'
		)
	),
	'product-media' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-media',
		'title' => 'Product Media',
		'description' => 'A container to display the product media',
		'category' => 'surecart-product-page',
		'keywords' => array(
			'image',
			'media'
		),
		'textdomain' => 'surecart',
		'ancestor' => array(
			'surecart/product-page',
			'surecart/product-template',
			'surecart/upsell'
		),
		'usesContext' => array(
			'postId'
		),
		'supports' => array(
			'interactivity' => true,
			'reusable' => false,
			'html' => false,
			'anchor' => true
		),
		'attributes' => array(
			'auto_height' => array(
				'type' => 'boolean',
				'default' => true
			),
			'desktop_gallery' => array(
				'type' => 'boolean',
				'default' => false
			),
			'height' => array(
				'type' => 'string',
				'default' => '310px'
			),
			'width' => array(
				'type' => 'string'
			),
			'show_thumbnails' => array(
				'type' => 'boolean',
				'default' => true
			),
			'thumbnails_per_page' => array(
				'type' => 'number',
				'default' => 5
			),
			'hide_empty' => array(
				'type' => 'boolean',
				'default' => false
			),
			'lightbox' => array(
				'type' => 'boolean',
				'default' => true
			),
			'id' => array(
				'type' => 'string'
			)
		),
		'variations' => array(
			array(
				'name' => 'slider',
				'title' => 'Product Media Slider',
				'icon' => 'image-flip-horizontal',
				'description' => 'Display the product media in a slider.',
				'isDefault' => true,
				'attributes' => array(
					'desktop_gallery' => false
				),
				'isActive' => array(
					'desktop_gallery'
				),
				'scope' => array(
					'inserter',
					'block',
					'transform'
				)
			),
			array(
				'name' => 'gallery',
				'title' => 'Product Media Gallery',
				'icon' => 'screenoptions',
				'description' => 'Display the product media in a gallery on desktop devices.',
				'attributes' => array(
					'desktop_gallery' => true
				),
				'isActive' => array(
					'desktop_gallery'
				),
				'scope' => array(
					'inserter',
					'block',
					'transform'
				)
			)
		),
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'editorStyle' => array(
			'surecart-image-slider'
		),
		'style' => array(
			'file:./style-index.css'
		)
	),
	'product-page' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-page',
		'title' => 'Product Form',
		'description' => 'Display product form.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'providesContext' => array(
			'surecart/product_id' => 'product_id'
		),
		'usesContext' => array(
			'queryId',
			'query',
			'displayLayout',
			'templateSlug',
			'previewPostType',
			'enhancedPagination',
			'postType'
		),
		'attributes' => array(
			'product_id' => array(
				'type' => 'string'
			),
			'product_post_id' => array(
				'type' => 'integer'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'align' => true,
			'layout' => true,
			'currencyConversion' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'blockGap' => true
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./editor.css',
		'style' => array(
			'file:./style-index.css',
			'surecart-theme-base',
			'surecart-prose'
		),
		'viewScript' => array(
			'wp-url',
			'wp-api-fetch',
			'wp-i18n',
			'wp-a11y'
		),
		'viewScriptModule' => array(
			'@surecart/checkout',
			'@surecart/product-page'
		)
	),
	'product-pagination' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-pagination',
		'title' => 'Pagination',
		'description' => 'Display the product pagination.',
		'version' => '1.0.0',
		'category' => 'surecart-product-list',
		'example' => array(
			
		),
		'usesContext' => array(
			'query',
			'surecart/product-list/limit',
			'surecart/product-list/type',
			'surecart/product-list/ids'
		),
		'ancestor' => array(
			'surecart/product-list',
			'surecart/product-list-related'
		),
		'allowedBlocks' => array(
			'surecart/product-pagination-previous',
			'surecart/product-pagination-numbers',
			'surecart/product-pagination-next'
		),
		'attributes' => array(
			'paginationArrow' => array(
				'type' => 'string',
				'default' => 'arrow'
			),
			'showLabel' => array(
				'type' => 'boolean',
				'default' => true
			)
		),
		'providesContext' => array(
			'paginationArrow' => 'paginationArrow',
			'showLabel' => 'showLabel'
		),
		'supports' => array(
			'interactivity' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => array(
					'top',
					'bottom'
				),
				'blockGap' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true
			),
			'color' => array(
				'text' => true,
				'background' => false,
				'enableContrastChecker' => true
			),
			'layout' => array(
				'allowSwitching' => false,
				'allowInheriting' => false,
				'default' => array(
					'type' => 'flex',
					'justifyContent' => 'space-between'
				)
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'style' => 'file:./style-index.css',
		'editorScript' => 'file:./index.js'
	),
	'product-pagination-next' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-pagination-next',
		'title' => 'Next',
		'description' => 'Display the product pagination next.',
		'version' => '1.0.0',
		'category' => 'surecart-product-list',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-pagination'
		),
		'usesContext' => array(
			'query',
			'surecart/product-list/limit',
			'surecart/product-list/type',
			'surecart/product-list/ids',
			'paginationArrow',
			'showLabel'
		),
		'attributes' => array(
			'label' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => array(
					'top',
					'bottom'
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true
			),
			'color' => array(
				'text' => true,
				'background' => true,
				'enableContrastChecker' => true
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'product-pagination-numbers' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-pagination-numbers',
		'title' => 'Numbers',
		'description' => 'Display the product pagination numbers.',
		'version' => '1.0.0',
		'category' => 'surecart-product-list',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-pagination'
		),
		'usesContext' => array(
			'query',
			'surecart/product-list/limit',
			'surecart/product-list/type',
			'surecart/product-list/ids',
			'paginationArrow',
			'showLabel'
		),
		'supports' => array(
			'interactivity' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => array(
					'top',
					'bottom'
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true
			),
			'color' => array(
				'text' => true,
				'background' => false,
				'enableContrastChecker' => true
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'product-pagination-previous' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-pagination-previous',
		'title' => 'Previous',
		'description' => 'Display the product pagination previous.',
		'version' => '1.0.0',
		'category' => 'surecart-product-list',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-pagination'
		),
		'usesContext' => array(
			'query',
			'surecart/product-list/limit',
			'surecart/product-list/type',
			'surecart/product-list/ids',
			'paginationArrow',
			'showLabel'
		),
		'attributes' => array(
			'label' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => array(
					'top',
					'bottom'
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true
			),
			'color' => array(
				'text' => true,
				'background' => true,
				'enableContrastChecker' => true
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'product-price' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-list-price',
		'title' => 'Price',
		'description' => 'Display the static product price.',
		'version' => '1.0.0',
		'category' => 'surecart-product-list',
		'example' => array(
			
		),
		'usesContext' => array(
			'postId'
		),
		'ancestor' => array(
			'surecart/product-page',
			'surecart/product-template',
			'surecart/product-quick-view',
			'surecart/sticky-purchase'
		),
		'attributes' => array(
			'show_range' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'supports' => array(
			'interactivity' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => array(
					'top',
					'bottom'
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			),
			'color' => array(
				'text' => true,
				'background' => false,
				'enableContrastChecker' => true
			),
			'currencyConversion' => true
		),
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'render' => 'file:./view.php'
	),
	'product-price-choice-template' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-price-choice-template',
		'title' => 'Price',
		'description' => 'Displays the price of a product with a choice of options.',
		'version' => '1.0.0',
		'category' => 'widgets',
		'icon' => 'money',
		'usesContext' => array(
			'postId',
			'surecart/product',
			'surecart/price'
		),
		'ancestor' => array(
			'surecart/product-price-chooser'
		),
		'attributes' => array(
			'highlight_border' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'__experimentalDefaultControls' => array(
					'padding' => true,
					'margin' => true
				)
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'width' => true,
				'__experimentalDefaultControls' => array(
					'color' => true,
					'radius' => true,
					'width' => true
				)
			),
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => true,
				'__experimentalDefaultControls' => array(
					'text' => true,
					'background' => true
				)
			),
			'__experimentalLayout' => array(
				'allowSwitching' => false,
				'allowInheriting' => false,
				'default' => array(
					'type' => 'flex'
				)
			),
			'layout' => array(
				'allowSwitching' => false,
				'allowInheriting' => false,
				'allowSizingOnChildren' => true,
				'default' => array(
					'type' => 'flex'
				)
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'surecart-choice',
			'file:./style-index.css'
		)
	),
	'product-price-chooser' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-price-chooser',
		'title' => 'Price Selector',
		'description' => 'Displays possible choices for product prices.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'ancestor' => array(
			'surecart/product-page',
			'surecart/product-quick-view',
			'surecart/sticky-purchase'
		),
		'usesContext' => array(
			'postId'
		),
		'supports' => array(
			'interactivity' => true,
			'html' => false,
			'anchor' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'__experimentalDefaultControls' => array(
					'padding' => true,
					'margin' => true
				)
			),
			'color' => array(
				'text' => true,
				'background' => false
			),
			'currencyConversion' => true
		),
		'attributes' => array(
			'label' => array(
				'type' => 'string'
			),
			'columns' => array(
				'type' => 'number',
				'default' => 1
			)
		),
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'render' => 'file:./view.php',
		'style' => array(
			'surecart-choice',
			'surecart-label',
			'file:./style-index.css'
		)
	),
	'product-quantity' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-quantity',
		'title' => 'Product Quantity',
		'description' => 'Display the product quantity selector',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'icon' => 'media-interactive',
		'ancestor' => array(
			'surecart/product-page',
			'surecart/product-quick-view',
			'surecart/sticky-purchase'
		),
		'keywords' => array(
			'quantity',
			'form',
			'product'
		),
		'example' => array(
			'viewportWidth' => 200
		),
		'attributes' => array(
			'label' => array(
				'type' => 'string'
			),
			'hidden_label' => array(
				'type' => 'boolean',
				'default' => false
			),
			'id' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'__experimentalDefaultControls' => array(
					'padding' => true,
					'margin' => true
				)
			),
			'color' => array(
				'gradients' => false,
				'background' => true,
				'link' => false,
				'__experimentalDefaultControls' => array(
					'background' => true,
					'text' => true,
					'link' => true
				)
			),
			'dimensions' => array(
				'minHeight' => true
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'editorStyle' => array(
			'surecart-quantity-selector',
			'surecart-input-group',
			'file:./index.css'
		),
		'style' => array(
			'surecart-quantity-selector',
			'surecart-input-group',
			'file:./style-index.css'
		)
	),
	'product-quantity-control' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-quantity-control',
		'title' => 'Control',
		'description' => 'Display the product quantity control',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'icon' => 'media-interactive',
		'ancestor' => array(
			'surecart/product-quantity'
		),
		'keywords' => array(
			'quantity',
			'form',
			'product'
		),
		'attributes' => array(
			'width' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'dimensions' => array(
				'minHeight' => true,
				'width' => true
			),
			'layout' => array(
				'allowSizingOnChildren' => true,
				'allowSwitching' => true,
				'allowInheriting' => true,
				'default' => array(
					'type' => 'flex',
					'orientation' => 'horizontal',
					'verticalAlignment' => 'center',
					'horizontalAlignment' => 'space-between',
					'flexWrap' => 'nowrap',
					'justifyContent' => 'space-between'
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			),
			'shadow' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'blockGap' => true
			),
			'color' => true,
			'__experimentalBorder' => array(
				'radius' => true,
				'color' => true,
				'style' => true,
				'width' => true
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'product-quantity-input' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-quantity-input',
		'title' => 'Input',
		'description' => 'Display the product quantity input',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'icon' => 'media-interactive',
		'ancestor' => array(
			'surecart/product-quantity'
		),
		'keywords' => array(
			'quantity',
			'form',
			'product'
		),
		'supports' => array(
			'interactivity' => true,
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true
			),
			'color' => array(
				'gradients' => false,
				'background' => true,
				'border' => true
			),
			'__experimentalBorder' => array(
				'radius' => true,
				'color' => true,
				'style' => true,
				'width' => true
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'product-quantity-input-decrease' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-quantity-input-decrease',
		'title' => 'Decrease Quantity',
		'description' => 'Display the product quantity input decrease',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'icon' => 'media-interactive',
		'ancestor' => array(
			'surecart/product-quantity'
		),
		'keywords' => array(
			'quantity',
			'form',
			'product'
		),
		'supports' => array(
			'interactivity' => true,
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true
			),
			'color' => true,
			'__experimentalBorder' => array(
				'radius' => true,
				'color' => true,
				'style' => true,
				'width' => true
			),
			'dimensions' => array(
				'minHeight' => true
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'editorStyle' => array(
			'surecart-quantity-selector',
			'surecart-input-group'
		),
		'style' => array(
			'surecart-quantity-selector',
			'surecart-input-group'
		)
	),
	'product-quantity-input-increase' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-quantity-input-increase',
		'title' => 'Increase Quantity',
		'description' => 'Display the product quantity input increase',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'icon' => 'media-interactive',
		'ancestor' => array(
			'surecart/product-quantity'
		),
		'keywords' => array(
			'quantity',
			'form',
			'product'
		),
		'supports' => array(
			'interactivity' => true,
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true
			),
			'color' => true,
			'__experimentalBorder' => array(
				'radius' => true,
				'color' => true,
				'style' => true,
				'width' => true
			),
			'dimensions' => array(
				'minHeight' => true
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'editorStyle' => array(
			'surecart-quantity-selector',
			'surecart-input-group'
		),
		'style' => array(
			'surecart-quantity-selector',
			'surecart-input-group'
		)
	),
	'product-quick-view' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-quick-view',
		'title' => 'Product Quick Add',
		'description' => 'Display the product quick add button.',
		'version' => '1.0.0',
		'category' => 'surecart-product-list',
		'example' => array(
			
		),
		'attributes' => array(
			'alignment' => array(
				'type' => 'string'
			),
			'width' => array(
				'type' => 'string'
			),
			'height' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'inserter' => false,
			'interactivity' => true,
			'color' => array(
				'__experimentalSkipSerialization' => true,
				'gradients' => true,
				'link' => false,
				'__experimentalDefaultControls' => array(
					'background' => true,
					'text' => true
				)
			),
			'spacing' => array(
				'__experimentalSkipSerialization' => true,
				'margin' => true,
				'padding' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'viewScript' => array(
			'wp-url',
			'wp-api-fetch'
		),
		'viewScriptModule' => array(
			'@surecart/checkout',
			'@surecart/cart',
			'@surecart/product-page',
			'@surecart/product-quick-view',
			'surecart/lightbox'
		),
		'editorStyle' => array(
			'file:./index.css'
		),
		'style' => array(
			'file:./style-index.css',
			'surecart-block-ui',
			'surecart-spinner'
		)
	),
	'product-quick-view-button' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-quick-view-button',
		'title' => 'Quick Add Button',
		'description' => 'Display the product quick add to cart button.',
		'version' => '1.0.0',
		'category' => 'surecart-product-list',
		'example' => array(
			'attributes' => array(
				'quick_view_button_type' => 'both'
			)
		),
		'usesContext' => array(
			'postId'
		),
		'ancestor' => array(
			'surecart/product-template'
		),
		'attributes' => array(
			'icon' => array(
				'type' => 'string',
				'default' => 'plus'
			),
			'icon_position' => array(
				'type' => 'string',
				'default' => 'before'
			),
			'label' => array(
				'type' => 'string'
			),
			'quick_view_button_type' => array(
				'type' => 'string',
				'default' => 'both'
			),
			'width' => array(
				'type' => 'number'
			),
			'direct_add_to_cart' => array(
				'type' => 'boolean',
				'default' => true
			)
		),
		'supports' => array(
			'interactivity' => true,
			'color' => array(
				'gradients' => true,
				'link' => false,
				'__experimentalDefaultControls' => array(
					'background' => true,
					'text' => true
				)
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true,
				'blockGap' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true
			),
			'__experimentalSelector' => '.wp-block-button .wp-block-button__link'
		),
		'styles' => array(
			array(
				'name' => 'default',
				'label' => 'Default',
				'isDefault' => true
			),
			array(
				'name' => 'show-on-hover',
				'label' => 'Show on hover'
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'viewScriptModule' => array(
			'@surecart/checkout',
			'@surecart/product-page',
			'@surecart/product-list',
			'@surecart/product-quick-view'
		),
		'style' => array(
			'surecart-product-quick-view-button',
			'surecart-wp-buttons',
			'surecart-wp-button',
			'wp-block-button'
		)
	),
	'product-quick-view-close' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-quick-view-close',
		'title' => 'Close',
		'description' => 'Display the product quick add close button.',
		'version' => '1.0.0',
		'category' => 'surecart-product-list',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-quick-view'
		),
		'supports' => array(
			'interactivity' => true,
			'color' => array(
				'gradients' => true,
				'link' => false,
				'__experimentalDefaultControls' => array(
					'background' => true,
					'text' => true
				)
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'file:./style-index.css'
		)
	),
	'product-review-add-button' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-review-add-button',
		'title' => 'Write a Review Button',
		'description' => 'A button to open the product review form.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'example' => array(
			'attributes' => array(
				'button_type' => 'both'
			)
		),
		'usesContext' => array(
			'postId'
		),
		'ancestor' => array(
			'surecart/product-page',
			'surecart/product-template',
			'surecart/product-quick-view',
			'surecart/product-review-list',
			'surecart/product-review-template',
			'product-review-list-no-reviews',
			'surecart/sticky-purchase'
		),
		'keywords' => array(
			'review',
			'button',
			'write review'
		),
		'attributes' => array(
			'icon' => array(
				'type' => 'string',
				'default' => 'edit-2'
			),
			'icon_position' => array(
				'type' => 'string',
				'default' => 'before'
			),
			'icon_size' => array(
				'type' => 'number',
				'default' => 15
			),
			'label' => array(
				'type' => 'string'
			),
			'button_type' => array(
				'type' => 'string',
				'default' => 'both'
			),
			'width' => array(
				'type' => 'number'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'spacing' => array(
				'__experimentalSkipSerialization' => true,
				'margin' => true,
				'padding' => true,
				'blockGap' => true
			),
			'color' => array(
				'__experimentalSkipSerialization' => true,
				'gradients' => true,
				'link' => false,
				'__experimentalDefaultControls' => array(
					'background' => true,
					'text' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true,
				'__experimentalSkipSerialization' => true,
				'__experimentalDefaultControls' => array(
					'color' => true,
					'radius' => true,
					'style' => true,
					'width' => true
				)
			),
			'__experimentalStyle' => array(
				'variations' => array(
					'outline' => array(
						'border' => array(
							'color' => 'currentColor',
							'width' => '2px',
							'style' => 'solid'
						),
						'color' => array(
							'text' => 'currentColor',
							'gradient' => 'transparent none'
						)
					)
				)
			),
			'__experimentalSelector' => '.wp-block-button .wp-block-button__link'
		),
		'styles' => array(
			array(
				'name' => 'fill',
				'label' => 'Fill',
				'isDefault' => true
			),
			array(
				'name' => 'outline',
				'label' => 'Outline'
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./controller.php',
		'viewScriptModule' => array(
			'@surecart/product-page',
			'@surecart/product-review-form'
		),
		'editorScript' => 'file:./index.js',
		'style' => array(
			'surecart-wp-buttons',
			'surecart-wp-button',
			'wp-block-button',
			'surecart-spinner',
			'file:./style-index.css'
		)
	),
	'product-review-average-rating-stars' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-review-average-rating-stars',
		'title' => 'Star Rating',
		'description' => 'Display the product average rating stars.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'example' => array(
			
		),
		'usesContext' => array(
			'show_value',
			'link_to_reviews'
		),
		'keywords' => array(
			'review',
			'average',
			'rating',
			'stars'
		),
		'attributes' => array(
			'fill_color' => array(
				'type' => 'string',
				'default' => ''
			),
			'size' => array(
				'type' => 'string',
				'default' => '20px'
			),
			'link_to_reviews' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'supports' => array(
			'interactivity' => true,
			'color' => array(
				'text' => false,
				'link' => false,
				'background' => false,
				'__experimentalDefaultControls' => array(
					'background' => false,
					'text' => false
				)
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true,
				'blockGap' => array(
					'__experimentalDefault' => '2px'
				),
				'__experimentalDefaultControls' => array(
					'padding' => true,
					'margin' => true,
					'blockGap' => true
				)
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'style' => 'file:./style-index.css',
		'editorScript' => 'file:./index.js'
	),
	'product-review-average-rating-value' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-review-average-rating-value',
		'title' => 'Average Rating',
		'description' => 'Displays the average product rating value.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'keywords' => array(
			'review',
			'average',
			'rating',
			'value'
		),
		'example' => array(
			
		),
		'usesContext' => array(
			'show_value',
			'link_to_reviews'
		),
		'attributes' => array(
			'link_to_reviews' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'styles' => array(
			array(
				'name' => 'none',
				'label' => 'None',
				'isDefault' => true
			),
			array(
				'name' => 'parentheses',
				'label' => 'Parentheses'
			),
			array(
				'name' => 'slash',
				'label' => ' / 5.0'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => true,
				'__experimentalDefaultControls' => array(
					'text' => true,
					'background' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'style' => 'file:./style-index.css',
		'editorScript' => 'file:./index.js'
	),
	'product-review-breakdown' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-review-breakdown',
		'title' => 'Review Breakdown',
		'description' => 'Displays a breakdown of product reviews by star rating.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'ancestor' => array(
			'surecart/product-page',
			'surecart/product-quick-view',
			'surecart/product-review-list',
			'surecart/product-review-template',
			'surecart/sticky-purchase',
			'surecart/product-review-summary'
		),
		'keywords' => array(
			'review',
			'breakdown',
			'summary'
		),
		'usesContext' => array(
			'postId'
		),
		'attributes' => array(
			'columns' => array(
				'type' => 'number',
				'default' => 1
			),
			'row_gap' => array(
				'type' => 'string'
			),
			'column_gap' => array(
				'type' => 'string'
			),
			'fill_color' => array(
				'type' => 'string'
			),
			'size' => array(
				'type' => 'string'
			),
			'bar_fill_color' => array(
				'type' => 'string'
			),
			'bar_background_color' => array(
				'type' => 'string'
			)
		),
		'example' => array(
			
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => false
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true
			),
			'layout' => array(
				'allowSwitching' => false,
				'allowInheriting' => false,
				'default' => array(
					'type' => 'flex',
					'justifyContent' => 'left'
				)
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'blockGap' => array(
					'__experimentalDefault' => '4px'
				),
				'__experimentalDefaultControls' => array(
					'padding' => true,
					'margin' => true,
					'blockGap' => true
				)
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'file:./style-index.css'
		)
	),
	'product-review-confirmation-template' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-review-confirmation-template',
		'title' => 'Confirmation',
		'description' => 'Template for the review confirmation content. Shown when editing the confirmation.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'parent' => array(
			'surecart/product-review-form'
		),
		'usesContext' => array(
			'surecart/editingView'
		),
		'supports' => array(
			'inserter' => false,
			'html' => false,
			'spacing' => array(
				'margin' => true,
				'padding' => true,
				'blockGap' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true
			),
			'__experimentalLayout' => array(
				'default' => array(
					'type' => 'constrained'
				)
			)
		),
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js'
	),
	'product-review-content' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-review-content',
		'title' => 'Review Content',
		'description' => 'Displays the content of a product review.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'ancestor' => array(
			'surecart/product-review-template'
		),
		'keywords' => array(
			'review',
			'content',
			'details'
		),
		'usesContext' => array(
			'reviewId',
			'review'
		),
		'example' => array(
			
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => false
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'blockGap' => array(
					'__experimentalDefault' => '4px'
				),
				'__experimentalDefaultControls' => array(
					'padding' => true,
					'margin' => true,
					'blockGap' => true
				)
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js'
	),
	'product-review-date' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-review-date',
		'title' => 'Review Date',
		'description' => 'Displays the date of a product review.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'ancestor' => array(
			'surecart/product-review-template'
		),
		'keywords' => array(
			'review',
			'date'
		),
		'usesContext' => array(
			'reviewId',
			'review'
		),
		'attributes' => array(
			'datetime' => array(
				'type' => 'string',
				'role' => 'content'
			),
			'textAlign' => array(
				'type' => 'string'
			),
			'format' => array(
				'type' => 'string'
			)
		),
		'example' => array(
			'viewportWidth' => 350
		),
		'supports' => array(
			'html' => false,
			'color' => array(
				'gradients' => true,
				'link' => true,
				'__experimentalDefaultControls' => array(
					'background' => true,
					'text' => true,
					'link' => true
				)
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true
				)
			),
			'interactivity' => array(
				'clientNavigation' => true
			),
			'__experimentalBorder' => array(
				'radius' => true,
				'color' => true,
				'width' => true,
				'style' => true,
				'__experimentalDefaultControls' => array(
					'radius' => true,
					'color' => true,
					'width' => true,
					'style' => true
				)
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'product-review-form' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-review-form',
		'title' => 'Product Review Form',
		'description' => 'Display the product review form.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'example' => array(
			
		),
		'attributes' => array(
			'alignment' => array(
				'type' => 'string'
			),
			'width' => array(
				'type' => 'string'
			),
			'height' => array(
				'type' => 'string'
			),
			'editingView' => array(
				'type' => 'string',
				'default' => 'form'
			)
		),
		'providesContext' => array(
			'surecart/editingView' => 'editingView'
		),
		'supports' => array(
			'inserter' => false,
			'interactivity' => true,
			'color' => array(
				'__experimentalSkipSerialization' => true,
				'gradients' => true,
				'link' => false,
				'__experimentalDefaultControls' => array(
					'background' => true,
					'text' => true
				)
			),
			'spacing' => array(
				'__experimentalSkipSerialization' => true,
				'margin' => true,
				'padding' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'viewScriptModule' => array(
			'@surecart/product-page',
			'@surecart/product-review-form',
			'wp-a11y'
		),
		'style' => array(
			'file:./style-index.css',
			'surecart-block-ui',
			'surecart-spinner'
		)
	),
	'product-review-form-close' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-review-form-close',
		'title' => 'Review Form Close Button',
		'description' => 'Display the product review form close button.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'ancestor' => array(
			'surecart/product-review-form'
		),
		'example' => array(
			
		),
		'supports' => array(
			'interactivity' => true,
			'align' => array(
				'left',
				'center',
				'right'
			),
			'color' => array(
				'gradients' => true,
				'link' => false,
				'__experimentalDefaultControls' => array(
					'background' => true,
					'text' => true
				)
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true,
				'__experimentalDefaultControls' => array(
					'color' => true,
					'radius' => true,
					'style' => true,
					'width' => true
				)
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'file:./style-index.css'
		),
		'viewScriptModule' => array(
			'@surecart/product-review-form'
		)
	),
	'product-review-form-content' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-review-form-content',
		'title' => 'Review Form Content',
		'description' => 'Provide a content textarea field for product reviews.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-review-form'
		),
		'attributes' => array(
			'label' => array(
				'type' => 'string'
			),
			'placeholder' => array(
				'type' => 'string'
			),
			'rows' => array(
				'type' => 'number',
				'default' => 4
			),
			'text_align' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'color' => array(
				'gradients' => true,
				'link' => false,
				'__experimentalDefaultControls' => array(
					'background' => true,
					'text' => true
				)
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true,
				'__experimentalDefaultControls' => array(
					'padding' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true,
				'__experimentalDefaultControls' => array(
					'color' => true,
					'radius' => true,
					'style' => true,
					'width' => true
				)
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'surecart-form-control',
			'file:./style-index.css'
		),
		'viewScriptModule' => array(
			'@surecart/product-review-form'
		)
	),
	'product-review-form-rating' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-review-form-rating',
		'title' => 'Review Form Rating',
		'description' => 'Provide a star rating input for product reviews.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-review-form'
		),
		'attributes' => array(
			'label' => array(
				'type' => 'string'
			),
			'size' => array(
				'type' => 'string',
				'default' => '20px'
			),
			'fill_color' => array(
				'type' => 'string'
			),
			'text_align' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'color' => array(
				'gradients' => true,
				'link' => false,
				'__experimentalDefaultControls' => array(
					'background' => true,
					'text' => true
				)
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true,
				'__experimentalDefaultControls' => array(
					'padding' => true,
					'margin' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true,
				'__experimentalDefaultControls' => array(
					'color' => true,
					'radius' => true,
					'style' => true,
					'width' => true
				)
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'surecart-form-control',
			'file:./style-index.css'
		),
		'viewScriptModule' => array(
			'@surecart/product-review-form'
		)
	),
	'product-review-form-submit-button' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-review-form-submit-button',
		'title' => 'Review Form Submit Button',
		'description' => 'Provide a submit button for the product review form.',
		'version' => '1.0.0',
		'icon' => 'button',
		'category' => 'surecart-product-page',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-review-form'
		),
		'attributes' => array(
			'text' => array(
				'type' => 'string'
			),
			'width' => array(
				'type' => 'number',
				'default' => 100
			)
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'spacing' => array(
				'__experimentalSkipSerialization' => true,
				'padding' => array(
					'horizontal',
					'vertical'
				),
				'margin' => array(
					'top',
					'bottom'
				)
			),
			'color' => array(
				'__experimentalSkipSerialization' => true,
				'gradients' => true,
				'__experimentalDefaultControls' => array(
					'background' => true,
					'text' => true
				)
			),
			'__experimentalSelector' => '.wp-block-button .wp-block-button__link',
			'typography' => array(
				'fontSize' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true
			),
			'reusable' => false,
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true,
				'__experimentalSkipSerialization' => true,
				'__experimentalDefaultControls' => array(
					'color' => true,
					'radius' => true,
					'style' => true,
					'width' => true
				)
			),
			'__experimentalStyle' => array(
				'variations' => array(
					'outline' => array(
						'border' => array(
							'color' => 'currentColor',
							'width' => '2px',
							'style' => 'solid'
						),
						'color' => array(
							'text' => 'currentColor',
							'gradient' => 'transparent none'
						)
					)
				)
			)
		),
		'styles' => array(
			array(
				'name' => 'fill',
				'label' => 'Fill',
				'isDefault' => true
			),
			array(
				'name' => 'outline',
				'label' => 'Outline'
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'editorStyle' => array(
			'surecart-wp-button'
		),
		'style' => array(
			'surecart-wp-buttons',
			'surecart-wp-button',
			'wp-block-button',
			'surecart-spinner'
		),
		'viewScriptModule' => array(
			'@surecart/product-review-form'
		)
	),
	'product-review-form-template' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-review-form-template',
		'title' => 'Form',
		'description' => 'Template for the review form content. Shown when editing the form.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'parent' => array(
			'surecart/product-review-form'
		),
		'usesContext' => array(
			'surecart/editingView'
		),
		'supports' => array(
			'inserter' => false,
			'html' => false,
			'spacing' => array(
				'margin' => true,
				'padding' => true,
				'blockGap' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true
			),
			'__experimentalLayout' => array(
				'default' => array(
					'type' => 'constrained'
				)
			)
		),
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js'
	),
	'product-review-form-title' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-review-form-title',
		'title' => 'Review Form Title',
		'description' => 'Provide a title input field for product reviews.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-review-form'
		),
		'attributes' => array(
			'label' => array(
				'type' => 'string'
			),
			'placeholder' => array(
				'type' => 'string'
			),
			'text_align' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'color' => array(
				'gradients' => true,
				'link' => false,
				'__experimentalDefaultControls' => array(
					'background' => true,
					'text' => true
				)
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true,
				'__experimentalDefaultControls' => array(
					'padding' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true,
				'__experimentalDefaultControls' => array(
					'color' => true,
					'radius' => true,
					'style' => true,
					'width' => true
				)
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'surecart-form-control',
			'file:./style-index.css'
		),
		'viewScriptModule' => array(
			'@surecart/product-review-form'
		)
	),
	'product-review-list' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-review-list',
		'title' => 'Product Review List',
		'description' => 'Display a list of product reviews.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'example' => array(
			'innerBlocks' => array(
				array(
					'name' => 'core/heading',
					'attributes' => array(
						'content' => 'Customer Reviews',
						'level' => 2,
						'className' => 'wp-block-heading',
						'style' => array(
							'spacing' => array(
								'margin' => array(
									'top' => '32px',
									'bottom' => '32px'
								)
							),
							'typography' => array(
								'lineHeight' => '1'
							)
						)
					)
				),
				array(
					'name' => 'surecart/product-reviews',
					'innerBlocks' => array(
						array(
							'name' => 'surecart/product-review-summary',
							'attributes' => array(
								'style' => array(
									'spacing' => array(
										'margin' => array(
											'bottom' => '15px'
										)
									)
								)
							),
							'innerBlocks' => array(
								array(
									'name' => 'core/columns',
									'attributes' => array(
										'style' => array(
											'spacing' => array(
												'blockGap' => array(
													'left' => '20px'
												)
											)
										)
									),
									'innerBlocks' => array(
										array(
											'name' => 'core/column',
											'attributes' => array(
												'verticalAlignment' => 'center',
												'width' => '280px'
											),
											'innerBlocks' => array(
												array(
													'name' => 'core/group',
													'attributes' => array(
														'style' => array(
															'spacing' => array(
																'blockGap' => '14px',
																'padding' => array(
																	'right' => '0px',
																	'left' => '0px'
																),
																'margin' => array(
																	'top' => '0',
																	'bottom' => '0'
																)
															),
															'layout' => array(
																'selfStretch' => 'fill',
																'flexSize' => null
															)
														),
														'layout' => array(
															'type' => 'flex',
															'flexWrap' => 'nowrap',
															'orientation' => 'vertical',
															'verticalAlignment' => 'center'
														)
													),
													'innerBlocks' => array(
														array(
															'name' => 'core/group',
															'attributes' => array(
																'style' => array(
																	'spacing' => array(
																		'blockGap' => '5px',
																		'padding' => array(
																			'right' => '0px',
																			'left' => '0px'
																		),
																		'margin' => array(
																			'top' => '0',
																			'bottom' => '0'
																		)
																	)
																),
																'layout' => array(
																	'type' => 'flex',
																	'flexWrap' => 'nowrap',
																	'verticalAlignment' => 'bottom'
																)
															),
															'innerBlocks' => array(
																array(
																	'name' => 'surecart/product-review-average-rating-value',
																	'attributes' => array(
																		'className' => 'is-style-none',
																		'style' => array(
																			'typography' => array(
																				'fontStyle' => 'normal',
																				'fontWeight' => '600',
																				'lineHeight' => '1',
																				'fontSize' => '24px'
																			)
																		)
																	)
																),
																array(
																	'name' => 'core/paragraph',
																	'attributes' => array(
																		'content' => '/ 5.0',
																		'style' => array(
																			'typography' => array(
																				'lineHeight' => '1.5',
																				'fontSize' => '14px'
																			),
																			'color' => array(
																				'text' => '#4b5563'
																			),
																			'spacing' => array(
																				'padding' => array(
																					'top' => '0',
																					'bottom' => '0',
																					'left' => '0',
																					'right' => '0'
																				),
																				'margin' => array(
																					'top' => '0',
																					'bottom' => '0'
																				)
																			)
																		)
																	)
																)
															)
														),
														array(
															'name' => 'surecart/product-review-average-rating-stars'
														),
														array(
															'name' => 'core/group',
															'attributes' => array(
																'style' => array(
																	'spacing' => array(
																		'blockGap' => '5px',
																		'padding' => array(
																			'right' => '0px',
																			'left' => '0px'
																		),
																		'margin' => array(
																			'top' => '0',
																			'bottom' => '0'
																		)
																	)
																),
																'layout' => array(
																	'type' => 'flex',
																	'flexWrap' => 'nowrap'
																)
															),
															'innerBlocks' => array(
																array(
																	'name' => 'core/paragraph',
																	'attributes' => array(
																		'content' => 'Based on',
																		'style' => array(
																			'typography' => array(
																				'fontSize' => '14px'
																			),
																			'spacing' => array(
																				'padding' => array(
																					'top' => '0',
																					'bottom' => '0',
																					'left' => '0',
																					'right' => '0'
																				),
																				'margin' => array(
																					'top' => '0',
																					'bottom' => '0'
																				)
																			)
																		)
																	)
																),
																array(
																	'name' => 'surecart/product-review-total-rating',
																	'attributes' => array(
																		'link_to_reviews' => false,
																		'className' => 'is-style-default',
																		'style' => array(
																			'spacing' => array(
																				'blockGap' => '4px',
																				'margin' => array(
																					'right' => '0',
																					'left' => '0'
																				),
																				'padding' => array(
																					'right' => '0',
																					'left' => '0'
																				)
																			)
																		)
																	)
																)
															)
														)
													)
												)
											)
										),
										array(
											'name' => 'core/column',
											'attributes' => array(
												'verticalAlignment' => 'center'
											),
											'innerBlocks' => array(
												array(
													'name' => 'surecart/product-review-breakdown',
													'attributes' => array(
														'columns' => 2,
														'className' => 'is-style-default',
														'layout' => array(
															'type' => 'flex',
															'justifyContent' => 'left',
															'orientation' => 'horizontal',
															'verticalAlignment' => 'center'
														)
													)
												)
											)
										)
									)
								)
							)
						),
						array(
							'name' => 'core/group',
							'attributes' => array(
								'metadata' => array(
									'name' => 'Header'
								),
								'layout' => array(
									'type' => 'flex',
									'flexWrap' => 'nowrap',
									'justifyContent' => 'space-between'
								)
							),
							'innerBlocks' => array(
								array(
									'name' => 'surecart/product-review-list-sidebar-toggle',
									'attributes' => array(
										'label' => 'Filters'
									)
								),
								array(
									'name' => 'surecart/product-review-add-button',
									'attributes' => array(
										'width' => 100,
										'className' => 'is-style-fill',
										'style' => array(
											'elements' => array(
												'link' => array(
													'color' => array(
														'text' => 'var:preset|color|white'
													)
												)
											),
											'spacing' => array(
												'blockGap' => '4px'
											)
										),
										'backgroundColor' => 'surecart',
										'textColor' => 'white'
									)
								)
							)
						),
						array(
							'name' => 'core/group',
							'attributes' => array(
								'style' => array(
									'spacing' => array(
										'padding' => array(
											'right' => '0px',
											'left' => '0px'
										),
										'margin' => array(
											'top' => '0',
											'bottom' => '0'
										)
									)
								),
								'layout' => array(
									'type' => 'flex',
									'flexWrap' => 'nowrap',
									'verticalAlignment' => 'top'
								)
							),
							'innerBlocks' => array(
								array(
									'name' => 'surecart/product-review-list-sidebar',
									'attributes' => array(
										'style' => array(
											'layout' => array(
												'selfStretch' => 'fixed',
												'flexSize' => '280px'
											),
											'position' => array(
												'type' => 'sticky',
												'top' => '0px'
											),
											'spacing' => array(
												'blockGap' => '30px'
											)
										),
										'layout' => array(
											'type' => 'flex',
											'orientation' => 'vertical'
										)
									),
									'innerBlocks' => array(
										array(
											'name' => 'surecart/product-review-list-filter-tags',
											'attributes' => array(
												'layout' => array(
													'type' => 'flex',
													'orientation' => 'vertical',
													'verticalAlignment' => 'top',
													'flexWrap' => 'nowrap'
												)
											),
											'innerBlocks' => array(
												array(
													'name' => 'surecart/product-review-list-filter-tags-label',
													'attributes' => array(
														'style' => array(
															'typography' => array(
																'fontWeight' => '600',
																'fontStyle' => 'normal'
															)
														)
													)
												),
												array(
													'name' => 'surecart/product-review-list-filter-tags-template',
													'attributes' => array(
														'layout' => array(
															'type' => 'flex',
															'orientation' => 'horizontal'
														)
													),
													'innerBlocks' => array(
														array(
															'name' => 'surecart/product-review-list-filter-tag'
														)
													)
												),
												array(
													'name' => 'surecart/product-review-list-filter-tags-clear-all',
													'attributes' => array(
														'style' => array(
															'typography' => array(
																'textDecoration' => 'underline'
															)
														)
													)
												)
											)
										),
										array(
											'name' => 'surecart/product-review-list-filter-checkboxes',
											'attributes' => array(
												'layout' => array(
													'type' => 'flex',
													'orientation' => 'vertical',
													'verticalAlignment' => 'top',
													'flexWrap' => 'nowrap'
												)
											),
											'innerBlocks' => array(
												array(
													'name' => 'surecart/product-review-list-filter-checkboxes-label',
													'attributes' => array(
														'style' => array(
															'typography' => array(
																'fontWeight' => '600',
																'fontStyle' => 'normal'
															)
														)
													)
												),
												array(
													'name' => 'surecart/product-review-list-filter-checkboxes-template',
													'attributes' => array(
														'style' => array(
															'spacing' => array(
																'blockGap' => '4px'
															)
														)
													),
													'innerBlocks' => array(
														array(
															'name' => 'surecart/product-review-list-filter-checkbox'
														)
													)
												)
											)
										)
									)
								),
								array(
									'name' => 'core/group',
									'attributes' => array(
										'style' => array(
											'spacing' => array(
												'blockGap' => '0px',
												'padding' => array(
													'right' => '0px',
													'left' => '0px'
												),
												'margin' => array(
													'top' => '0',
													'bottom' => '0'
												)
											),
											'layout' => array(
												'selfStretch' => 'fill',
												'flexSize' => null
											)
										),
										'layout' => array(
											'type' => 'flex',
											'orientation' => 'vertical',
											'justifyContent' => 'stretch'
										)
									),
									'innerBlocks' => array(
										array(
											'name' => 'surecart/product-review-template',
											'attributes' => array(
												'style' => array(
													'spacing' => array(
														'blockGap' => '0px',
														'margin' => array(
															'top' => '0',
															'bottom' => '0'
														),
														'padding' => array(
															'top' => '0',
															'bottom' => '0'
														)
													)
												),
												'layout' => array(
													'type' => 'grid',
													'columnCount' => 1
												)
											),
											'innerBlocks' => array(
												array(
													'name' => 'core/group',
													'attributes' => array(
														'style' => array(
															'spacing' => array(
																'blockGap' => '8px',
																'padding' => array(
																	'top' => '24px',
																	'bottom' => '24px',
																	'right' => '0px',
																	'left' => '0px'
																),
																'margin' => array(
																	'top' => '0',
																	'bottom' => '0'
																)
															),
															'border' => array(
																'bottom' => array(
																	'color' => '#e5e7eb',
																	'width' => '1px'
																)
															)
														),
														'layout' => array(
															'type' => 'constrained',
															'contentSize' => '100%'
														)
													),
													'innerBlocks' => array(
														array(
															'name' => 'core/group',
															'attributes' => array(
																'className' => 'sc-review-header-group',
																'style' => array(
																	'spacing' => array(
																		'margin' => array(
																			'top' => '0',
																			'bottom' => '16px'
																		),
																		'padding' => array(
																			'right' => '0px',
																			'left' => '0px'
																		)
																	)
																),
																'layout' => array(
																	'type' => 'flex',
																	'flexWrap' => 'nowrap',
																	'justifyContent' => 'space-between'
																)
															),
															'innerBlocks' => array(
																array(
																	'name' => 'core/group',
																	'attributes' => array(
																		'style' => array(
																			'spacing' => array(
																				'blockGap' => '4px',
																				'padding' => array(
																					'right' => '0px',
																					'left' => '0px'
																				),
																				'margin' => array(
																					'top' => '0',
																					'bottom' => '0'
																				)
																			)
																		),
																		'layout' => array(
																			'type' => 'flex',
																			'flexWrap' => 'nowrap'
																		)
																	),
																	'innerBlocks' => array(
																		array(
																			'name' => 'surecart/product-review-reviewer-name',
																			'attributes' => array(
																				'style' => array(
																					'spacing' => array(
																						'padding' => array(
																							'top' => '0',
																							'bottom' => '0'
																						),
																						'margin' => array(
																							'right' => '8px'
																						)
																					),
																					'typography' => array(
																						'fontStyle' => 'normal',
																						'fontWeight' => '500',
																						'fontSize' => '16px'
																					)
																				)
																			)
																		),
																		array(
																			'name' => 'surecart/product-review-verified-badge',
																			'attributes' => array(
																				'label' => 'Verified Buyer',
																				'style' => array(
																					'typography' => array(
																						'fontStyle' => 'normal',
																						'fontWeight' => '400',
																						'fontSize' => '16px'
																					),
																					'spacing' => array(
																						'blockGap' => '4px'
																					),
																					'layout' => array(
																						'selfStretch' => 'fit',
																						'flexSize' => null
																					)
																				),
																				'layout' => array(
																					'type' => 'flex',
																					'justifyContent' => 'center',
																					'verticalAlignment' => 'center',
																					'orientation' => 'horizontal'
																				)
																			)
																		)
																	)
																),
																array(
																	'name' => 'surecart/product-review-date',
																	'attributes' => array(
																		'datetime' => '2025-10-02T09:37:00.225Z',
																		'format' => 'human-diff',
																		'style' => array(
																			'typography' => array(
																				'fontSize' => '14px'
																			)
																		)
																	)
																)
															)
														),
														array(
															'name' => 'surecart/product-review-rating-stars',
															'attributes' => array(
																'style' => array(
																	'spacing' => array(
																		'margin' => array(
																			'bottom' => '16px'
																		)
																	)
																)
															)
														),
														array(
															'name' => 'surecart/product-review-title',
															'attributes' => array(
																'style' => array(
																	'typography' => array(
																		'fontStyle' => 'normal',
																		'fontWeight' => '700',
																		'fontSize' => '18px'
																	),
																	'spacing' => array(
																		'margin' => array(
																			'bottom' => '8px'
																		)
																	)
																)
															)
														),
														array(
															'name' => 'surecart/product-review-content',
															'attributes' => array(
																'style' => array(
																	'typography' => array(
																		'fontSize' => '16px'
																	)
																)
															)
														)
													)
												)
											)
										),
										array(
											'name' => 'surecart/product-review-pagination',
											'attributes' => array(
												'style' => array(
													'spacing' => array(
														'margin' => array(
															'top' => '30px',
															'bottom' => '30px'
														)
													)
												)
											),
											'innerBlocks' => array(
												array(
													'name' => 'surecart/product-review-pagination-previous'
												),
												array(
													'name' => 'surecart/product-review-pagination-numbers'
												),
												array(
													'name' => 'surecart/product-review-pagination-next'
												)
											)
										)
									)
								)
							)
						)
					)
				),
				array(
					'name' => 'surecart/product-review-list-no-reviews',
					'innerBlocks' => array(
						array(
							'name' => 'core/paragraph',
							'attributes' => array(
								'align' => 'left',
								'content' => 'No reviews yet.'
							)
						),
						array(
							'name' => 'core/group',
							'attributes' => array(
								'style' => array(
									'spacing' => array(
										'padding' => array(
											'right' => '0px',
											'left' => '0px'
										),
										'margin' => array(
											'top' => '0',
											'bottom' => '0'
										)
									)
								),
								'layout' => array(
									'type' => 'flex',
									'flexWrap' => 'nowrap'
								)
							),
							'innerBlocks' => array(
								array(
									'name' => 'surecart/product-review-add-button',
									'attributes' => array(
										'width' => 100,
										'className' => 'is-style-fill',
										'style' => array(
											'elements' => array(
												'link' => array(
													'color' => array(
														'text' => 'var:preset|color|white'
													)
												)
											),
											'spacing' => array(
												'blockGap' => '4px'
											)
										),
										'backgroundColor' => 'surecart',
										'textColor' => 'white'
									)
								)
							)
						)
					)
				)
			)
		),
		'providesContext' => array(
			'query' => 'query',
			'surecart/product-review/limit' => 'limit',
			'surecart/product-review/offset' => 'offset'
		),
		'attributes' => array(
			'query' => array(
				'type' => 'object',
				'default' => array(
					'perPage' => 15,
					'pages' => 0,
					'offset' => 0
				)
			)
		),
		'supports' => array(
			'interactivity' => true,
			'layout' => true,
			'align' => true,
			'currencyConversion' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'blockGap' => true
			)
		),
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'file:./style-index.css',
			'surecart-block-ui',
			'surecart-tag',
			'surecart-theme-base'
		),
		'viewScriptModule' => array(
			'@surecart/product-review'
		)
	),
	'product-review-list-content' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-review-list-content',
		'title' => 'Content',
		'description' => 'Display the product reviews.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-review-list'
		),
		'attributes' => array(
			
		),
		'supports' => array(
			'interactivity' => true,
			'layout' => array(
				'allowSwitching' => true
			),
			'align' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'blockGap' => true
			),
			'color' => array(
				'text' => true,
				'background' => true,
				'link' => true
			),
			'border' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true
			)
		),
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'render' => 'file:./view.php'
	),
	'product-review-list-filter-checkbox' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-review-list-filter-checkbox',
		'title' => 'Checkbox',
		'description' => 'Display the product review filter checkbox.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'example' => array(
			
		),
		'usesContext' => array(
			'surecart/checkbox/name'
		),
		'ancestor' => array(
			'surecart/product-review-list-filter-checkboxes-template'
		),
		'supports' => array(
			'interactivity' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => array(
					'top',
					'bottom'
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalFontWeight' => true
			),
			'color' => array(
				'text' => true,
				'background' => true,
				'enableContrastChecker' => true
			)
		),
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'render' => 'file:./view.php',
		'style' => array(
			'surecart-radio-checkbox'
		)
	),
	'product-review-list-filter-checkboxes' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-review-list-filter-checkboxes',
		'title' => 'Filter Checkboxes',
		'description' => 'Display the product review list filter checkboxes.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-review-list'
		),
		'attributes' => array(
			
		),
		'supports' => array(
			'interactivity' => true,
			'layout' => array(
				'allowSwitching' => false,
				'allowInheriting' => false,
				'allowSizingOnChildren' => true,
				'default' => array(
					'type' => 'flex',
					'orientation' => 'horizontal',
					'verticalAlignment' => 'top',
					'flexWrap' => 'nowrap'
				)
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'blockGap' => true,
				'default' => array(
					'blockGap' => '0'
				)
			)
		),
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'render' => 'file:./view.php'
	),
	'product-review-list-filter-checkboxes-label' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-review-list-filter-checkboxes-label',
		'title' => 'Label',
		'description' => 'Display the product review list filter checkboxes label.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'icon' => 'media-interactive',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-review-list-filter-checkboxes'
		),
		'attributes' => array(
			'label' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => array(
					'top',
					'bottom'
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true
			),
			'color' => array(
				'text' => true,
				'background' => false,
				'enableContrastChecker' => true
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js'
	),
	'product-review-list-filter-checkboxes-template' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-review-list-filter-checkboxes-template',
		'title' => 'Template',
		'description' => 'Display the review filter checkboxes.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-review-list-filter-checkboxes'
		),
		'supports' => array(
			'interactivity' => true,
			'layout' => array(
				'allowSwitching' => false,
				'allowInheriting' => false,
				'default' => array(
					'type' => 'flex',
					'orientation' => 'vertical'
				)
			),
			'spacing' => array(
				'padding' => true,
				'margin' => array(
					'top',
					'bottom'
				),
				'blockGap' => true,
				'default' => array(
					'blockGap' => '0'
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true
			),
			'color' => array(
				'text' => true,
				'background' => true,
				'enableContrastChecker' => true
			),
			'style' => array(
				'spacing' => array(
					'blockGap' => '0'
				)
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'file:./style-index.css'
		)
	),
	'product-review-list-filter-tag' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-review-list-filter-tag',
		'title' => 'Tag',
		'description' => 'Display the product review filter tag.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'example' => array(
			
		),
		'usesContext' => array(
			'surecart/filterTag/name'
		),
		'ancestor' => array(
			'surecart/product-review-list-filter-tags-template'
		),
		'supports' => array(
			'interactivity' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => array(
					'top',
					'bottom'
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true
			),
			'color' => array(
				'text' => true,
				'background' => true,
				'enableContrastChecker' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true,
				'__experimentalDefaultControls' => array(
					'color' => true,
					'radius' => true,
					'style' => true,
					'width' => true
				)
			)
		),
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'surecart-checkbox'
		),
		'render' => 'file:./view.php'
	),
	'product-review-list-filter-tags' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-review-list-filter-tags',
		'title' => 'Applied Filters',
		'description' => 'Display the product review applied filters.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-review-list'
		),
		'attributes' => array(
			
		),
		'supports' => array(
			'interactivity' => true,
			'layout' => array(
				'allowSwitching' => false,
				'allowInheriting' => false,
				'allowSizingOnChildren' => true,
				'default' => array(
					'type' => 'flex',
					'orientation' => 'horizontal',
					'verticalAlignment' => 'top',
					'flexWrap' => 'nowrap'
				)
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'blockGap' => true,
				'default' => array(
					'blockGap' => '0'
				)
			)
		),
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'file:./style-index.css'
		),
		'render' => 'file:./view.php'
	),
	'product-review-list-filter-tags-clear-all' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-review-list-filter-tags-clear-all',
		'title' => 'Clear All',
		'description' => 'Display the product review list filter tags clear all link.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'icon' => 'media-interactive',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-review-list-filter-tags'
		),
		'attributes' => array(
			'label' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => array(
					'top',
					'bottom'
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true
			),
			'color' => array(
				'text' => true,
				'background' => false,
				'enableContrastChecker' => true
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js'
	),
	'product-review-list-filter-tags-label' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-review-list-filter-tags-label',
		'title' => 'Label',
		'description' => 'Display the product review list filter tags label',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'icon' => 'media-interactive',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-review-list-filter-tags'
		),
		'attributes' => array(
			'label' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => array(
					'top',
					'bottom'
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true
			),
			'color' => array(
				'text' => true,
				'background' => false,
				'enableContrastChecker' => true
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js'
	),
	'product-review-list-filter-tags-template' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-review-list-filter-tags-template',
		'title' => 'Template',
		'description' => 'Display the filter tags.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-review-list-filter-tags'
		),
		'attributes' => array(
			'label' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'layout' => array(
				'allowSwitching' => false,
				'allowInheriting' => false,
				'default' => array(
					'type' => 'flex'
				)
			),
			'spacing' => array(
				'padding' => true,
				'margin' => array(
					'top',
					'bottom'
				),
				'blockGap' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true
			),
			'color' => array(
				'text' => true,
				'background' => true,
				'enableContrastChecker' => true
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'file:./style-index.css'
		)
	),
	'product-review-list-no-reviews' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-review-list-no-reviews',
		'title' => 'No reviews',
		'category' => 'surecart',
		'description' => 'Contains the block elements used to render content when no reviews are found.',
		'ancestor' => array(
			'surecart/product-review-list'
		),
		'textdomain' => 'surecart',
		'usesContext' => array(
			'query'
		),
		'example' => array(
			'innerBlocks' => array(
				array(
					'name' => 'core/paragraph',
					'attributes' => array(
						'content' => 'No reviews yet, write one now?'
					)
				),
				array(
					'name' => 'surecart/product-review-add-button',
					'attributes' => array(
						
					)
				)
			)
		),
		'supports' => array(
			'align' => true,
			'reusable' => false,
			'html' => false,
			'color' => array(
				'gradients' => true,
				'link' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true
				)
			),
			'interactivity' => array(
				'clientNavigation' => true
			)
		),
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js'
	),
	'product-review-list-sidebar' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-review-list-sidebar',
		'title' => 'Sidebar',
		'description' => 'Display the product review list sidebar with filters.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-review-list'
		),
		'attributes' => array(
			'label' => array(
				'type' => 'string'
			),
			'open' => array(
				'type' => 'boolean',
				'default' => true
			)
		),
		'supports' => array(
			'interactivity' => true,
			'layout' => array(
				'allowSwitching' => false,
				'allowInheriting' => false,
				'default' => array(
					'type' => 'flex',
					'orientation' => 'vertical'
				)
			),
			'position' => array(
				'sticky' => true
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'blockGap' => true,
				'default' => array(
					'blockGap' => '0'
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true
			),
			'color' => array(
				'text' => true,
				'background' => true,
				'enableContrastChecker' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true,
				'__experimentalDefaultControls' => array(
					'color' => true,
					'radius' => true,
					'style' => true,
					'width' => true
				)
			)
		),
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'file:./style-index.css',
			'surecart-drawer',
			'surecart-block-ui'
		),
		'render' => 'file:./view.php',
		'viewScriptModule' => array(
			'@surecart/sidebar'
		)
	),
	'product-review-list-sidebar-toggle' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-review-list-sidebar-toggle',
		'title' => 'Sidebar Toggle Button',
		'description' => 'Display the product review list sidebar toggle.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-review-list'
		),
		'attributes' => array(
			'label' => array(
				'type' => 'string'
			),
			'icon' => array(
				'type' => 'string',
				'default' => 'sliders'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true
			),
			'color' => array(
				'text' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true,
				'__experimentalDefaultControls' => array(
					'color' => true,
					'radius' => true,
					'style' => true,
					'width' => true
				)
			)
		),
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'file:./style-index.css'
		),
		'render' => 'file:./view.php',
		'viewScriptModule' => array(
			'@surecart/sidebar'
		)
	),
	'product-review-pagination' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-review-pagination',
		'title' => 'Pagination',
		'description' => 'Display the product review pagination.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'example' => array(
			
		),
		'usesContext' => array(
			'query',
			'surecart/product-review/limit'
		),
		'ancestor' => array(
			'surecart/product-page',
			'surecart/product-review-list'
		),
		'allowedBlocks' => array(
			'surecart/product-review-pagination-previous',
			'surecart/product-review-pagination-numbers',
			'surecart/product-review-pagination-next'
		),
		'attributes' => array(
			'paginationArrow' => array(
				'type' => 'string',
				'default' => 'arrow'
			),
			'showLabel' => array(
				'type' => 'boolean',
				'default' => true
			)
		),
		'providesContext' => array(
			'paginationArrow' => 'paginationArrow',
			'showLabel' => 'showLabel'
		),
		'supports' => array(
			'interactivity' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => array(
					'top',
					'bottom'
				),
				'blockGap' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true
			),
			'color' => array(
				'text' => true,
				'background' => false,
				'enableContrastChecker' => true
			),
			'layout' => array(
				'allowSwitching' => false,
				'allowInheriting' => false,
				'default' => array(
					'type' => 'flex',
					'justifyContent' => 'space-between'
				)
			),
			'align' => true
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'style' => 'file:./style-index.css',
		'editorScript' => 'file:./index.js'
	),
	'product-review-pagination-next' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-review-pagination-next',
		'title' => 'Next',
		'description' => 'Display the product review pagination next.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-review-pagination'
		),
		'usesContext' => array(
			'query',
			'surecart/product-review/limit',
			'paginationArrow',
			'showLabel'
		),
		'attributes' => array(
			'label' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => array(
					'top',
					'bottom'
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true
			),
			'color' => array(
				'text' => true,
				'background' => true,
				'enableContrastChecker' => true
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'product-review-pagination-numbers' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-review-pagination-numbers',
		'title' => 'Numbers',
		'description' => 'Display the product review pagination numbers.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-review-pagination'
		),
		'usesContext' => array(
			'query',
			'surecart/product-review/limit',
			'paginationArrow',
			'showLabel'
		),
		'supports' => array(
			'interactivity' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => array(
					'top',
					'bottom'
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true
			),
			'color' => array(
				'text' => true,
				'background' => false,
				'enableContrastChecker' => true
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'product-review-pagination-previous' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-review-pagination-previous',
		'title' => 'Previous',
		'description' => 'Display the product review pagination previous.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-review-pagination'
		),
		'usesContext' => array(
			'query',
			'surecart/product-review/limit',
			'paginationArrow',
			'showLabel'
		),
		'attributes' => array(
			'label' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => array(
					'top',
					'bottom'
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true
			),
			'color' => array(
				'text' => true,
				'background' => true,
				'enableContrastChecker' => true
			)
		),
		'render' => 'file:./view.php',
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'product-review-rating-stars' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-review-rating-stars',
		'title' => 'Review Rating Stars',
		'description' => 'Displays the rating given by the reviewer for a product review using stars.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'ancestor' => array(
			'surecart/product-review-template'
		),
		'keywords' => array(
			'review',
			'rating',
			'stars'
		),
		'usesContext' => array(
			'reviewId',
			'review'
		),
		'attributes' => array(
			'fill_color' => array(
				'type' => 'string',
				'default' => ''
			),
			'size' => array(
				'type' => 'string',
				'default' => '20px'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'color' => array(
				'text' => false,
				'link' => false,
				'background' => false,
				'__experimentalDefaultControls' => array(
					'background' => false,
					'text' => false
				)
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true,
				'blockGap' => array(
					'__experimentalDefault' => '2px'
				),
				'__experimentalDefaultControls' => array(
					'padding' => true,
					'margin' => true,
					'blockGap' => true
				)
			)
		),
		'example' => array(
			
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'style' => 'file:./style-index.css',
		'editorScript' => 'file:./index.js'
	),
	'product-review-reviewer-name' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-review-reviewer-name',
		'title' => 'Reviewer Name',
		'description' => 'Displays the name of the reviewer for a product review.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'ancestor' => array(
			'surecart/product-review-template'
		),
		'keywords' => array(
			'review',
			'reviewer',
			'name'
		),
		'usesContext' => array(
			'reviewId',
			'review'
		),
		'attributes' => array(
			'format' => array(
				'type' => 'string',
				'default' => 'display_name'
			)
		),
		'example' => array(
			
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => false
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'blockGap' => array(
					'__experimentalDefault' => '4px'
				)
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'product-review-summary' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-review-summary',
		'title' => 'Product Review Summary',
		'description' => 'Display the product review summary.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'example' => array(
			
		),
		'supports' => array(
			'interactivity' => true,
			'layout' => true,
			'align' => true,
			'color' => array(
				'gradients' => true,
				'link' => false,
				'__experimentalDefaultControls' => array(
					'background' => true,
					'text' => true
				)
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true,
				'blockGap' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'surecart-block-ui',
			'surecart-spinner'
		)
	),
	'product-review-template' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-review-template',
		'keywords' => array(
			'product',
			'review',
			'template'
		),
		'title' => 'Template',
		'description' => 'Displays product review template',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-review-list-content'
		),
		'usesContext' => array(
			'query',
			'surecart/product-review/limit'
		),
		'providesContext' => array(
			'reviewId' => 'id',
			'review' => 'review'
		),
		'supports' => array(
			'interactivity' => true,
			'inserter' => false,
			'layout' => array(
				'allowSwitching' => false,
				'allowInheriting' => false,
				'default' => array(
					'type' => 'flex'
				)
			),
			'align' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'blockGap' => array(
					'__experimentalDefault' => '1.25em'
				),
				'__experimentalDefaultControls' => array(
					'padding' => true,
					'margin' => true,
					'blockGap' => true
				)
			),
			'color' => array(
				'text' => false,
				'background' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'width' => true,
				'__experimentalDefaultControls' => array(
					'color' => true,
					'radius' => true,
					'width' => true
				)
			)
		),
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'viewScriptModule' => array(
			'@surecart/product-list',
			'@surecart/product-page'
		),
		'viewScript' => array(
			'wp-url',
			'wp-api-fetch',
			'wp-i18n',
			'wp-a11y'
		),
		'style' => 'file:./style-index.css',
		'render' => 'file:./view.php'
	),
	'product-review-title' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-review-title',
		'title' => 'Review Title',
		'description' => 'Displays the title of a product review.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'ancestor' => array(
			'surecart/product-review-template'
		),
		'keywords' => array(
			'review',
			'title'
		),
		'usesContext' => array(
			'reviewId',
			'review'
		),
		'example' => array(
			
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => false
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'blockGap' => array(
					'__experimentalDefault' => '4px'
				)
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'style' => 'file:./style-index.css',
		'editorScript' => 'file:./index.js'
	),
	'product-review-total-rating' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-review-total-rating',
		'title' => 'Reviews Count',
		'description' => 'Displays the total reviews count for the product.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'ancestor' => array(
			'surecart/product-page',
			'surecart/product-quick-view',
			'surecart/product-review-list',
			'surecart/sticky-purchase'
		),
		'usesContext' => array(
			'postId'
		),
		'attributes' => array(
			'show_label' => array(
				'type' => 'boolean',
				'default' => true
			),
			'show_for_zero_reviews' => array(
				'type' => 'boolean',
				'default' => true
			),
			'link_to_reviews' => array(
				'type' => 'boolean',
				'default' => true
			)
		),
		'styles' => array(
			array(
				'name' => 'default',
				'label' => 'Default'
			),
			array(
				'name' => 'plus-sign',
				'label' => 'Plus Sign',
				'isDefault' => true
			)
		),
		'example' => array(
			
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => false,
				'__experimentalDefaultControls' => array(
					'text' => true,
					'button' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'blockGap' => array(
					'__experimentalDefault' => '4px'
				),
				'__experimentalDefaultControls' => array(
					'padding' => true,
					'margin' => true,
					'blockGap' => true
				)
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'style' => 'file:./style-index.css',
		'editorScript' => 'file:./index.js'
	),
	'product-review-verified-badge' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-review-verified-badge',
		'title' => 'Review Verified Badge',
		'description' => 'Displays a verified badge for a product review.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'ancestor' => array(
			'surecart/product-review-template'
		),
		'keywords' => array(
			'review',
			'verified',
			'badge'
		),
		'usesContext' => array(
			'reviewId',
			'review'
		),
		'example' => array(
			
		),
		'attributes' => array(
			'show_label' => array(
				'type' => 'boolean',
				'default' => true
			),
			'label' => array(
				'type' => 'string'
			),
			'icon_size' => array(
				'type' => 'string',
				'default' => '16px'
			),
			'icon_color' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => false
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			),
			'layout' => array(
				'allowSwitching' => false,
				'allowInheriting' => false,
				'default' => array(
					'type' => 'flex',
					'justifyContent' => 'center',
					'verticalAlignment' => 'center'
				)
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'blockGap' => array(
					'__experimentalDefault' => '4px'
				),
				'__experimentalDefaultControls' => array(
					'padding' => true,
					'margin' => true,
					'blockGap' => true
				)
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'style' => 'file:./style-index.css',
		'editorScript' => 'file:./index.js'
	),
	'product-reviews' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-reviews',
		'title' => 'Review Content',
		'description' => 'Display the product reviews content',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-review-list'
		),
		'attributes' => array(
			
		),
		'supports' => array(
			'interactivity' => true,
			'layout' => array(
				'allowSwitching' => true
			),
			'align' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'blockGap' => true
			),
			'color' => array(
				'text' => true,
				'background' => true,
				'link' => true
			),
			'border' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true
			)
		),
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'render' => 'file:./view.php'
	),
	'product-sale-badge' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-sale-badge',
		'title' => 'Sale Badge',
		'description' => 'Display a badge if the product is currently on sale',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'icon' => 'tag',
		'ancestor' => array(
			'surecart/product-page',
			'surecart/product-template',
			'surecart/product-quick-view',
			'surecart/sticky-purchase'
		),
		'usesContext' => array(
			'postId'
		),
		'example' => array(
			'attributes' => array(
				'text' => 'Sale'
			)
		),
		'attributes' => array(
			'text' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => true,
				'__experimentalDefaultControls' => array(
					'text' => true,
					'background' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true
			),
			'spacing' => array(
				'padding' => true
			),
			'shadow' => true,
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true,
				'__experimentalDefaultControls' => array(
					'color' => true,
					'radius' => true,
					'style' => true,
					'width' => true
				)
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'surecart-tag',
			'file:./style-index.css'
		)
	),
	'product-scratch-price' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-scratch-price',
		'title' => 'Scratch Price',
		'description' => 'Display the product scratch price.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'icon' => 'media-interactive',
		'example' => array(
			
		),
		'usesContext' => array(
			'postId'
		),
		'ancestor' => array(
			'surecart/product-template'
		),
		'supports' => array(
			'interactivity' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => array(
					'top',
					'bottom'
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			),
			'color' => array(
				'text' => true,
				'background' => false,
				'enableContrastChecker' => true
			),
			'currencyConversion' => true
		),
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css',
		'render' => 'file:./view.php'
	),
	'product-selected-price-ad-hoc-amount' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-selected-price-ad-hoc-amount',
		'title' => 'Selected Price Custom Amount',
		'description' => 'Displays the currently selected price custom amount.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'icon' => 'money-alt',
		'ancestor' => array(
			'surecart/product-page',
			'surecart/product-quick-view',
			'surecart/sticky-purchase'
		),
		'example' => array(
			'attributes' => array(
				
			)
		),
		'attributes' => array(
			'label' => array(
				'type' => 'string'
			),
			'width' => array(
				'type' => 'string',
				'default' => '100%'
			),
			'lock' => array(
				'type' => 'object',
				'default' => array(
					'move' => false,
					'remove' => true
				)
			)
		),
		'usesContext' => array(
			'surecart/has-ad-hoc-block'
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => false,
				'__experimentalDefaultControls' => array(
					'text' => true,
					'button' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'__experimentalDefaultControls' => array(
					'padding' => true,
					'margin' => true
				)
			),
			'currencyConversion' => true
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'surecart-form-control',
			'surecart-input-group',
			'file:./style-index.css'
		)
	),
	'product-selected-price-amount' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-selected-price-amount',
		'title' => 'Selected Price Amount',
		'description' => 'Displays the currently selected price or variant amount.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'icon' => 'money-alt',
		'ancestor' => array(
			'surecart/product-page',
			'surecart/product-quick-view',
			'surecart/sticky-purchase'
		),
		'example' => array(
			'attributes' => array(
				
			)
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => false,
				'__experimentalDefaultControls' => array(
					'text' => true,
					'button' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'product-selected-price-fees' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-selected-price-fees',
		'title' => 'Selected Price Fees',
		'description' => 'Displays the currently selected price fees.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'icon' => 'money-alt',
		'ancestor' => array(
			'surecart/product-page',
			'surecart/product-quick-view',
			'surecart/sticky-purchase'
		),
		'example' => array(
			'attributes' => array(
				
			)
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => false,
				'__experimentalDefaultControls' => array(
					'text' => true,
					'button' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'product-selected-price-interval' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-selected-price-interval',
		'title' => 'Selected Price Interval',
		'description' => 'Displays the currently selected price interval.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'icon' => 'clock',
		'ancestor' => array(
			'surecart/product-page',
			'surecart/product-quick-view',
			'surecart/sticky-purchase'
		),
		'example' => array(
			'attributes' => array(
				
			)
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => false,
				'__experimentalDefaultControls' => array(
					'text' => true,
					'button' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'product-selected-price-scratch-amount' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-selected-price-scratch-amount',
		'title' => 'Selected Price Scratch Amount',
		'description' => 'Displays the currently selected price scratch amount.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'icon' => 'money-alt',
		'ancestor' => array(
			'surecart/product-page',
			'surecart/product-quick-view',
			'surecart/sticky-purchase'
		),
		'example' => array(
			'attributes' => array(
				
			)
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => false,
				'__experimentalDefaultControls' => array(
					'text' => true,
					'button' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalTextDecoration' => true
			),
			'currencyConversion' => true
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'file:./style-index.css'
		)
	),
	'product-selected-price-trial' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-selected-price-trial',
		'title' => 'Selected Price Trial',
		'description' => 'Displays the currently selected price trial.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'icon' => 'clock',
		'ancestor' => array(
			'surecart/product-page',
			'surecart/product-quick-view',
			'surecart/sticky-purchase'
		),
		'example' => array(
			'attributes' => array(
				
			)
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => false,
				'__experimentalDefaultControls' => array(
					'text' => true,
					'button' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true
			),
			'currencyConversion' => true
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'product-selected-variant' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-selected-variant',
		'title' => 'Selected Variant Display',
		'description' => 'Displays the currently selected variant of a product.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'icon' => 'clock',
		'ancestor' => array(
			'surecart/product-page',
			'surecart/product-quick-view',
			'surecart/sticky-purchase'
		),
		'example' => array(
			'attributes' => array(
				
			)
		),
		'attributes' => array(
			'separator' => array(
				'type' => 'string',
				'default' => ' / '
			)
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => false,
				'__experimentalDefaultControls' => array(
					'text' => true,
					'button' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true
			),
			'currencyConversion' => true
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'product-selected-variant-image' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-selected-variant-image',
		'title' => 'Product Selected Variant Image',
		'description' => 'Shows the image for the currently selected product variant.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'icon' => 'tag',
		'ancestor' => array(
			'surecart/product-page',
			'surecart/product-template',
			'surecart/sticky-purchase',
			'surecart/product-quick-view'
		),
		'example' => array(
			'attributes' => array(
				
			)
		),
		'attributes' => array(
			'sizing' => array(
				'type' => 'string',
				'default' => 'cover'
			),
			'aspectRatio' => array(
				'type' => 'string'
			),
			'width' => array(
				'type' => 'string'
			),
			'height' => array(
				'type' => 'string'
			),
			'hide_on_mobile' => array(
				'type' => 'boolean',
				'default' => false
			)
		),
		'supports' => array(
			'interactivity' => true,
			'anchor' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'__experimentalDefaultControls' => array(
					'padding' => true,
					'margin' => true
				)
			),
			'color' => array(
				'text' => false,
				'background' => false
			),
			'__experimentalBorder' => array(
				'width' => true,
				'color' => true,
				'radius' => true,
				'__experimentalDefaultControls' => array(
					'width' => true,
					'color' => true,
					'radius' => true
				)
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'style' => 'file:./style-index.css'
	),
	'product-template' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-template',
		'keywords' => array(
			'product',
			'list'
		),
		'title' => 'Template',
		'description' => 'Displays products list.',
		'version' => '1.0.0',
		'category' => 'surecart-product-list',
		'example' => array(
			'attributes' => array(
				
			)
		),
		'ancestor' => array(
			'surecart/product-list'
		),
		'usesContext' => array(
			'query',
			'surecart/product-list/limit',
			'surecart/product-list/type',
			'surecart/product-list/ids'
		),
		'supports' => array(
			'interactivity' => true,
			'inserter' => false,
			'layout' => array(
				'__experimentalDefault' => 'grid',
				'__experimentalDefaultControls' => array(
					'layout' => true
				)
			),
			'align' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'blockGap' => array(
					'__experimentalDefault' => '1.25em'
				),
				'__experimentalDefaultControls' => array(
					'padding' => true,
					'margin' => true,
					'blockGap' => true
				)
			),
			'color' => array(
				'text' => false,
				'background' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'width' => true,
				'__experimentalDefaultControls' => array(
					'color' => true,
					'radius' => true,
					'width' => true
				)
			)
		),
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'viewScriptModule' => array(
			'@surecart/product-list',
			'@surecart/product-page'
		),
		'viewScript' => array(
			'wp-url',
			'wp-api-fetch',
			'wp-i18n',
			'wp-a11y'
		),
		'style' => 'file:./style-index.css',
		'render' => 'file:./view.php'
	),
	'product-template-container' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-template-container',
		'title' => 'Product Template Container',
		'description' => 'Display the Product Template Container.',
		'version' => '1.0.0',
		'category' => 'surecart-product-list',
		'example' => array(
			
		),
		'ancestor' => array(
			'surecart/product-list'
		),
		'attributes' => array(
			
		),
		'supports' => array(
			'interactivity' => true,
			'inserter' => false,
			'align' => array(
				'wide',
				'full'
			),
			'layout' => array(
				'allowSizingOnChildren' => true
			),
			'position' => array(
				'sticky' => true
			),
			'dimensions' => array(
				'minHeight' => true
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true,
				'blockGap' => true,
				'default' => array(
					'blockGap' => '0'
				)
			),
			'style' => array(
				'spacing' => array(
					'blockGap' => '0'
				)
			)
		),
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'file:./style-index.css'
		),
		'render' => 'file:./view.php'
	),
	'product-title' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-title',
		'title' => 'Product Title',
		'description' => 'Display the product title.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'example' => array(
			
		),
		'usesContext' => array(
			'postId'
		),
		'ancestor' => array(
			'surecart/product-page',
			'surecart/product-template',
			'surecart/product-quick-view',
			'surecart/sticky-purchase'
		),
		'attributes' => array(
			'level' => array(
				'type' => 'number',
				'default' => 1
			),
			'isLink' => array(
				'type' => 'boolean',
				'default' => false
			),
			'rel' => array(
				'type' => 'string',
				'attribute' => 'rel',
				'default' => ''
			),
			'linkTarget' => array(
				'type' => 'string',
				'default' => '_self'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'color' => array(
				'gradients' => true,
				'link' => false,
				'__experimentalDefaultControls' => array(
					'background' => true,
					'text' => true
				)
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true,
				'__experimentalFontWeight' => true,
				'__experimentalFontStyle' => true,
				'__experimentalTextTransform' => true,
				'__experimentalTextDecoration' => true,
				'__experimentalLetterSpacing' => true,
				'__experimentalDefaultControls' => array(
					'fontSize' => true,
					'fontAppearance' => true,
					'textTransform' => true
				)
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'style' => 'file:./style-index.css',
		'editorScript' => 'file:./index.js'
	),
	'product-variant-pill' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-variant-pill',
		'title' => 'Pill',
		'description' => 'Displays a product variant choice as a pill.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'ancestor' => array(
			'surecart/product-variant-pills'
		),
		'usesContext' => array(
			'surecart/productVariantPill/name',
			'surecart/productVariantPill/selected'
		),
		'attributes' => array(
			'highlight_text' => array(
				'type' => 'string'
			),
			'highlight_background' => array(
				'type' => 'string'
			),
			'highlight_border' => array(
				'type' => 'string'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'inserter' => false,
			'anchor' => true,
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'width' => true,
				'__experimentalDefaultControls' => array(
					'color' => true,
					'radius' => true,
					'width' => true
				)
			),
			'color' => array(
				'gradients' => true,
				'text' => true,
				'background' => true,
				'__experimentalDefaultControls' => array(
					'text' => true,
					'background' => true
				)
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true
			),
			'shadow' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => array(
					'top',
					'bottom'
				)
			)
		),
		'textdomain' => 'surecart',
		'editorScript' => 'file:./index.js',
		'render' => 'file:./view.php',
		'style' => array(
			'surecart-pill',
			'file:./style-index.css'
		)
	),
	'product-variant-pills' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/product-variant-pills',
		'title' => 'Variants Selector',
		'description' => 'Display product variants as pills selector.',
		'version' => '1.0.0',
		'category' => 'surecart-product-page',
		'ancestor' => array(
			'surecart/product-page',
			'surecart/product-quick-view',
			'surecart/product-template',
			'surecart/sticky-purchase',
			'surecart/upsell'
		),
		'usesContext' => array(
			'postId'
		),
		'attributes' => array(
			'show_label' => array(
				'type' => 'boolean',
				'default' => true
			),
			'max_visible_options' => array(
				'type' => 'number',
				'default' => 0
			)
		),
		'supports' => array(
			'interactivity' => true,
			'html' => false,
			'anchor' => true,
			'spacing' => array(
				'padding' => true,
				'margin' => array(
					'top',
					'bottom'
				)
			),
			'color' => array(
				'text' => true,
				'background' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true
			)
		),
		'textdomain' => 'surecart',
		'viewScriptModule' => array(
			'@surecart/product-page'
		),
		'editorScript' => 'file:./index.js',
		'render' => 'file:./view.php',
		'style' => array(
			'file:./style-index.css',
			'surecart-label',
			'surecart-product-variants'
		)
	),
	'sticky-purchase' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'surecart/sticky-purchase',
		'title' => 'Sticky purchase',
		'description' => 'Display the sticky purchase.',
		'version' => '1.0.0',
		'example' => array(
			
		),
		'category' => 'surecart-cart',
		'usesContext' => array(
			'showStickyPurchaseButton'
		),
		'attributes' => array(
			'width' => array(
				'type' => 'string',
				'default' => '600px'
			)
		),
		'supports' => array(
			'interactivity' => true,
			'multiple' => false,
			'currencyConversion' => true,
			'layout' => array(
				'allowSwitching' => false,
				'allowInheriting' => false,
				'allowSizingOnChildren' => true,
				'default' => array(
					'type' => 'flex',
					'orientation' => 'horizontal',
					'verticalAlignment' => 'top',
					'flexWrap' => 'nowrap',
					'wideSize' => 'full'
				)
			),
			'anchor' => true,
			'color' => array(
				'gradients' => true
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'__experimentalFontWeight' => true
			),
			'__experimentalBorder' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true,
				'__experimentalDefaultControls' => array(
					'color' => true,
					'radius' => true,
					'style' => true,
					'width' => true
				)
			)
		),
		'textdomain' => 'surecart',
		'render' => 'file:./view.php',
		'editorScript' => 'file:./index.js',
		'viewScriptModule' => array(
			'@surecart/product-page',
			'@surecart/sticky-purchase'
		),
		'editorStyle' => array(
			'file:./index.css'
		),
		'style' => array(
			'file:./style-index.css',
			'surecart-block-ui',
			'surecart-spinner'
		)
	)
);
