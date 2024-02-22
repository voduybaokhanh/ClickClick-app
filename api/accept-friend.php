<?php
// accept-friend-request.php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './connection.php';
// http://192.168.1.29:8686/accept-friend.php
try {
    session_start();

  

    // Nhận dữ liệu từ yêu cầu
    $data = json_decode(file_get_contents("php://input"));
      // Kiểm tra đăng nhập
      if (!isset($data->userid)) {
        echo json_encode(array('status' => false, 'message' => 'Vui lòng đăng nhập.'));
        exit;
    }
    // Kiểm tra xem có friendshipid được gửi hay không
    if (!isset($data->friendshipid)) {
        http_response_code(400);
        echo json_encode(array('status' => false, 'message' => 'Thiếu tham số friendshipid'));
        exit;
    }



    // Cập nhật trạng thái yêu cầu kết bạn thành "accepted" trong cơ sở dữ liệu
    $acceptFriendshipQuery = "UPDATE friendships SET status = 'friend' WHERE friendshipid = :friendshipid AND userid = :userid";
    $acceptFriendshipStmt = $dbConn->prepare($acceptFriendshipQuery);
    $acceptFriendshipStmt->bindParam(':friendshipid', $data->friendshipid, PDO::PARAM_INT);
    $acceptFriendshipStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
    $acceptFriendshipStmt->execute();

    echo json_encode(array('status' => true, 'message' => 'Đã chấp nhận yêu cầu kết bạn.'));
} catch (Exception $e) {
    echo json_encode(array('status' => false, 'message' => $e->getMessage()));
}
?>