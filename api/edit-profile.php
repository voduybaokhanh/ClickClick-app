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
    $originalSdt = isset($user['sdt']) ? $user['sdt'] : null;
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

    if (isset($data->sdt)) {
        $updates[] = "sdt = :sdt";
        $sdt = $data->sdt;
    } else {
        $sdt = $originalSdt;
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
        if (isset($data->sdt)) {
            $stmt->bindParam(':sdt', $sdt, PDO::PARAM_STR);
        }
        if (isset($data->text)) {
            $stmt->bindParam(':text', $text, PDO::PARAM_STR);
        }

        $stmt->execute();
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
?>
