<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './connection.php';

try {
    // Lấy danh sách các bài viết bị report
    $getReportedPostsQuery = "SELECT * FROM posts WHERE id IN (SELECT postid FROM reports)";
    $getReportedPostsStmt = $dbConn->prepare($getReportedPostsQuery);
    $getReportedPostsStmt->execute();
    $reportedPosts = $getReportedPostsStmt->fetchAll(PDO::FETCH_ASSOC);

    // Kiểm tra xem có bài viết bị report không
    if (!$reportedPosts) {
        http_response_code(404);
        echo json_encode(array('status' => false, 'message' => 'Không có bài viết bị report'));
        exit;
    }

    // Trả về danh sách các bài viết bị report
    echo json_encode(array('status' => true, 'reported_posts' => $reportedPosts));
} catch (Exception $e) {
    echo json_encode(array('status' => false, 'message' => $e->getMessage()));
}
