<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './connection.php';

try {
    session_start();

// Kiểm tra xem người dùng đã đăng nhập hay chưa
if (isset($_SESSION['userid'])) {
    // Hủy bỏ tất cả các biến session
    $_SESSION = array();

    // Hủy bỏ session cookie
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }

    // Hủy bỏ session
    session_destroy();

    echo json_encode(array("status" => true, "message" => "Đăng xuất thành công"));
} else {
    echo json_encode(array("status" => false, "message" => "Người dùng chưa đăng nhập"));
}

} catch (Exception $e) {
    echo json_encode(array('error' => $e->getMessage()));
}