<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './connection.php';
include_once './../api/helpers/jwt.php';
// Thông báo
include_once './connection.php';
include_once './../api/helpers/jwt.php';
// đăng nhập

try {
    $data = json_decode(file_get_contents("php://input"));
    $userid = $data->userid;
    $content = $data->content;

}
    catch (Exception $e) {
    echo json_encode(
        array(
            "status" => false,
            "error" => "Authentication failed. Please try again."
        )
    );
}
?>