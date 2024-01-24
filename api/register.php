<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

//http://192.168.1.28:8686/register.php
include_once './connection.php';
try {
    $decodedData = stripslashes(file_get_contents("php://input"));
    $data = json_decode($decodedData);
    $email = $data->email;
    $name = $data->name;
    $password = $data->password;
    $password_confirm = $data->password_confirm;
    // so sánh password và confirm password
    if ($password != $password_confirm) {
        echo json_encode(
            array(
                "status" => false,
                "message" => "Mật khẩu không khớp"
            )
        );
        return;
    }

    // kiểm tra email đã tồn tại chưa 
    $sqlQuery = "SELECT * FROM users WHERE email = :email";
    $stmt = $dbConn->prepare($sqlQuery);
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($user) {
        echo json_encode(
            array(
                "status" => false,
                "message" => "email đã tồn tại"
            )
        );
        return;
    }
    // thêm dữ liệu vào db
    $sqlQuery = "INSERT INTO users(email,password,name) VALUES ('$email','$password','$name')";
    $stmt = $dbConn->prepare($sqlQuery);
    $stmt->execute();
    echo json_encode(
        array(
            "status" => true,
            "message" => "đăng kí thành công"
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



