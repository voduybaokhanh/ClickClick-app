<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
//http://127.0.0.1:8686/get-all-posts.php
//import file connection.php
// hiện tất cả bài đăng
include_once './connection.php'; 
// đọc dữ liệu từ database
$sqlQuery = "SELECT * FROM users";
$stmt = $dbConn->prepare($sqlQuery);
$stmt -> execute();
// lấy tất cả dữ liệu từ câu lệnh pdo
$user = $stmt->fetchAll(PDO::FETCH_ASSOC);
// trả về dữ liệu dạng json
echo json_encode(
    array(
        "status" => true,
        "all-post" => $user
    )
);
?>