<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Bao gồm kết nối cơ sở dữ liệu
include_once './connection.php';
$data = json_decode(file_get_contents("php://input"));

// Kiểm tra xem tham số 'id' có tồn tại trong URL không
if (!isset($data->userid)) {
    http_response_code(400);
    echo json_encode(array('status' => false, 'message' => 'Thiếu tham số id'));
    exit;
}

// Lấy id từ URL
$userid = $data->userid;

// Chuẩn bị và thực thi truy vấn
$userQuery = "SELECT * FROM users WHERE id = :userid";
$userStmt = $dbConn->prepare($userQuery);
$userStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
$userStmt->execute();
$user = $userStmt->fetch(PDO::FETCH_ASSOC);

// Kiểm tra xem người dùng có được tìm thấy không
if ($user) {
    echo json_encode(array('status' => true, 'user' => $user));
} else {
    // Người dùng không được tìm thấy
    echo json_encode(array('status' => false, 'message' => 'Không tìm thấy người dùng'));
}
?>
