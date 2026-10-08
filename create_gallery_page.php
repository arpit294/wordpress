<?php
require_once __DIR__ . '/wp-load.php';

$upload_dir = wp_upload_dir();
$banner_url = $upload_dir['baseurl'] . '/2019/12/banner-05.jpg';

// Gallery Project Images
$img1 = $upload_dir['baseurl'] . '/2019/12/banner-03.jpg';
$img2 = $upload_dir['baseurl'] . '/2019/12/banner-04.jpg';
$img3 = $upload_dir['baseurl'] . '/2019/12/banner-06.jpg';
$img4 = $upload_dir['baseurl'] . '/2017/12/product-about-01.jpg';
$img5 = $upload_dir['baseurl'] . '/2017/12/product-about-02.jpg';
$img6 = $upload_dir['baseurl'] . '/2017/12/product-about-03.jpg';

$gallery_content = <<<HTML
<style>
.gallery-page-wrap {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #334155;
    line-height: 1.7;
    margin: 0;
    padding: 0;
}
.gallery-hero {
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.88), rgba(30, 41, 59, 0.92)), url('{$banner_url}') center/cover no-repeat;
    color: #ffffff;
    text-align: center;
    padding: 85px 20px;
    border-radius: 0 0 20px 20px;
    margin-bottom: 50px;
}
.gallery-hero .badge {
    display: inline-block;
    background: rgba(37, 99, 235, 0.25);
    color: #60a5fa;
    border: 1px solid rgba(96, 165, 250, 0.4);
    padding: 6px 18px;
    border-radius: 9999px;
    font-size: 0.85rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 18px;
}
.gallery-hero h1 {
    color: #ffffff !important;
    font-size: 2.8rem;
    font-weight: 800;
    margin: 0 0 16px 0;
    line-height: 1.2;
}
.gallery-hero p.subtitle {
    color: #cbd5e1;
    font-size: 1.2rem;
    max-width: 680px;
    margin: 0 auto;
}
.gallery-container {
    max-width: 1180px;
    margin: 0 auto 70px auto;
    padding: 0 20px;
}
/* Filter Tabs */
.gallery-filter-tabs {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 45px;
}
.gallery-tab {
    padding: 10px 22px;
    border-radius: 30px;
    font-size: 0.95rem;
    font-weight: 600;
    color: #475569;
    background: #f1f5f9;
    border: 1px solid #e2e8f0;
    cursor: pointer;
    transition: all 0.25s ease;
    text-decoration: none;
}
.gallery-tab:hover, .gallery-tab.active {
    background: #2563eb;
    color: #ffffff !important;
    border-color: #2563eb;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}
/* Grid */
.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 30px;
    margin-bottom: 60px;
}
.gallery-item {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
}
.gallery-item:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
.gallery-img-wrap {
    position: relative;
    width: 100%;
    height: 240px;
    overflow: hidden;
    background: #0f172a;
}
.gallery-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
    display: block;
}
.gallery-item:hover .gallery-img-wrap img {
    transform: scale(1.08);
}
.gallery-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(15, 23, 42, 0.2) 0%, rgba(15, 23, 42, 0.8) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    display: flex;
    align-items: flex-end;
    padding: 20px;
}
.gallery-item:hover .gallery-overlay {
    opacity: 1;
}
.gallery-overlay-badge {
    background: #2563eb;
    color: #ffffff;
    padding: 4px 12px;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 700;
}
.gallery-info {
    padding: 24px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}
