<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

//http://127.0.0.1:8686/get-post-detail.php?id=1
// lấy chi tiết 1 bản tin
include_once './connection.php';
$data = json_decode(file_get_contents("php://input"));
$userid = $data -> userid;
// đọc dữ liệu từ database 
// Lấy thông tin bài viết theo userid
$postQuery = "SELECT * FROM posts WHERE userid = :userid";
$postStmt = $dbConn->prepare($postQuery);
$postStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
$postStmt->execute();
$posts = $postStmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(
    array(
        "status" => true,
        "posts" => $posts
    )
);
?>
