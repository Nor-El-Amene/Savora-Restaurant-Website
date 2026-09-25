<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../config.php';
$result = $conn->query("SELECT * FROM menu_items");
echo json_encode($result->fetch_all(MYSQLI_ASSOC));
?>