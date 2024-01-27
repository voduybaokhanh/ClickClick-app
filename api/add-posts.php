<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Import connection.php và JWT
include_once './connection.php';
include_once './helpers/jwt.php';
try {
    // Lấy dữ liệu từ JSON
    $data = json_decode(file_get_contents("php://input"));

    // Kiểm tra xem dữ liệu có tồn tại hay không
    if (!$data || !isset($data->content) || !isset($data->image)) {
        echo json_encode(array('error' => 'Dữ liệu không hợp lệ'));
        exit;
    }
    // Lấy token từ tham số URL

    if ($token) {
        // Lấy thông tin người dùng từ token
        // Lấy dữ liệu từ yêu cầu
        $content = $data->content;
        $image = $data->image;

        if (isset($id)) {
            // Chuẩn bị và thực thi truy vấn SQL
            $insertQuery = "INSERT INTO posts (userid, content, image) VALUES (:id, :content, :image)";
            $insertStmt = $dbConn->prepare($insertQuery);
            $insertStmt->bindParam(':id', $id, PDO::PARAM_INT);
            $insertStmt->bindParam(':content', $content, PDO::PARAM_STR_CHAR);
            $insertStmt->bindParam(':image', $image, PDO::PARAM_STR);
            $insertStmt->execute();


            // Kiểm tra và trả về kết quả
            echo json_encode(array('message' => 'Bài viết đã được tạo thành công'));
        } else {
            echo json_encode(array('error' => 'Không tìm thấy thông tin người dùng'));
        }

    } else {
        // Trả về lỗi nếu không có token
        echo json_encode(array('error' => 'Không có token'));
    }
} catch (Exception $e) {
    echo json_encode(array('error' => $e->getMessage()));
}
?>