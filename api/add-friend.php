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
        echo json_encode(array('status' => false, 'message' => 'Thiếu tham số friendshipid hoặc userid'));
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
        throw new Exception('Không thể kết bạn với chính bản thân.');
    }

    if (!$friend) {
        echo json_encode(array('status' => false, 'message' => 'Người bạn không tồn tại.'));
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
        echo json_encode(array('status' => false, 'message' => 'Mối quan hệ bạn bè đã tồn tại.'));
        exit;
    }

    // Thêm yêu cầu kết bạn vào cơ sở dữ liệu
    $insertFriendshipQuery = "INSERT INTO friendships (userid, friendshipid, status, time) VALUES (:userid, :friendshipid, 'pending', NOW())";
    $insertFriendshipStmt = $dbConn->prepare($insertFriendshipQuery);
    $insertFriendshipStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
    $insertFriendshipStmt->bindParam(':friendshipid', $friendshipid, PDO::PARAM_INT);
    $insertFriendshipStmt->execute();

    echo json_encode(array('status' => true, 'message' => 'Yêu cầu kết bạn đã được gửi.'));
} catch (Exception $e) {
    echo json_encode(array('status' => false, 'message' => $e->getMessage()));
}
?>