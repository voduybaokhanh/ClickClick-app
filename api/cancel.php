<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './connection.php';

try {
    $data = json_decode(file_get_contents("php://input"));

    // Kiểm tra xem có postid được gửi hay không
    if (!isset($data->postid)) {
        http_response_code(400);
        echo json_encode(array('status' => false, 'message' => 'Thiếu tham số postid'));
        exit;
    }

    $postid = $data->postid;

    // Cập nhật cột AVAILABLE trong bảng POSTS thành 0
    $updateAvailableQuery = "UPDATE posts SET available = 0 WHERE id = :postid";
    $updateAvailableStmt = $dbConn->prepare($updateAvailableQuery);
    $updateAvailableStmt->bindParam(':postid', $postid, PDO::PARAM_INT);
    $updateAvailableStmt->execute();

    echo json_encode(array('status' => true, 'message' => 'Bài đăng đã được hủy thành công'));
} catch (Exception $e) {
    echo json_encode(array('status' => false, 'message' => $e->getMessage()));
}
