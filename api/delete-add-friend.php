<?php
// delete-friend-request.php
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
        echo json_encode(array('status' => false, 'message' => 'Missing parameters: friendshipid, userid'));
        exit;
    }

    $userid = $data->userid;
    $friendshipid = $data->friendshipid;
    
    // Xóa lời mời kết bạn từ cơ sở dữ liệu
    $deleteFriendshipQuery = "DELETE FROM friendships WHERE friendshipid = :friendshipid AND userid = :userid AND status = 'pending'";
    $deleteFriendshipStmt = $dbConn->prepare($deleteFriendshipQuery);
    $deleteFriendshipStmt->bindParam(':friendshipid', $friendshipid, PDO::PARAM_INT);
    $deleteFriendshipStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
    $deleteFriendshipStmt->execute();

    echo json_encode(array('status' => true, 'message' => 'Friend request deleted.'));
} catch (Exception $e) {
    echo json_encode(array('status' => false, 'message' => $e->getMessage()));
}
?>