<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Import connection.php và JWT
include_once './connection.php';
include_once './helpers/jwt.php';
// thêm bài đăng 
try {
    // Lấy dữ liệu từ JSON
    $data = json_decode(file_get_contents("php://input"));
   

    // Kiểm tra xem người dùng có tồn tại hay không
    if (!isset($data->userid)) {
        echo json_encode(array('error' => 'Người dùng không tồn tại'));
        exit;
    }

    // Kiểm tra xem dữ liệu có tồn tại hay không
    if (!$data || !isset($data->content) || !isset($data->image)) {
        echo json_encode(array('error' => 'Dữ liệu không hợp lệ'));
        exit;
    }

    // Lấy dữ liệu từ yêu cầu
    $content = $data->content;
    $image = $data->image;
    $userid = $data->userid;

    $postQuery = "SELECT * FROM users WHERE id = :userid";
    $postStmt = $dbConn->prepare($postQuery);
    $postStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
    $postStmt->execute();
    $user = $postStmt->fetch(PDO::FETCH_ASSOC);   

    // Chuẩn bị và thực thi truy vấn SQL
    $insertQuery = "INSERT INTO posts (userid, content, image, time,name) VALUES (:userid, :content, :image, now(),:name)";
    $insertStmt = $dbConn->prepare($insertQuery);
    $insertStmt->bindParam(':userid', $user['ID'], PDO::PARAM_INT);
    $insertStmt->bindParam(':content', $content, PDO::PARAM_STR);
    $insertStmt->bindParam(':image', $image, PDO::PARAM_STR);
    $insertStmt->bindParam(':name', $user['NAME'], PDO::PARAM_STR);
    $insertStmt->execute();

    // Lấy thông tin bài viết mới thêm vào
    $postId = $dbConn->lastInsertId();
    $postQuery = "SELECT * FROM posts WHERE ID = :postid";
    $postStmt = $dbConn->prepare($postQuery);
    $postStmt->bindParam(':postid', $postId, PDO::PARAM_INT);
    $postStmt->execute();
    $post = $postStmt->fetch(PDO::FETCH_ASSOC);


    // Kiểm tra và trả về kết quả
    echo json_encode(
        array(
            "status" => true,
            "post" => $post
        )
    );

} catch (Exception $e) {
    echo json_encode(array('error' => $e->getMessage()));
}
?>