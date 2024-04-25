<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Thêm OPTIONS vào danh sách phương thức cho phép
header("Access-Control-Allow-Origin: *"); // Cho phép truy cập từ mọi nguồn
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './connection.php';
$data = json_decode(file_get_contents("php://input"));

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { // Xử lý yêu cầu OPTIONS
    http_response_code(200);
    exit;
}
// Bao gồm kết nối cơ sở dữ liệu
include_once './connection.php';
$data = json_decode(file_get_contents("php://input"));

// Kiểm tra xem tham số 'userid' có tồn tại không
if (!isset($data->userid)) {
    http_response_code(400);
    echo json_encode(array('status' => false, 'message' => 'Thiếu tham số userid'));
    exit;
}

// Lấy userid từ dữ liệu gửi đến
$userid = $data->userid;

// Kiểm tra trạng thái của tài khoản trước khi mở khóa
$userStatusQuery = "SELECT AVAILABLE FROM users WHERE ID = :userid";
$userStatusStmt = $dbConn->prepare($userStatusQuery);
$userStatusStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
$userStatusStmt->execute();
$userStatus = $userStatusStmt->fetch(PDO::FETCH_ASSOC);

// Kiểm tra nếu tài khoản không tồn tại hoặc đã có sẵn và không bị khóa
if (!$userStatus || $userStatus['AVAILABLE'] == 1) {
    http_response_code(403);
    echo json_encode(array("status" => false, "message" => "Tài khoản không bị khóa hoặc không tồn tại"));
    exit;
}

try {
    // Cập nhật trạng thái tài khoản
    $userQuery = "UPDATE users SET AVAILABLE = 1 WHERE ID = :userid";
    $userStmt = $dbConn->prepare($userQuery);
    $userStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
    $userStmt->execute();

    // Kiểm tra nếu có bất kỳ dòng nào được ảnh hưởng bởi câu lệnh SQL
    if ($userStmt->rowCount() > 0) {
        echo json_encode(array("status" => true, "message" => "Mở khóa tài khoản người dùng thành công"));
    } else {
        echo json_encode(array("status" => false, "message" => "Không tìm thấy người dùng hoặc không có gì thay đổi"));
    }
} catch (PDOException $e) {
    http_response_code(404);
    echo json_encode(array("status" => false, "message" => "Không tìm thấy người dùng: " . $e->getMessage()));
}
?>