<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './connection.php';
include_once './../api/helpers/jwt.php';

try {
    $data = json_decode(file_get_contents("php://input"));

    // Kiểm tra xem có userid được gửi hay không
    if (!isset($data->userid)) {
        http_response_code(400);
        echo json_encode(array('status' => false, 'message' => 'Thiếu tham số userid'));
        exit;
    }
    $userid = $data->userid;

    // Truy vấn thông báo dựa trên RECEIVERID
    $getNotificationsQuery = "SELECT * FROM notifications WHERE RECEIVERID = :userid";
    $getNotificationsStmt = $dbConn->prepare($getNotificationsQuery);
    $getNotificationsStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
    $getNotificationsStmt->execute();
    $notifications = $getNotificationsStmt->fetchAll(PDO::FETCH_ASSOC);

    // Trả về kết quả
    echo json_encode(array('status' => true, 'notifications' => $notifications));
} catch (Exception $e) {
    echo json_encode(array('status' => false, 'message' => $e->getMessage()));
}
?>
