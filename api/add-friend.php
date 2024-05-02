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
    if (!isset($data->friendshipid) || !isset($data->userid)) {
        http_response_code(400);
        echo json_encode(array('status' => false, 'message' => 'Missing parameters friendshipid or userid'));
        exit;
    }

    $userid = $data->userid;
    $friendshipid = $data->friendshipid; // Lấy friendshipid từ dữ liệu gửi đi

    // Kiểm tra xem người bạn đã tồn tại hay chưa
    $checkFriendQuery = "SELECT * FROM users WHERE ID = :friendshipid";
    $checkFriendStmt = $dbConn->prepare($checkFriendQuery);
    $checkFriendStmt->bindParam(':friendshipid', $friendshipid, PDO::PARAM_INT);
    $checkFriendStmt->execute();
    $friend = $checkFriendStmt->fetch(PDO::FETCH_ASSOC);

    // Kiểm tra xem người bạn có phải là chính người dùng hiện tại hay không
    if ($friendshipid == $userid) {
        throw new Exception("Can't friend yourself.");
    }

    if (!$friend) {
        echo json_encode(array('status' => false, 'message' => 'Friend does not exist.'));
        exit;
    }

    // Kiểm tra xem đã có mối quan hệ bạn bè trước đó hay chưa
    $checkRelationQuery = "SELECT * FROM friendships WHERE (userid = :userid AND friendshipid = :friendshipid) OR (userid = :friendshipid AND friendshipid = :userid)";
    $checkRelationStmt = $dbConn->prepare($checkRelationQuery);
    $checkRelationStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
    $checkRelationStmt->bindParam(':friendshipid', $friendshipid, PDO::PARAM_INT);
    $checkRelationStmt->execute();
    $existingRelation = $checkRelationStmt->fetch(PDO::FETCH_ASSOC);

    if ($existingRelation) {
        echo json_encode(array('status' => false, 'message' => 'Friend relationship already exists.'));
        exit;
    }

    // Kiểm tra xem người dùng đã có 20 người bạn chưa
    $countFriendsQuery = "SELECT COUNT(*) as friendCount FROM friendships WHERE userid = :userid  AND status='friend'";
    $countFriendsStmt = $dbConn->prepare($countFriendsQuery);
    $countFriendsStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
    $countFriendsStmt->execute();
    $friendCountResult = $countFriendsStmt->fetch(PDO::FETCH_ASSOC);

    if ($friendCountResult && $friendCountResult['friendCount'] >= 20) {
        // Người dùng đã có 20 người bạn trở lên, không thể gửi thêm lời mời
        echo json_encode(array('status' => false, 'message' => 'You have reached the limit of 20 friends.'));
        exit;
    }

    // Kiểm tra xem đối phương có 20 người bạn không
    $countFriendsQuery = "SELECT COUNT(*) as friendCount FROM friendships WHERE userid = :friendshipid  AND status='friend'";
    $countFriendsStmt = $dbConn->prepare($countFriendsQuery);
    $countFriendsStmt->bindParam(':friendshipid', $friendshipid, PDO::PARAM_INT);
    $countFriendsStmt->execute();
    $friendCountResult = $countFriendsStmt->fetch(PDO::FETCH_ASSOC);

    if ($friendCountResult && $friendCountResult['friendCount'] >= 20) {
        // Đối phương đã có 20 người bạn trở lên, không thể gửi lời mời
        echo json_encode(array('status' => false, 'message' => 'Friend has reached the limit of 20 friends.'));
        exit;
    }

    // Thêm yêu cầu kết bạn vào cơ sở dữ liệu
    $insertFriendshipQuery = "INSERT INTO friendships (userid, friendshipid, status, time) VALUES (:userid, :friendshipid, 'pending', NOW())";
    $insertFriendshipStmt = $dbConn->prepare($insertFriendshipQuery);
    $insertFriendshipStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
    $insertFriendshipStmt->bindParam(':friendshipid', $friendshipid, PDO::PARAM_INT);
    $insertFriendshipStmt->execute();


    // Truy vấn để lấy thông tin người dùng từ userid
    $getUserNameQuery = "SELECT NAME FROM users WHERE ID = :userid";
    $getUserNameStmt = $dbConn->prepare($getUserNameQuery);
    $getUserNameStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
    $getUserNameStmt->execute();
    $userName = $getUserNameStmt->fetch(PDO::FETCH_COLUMN);

    if ($userName) {
        // Thêm thông báo vào cơ sở dữ liệu
        $notificationContent = "$userName sent a friend request.";
        $addNotificationQuery = "INSERT INTO notifications (userid, content, time,RECEIVERID) VALUES (:userid, :content, now(),:RECEIVERID)";
        $addNotificationStmt = $dbConn->prepare($addNotificationQuery);
        $addNotificationStmt->bindParam(':userid', $userid, PDO::PARAM_INT); // Sử dụng $userid thay vì $getUserNameStmt
        $addNotificationStmt->bindParam(':content', $notificationContent, PDO::PARAM_STR);
        $addNotificationStmt->bindParam(':RECEIVERID', $friendshipid, PDO::PARAM_INT); // Thông báo gửi cho người nhận
        $addNotificationStmt->execute();

        echo json_encode(array('status' => true, 'message' => $userName . ' sent a friend request.'));
    } else {
        // Xử lý khi không tìm thấy thông tin người dùng
        echo json_encode(array('status' => false, 'message' => 'Error'));
    }
} catch (Exception $e) {
    echo json_encode(array('status' => false, 'message' => $e->getMessage()));
}
