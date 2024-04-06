<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './connection.php';

try {
    // Đọc dữ liệu từ database
    $sqlQuery = "SELECT AVATAR, TIME, NAME, CONTENT, LIKES FROM posts";
    $stmt = $dbConn->prepare($sqlQuery);
    $stmt->execute();
    // Lấy tất cả dữ liệu từ câu lệnh PDO
    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Đếm số lượng bài đăng
    $postCount = count($posts);

    // Trả về dữ liệu dạng JSON
    echo json_encode(
        array(
            "status" => true,
            "postCount" => $postCount,
            "all-posts" => $posts
        )
    );
} catch (Exception $e) {
    echo json_encode(array('status' => false, 'message' => $e->getMessage()));
}