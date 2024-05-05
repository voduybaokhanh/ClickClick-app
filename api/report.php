<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './connection.php';

try {
    $data = json_decode(file_get_contents("php://input"));

    // Kiểm tra xem có userid và postid được gửi hay không
    if (!isset($data->userid) || !isset($data->postid) || !isset($data->reason)) {
        http_response_code(400);
        echo json_encode(array('status' => false, 'message' => 'Missing userid or postid parameter'));
        exit;
    }

    $userid = $data->userid;
    $postid = $data->postid;
    $reason = $data->reason;

    // Kiểm tra xem bài viết có tồn tại không
    $checkPostQuery = "SELECT * FROM posts WHERE id = :postid";
    $checkPostStmt = $dbConn->prepare($checkPostQuery);
    $checkPostStmt->bindParam(':postid', $postid, PDO::PARAM_INT);
    $checkPostStmt->execute();
    $post = $checkPostStmt->fetch(PDO::FETCH_ASSOC);

    if (!$post) {
        http_response_code(404);
        echo json_encode(array('status' => false, 'message' => 'Post does not exist'));
        exit;
    }
    
    // Cập nhật cột AVAILABLE và REASON trong bảng POSTS
    $updatePostQuery = "UPDATE posts SET available = 0, reason = :reason WHERE id = :postid";
    $updatePostStmt = $dbConn->prepare($updatePostQuery);
    $updatePostStmt->bindParam(':postid', $postid, PDO::PARAM_INT);
    $updatePostStmt->bindParam(':reason', $reason, PDO::PARAM_STR);
    $updatePostStmt->execute();

    echo json_encode(array('status' => true, 'message' => 'Reported successfully'));
} catch (Exception $e) {
    echo json_encode(array('status' => false, 'message' => $e->getMessage()));
}
