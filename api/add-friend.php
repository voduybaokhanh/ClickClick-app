<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './connection.php';

try {
    session_start();

    // Kiểm tra đăng nhập
    if (!isset($_SESSION['userid'])) {
        echo json_encode(array('status' => false, 'message' => 'Vui lòng đăng nhập.'));
        exit;
    }
    $userid = $_SESSION['userid'];
    $FRIENDSHIPID = $_GET['FRIENDSHIPID'];
    // Nhận dữ liệu từ yêu cầu
    $data = json_decode(file_get_contents("php://input"));

        // Kiểm tra xem người bạn đã tồn tại hay chưa
        $checkQuery = "SELECT * FROM users WHERE ID = :FRIENDSHIPID";
        $checkStmt = $dbConn->prepare($checkQuery);
        $checkStmt->bindParam(':FRIENDSHIPID', $FRIENDSHIPID, PDO::PARAM_INT);
        $checkStmt->execute();
        $friend = $checkStmt->fetch(PDO::FETCH_ASSOC);
    
        if (!$friend) {
            echo json_encode(array('status' => false, 'message' => 'Người bạn không tồn tại.'));
            exit;
        }

    // Thêm yêu cầu kết bạn vào cơ sở dữ liệu
    $insertFriendshipQuery = "INSERT INTO friendships (userid, FRIENDSHIPID, status,time) VALUES (:userid, :FRIENDSHIPID, 'pending',now())";
    $insertFriendshipStmt = $dbConn->prepare($insertFriendshipQuery);
    $insertFriendshipStmt->bindParam(':userid', $_SESSION['userid'], PDO::PARAM_INT);
    $insertFriendshipStmt->bindParam(':FRIENDSHIPID', $FRIENDSHIPID, PDO::PARAM_INT);
    $insertFriendshipStmt->bindParam(':FRIENDSHIPID', $FRIENDSHIPID, PDO::PARAM_INT);
    $insertFriendshipStmt->execute();

    echo json_encode(array('status' => true, 'message' => 'Yêu cầu kết bạn đã được gửi.'));
} catch (Exception $e) {
    echo json_encode(array('status' => false, 'message' => 'bạn đã gửi lời mời kết bạn cho người này!.'));
}
?>
