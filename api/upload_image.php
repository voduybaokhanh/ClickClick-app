<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './connection.php';

$response = array();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_FILES["file"])) {
        $targetDir = "uploads/";
        $targetFile = $targetDir . basename($_FILES["file"]["name"]);
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

        if (file_exists($targetFile)) {
            $response['error'] = "Sorry, file already exists.";
            $uploadOk = 0;
        }

        if ($_FILES["file"]["size"] > 500000) {
            $response['error'] = "Sorry, your file is too large.";
            $uploadOk = 0;
        }

        $allowedFormats = array("jpg", "jpeg", "png", "gif");
        if (!in_array($imageFileType, $allowedFormats)) {
            $response['error'] = "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
            $uploadOk = 0;
        }

        if ($uploadOk == 0) {
            $response['error'] = "Sorry, your file was not uploaded.";
        } else {
            if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFile)) {
                $response['success'] = "The file " . htmlspecialchars(basename($_FILES["file"]["name"])) . " has been uploaded.";
                $response['file_url'] = "uploads/" . basename($_FILES["file"]["name"]);
            } else {
                $response['error'] = "Sorry, there was an error uploading your file.";
            }
        }
    } else {
        $response['error'] = "No file uploaded.";
    }
} else {
    $response['error'] = "Invalid request method.";
}

echo json_encode($response);
