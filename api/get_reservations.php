<?php
header('Content-Type: application/json');

require_once __DIR__ . '/../config.php';

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Select from your reservations table
$sql = "SELECT * FROM reservations ORDER BY date DESC, time DESC";
$result = $conn->query($sql);

$data = [];
if ($result) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

echo json_encode($data);
$conn->close();
?>