<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Import connection.php và JWT
include_once './connection.php';
include_once './helpers/jwt.php';

try {
    // Nhận dữ liệu từ JSON
    $data = json_decode(file_get_contents("php://input"));

    // Kiểm tra xem dữ liệu `id` đã được truyền hay chưa
    if (!isset($data->postid)) {
        echo json_encode(array('status' => false, 'message' => 'Thiếu tham số postid'));
        exit;
    }

    // Lấy id từ dữ liệu đầu vào
    $postId = $data->postid;


    // Kiểm tra bài viết trong bảng chats
    $sqlCheckChats = "SELECT * FROM chats WHERE postid = :postid";
    $stmtCheckChats = $dbConn->prepare($sqlCheckChats);
    $stmtCheckChats->bindParam(':postid', $postId, PDO::PARAM_INT);
    $stmtCheckChats->execute();


    // Nếu có tin nhắn liên quan trong bảng chats, xóa chúng
    if ($stmtCheckChats->rowCount() > 0) {
        $sqlDeleteChats = "DELETE FROM chats WHERE postid = :postid";
        $stmtDeleteChats = $dbConn->prepare($sqlDeleteChats);
        $stmtDeleteChats->bindParam(':postid', $postId, PDO::PARAM_INT);
        $stmtDeleteChats->execute();
    }

    // Tiến hành xóa bài viết từ bảng posts
    $sqlDeletePost = "DELETE FROM posts WHERE id = :postid AND available = 1";
    $stmtDeletePost = $dbConn->prepare($sqlDeletePost);
    $stmtDeletePost->bindParam(':postid', $postId, PDO::PARAM_INT);
    $stmtDeletePost->execute();

    if ($stmtDeletePost->rowCount() > 0) {
        echo json_encode(array(
            "status" => true,
            "message" => "Bài viết đã được xóa thành công."
        ));
    } else {
        echo json_encode(array(
            "status" => false,
            "message" => "Không tìm thấy bài viết hoặc bài viết đã bị xóa."
        ));
    }
} catch (PDOException $e) {
    // Xử lý lỗi nếu có
    http_response_code(500);
    echo json_encode(array(
        "status" => false,
        "message" => "Không thể xóa bài viết: " . $e->getMessage()
    ));
}
