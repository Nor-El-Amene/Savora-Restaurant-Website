<?php

function loadEnv($file)
{
    if (!file_exists($file)) {
        return;
    }

    $lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

    foreach ($lines as $line) {
        $line = trim($line);

        if ($line === '' || str_starts_with($line, '#')) {
            continue;
        }

        [$name, $value] = array_pad(explode('=', $line, 2), 2, '');

        $_ENV[trim($name)] = trim($value);
    }
}

loadEnv(__DIR__ . '/.env');

$host = $_ENV['DB_HOST'] ?? 'localhost';
$user = $_ENV['DB_USER'] ?? 'root';
$pass = $_ENV['DB_PASS'] ?? '';
$db   = $_ENV['DB_NAME'] ?? 'restaurant';
$port = (int) ($_ENV['DB_PORT'] ?? 3307);

$conn = new mysqli($host, $user, $pass, $db, $port);

if ($conn->connect_error) {
    die('Database connection failed.');
}