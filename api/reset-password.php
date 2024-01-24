<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// http://172.16.117.36:8686/reset-password.php
// đọc email , password, password_confirmation từ body
try {
    include_once './connection.php';
    $data = json_decode(file_get_contents("php://input"));
    $email = $data->email;
    $password = $data->password;
    $password_confirmation = $data->password_confirmation;
    // kiểm tra password và password_confirmation có giống nhau hay k

    if($password != $password_confirmation){
        echo json_encode(array(
        "status" => false,
        "error" => "Password and Password confirmation are not the same"
        ));
        return;
    }
    // kiểm tra email có trong db hay k
    $query = "SELECT * FROM password_resets where email = '$email'  
    and created_at >= now() - interval 1 hour
    and available = 1";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    if($result){
    $password = password_hash($password, PASSWORD_BCRYPT);

        // cập nhật mật khẩu vào bảng users
        $query = "update users set password = '$password' where email = '$email'";
        $stmt = $dbConn->prepare($query);
        $stmt->execute();
        // cập nhật available = 0 trong bảng password_resets
        $query = "update password_resets set available = 0 where email = '$email' ";
        $stmt = $dbConn->prepare($query);
        $stmt->execute();
        echo json_encode(array(
            "status" => true,
            "message" => "password reset successfully"  
        ));
    }else{
        echo json_encode(array(
            "status" => false, 
        ));
    }
} catch (\Throwable $th) {
    echo json_encode(array(
        "status" => false,
        "error" => $th->getMessage()
    ));
}