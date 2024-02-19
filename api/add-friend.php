<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './connection.php';

// thêm bạn
try {
    session_start();

    // Kiểm tra đăng nhập
    if (!isset($_SESSION['userid'])) {
        echo json_encode(array('status' => false, 'message' => 'Vui lòng đăng nhập.'));
        exit;
    }
    $userid = $_SESSION['userid'];
    $friendshipid = $_GET['friendshipid'];
    // Nhận dữ liệu từ yêu cầu
    $data = json_decode(file_get_contents("php://input"));

    // Kiểm tra xem người bạn đã tồn tại hay chưa
    $checkQuery = "SELECT * FROM users WHERE ID = :friendshipid";
    $checkStmt = $dbConn->prepare($checkQuery);
    $checkStmt->bindParam(':friendshipid', $friendshipid, PDO::PARAM_INT);
    $checkStmt->execute();
    $friend = $checkStmt->fetch(PDO::FETCH_ASSOC);

    // Kiểm tra xem người bạn có phải là chính người dùng hiện tại hay không
    if ($friendshipid == $userid) {
        throw new Exception('Không thể kết bạn với chính bản thân.');
    }
    if (!$friend) {
        echo json_encode(array('status' => false, 'message' => 'Người bạn không tồn tại.'));
        exit;
    }
    // Kiểm tra xem đã gửi yêu cầu kết bạn trước đó hay chưa
    $checkRequestQuery = "SELECT * FROM friendships WHERE userid = :userid AND friendshipid = :friendshipid";
    $checkRequestStmt = $dbConn->prepare($checkRequestQuery);
    $checkRequestStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
    $checkRequestStmt->bindParam(':friendshipid', $friendshipid, PDO::PARAM_INT);
    $checkRequestStmt->execute();
    $existingRequest = $checkRequestStmt->fetch(PDO::FETCH_ASSOC);

    if ($existingRequest) {
        http_response_code(400); // Bad Request
        echo json_encode(array('status' => false, 'message' => 'Bạn đã gửi lời mời kết bạn cho người này trước đó.'));
        exit;
    }

    // Thêm yêu cầu kết bạn vào cơ sở dữ liệu
    $insertFriendshipQuery = "INSERT INTO friendships (userid, friendshipid, status,time) VALUES (:userid, :friendshipid, 'pending',now())";
    $insertFriendshipStmt = $dbConn->prepare($insertFriendshipQuery);
    $insertFriendshipStmt->bindParam(':userid', $_SESSION['userid'], PDO::PARAM_INT);
    $insertFriendshipStmt->bindParam(':friendshipid', $friendshipid, PDO::PARAM_INT);
    $insertFriendshipStmt->bindParam(':friendshipid', $friendshipid, PDO::PARAM_INT);
    $insertFriendshipStmt->execute();

    echo json_encode(array('status' => true, 'message' => 'Yêu cầu kết bạn đã được gửi.'));
} catch (Exception $e) {
    echo json_encode(array('status' => false, 'message' => $e->getMessage()));
}
?>