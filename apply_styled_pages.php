<?php
require_once __DIR__ . '/wp-load.php';

$upload_dir = wp_upload_dir();
$banner_url = $upload_dir['baseurl'] . '/2019/12/banner-04.jpg';

// CSS shared style for consistent modern corporate design
$common_css = <<<CSS
<style>
.custom-page-wrap {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #334155;
    line-height: 1.7;
    margin: 0;
    padding: 0;
}
.page-hero {
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.88), rgba(30, 41, 59, 0.92)), url('{$banner_url}') center/cover no-repeat;
    color: #ffffff;
    text-align: center;
    padding: 85px 20px;
    border-radius: 0 0 20px 20px;
    margin-bottom: 50px;
}
.page-hero .badge {
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
.page-hero h1 {
    color: #ffffff !important;
    font-size: 2.8rem;
    font-weight: 800;
    margin: 0 0 16px 0;
    line-height: 1.2;
}
.page-hero p.subtitle {
    color: #cbd5e1;
    font-size: 1.2rem;
    max-width: 680px;
    margin: 0 auto;
}
.content-container {
    max-width: 1140px;
    margin: 0 auto 70px auto;
    padding: 0 20px;
}
.legal-container {
    max-width: 860px;
    margin: 0 auto 70px auto;
    padding: 0 20px;
}
.legal-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 45px 40px;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.04);
}
.legal-section {
    margin-bottom: 35px;
    padding-bottom: 25px;
    border-bottom: 1px solid #f1f5f9;
}
.legal-section:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
}
.legal-section h2 {
    color: #0f172a;
    font-size: 1.45rem;
    font-weight: 700;
    margin-top: 0;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 10px;
}
.legal-section p, .legal-section li {
    color: #475569;
    font-size: 1.02rem;
}
.legal-section ul {
    margin: 10px 0 15px 25px;
}
.legal-callout {
    background: #eff6ff;
    border-left: 4px solid #2563eb;
    padding: 16px 20px;
    border-radius: 0 8px 8px 0;
    margin: 20px 0;
    color: #1e40af;
    font-size: 0.95rem;
}
/* Services Grid */
.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 30px;
    margin-bottom: 60px;
}
.service-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 35px 28px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    display: flex;
    flex-direction: column;
}
.service-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08);
    border-color: #cbd5e1;
}
.service-icon {
    width: 60px;
    height: 60px;
    background: #eff6ff;
    color: #2563eb;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    margin-bottom: 22px;
}
.service-card h3 {
    color: #0f172a;
    font-size: 1.4rem;
    font-weight: 700;
    margin: 0 0 12px 0;
}
.service-card p {
    color: #64748b;
    font-size: 0.98rem;
    line-height: 1.6;
    margin-bottom: 20px;
    flex-grow: 1;
}
.service-features {
    list-style: none;
    padding: 0;
    margin: 0 0 25px 0;
}
.service-features li {
    font-size: 0.9rem;
    color: #334155;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 8px;
}
.service-btn {
    display: inline-block;
    background: #2563eb;
    color: #ffffff !important;
    text-align: center;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 700;
    text-decoration: none;
    transition: background 0.2s ease;
}
.service-btn:hover {
    background: #1d4ed8;
}
/* CTA Strip */
.cta-banner {
    background: linear-gradient(135deg, #1e1b4b, #312e81);
    color: #ffffff;
    border-radius: 16px;
    padding: 50px 40px;
    text-align: center;
}
.cta-banner h2 {
    color: #ffffff !important;
    font-size: 2.2rem;
    margin: 0 0 12px 0;
}
.cta-banner p {
    color: #c7d2fe;
    font-size: 1.15rem;
    max-width: 600px;
    margin: 0 auto 30px auto;
}
.cta-btn {
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
.cta-btn:hover {
    transform: translateY(-2px);
    background: #fbbf24;
}
@media (max-width: 768px) {
    .page-hero h1 { font-size: 2rem; }
    .legal-card { padding: 30px 20px; }
}
</style>
CSS;

// 1. SERVICES PAGE
$services_html = $common_css . <<<HTML
<div class="custom-page-wrap">
    <div class="page-hero">
        <span class="badge">What We Do</span>
        <h1>Our Professional Services</h1>
        <p class="subtitle">Cutting-edge web engineering, marketing strategy, and cloud solutions designed to accelerate your growth.</p>
    </div>

    <div class="content-container">
        <div class="services-grid">
            <!-- Card 1 -->
            <div class="service-card">
                <div class="service-icon">💻</div>
                <h3>Custom Web Development</h3>
                <p>We build responsive, blazing-fast WordPress & Elementor websites with clean architecture, enterprise security, and bespoke interactivity.</p>
                <ul class="service-features">
                    <li>✔ Custom Theme & Plugin Setup</li>
                    <li>✔ 100% Mobile & Tablet Responsive</li>
                    <li>✔ Clean Code & Fast Load Speed</li>
                </ul>
                <a href="http://localhost/wordpress/contact/" class="service-btn">Get Started</a>
            </div>

            <!-- Card 2 -->
            <div class="service-card">
                <div class="service-icon">🎨</div>
                <h3>UI/UX & Brand Design</h3>
                <p>Transform your online impression with modern design systems, intuitive layouts, engaging typography, and interactive user journeys.</p>
                <ul class="service-features">
                    <li>✔ Wireframing & Interactive Prototyping</li>
                    <li>✔ Conversion-Focused User Experience</li>
                    <li>✔ Complete Design System & Assets</li>
                </ul>
                <a href="http://localhost/wordpress/contact/" class="service-btn">Get Started</a>
            </div>

            <!-- Card 3 -->
            <div class="service-card">
                <div class="service-icon">🚀</div>
                <h3>Digital Marketing & Ads</h3>
                <p>High-ROI advertising campaigns across Google, Meta, and LinkedIn that target high-intent buyers and turn clicks into booked revenue.</p>
                <ul class="service-features">
                    <li>✔ Paid Search & Social Ads (PPC)</li>
                    <li>✔ Audience Targeting & Retargeting</li>
                    <li>✔ Weekly Performance & ROI Reports</li>
                </ul>
                <a href="http://localhost/wordpress/contact/" class="service-btn">Get Started</a>
            </div>

            <!-- Card 4 -->
            <div class="service-card">
                <div class="service-icon">⚡</div>
                <h3>Speed & Core Web Vitals</h3>
                <p>Boost your Google search rankings and customer retention by eliminating slow load times through advanced caching and image compression.</p>
                <ul class="service-features">
                    <li>✔ Page Load Time Under 1.5s</li>
                    <li>✔ Advanced Asset Minification & Caching</li>
                    <li>✔ Mobile Speed & Vital Score A+</li>
                </ul>
                <a href="http://localhost/wordpress/contact/" class="service-btn">Get Started</a>
            </div>

            <!-- Card 5 -->
            <div class="service-card">
                <div class="service-icon">🔒</div>
                <h3>Website Security & Maintenance</h3>
                <p>Protect your brand from vulnerabilities with proactive firewall setup, automatic malware scanning, daily backups, and ongoing updates.</p>
                <ul class="service-features">
                    <li>✔ Enterprise Firewall & Brute-force Shield</li>
                    <li>✔ Automated Cloud Backups</li>
                    <li>✔ 24/7 Uptime & Health Monitoring</li>
                </ul>
                <a href="http://localhost/wordpress/contact/" class="service-btn">Get Started</a>
            </div>

            <!-- Card 6 -->
            <div class="service-card">
                <div class="service-icon">📊</div>
                <h3>SEO & Conversion Analytics</h3>
                <p>Dominate relevant search keywords with comprehensive on-page SEO, schema markup, and transparent lead tracking dashboards.</p>
                <ul class="service-features">
                    <li>✔ Keyword Research & Competitor Gap</li>
                    <li>✔ Google Search Console & GA4 Setup</li>
                    <li>✔ Lead & Form Conversion Optimization</li>
                </ul>
                <a href="http://localhost/wordpress/contact/" class="service-btn">Get Started</a>
            </div>
        </div>

        <div class="cta-banner">
            <h2>Ready to Transform Your Business?</h2>
            <p>Schedule a free 30-minute consultation call with our senior architects to plan your project roadmap.</p>
            <a href="http://localhost/wordpress/contact/" class="cta-btn">Book Your Free Discovery Call</a>
        </div>
    </div>
</div>
HTML;

// 2. PRIVACY POLICY PAGE
$privacy_html = $common_css . <<<HTML
<div class="custom-page-wrap">
    <div class="page-hero">
        <span class="badge">Legal & Security</span>
        <h1>Privacy Policy</h1>
        <p class="subtitle">We value your trust and are committed to protecting your personal data and privacy.</p>
    </div>

    <div class="legal-container">
        <div class="legal-card">
            <div class="legal-section">
                <h2>📋 1. Overview</h2>
                <p>This Privacy Policy outlines how our organization collects, uses, protects, and discloses personal information obtained through our website and associated digital services. By accessing our services, you consent to the data practices described herein.</p>
                <div class="legal-callout">
                    <strong>Our Commitment:</strong> We never sell, rent, or trade your personal information to third parties for marketing purposes.
                </div>
            </div>

            <div class="legal-section">
                <h2>🔍 2. Information We Collect</h2>
                <p>We may collect information directly from you or automatically through your interaction with our website:</p>
                <ul>
                    <li><strong>Contact Information:</strong> Name, business email address, phone number, and company name provided via consultation or contact forms.</li>
                    <li><strong>Usage Data:</strong> IP address, browser type, operating system, pages visited, and interaction timestamps.</li>
                    <li><strong>Cookies & Tracking:</strong> Small data files used to remember preferences and enhance user browsing experience.</li>
                </ul>
            </div>

            <div class="legal-section">
                <h2>⚙️ 3. How We Use Your Information</h2>
                <p>The information we collect is utilized strictly to provide and improve our services, including:</p>
                <ul>
                    <li>Responding to customer inquiries and delivering project proposals.</li>
                    <li>Delivering contracted web development and digital marketing services.</li>
                    <li>Monitoring website security, performance, and server health.</li>
                    <li>Fulfilling legal obligations and enforcing service agreements.</li>
                </ul>
            </div>

            <div class="legal-section">
                <h2>🛡️ 4. Data Security & Storage</h2>
                <p>We implement modern security measures, including SSL encryption, restricted server access, and regular security audits to protect your data against unauthorized access, alteration, or disclosure.</p>
            </div>

            <div class="legal-section">
                <h2>⚖️ 5. Your Rights & Choices</h2>
                <p>You have the right to request access to the personal data we hold about you, request corrections, or ask for deletion of your records. To exercise any of these rights, please reach out through our contact page.</p>
            </div>

            <div class="legal-section">
                <h2>📬 6. Contact Information</h2>
                <p>If you have any questions regarding this Privacy Policy or our security practices, please contact us at:</p>
                <p><strong>Email:</strong> privacy@ourcompany.com<br><strong>Location:</strong> Business Headquarters, Technology Park</p>
            </div>
        </div>
    </div>
</div>
HTML;

// 3. TERMS AND CONDITIONS PAGE
$terms_html = $common_css . <<<HTML
<div class="custom-page-wrap">
    <div class="page-hero">
        <span class="badge">Legal Terms</span>
        <h1>Terms and Conditions</h1>
        <p class="subtitle">Please read these terms and conditions carefully before utilizing our services.</p>
    </div>

    <div class="legal-container">
        <div class="legal-card">
            <div class="legal-section">
                <h2>📜 1. Acceptance of Terms</h2>
                <p>By browsing this website or engaging our services, you agree to be bound by these Terms and Conditions and all applicable local, national, and international laws. If you do not agree with any part of these terms, you are prohibited from using our services.</p>
            </div>

            <div class="legal-section">
                <h2>💡 2. Intellectual Property Rights</h2>
                <p>All source code, designs, graphics, branding, text, and materials featured on this site are the exclusive intellectual property of our company unless otherwise stated. Clients receive full ownership of agreed deliverables upon final payment settlement as specified in project contracts.</p>
            </div>

            <div class="legal-section">
                <h2>🤝 3. Scope of Services & Deliverables</h2>
                <p>All service engagements, timelines, milestones, and deliverables are governed by individual client proposals and Statements of Work (SOW). We reserve the right to make technical enhancements that improve service delivery without prior notice.</p>
                <div class="legal-callout">
                    <strong>Quality Assurance:</strong> All deliverables are tested thoroughly across major desktop and mobile browsers before project handover.
                </div>
            </div>

            <div class="legal-section">
                <h2>💳 4. Payments, Billing & Invoices</h2>
                <p>Invoices for custom services are issued in accordance with project milestones. Payment terms are strictly 14 days from invoice receipt unless alternative arrangements have been agreed in writing.</p>
            </div>

            <div class="legal-section">
                <h2>⚠️ 5. Limitation of Liability</h2>
                <p>Under no circumstances shall our company or partners be liable for any indirect, consequential, or punitive damages arising from the use or inability to use our website or services, even if advised of the possibility of such damages.</p>
            </div>

            <div class="legal-section">
                <h2>🔄 6. Amendments to Terms</h2>
                <p>We reserve the right to revise or update these terms at any time. Continued use of the website following any changes constitutes acceptance of the new terms.</p>
            </div>

            <div class="legal-section">
                <h2>📞 7. Inquiries & Support</h2>
                <p>For questions or clarifications regarding these terms, please contact our legal and support team via our <a href="http://localhost/wordpress/contact/" style="color:#2563eb; font-weight:600;">Contact Page</a>.</p>
            </div>
        </div>
    </div>
</div>
HTML;

// Update Services (7650)
wp_update_post([
    'ID' => 7650,
    'post_title' => 'Services',
    'post_content' => $services_html,
    'post_status' => 'publish',
]);
update_post_meta(7650, 'site-content-layout', 'page-builder');
update_post_meta(7650, 'site-sidebar-layout', 'no-sidebar');
update_post_meta(7650, 'site-post-title', 'disabled');
update_post_meta(7650, 'ast-title-bar-display', 'disabled');

// Update Privacy Policy (7652)
wp_update_post([
    'ID' => 7652,
    'post_title' => 'Privacy Policy',
    'post_content' => $privacy_html,
    'post_status' => 'publish',
]);
update_post_meta(7652, 'site-content-layout', 'page-builder');
update_post_meta(7652, 'site-sidebar-layout', 'no-sidebar');
update_post_meta(7652, 'site-post-title', 'disabled');
update_post_meta(7652, 'ast-title-bar-display', 'disabled');

// Update Terms and Conditions (7653)
wp_update_post([
    'ID' => 7653,
    'post_title' => 'Terms and Conditions',
    'post_content' => $terms_html,
    'post_status' => 'publish',
]);
update_post_meta(7653, 'site-content-layout', 'page-builder');
update_post_meta(7653, 'site-sidebar-layout', 'no-sidebar');
update_post_meta(7653, 'site-post-title', 'disabled');
update_post_meta(7653, 'ast-title-bar-display', 'disabled');

echo "Successfully applied modern design & layout to Services, Privacy Policy, and Terms and Conditions!\n";
