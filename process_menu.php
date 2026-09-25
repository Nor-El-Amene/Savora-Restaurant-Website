<?php
require_once __DIR__ . '/config.php';

$name = $_POST['name'];
$cat  = $_POST['category'];
$price = $_POST['price'];
$count = $_POST['count'];
$img   = $_POST['image'];

$sql = "INSERT INTO menu_items (item_name, category, price, item_count, image_path) 
        VALUES ('$name', '$cat', '$price', '$count', '$img')";

if ($conn->query($sql)) {
    header("Location: admin_panel.php?success=1");
} else {
    echo "Error: " . $conn->error;
}
?>