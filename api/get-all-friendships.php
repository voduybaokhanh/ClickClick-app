<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './connection.php';

try {
    // Nhận dữ liệu từ yêu cầu
    $data = json_decode(file_get_contents("php://input"));

    // Kiểm tra đăng nhập
    if (!isset($data->userid)) {
        echo json_encode(array('status' => false, 'message' => 'Vui lòng cung cấp userid.'));
        exit;
    }

    $userid = $data->userid;

    // Truy vấn để lấy danh sách người đã gửi lời mời kết bạn
    $invitationQuery = "SELECT users.* FROM friendships 
                        INNER JOIN users ON friendships.userid = users.ID 
                        WHERE friendships.friendshipid = :userid 
                        AND friendships.status = 'pending'";
    $invitationStmt = $dbConn->prepare($invitationQuery);
    $invitationStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
    $invitationStmt->execute();
    $invitationList = $invitationStmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(array('status' => true, 'invitations' => $invitationList));
} catch (Exception $e) {
    echo json_encode(array('status' => false, 'message' => $e->getMessage()));
}
?>
