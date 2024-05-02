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
    // Nhận dữ liệu từ JSON
    $data = json_decode(file_get_contents("php://input"));

    // Kiểm tra xem dữ liệu `id` đã được truyền hay chưa
    if (!isset($data->postid)) {
        echo json_encode(array('status' => false, 'message' => 'Missing parameter: postid'));
        exit;
    }

    // Lấy id từ dữ liệu đầu vào
    $postid = $data->postid;

    // Chuẩn bị và thực thi truy vấn SQL để xóa các bản ghi từ bảng like liên quan đến bài viết
    $likeQuery = "DELETE FROM likes WHERE id = :postid";
    $likeStmt = $dbConn->prepare($likeQuery);
    $likeStmt->bindParam(':postid', $postid, PDO::PARAM_INT);
    $likeStmt->execute();

    // Chuẩn bị và thực thi truy vấn SQL để xóa các bản ghi từ bảng chat liên quan đến bài viết
    $chatQuery = "DELETE FROM chats WHERE id = :postid";
    $chatStmt = $dbConn->prepare($chatQuery);
    $chatStmt->bindParam(':postid', $postid, PDO::PARAM_INT);
    $chatStmt->execute();

    // Chuẩn bị và thực thi truy vấn SQL để xóa bài viết chính
    $postQuery = "DELETE FROM posts WHERE id = :postid";
    $postStmt = $dbConn->prepare($postQuery);
    $postStmt->bindParam(':postid', $postid, PDO::PARAM_INT);
    $postStmt->execute();

    // Trả về kết quả thành công
    echo json_encode(array("status" => true, "message" => "Post deleted successfully!"));
}catch (Exception $e) {
    // Log or return the actual error message for debugging
    echo json_encode(array("status" => false, "message" => "Failed to delete post! Error: " . $e->getMessage()));
}
?>
