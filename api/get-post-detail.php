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
        echo json_encode(array('status' => false, 'message' => 'Không có bài viết nào bị report'));
        exit;
    }

    // Chuẩn bị phản hồi
    $response = array();
    foreach ($reportedPosts as $post) {
        // Tạo thông tin chi tiết của bài viết
        $postDetail = array(
            'id' => $post['id'],
            'content' => $post['content'],
            'likes' => $post['likes'],
            'reported' => true // Đánh dấu là bài viết đã bị report
        );

        // Thêm thông tin chi tiết vào phản hồi
        $response[] = $postDetail;
    }

    // Trả về phản hồi JSON
    echo json_encode(array('status' => true, 'reported_posts' => $response));
} catch (Exception $e) {
    // Xử lý ngoại lệ và trả về thông báo lỗi
    echo json_encode(array('status' => false, 'message' => $e->getMessage()));
}
