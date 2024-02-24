<?php
// accept-friend-request.php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './connection.php';

try {
    session_start();

    // Nhận dữ liệu từ yêu cầu
    $data = json_decode(file_get_contents("php://input"));

    // Kiểm tra xem có friendshipid và userid được gửi hay không
    if (!isset($data->friendshipid,$data->userid)) {
        http_response_code(400);
        echo json_encode(array('status' => false, 'message' => 'Thiếu tham số friendshipid , userid'));
        exit;
    }

    $userid = $data->friendshipid; // Người gửi lời mời
    $friendshipid = $data->userid; // Người được gửi lời mời

    // Cập nhật trạng thái yêu cầu kết bạn thành "accepted" trong cơ sở dữ liệu
    $acceptFriendshipQuery = "UPDATE friendships SET status = 'friend' WHERE friendshipid = :friendshipid AND userid = :userid";
    $acceptFriendshipStmt = $dbConn->prepare($acceptFriendshipQuery);
    $acceptFriendshipStmt->bindParam(':friendshipid', $friendshipid, PDO::PARAM_INT);
    $acceptFriendshipStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
    $acceptFriendshipStmt->execute();

    echo json_encode(array('status' => true, 'message' => 'Đã chấp nhận yêu cầu kết bạn.'));
} catch (Exception $e) {
    echo json_encode(array('status' => false, 'message' => $e->getMessage()));
}
?>
