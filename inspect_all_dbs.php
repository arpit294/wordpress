<?php
$pdo = new PDO('mysql:host=127.0.0.1', 'root', '123456');
foreach (['amarkot', 'webexpert_portfolio', 'plumberpro', 'wordpress_db'] as $db) {
    echo "=== DB: $db ===\n";
    $tables = $pdo->query("SHOW TABLES FROM `$db`")->fetchAll(PDO::FETCH_COLUMN);
    $prefix = '';
    foreach ($tables as $t) {
        if (preg_match('/^(.*_)posts$/', $t, $m)) {
            $prefix = $m[1];
            break;
        }
    }
    if ($prefix) {
        $stmt = $pdo->query("SELECT ID, post_title, post_name, post_type, post_status FROM `$db`.`{$prefix}posts` WHERE post_status = 'publish' AND post_type IN ('page', 'post', 'elementor_library')");
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        foreach ($rows as $r) {
            echo "  [{$r['post_type']}] ID: {$r['ID']} | Title: {$r['post_title']} | Slug: {$r['post_name']}\n";
        }
    } else {
        echo "  No posts table found\n";
    }
}
