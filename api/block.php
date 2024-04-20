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

if (!isset($data->userid)) {
    http_response_code(400);
    echo json_encode(array('status' => false, 'message' => 'Thiếu tham số userid'));
    exit;
}

$userid = $data->userid;

$sqlQuery = "SELECT role FROM users WHERE ID = :userid";
$stmt = $dbConn->prepare($sqlQuery);
$stmt->bindParam(':userid', $userid, PDO::PARAM_INT);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && $user['role'] === 'admin') {
    http_response_code(403);
    echo json_encode(array("status" => false, "message" => "Không thể khóa tài khoản quản trị viên"));
    exit;
}

try {
    $userQuery = "UPDATE users SET AVAILABLE = 0 WHERE ID = :userid";
    $userStmt = $dbConn->prepare($userQuery);
    $userStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
    $userStmt->execute();

    if ($userStmt->rowCount() > 0) {
        echo json_encode(array("status" => true, "message" => "Khóa tài khoản người dùng thành công"));
    } else {
        echo json_encode(array("status" => false, "message" => "Không tìm thấy người dùng hoặc không có gì thay đổi"));
    }
} catch (PDOException $e) {
    http_response_code(404);
    echo json_encode(array("status" => false, "message" => "Không tìm thấy người dùng: " . $e->getMessage()));
}
