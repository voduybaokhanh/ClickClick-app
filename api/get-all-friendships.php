<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
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
    
    // Truy vấn để lấy danh sách bạn bè có trạng thái là "friend"
    $friendListQuery = "SELECT users.* FROM friendships INNER JOIN users ON friendships.friendshipid = users.ID WHERE friendships.userid = :userid AND friendships.status = 'pending'";
    $friendListStmt = $dbConn->prepare($friendListQuery);
    $friendListStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
    $friendListStmt->execute();
    $friendshipsList = $friendListStmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(array('status' => true, 'friendships' => $friendshipsList));
} catch (Exception $e) {
    echo json_encode(array('status' => false, 'message' => $e->getMessage()));
}
?>
