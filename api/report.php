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
    if (!isset($data->userid) || !isset($data->postid)) {
        http_response_code(400);
        echo json_encode(array('status' => false, 'message' => 'Thiếu tham số userid hoặc postid'));
        exit;
    }

    $userid = $data->userid;
    $postid = $data->postid;

    // Thêm bản ghi vào bảng reports
    $addReportQuery = "INSERT INTO reports (userid, postid, time) VALUES (:userid, :postid, NOW())";
    $addReportStmt = $dbConn->prepare($addReportQuery);
    $addReportStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
    $addReportStmt->bindParam(':postid', $postid, PDO::PARAM_INT);
    $addReportStmt->execute();

    // Ẩn bài viết cho người dùng đó
    $hidePostQuery = "UPDATE posts SET available = 0 WHERE id = :postid AND userid != :userid";
    $hidePostStmt = $dbConn->prepare($hidePostQuery);
    $hidePostStmt->bindParam(':postid', $postid, PDO::PARAM_INT);
    $hidePostStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
    $hidePostStmt->execute();

    echo json_encode(array('status' => true, 'message' => 'Báo cáo thành công'));
} catch (Exception $e) {
    echo json_encode(array('status' => false, 'message' => $e->getMessage()));
}
