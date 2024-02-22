<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
include_once './connection.php';
//http://127.0.0.1:8686/update-topics.php?id=8
// cập nhật bài viết
try {
    $data = json_decode(file_get_contents("php://input"));
    $CONTENT = $data->CONTENT;
    $id = $_GET['id'];
    $sqlQuery = "UPDATE posts SET  CONTENT = '$CONTENT' WHERE id = $id";
    $stmt = $dbConn->prepare($sqlQuery);
    $stmt->execute();
    // trả về dữ liệu dạng json
    echo json_encode(array("status" => true, "message" => "cập nhật bài viết thành công!"));
} catch (Exception $e) {
    echo json_encode(array("status" => false, "message" => "cập nhật bài viết thất bại!"));
}