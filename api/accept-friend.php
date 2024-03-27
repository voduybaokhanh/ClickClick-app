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
    if (!isset($data->friendshipid, $data->userid)) {
        http_response_code(400);
        echo json_encode(array('status' => false, 'message' => 'Thiếu tham số friendshipid , userid'));
        exit;
    }

    $userid = $data->userid;
    $friendshipid = $data->friendshipid;

    // Kiểm tra xem người dùng đã có 20 người bạn chưa
    $countFriendsQuery = "SELECT COUNT(*) as friendCount FROM friendships WHERE userid = :userid OR friendshipid = :userid";
    $countFriendsStmt = $dbConn->prepare($countFriendsQuery);
    $countFriendsStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
    $countFriendsStmt->execute();
    $friendCountResult = $countFriendsStmt->fetch(PDO::FETCH_ASSOC);

    if ($friendCountResult && $friendCountResult['friendCount'] >= 20) {
        // Người dùng đã có 20 người bạn trở lên, không thể gửi thêm lời mời
        echo json_encode(array('status' => false, 'message' => 'Bạn đã đạt đến giới hạn 20 người bạn.'));
        exit;
    }

    // Kiểm tra xem đối phương có 20 người bạn không
    $countFriendsQuery = "SELECT COUNT(*) as friendCount FROM friendships WHERE userid = :friendshipid OR friendshipid = :friendshipid";
    $countFriendsStmt = $dbConn->prepare($countFriendsQuery);
    $countFriendsStmt->bindParam(':friendshipid', $friendshipid, PDO::PARAM_INT);
    $countFriendsStmt->execute();
    $friendCountResult = $countFriendsStmt->fetch(PDO::FETCH_ASSOC);

    if ($friendCountResult && $friendCountResult['friendCount'] >= 20) {
        // Đối phương đã có 20 người bạn trở lên, không thể gửi lời mời
        echo json_encode(array('status' => false, 'message' => 'Đối phương đã đạt đến giới hạn 20 người bạn.'));
        exit;
    }

    // Cập nhật trạng thái yêu cầu kết bạn thành "friend" trong cơ sở dữ liệu
    $acceptFriendshipQuery = "UPDATE friendships SET status = 'friend' WHERE friendshipid = :friendshipid AND userid = :userid";
    $acceptFriendshipStmt = $dbConn->prepare($acceptFriendshipQuery);
    $acceptFriendshipStmt->bindParam(':friendshipid', $friendshipid, PDO::PARAM_INT);
    $acceptFriendshipStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
    $acceptFriendshipStmt->execute();

    echo json_encode(array('status' => true, 'message' => 'Đã chấp nhận yêu cầu kết bạn.'));
} catch (Exception $e) {
    echo json_encode(array('status' => false, 'message' => $e->getMessage()));
}
