<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
//http://192.168.1.30:8686/getAllUsers.php
//import file connection.php
include_once './connection.php';

// đọc dữ liệu từ database
$sqlQuery = "SELECT * FROM USERS";
$stmt = $dbConn->prepare($sqlQuery);
$stmt->execute();
//camera
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_GET['action'] === 'capture') {
    $width = 640;
    $height = 480;
    $image = imagecreatetruecolor($width, $height);
    $color = imagecolorallocate($image, 255, 255, 255);
    imagefill($image, 0, 0, $color);
    // You can further customize the image creation as per your requirements

    // Output the image
    header('Content-Type: image/png');
    imagepng($image);
    imagedestroy($image);
    exit;
}
