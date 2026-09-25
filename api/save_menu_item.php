<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/../config.php';

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// 2. Check if we actually got a POST request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $name  = $conn->real_escape_string($_POST['item_name']);
    $cat   = $conn->real_escape_string($_POST['category']);
    $price = $conn->real_escape_string($_POST['price']);
    $img   = $conn->real_escape_string($_POST['image_path']);

    $sql = "INSERT INTO menu_items (item_name, category, price, image_path) 
            VALUES ('$name', '$cat', '$price', '$img')";

    if ($conn->query($sql) === TRUE) {
        // Redirect back to the admin dashboard
        header("Location: ../admin.html");
        exit();
    } else {
        echo "Database Error: " . $conn->error;
    }
} else {
    echo "Please use the form to submit data.";
}

$conn->close();
?>