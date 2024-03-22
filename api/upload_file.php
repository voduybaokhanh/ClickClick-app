<?php 
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

try {
    $currentDirectory = getcwd();
    $uploadDirectory = "/uploads/";
    $fileName = $_FILES['image']['name']; // Lấy tên của file
    $fileTmpName  = $_FILES['image']['tmp_name'];
    $uploadPath = $currentDirectory .$uploadDirectory.$fileName;
    
    // Upload file
    move_uploaded_file($fileTmpName, $uploadPath);
    
    // Trả về thông điệp và URL của file
    echo json_encode(
        array(
            "error" => false,
            "message" => "Upload successful",
            "image" => "http://192.168.1.7:8686/uploads/".$fileName
        )
    );
} catch (Exception $e) {
    // Nếu có lỗi, trả về thông điệp lỗi
    echo json_encode(
        array(
            "error" => true,
            "message" => "Upload failed",
            "image" => null
        )
    );
}
?>
