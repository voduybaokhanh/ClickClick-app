<?php
// Kết nối đến cơ sở dữ liệu

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Đọc dữ liệu JSON từ phần thân của request
$data = json_decode(file_get_contents("php://input"));

// Xác thực người dùng và lấy userid từ token hoặc phiên đăng nhập
$userid = 32; // Thay thế bằng quá trình xác thực người dùng thực tế

// Lấy FRIENDSHIPID từ dữ liệu gửi lên
$FRIENDSHIPID = $data->FRIENDSHIPID;

// Kiểm tra xem lời mời đã được gửi chưa
$sqlCheckInvite = "SELECT * FROM friendships WHERE userid = :userid AND FRIENDSHIPID = :FRIENDSHIPID";
$stmtCheckInvite = $dbConn->prepare($sqlCheckInvite);
$stmtCheckInvite->bindParam(':userid', $userid, PDO::PARAM_INT);
$stmtCheckInvite->bindParam(':FRIENDSHIPID', $FRIENDSHIPID, PDO::PARAM_INT);
$stmtCheckInvite->execute();

if ($stmtCheckInvite->rowCount() > 0) {
    echo json_encode(array("error" => "Lời mời kết bạn đã được gửi trước đó."));
} else {
    // Thêm lời mời kết bạn vào cơ sở dữ liệu
    $sqlInvite = "INSERT INTO friendships (userid, FRIENDSHIPID, status) VALUES (:userid, :FRIENDSHIPID, 'pending')";
    $stmtInvite = $dbConn->prepare($sqlInvite);
    $stmtInvite->bindParam(':userid', $userid, PDO::PARAM_INT);
    $stmtInvite->bindParam(':FRIENDSHIPID', $FRIENDSHIPID, PDO::PARAM_INT);

    if ($stmtInvite->execute()) {
        echo json_encode(array("message" => "Lời mời kết bạn đã được gửi thành công."));
    } else {
        echo json_encode(array("error" => "Không thể gửi lời mời kết bạn."));
    }
}
?>
