<?php
$pdo = new PDO('mysql:host=127.0.0.1', 'root', '123456');
$dbs = $pdo->query("SHOW DATABASES")->fetchAll(PDO::FETCH_COLUMN);
foreach ($dbs as $db) {
    if (in_array($db, ['information_schema', 'mysql', 'performance_schema', 'sys'])) continue;
    try {
        $tables = $pdo->query("SHOW TABLES FROM `$db`")->fetchAll(PDO::FETCH_COLUMN);
        foreach ($tables as $t) {
            if (preg_match('/posts$/', $t)) {
                $p = $pdo->query("SELECT ID, post_title, post_name, post_status FROM `$db`.`$t` WHERE ID IN (7650, 7652, 7653, 50, 87)")->fetchAll(PDO::FETCH_ASSOC);
                if ($p) {
                    echo "Found in $db.$t:\n";
                    print_r($p);
                }
            }
        }
    } catch (Exception $e) {}
}
