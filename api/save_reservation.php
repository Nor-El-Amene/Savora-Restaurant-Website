<?php
// 1. Force error reporting ON and remove the '0' setting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

try {
    // Read the input
    $input = file_get_contents("php://input");
    

    if (!$input) {
        throw new Exception("No input received from the form.");
    }

    $data = json_decode($input, true);

    if (!isset($data['name'])) {
        throw new Exception("Invalid data structure received.");
    }
    
    // Database connection
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    require_once __DIR__ . '/../config.php';

    // Sanitize input
    $name  = $conn->real_escape_string($data['name']);
    $phone = $conn->real_escape_string($data['phone']);
    $date  = $conn->real_escape_string($data['date']);
    $time  = $conn->real_escape_string($data['time']);
    $table = $conn->real_escape_string($data['table']);
    $status = "pending";

    // Insert reservation - using backticks for the table name just in case
    $sql = "INSERT INTO reservations (name, phone, date, time, table_name, status)
            VALUES ('$name','$phone','$date','$time','$table','$status')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "Reservation saved!"]);
    } else {
        throw new Exception("Database query failed.");
    }

    $conn->close();

} catch (Exception $e) {
    // This catches the 'Access Denied' or 'Connection Failed' errors 
    // and sends them to your JS as a proper JSON string.
    echo json_encode([
        "success" => false, 
        "message" => "Server Error: " . $e->getMessage()
    ]);
}
exit;