<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
//http://192.168.1.30:8686/getAllUsers.php
//import file connection.php
include_once './connection.php'; 

// đọc dữ liệu từ database
$sqlQuery = "SELECT * FROM USERS";
$stmt = $dbConn->prepare($sqlQuery);
$stmt -> execute();
// lấy tất cả dữ liệu từ câu lệnh pdo
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);
// trả về dữ liệu dạng json
echo json_encode(
    array(
        "status" => true,
        "users" => $users
    )
);
?>