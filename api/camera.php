<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Bao gồm tệp kết nối với cơ sở dữ liệu
include_once './connection.php';

// Xử lý yêu cầu POST để chụp ảnh và lưu vào cơ sở dữ liệu
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Xác minh kiểu dữ liệu là ảnh
    if ($_FILES['image']['error'] !== UPLOAD_ERR_OK || !is_uploaded_file($_FILES['image']['tmp_name']) || !exif_imagetype($_FILES['image']['tmp_name'])) {
        http_response_code(400);
        echo json_encode(array("message" => "Invalid image file"));
        exit;
    }

    // Thư mục lưu trữ ảnh
    $uploads_dir = './uploads/';

    // Tạo tên ngẫu nhiên cho ảnh
    $image_name = uniqid() . '.jpg';

    // Đường dẫn của ảnh trên máy chủ
    $image_path = $uploads_dir . $image_name;

    // Di chuyển và lưu ảnh vào thư mục uploads
    if (!move_uploaded_file($_FILES['image']['tmp_name'], $image_path)) {
        http_response_code(500);
        echo json_encode(array("message" => "Failed to save image"));
        exit;
    }

    // Chuẩn bị truy vấn để chèn đường dẫn của ảnh vào cơ sở dữ liệu
    $query = "INSERT INTO images (image_path) VALUES (?)";
    $stmt = $conn->prepare($query);

    // Kiểm tra nếu truy vấn được chuẩn bị thành công
    if ($stmt) {
        // Gán đường dẫn của ảnh vào truy vấn và thực thi nó
        $stmt->bind_param("s", $image_path);
        if ($stmt->execute()) {
            // Trả về phản hồi thành công nếu chụp ảnh và lưu đường dẫn vào cơ sở dữ liệu thành công
            http_response_code(200);
            echo json_encode(array("message" => "chụp ảnh và lưu thành công.", "image_path" => $image_path));
        } else {
            // Trả về phản hồi lỗi nếu có lỗi xảy ra khi thực thi truy vấn
            http_response_code(500);
            echo json_encode(array("message" => "chụp ảnh và lưu không thành công"));
        }
        // Đóng câu lệnh chuẩn bị
        $stmt->close();
    } else {
        // Trả về phản hồi lỗi nếu không thể chuẩn bị truy vấn
        http_response_code(500);
        echo json_encode(array("message" => "phản hồi lỗi nếu không thể chuẩn bị truy vấn"));
    }
    // Đóng kết nối với cơ sở dữ liệu
    $conn->close();
} else {
    // Trả về phản hồi lỗi nếu phương thức yêu cầu không phải là POST
    http_response_code(405);
    echo json_encode(array("message" => " phương thức yêu cầu không phải là POST"));
}
?>
