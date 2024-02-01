<?php
// FILEPATH: /D:/bt/GItHub/ClickClick-app/api/helpers/upload_image.php
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
// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the file was uploaded without errors
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $file = $_FILES['image'];

        // Specify the directory where you want to save the uploaded image
        $uploadDir = '/path/to/upload/directory/';

        // Generate a unique filename for the uploaded image
        $filename = uniqid() . '_' . $file['name'];

        // Move the uploaded file to the specified directory
        if (move_uploaded_file($file['tmp_name'], $uploadDir . $filename)) {
            // File uploaded successfully
            echo 'Image uploaded successfully.';
        } else {
            // Failed to move the uploaded file
            echo 'Failed to upload image.';
        }
    } else {
        // No file uploaded or an error occurred during upload
        echo 'Invalid file.';
    }
} else {
    // Invalid request method
    echo 'Invalid request.';
}
