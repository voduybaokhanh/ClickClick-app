<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET"); // Thay đổi phương thức từ POST sang GET
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './connection.php';

try {
    // Kiểm tra xem có postid được truyền qua URL hay không
    if (!isset($_GET['postid'])) {
        http_response_code(400);
        echo json_encode(array('status' => false, 'message' => 'Thiếu tham số postid'));
        exit;
    }

    $postid = $_GET['postid'];

    // Cập nhật cột AVAILABLE trong bảng POSTS thành 1
    $updateAvailableQuery = "UPDATE posts SET available = 1 WHERE id = :postid";
    $updateAvailableStmt = $dbConn->prepare($updateAvailableQuery);
    $updateAvailableStmt->bindParam(':postid', $postid, PDO::PARAM_INT);
    $updateAvailableStmt->execute();

    echo json_encode(array('status' => true, 'message' => 'Bài đăng đã được hủy thành công'));
} catch (Exception $e) {
    echo json_encode(array('status' => false, 'message' => $e->getMessage()));
}
?>
