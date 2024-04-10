<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './connection.php';

try {
    // Đọc dữ liệu từ database
    $sqlQuery = "SELECT AVATAR, TIME, NAME, CONTENT, LIKES, IMAGE FROM posts";
    $stmt = $dbConn->prepare($sqlQuery);
    $stmt->execute();
    // Lấy tất cả dữ liệu từ câu lệnh PDO
    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

   

    // Trả về dữ liệu dạng JSON
    echo json_encode(
        array(
            "status" => true,
        )
    );
} catch (Exception $e) {
    echo json_encode(array('status' => false, 'message' => $e->getMessage()));
}