.gallery-tag {
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #2563eb;
    letter-spacing: 0.5px;
    margin-bottom: 8px;
}
.gallery-info h3 {
    margin: 0 0 10px 0;
    font-size: 1.3rem;
    color: #0f172a;
    font-weight: 700;
}
.gallery-info p {
    color: #64748b;
    font-size: 0.95rem;
    line-height: 1.6;
    margin: 0 0 18px 0;
    flex-grow: 1;
}
.gallery-link {
    color: #2563eb;
    font-weight: 700;
    text-decoration: none;
    font-size: 0.95rem;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: gap 0.2s ease;
}
.gallery-link:hover {
    gap: 10px;
    color: #1d4ed8;
}
/* CTA Strip */
.gallery-cta {
    background: linear-gradient(135deg, #1e1b4b, #312e81);
    color: #ffffff;
    border-radius: 16px;
    padding: 50px 40px;
    text-align: center;
}
.gallery-cta h2 {
    color: #ffffff !important;
    font-size: 2.2rem;
    margin: 0 0 12px 0;
}
.gallery-cta p {
    color: #c7d2fe;
    font-size: 1.15rem;
    max-width: 600px;
    margin: 0 auto 30px auto;
}
.gallery-cta-btn {
    display: inline-block;
    background: #f59e0b;
    color: #0f172a !important;
    padding: 16px 36px;
    border-radius: 8px;
    font-weight: 700;
    font-size: 1.1rem;
    text-decoration: none;
    transition: transform 0.2s ease;
}
.gallery-cta-btn:hover {
    transform: translateY(-2px);
    background: #fbbf24;
}
@media (max-width: 768px) {
    .gallery-hero h1 { font-size: 2rem; }
    .gallery-grid { grid-template-columns: 1fr; }
}
</style>

<div class="gallery-page-wrap">
    <div class="gallery-hero">
        <span class="badge">Portfolio & Showcase</span>
        <h1>Our Creative Gallery</h1>
        <p class="subtitle">Explore our latest client projects, bespoke web platforms, brand identities, and high-performance digital work.</p>
    </div>

    <div class="gallery-container">
        <!-- Filter Tabs -->
        <div class="gallery-filter-tabs">
            <span class="gallery-tab active">All Works</span>
            <span class="gallery-tab">Web Development</span>
            <span class="gallery-tab">UI/UX Design</span>
            <span class="gallery-tab">Mobile Platforms</span>
            <span class="gallery-tab">Digital Marketing</span>
        </div>

        <!-- Project Grid -->
        <div class="gallery-grid">
            <!-- Item 1 -->
            <div class="gallery-item">
                <div class="gallery-img-wrap">
                    <img src="{$img1}" alt="Enterprise Tech Platform" loading="lazy" />
                    <div class="gallery-overlay">
                        <span class="gallery-overlay-badge">Web Application</span>
                    </div>
                </div>
                <div class="gallery-info">
                    <span class="gallery-tag">Development & Cloud</span>
                    <h3>Enterprise Cloud Platform</h3>
                    <p>Complete architecture, real-time dashboards, and secure user management for a high-growth tech company.</p>
                    <a href="http://localhost/wordpress/contact/" class="gallery-link">View Case Study &rarr;</a>
                </div>
            </div>

            <!-- Item 2 -->
            <div class="gallery-item">
                <div class="gallery-img-wrap">
                    <img src="{$img2}" alt="Modern E-Commerce Store" loading="lazy" />
                    <div class="gallery-overlay">
                        <span class="gallery-overlay-badge">E-Commerce</span>
                    </div>
                </div>
                <div class="gallery-info">
                    <span class="gallery-tag">UI/UX & WooCommerce</span>
                    <h3>Next-Gen Retail Storefront</h3>
                    <p>Modern mobile-first e-commerce experience featuring lightning checkout and conversion rate optimization.</p>
                    <a href="http://localhost/wordpress/contact/" class="gallery-link">View Case Study &rarr;</a>
                </div>
            </div>

            <!-- Item 3 -->
            <div class="gallery-item">
                <div class="gallery-img-wrap">
                    <img src="{$img3}" alt="Corporate Branding & Website" loading="lazy" />
                    <div class="gallery-overlay">
                        <span class="gallery-overlay-badge">Brand Identity</span>
                    </div>
                </div>
                <div class="gallery-info">
                    <span class="gallery-tag">Corporate & Design</span>
                    <h3>Global Financial Advisory</h3>
                    <p>Clean corporate rebrand with bespoke typography, interactive calculators, and compliance documentation.</p>
                    <a href="http://localhost/wordpress/contact/" class="gallery-link">View Case Study &rarr;</a>
                </div>
            </div>

            <!-- Item 4 -->
            <div class="gallery-item">
                <div class="gallery-img-wrap">
                    <img src="{$img4}" alt="Creative Design Studio" loading="lazy" />
                    <div class="gallery-overlay">
                        <span class="gallery-overlay-badge">Creative Studio</span>
                    </div>
                </div>
                <div class="gallery-info">
                    <span class="gallery-tag">Digital Strategy</span>
                    <h3>Creative Studio Showcase</h3>
                    <p>High-aesthetic portfolio layout with fluid animations, micro-interactions, and visual storytelling.</p>
                    <a href="http://localhost/wordpress/contact/" class="gallery-link">View Case Study &rarr;</a>
                </div>
            </div>

            <!-- Item 5 -->
            <div class="gallery-item">
                <div class="gallery-img-wrap">
                    <img src="{$img5}" alt="SaaS Growth Campaign" loading="lazy" />
                    <div class="gallery-overlay">
                        <span class="gallery-overlay-badge">Growth & SEO</span>
                    </div>
                </div>
                <div class="gallery-info">
                    <span class="gallery-tag">Marketing & Analytics</span>
                    <h3>SaaS Inbound Growth Funnel</h3>
                    <p>Strategic landing page campaign that reduced customer acquisition costs by 45% in ninety days.</p>
                    <a href="http://localhost/wordpress/contact/" class="gallery-link">View Case Study &rarr;</a>
                </div>
            </div>

            <!-- Item 6 -->
            <div class="gallery-item">
                <div class="gallery-img-wrap">
                    <img src="{$img6}" alt="Mobile App Ecosystem" loading="lazy" />
                    <div class="gallery-overlay">
                        <span class="gallery-overlay-badge">Mobile App</span>
                    </div>
                </div>
                <div class="gallery-info">
                    <span class="gallery-tag">Mobile & Product</span>
                    <h3>Cross-Platform Mobile App</h3>
                    <p>Seamless iOS and Android companion application connecting thousands of daily active users effortlessly.</p>
                    <a href="http://localhost/wordpress/contact/" class="gallery-link">View Case Study &rarr;</a>
                </div>
            </div>
        </div>

        <!-- CTA Section -->
        <div class="gallery-cta">
            <h2>Like What You See? Let’s Work Together</h2>
            <p>We are currently accepting new client projects. Tell us about your vision and let's bring it to life.</p>
            <a href="http://localhost/wordpress/contact/" class="gallery-cta-btn">Start Your Project</a>
        </div>
    </div>
</div>
HTML;

// Check or Create Gallery page
$existing_gallery = get_page_by_path('gallery');
if ($existing_gallery) {
    $gallery_id = $existing_gallery->ID;
    wp_update_post([
        'ID' => $gallery_id,
        'post_title' => 'Gallery',
        'post_content' => $gallery_content,
        'post_status' => 'publish',
    ]);
    echo "Updated Gallery page (ID $gallery_id)\n";
} else {
    $gallery_id = wp_insert_post([
        'post_title' => 'Gallery',
        'post_name' => 'gallery',
        'post_content' => $gallery_content,
        'post_status' => 'publish',
        'post_type' => 'page',
    ]);
    echo "Created Gallery page (ID $gallery_id)\n";
}

// Set Astra settings
update_post_meta($gallery_id, 'site-content-layout', 'page-builder');
update_post_meta($gallery_id, 'site-sidebar-layout', 'no-sidebar');
update_post_meta($gallery_id, 'site-post-title', 'disabled');
update_post_meta($gallery_id, 'ast-title-bar-display', 'disabled');

// Add to Primary Navigation Menu (72)
$menu_id = 72;
$items = wp_get_nav_menu_items($menu_id);
$already_in_menu = false;
if ($items) {
    foreach ($items as $item) {
        if ($item->object_id == $gallery_id || strtolower($item->title) === 'gallery') {
            $already_in_menu = true;
            break;
        }
    }
}

if (!$already_in_menu) {
    wp_update_nav_menu_item($menu_id, 0, [
        'menu-item-title'     => 'Gallery',
        'menu-item-object'    => 'page',
        'menu-item-object-id' => $gallery_id,
        'menu-item-type'      => 'post_type',
        'menu-item-status'    => 'publish',
        'menu-item-position'  => 4, // between Services and Contact
    ]);
    echo "Added Gallery to Navigation Menu!\n";
} else {
    echo "Gallery already in Navigation Menu.\n";
}

echo "Gallery URL: " . get_permalink($gallery_id) . "\n";
