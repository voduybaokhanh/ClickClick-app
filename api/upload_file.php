<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

try {
    // Kiểm tra xem có tệp hình ảnh được tải lên không
    if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
        throw new Exception("Không có tệp hình ảnh được tải lên hoặc có lỗi khi tải lên.");
    }

    $currentDirectory = getcwd();
    $uploadDirectory = "/uploads/";
    $fileName = $_FILES['image']['name'];
    $fileTmpName  = $_FILES['image']['tmp_name'];

    // Kiểm tra định dạng hoặc kích thước của tệp hình ảnh
    $allowedFormats = ['jpg', 'jpeg', 'png', 'gif'];
    $fileExtension = pathinfo($fileName, PATHINFO_EXTENSION);
    if (!in_array(strtolower($fileExtension), $allowedFormats)) {
        throw new Exception("Định dạng tệp không được hỗ trợ.");
    }

    $uploadPath = $currentDirectory . $uploadDirectory . $fileName;

    // Di chuyển tệp hình ảnh tải lên vào thư mục uploads
    if (!move_uploaded_file($fileTmpName, $uploadPath)) {
        throw new Exception("Lỗi khi di chuyển tệp hình ảnh.");
    }

    // Trả về đường dẫn tới tệp hình ảnh đã tải lên
    echo json_encode(
        array(
            "error" => false,
            "message" => "Tải lên thành công",
            "path" => "http://192.168.1.19:8686/uploads/" . $fileName
        )
    );
} catch (Exception $e) {
    // Xử lý các trường hợp lỗi và trả về thông điệp phản hồi
    echo json_encode(
        array(
            "error" => true,
            "message" => $e->getMessage(),
            "path" => null
        )
    );
}
