<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Import file connection.php
include_once './connection.php';

try {
    $decodedData = stripslashes(file_get_contents("php://input"));
    $data = json_decode($decodedData);

    if ($data === null  || !isset($data->email) || !isset($data->password) || !isset($data->password_confirm) || !isset($data->role)) {
        echo json_encode(
            array(
                "status" => false,
                "message" => "Dữ liệu JSON không hợp lệ"
            )
        );
        exit;
    }

    // Kiểm tra email đã tồn tại chưa
    $sqlQuery = "SELECT * FROM users WHERE email = :email";
    $stmt = $dbConn->prepare($sqlQuery);
    $stmt->bindParam(':email', $data->email, PDO::PARAM_STR);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($user) {
        echo json_encode(
            array(
                "status" => false,
                "message" => "Email đã tồn tại"
            )
        );
        exit;
    }

    // So sánh password và confirm password
    if ($data->password != $data->password_confirm) {
        echo json_encode(
            array(
                "status" => false,
                "message" => "Mật khẩu không khớp"
            )
        );
        exit;
    }

    // Thêm dữ liệu vào DB
    $sqlQuery = "INSERT INTO users (email, password, role) VALUES (:email, :password, :role)";
    $stmt = $dbConn->prepare($sqlQuery);
    $stmt->bindParam(':email', $data->email, PDO::PARAM_STR);
    $stmt->bindParam(':password', $data->password, PDO::PARAM_STR);
    $stmt->bindParam(':role', $data->role, PDO::PARAM_STR);
    $stmt->execute();

    echo json_encode(
        array(
            "status" => true,
            "message" => "Đăng ký thành công"
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
