<?php
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

    // Kiểm tra xem người bạn đã tồn tại hay chưa
    $checkFriendQuery = "SELECT * FROM users WHERE ID = :friendshipid";
    $checkFriendStmt = $dbConn->prepare($checkFriendQuery);
    $checkFriendStmt->bindParam(':friendshipid', $friendshipid, PDO::PARAM_INT);
    $checkFriendStmt->execute();
    $friend = $checkFriendStmt->fetch(PDO::FETCH_ASSOC);

    // Kiểm tra xem người bạn có phải là chính người dùng hiện tại hay không
    if ($friendshipid == $userid) {
        throw new Exception('Không thể kết bạn với chính bản thân.');
    }

    if (!$friend) {
        echo json_encode(array('status' => false, 'message' => 'Người bạn không tồn tại.'));
        exit;
    }

    // Kiểm tra xem người dùng đã có 20 người bạn chưa
    $countFriendsQuery = "SELECT COUNT(*) as friendCount FROM friendships WHERE (userid = :userid OR friendshipid = :userid) AND status='friend'";
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
    $countFriendsQuery = "SELECT COUNT(*) as friendCount FROM friendships WHERE (userid = :friendshipid OR friendshipid = :friendshipid) AND status='friend'";
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
    $acceptFriendshipQuery = "UPDATE friendships SET status = 'friend' WHERE friendshipid = :userid AND userid = :friendshipid";
$acceptFriendshipStmt = $dbConn->prepare($acceptFriendshipQuery); // Khởi tạo biến
$acceptFriendshipStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
$acceptFriendshipStmt->bindParam(':friendshipid', $friendshipid, PDO::PARAM_INT);
$acceptFriendshipStmt->execute();

    // Thêm yêu cầu kết bạn vào cơ sở dữ liệu
    $insertFriendshipQuery = "INSERT INTO friendships (userid, friendshipid, status, time) VALUES (:userid, :friendshipid, 'friend', NOW())";
    $insertFriendshipStmt = $dbConn->prepare($insertFriendshipQuery);
    $insertFriendshipStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
    $insertFriendshipStmt->bindParam(':friendshipid', $friendshipid, PDO::PARAM_INT);
    $insertFriendshipStmt->execute();

    echo json_encode(array('status' => true, 'message' => 'Đã chấp nhận yêu cầu kết bạn.'));
} catch (Exception $e) {
    echo json_encode(array('status' => false, 'message' => $e->getMessage()));
}
