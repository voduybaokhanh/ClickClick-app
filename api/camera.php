<?php
// Thiết lập tiêu đề và quyền truy cập
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Hàm tạo tên tệp duy nhất
function generateUniqueFileName($prefix, $suffix)
{
    return $prefix . '_' . uniqid() . '.' . $suffix;
}

// Hàm lưu ảnh từ dữ liệu base64 vào máy chủ
function saveBase64Image($base64Data, $uploadDir, $fileName)
{
    $decodedData = base64_decode($base64Data);
    $file = $uploadDir . $fileName;
    file_put_contents($file, $decodedData);
    return $file;
}

// Kiểm tra nếu dữ liệu ảnh được gửi
if (isset($_POST['image'])) {
    $imageData = $_POST['image'];
    $uploadDir = 'uploads/';
    $imageFileType = 'jpg'; // Loại tệp ảnh (.jpg, .png, vv.)

    // Tạo tên tệp duy nhất
    $fileName = generateUniqueFileName('image', $imageFileType);

    // Lưu ảnh vào máy chủ
    $filePath = saveBase64Image($imageData, $uploadDir, $fileName);

    // Trả về đường dẫn tới ảnh đã lưu
    echo json_encode(array("success" => true, "file_path" => $filePath));
} else {
    // Không có dữ liệu ảnh được gửi
    echo json_encode(array("success" => false, "message" => "No image data sent."));
}
