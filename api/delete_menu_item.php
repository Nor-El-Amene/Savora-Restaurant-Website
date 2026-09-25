<?php
require_once __DIR__ . '/../config.php';
$id = $_GET['id'];
$conn->query("DELETE FROM menu_items WHERE id = $id");
header("Location: ../admin.html");
?>