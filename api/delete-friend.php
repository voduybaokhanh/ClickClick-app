<?php
// delete-friend.php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './connection.php';

try {
    session_start();

    // Nhận dữ liệu từ yêu cầu
    $data = json_decode(file_get_contents("php://input"));

    // Kiểm tra xem có friendshipid và userid được gửi hay không
    if (!isset($data->friendshipid, $data->userid)) {
        http_response_code(400);
        echo json_encode(array('status' => false, 'message' => 'Thiếu tham số friendshipid , userid'));
        exit;
    }

    $userid = $data->userid;
    $friendshipid = $data->friendshipid;

    // Xóa mối quan hệ bạn bè trong cơ sở dữ liệu
    $deleteFriendshipQuery = "DELETE FROM friendships WHERE (userid = :userid AND friendshipid = :friendshipid) OR (userid = :friendshipid AND friendshipid = :userid)";
    $deleteFriendshipStmt = $dbConn->prepare($deleteFriendshipQuery);
    $deleteFriendshipStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
    $deleteFriendshipStmt->bindParam(':friendshipid', $friendshipid, PDO::PARAM_INT);
    $deleteFriendshipStmt->execute();

    echo json_encode(array('status' => true, 'message' => 'Đã xóa mối quan hệ bạn bè.'));
} catch (Exception $e) {
    echo json_encode(array('status' => false, 'message' => $e->getMessage()));
}
?>
