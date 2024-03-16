<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Import file connection.php
include_once './connection.php';

try {
    // Đọc dữ liệu từ cơ sở dữ liệu
    $query = "SELECT * FROM POSTS WHERE AVAILABLE = 1";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();

    // Lấy tất cả các bài viết đã bị báo cáo
    $reportedPosts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Trả về dữ liệu dưới dạng JSON
    echo json_encode(array(
        "status" => true,
        "reported_posts" => $reportedPosts
    ));
} catch (PDOException $e) {
    // Xử lý lỗi nếu có
    http_response_code(500);
    echo json_encode(array(
        "status" => false,
        "message" => "Không thể lấy dữ liệu bài viết bị báo cáo: " . $e->getMessage()
    ));
}
