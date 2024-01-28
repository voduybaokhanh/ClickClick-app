<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

//http://127.0.0.1:8686/get-news-detail.php?id=1
// lấy chi tiết 1 bản tin
include_once './connection.php';
$data = json_decode(file_get_contents("php://input"));
$id = $_GET['id'];
// đọc dữ liệu từ database 
 // Lấy thông tin bài viết mới thêm vào
 $postQuery = "SELECT * FROM posts WHERE id = :id";
 $postStmt = $dbConn->prepare($postQuery);
 $postStmt->bindParam(':id', $id, PDO::PARAM_INT);
 $postStmt->execute();
 $post = $postStmt->fetch(PDO::FETCH_ASSOC);

 echo json_encode(
    array(
        "status" => true,
        "post" => $post
    )
);

?>