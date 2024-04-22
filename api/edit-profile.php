<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './connection.php';

try {
    $decodedData = stripslashes(file_get_contents("php://input"));
    $data = json_decode($decodedData);

    $id = $data->id;

    // Kiểm tra xem người dùng có tồn tại không
    $sqlQuery = "SELECT * FROM users WHERE id = :id";
    $stmt = $dbConn->prepare($sqlQuery);
    $stmt->bindParam(':id', $id, PDO::PARAM_STR);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode(
            array(
                "status" => false,
                "message" => "Người dùng không tồn tại"
            )
        );
        exit;
    }

    // Lưu trữ dữ liệu ban đầu
    $originalName = isset($user['name']) ? $user['name'] : null;
    $originalAvatar = isset($user['avatar']) ? $user['avatar'] : null;
    $originalText = isset($user['text']) ? $user['text'] : null;

    // Cập nhật hồ sơ người dùng
    $sqlUpdate = "UPDATE users SET ";
    $updates = array();

    if (isset($data->name)) {
        $updates[] = "name = :name";
        $name = $data->name;
    } else {
        $name = $originalName;
    }

    if (isset($data->avatar)) {
        $updates[] = "avatar = :avatar";
        $avatar = $data->avatar;
    } else {
        $avatar = $originalAvatar;
    }
    if (isset($data->text)) {
        $updates[] = "text = :text";
        $text = $data->text;
    } else {
        $text = $originalText;
    }

    if (!empty($updates)) {
        $sqlUpdate .= implode(', ', $updates);
        $sqlUpdate .= " WHERE id = :id";

        $stmt = $dbConn->prepare($sqlUpdate);
        $stmt->bindParam(':id', $id, PDO::PARAM_STR);
        if (isset($data->name)) {
            $stmt->bindParam(':name', $name, PDO::PARAM_STR);
        }
        if (isset($data->avatar)) {
            $stmt->bindParam(':avatar', $avatar, PDO::PARAM_STR);
        }
        if (isset($data->text)) {
            $stmt->bindParam(':text', $text, PDO::PARAM_STR);
        }

        $stmt->execute();
    }
     // Cập nhật các bài viết của người dùng sau khi cập nhật hồ sơ
$sqlUpdatePosts = "UPDATE posts SET ";
$updatesPosts = array();

// Cập nhật các trường thông tin bài viết mà bạn muốn cập nhật, bao gồm cả avatar
if (isset($data->name)) {
    $updatesPosts[] = "name = :name";
}
if (isset($data->avatar)) {
    $updatesPosts[] = "avatar = :avatar";
}

// Thêm các cập nhật khác nếu cần thiết

if (!empty($updatesPosts)) {
    $sqlUpdatePosts .= implode(', ', $updatesPosts);
    $sqlUpdatePosts .= " WHERE userid = :id";

    $stmtPosts = $dbConn->prepare($sqlUpdatePosts);
    $stmtPosts->bindParam(':id', $id, PDO::PARAM_STR);

    // Bind các giá trị cập nhật nếu có
    if (isset($data->name)) {
        $stmtPosts->bindParam(':name', $name, PDO::PARAM_STR);
    }
    if (isset($data->avatar)) {
        $stmtPosts->bindParam(':avatar', $avatar, PDO::PARAM_STR);
    }

    // Thực thi truy vấn cập nhật bài viết
    $stmtPosts->execute();
} 
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

