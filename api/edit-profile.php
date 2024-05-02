<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Import connection.php và JWT
include_once './connection.php';
include_once './helpers/jwt.php';

try {
    $data = json_decode(file_get_contents("php://input"));

    // Kiểm tra xem người dùng có tồn tại hay không
    if (!isset($data->userid)) {
        echo json_encode(array('error' => 'User does not exist'));
        exit;
    }

    // Kiểm tra xem dữ liệu có tồn tại hay không
    if (!$data || !isset($data->avatar) || !isset($data->name) || !isset($data->text)) {
        echo json_encode(array('error' => 'Invalid data'));
        exit;
    }

    // Lấy dữ liệu từ yêu cầu
    $userid = $data->userid;
    $name = $data->name;
    $avatar = $data->avatar;
    $text = $data->text;
    
    // Cập nhật hồ sơ người dùng
    $sqlUpdateUser = "UPDATE users SET name = :name, avatar = :avatar, text = :text WHERE id = :userid";
    $stmtUser = $dbConn->prepare($sqlUpdateUser);
    $stmtUser->bindParam(':userid', $userid, PDO::PARAM_INT);
    $stmtUser->bindParam(':name', $name, PDO::PARAM_STR);
    $stmtUser->bindParam(':avatar', $avatar, PDO::PARAM_STR);
    $stmtUser->bindParam(':text', $text, PDO::PARAM_STR);
    $stmtUser->execute();

    // Cập nhật các bài viết của người dùng sau khi cập nhật hồ sơ
    $sqlUpdatePosts = "UPDATE posts SET name = :name, avatar = :avatar WHERE userid = :userid";
    $stmtPosts = $dbConn->prepare($sqlUpdatePosts);
    $stmtPosts->bindParam(':userid', $userid, PDO::PARAM_INT);
    $stmtPosts->bindParam(':name', $name, PDO::PARAM_STR);
    $stmtPosts->bindParam(':avatar', $avatar, PDO::PARAM_STR);
    $stmtPosts->execute();

    echo json_encode(
        array(
            "status" => true,
            "message" => "Profile updated successfully"
        )
    );

} catch (Exception $e) {
    echo json_encode(
        array(
            "status" => false,
            "message" => $e->getMessage()
        )
    );
}
?>
