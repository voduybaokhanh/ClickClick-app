<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Import connection.php và JWT
include_once './connection.php';
include_once './helpers/jwt.php';
// xóa bài đăng
try {
    //đọc id từ query string
    $id = $_GET['id'];
    // đọc dữ liệu từ database
$sqlQuery = "DELETE FROM posts WHERE id = $id";
// thực thi câu lệnh pdo 
$stmt = $dbConn->prepare($sqlQuery);
$stmt -> execute();
// trả về dữ liệu dạng json
echo json_encode(array("status"=> true,"message" => "Xóa bài viết thành công!"  ));
} catch (Exception $e) {
    echo json_encode(array("status"=> false,"message" => "Xóa bài viết thất bại!"  ));
}
?>