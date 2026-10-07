<?php
require_once __DIR__ . '/wp-load.php';
$p = get_post(41);
echo "Status: " . $p->post_status . PHP_EOL;
echo "Content length: " . strlen($p->post_content) . PHP_EOL;
echo "Content snippet:\n" . substr($p->post_content, 0, 300) . PHP_EOL;

// Check revisions and autosaves
$revisions = wp_get_post_revisions(41);
echo "Revisions count: " . count($revisions) . PHP_EOL;
foreach ($revisions as $rev) {
    echo "Rev ID " . $rev->ID . " date " . $rev->post_modified . " len " . strlen($rev->post_content) . PHP_EOL;
}
