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
        echo json_encode(array('error' => 'Người dùng không tồn tại'));
        exit;
    }

    // Kiểm tra xem dữ liệu có tồn tại hay không
    if (!$data || !isset($data->avatar) || !isset($data->name)) {
        echo json_encode(array('error' => 'Dữ liệu không hợp lệ'));
        exit;
    }

    // Lấy dữ liệu từ yêu cầu
    $name = $data->name;
    $avatar = $data->avatar;
    $userid = $data->userid;

    // Cập nhật hồ sơ người dùng
    $sqlUpdateUser = "UPDATE users SET name = :name, avatar = :avatar";
    if (isset($data->text)) {
        $sqlUpdateUser .= ", text = :text";
        $text = $data->text;
    }
    $sqlUpdateUser .= " WHERE id = :userid";
    $stmtUser = $dbConn->prepare($sqlUpdateUser);
    $stmtUser->bindParam(':userid', $userid, PDO::PARAM_INT);
    $stmtUser->bindParam(':name', $name, PDO::PARAM_STR);
    $stmtUser->bindParam(':avatar', $avatar, PDO::PARAM_STR);
    if (isset($text)) {
        $stmtUser->bindParam(':text', $text, PDO::PARAM_STR);
    }
    $stmtUser->execute();

    // Cập nhật các bài viết của người dùng sau khi cập nhật hồ sơ
    $sqlUpdatePosts = "UPDATE posts SET name = :name, avatar = :avatar";
    if (isset($text)) {
        $sqlUpdatePosts .= ", text = :text";
    }
    $sqlUpdatePosts .= " WHERE userid = :userid";
    $stmtPosts = $dbConn->prepare($sqlUpdatePosts);
    $stmtPosts->bindParam(':userid', $userid, PDO::PARAM_INT);
    $stmtPosts->bindParam(':name', $name, PDO::PARAM_STR);
    $insertStmt->bindParam(':avatar', $avatar, PDO::PARAM_STR);
    if (isset($text)) {
        $stmtPosts->bindParam(':text', $text, PDO::PARAM_STR);
    }
    $stmtPosts->execute();

    echo json_encode(
        array(
            "status" => true,
            "message" => "Hồ sơ đã được cập nhật thành công"
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
