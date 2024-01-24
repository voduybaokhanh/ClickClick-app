<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// http://127.0.0.1:8686/check-reset-password.php
// đọc email từ body
try {
    include_once './connection.php';
    $data = json_decode(file_get_contents("php://input"));
    $email = $data->email;
    //kiểm tra email có trong db hay không
    $query = "SELECT * FROM password_resets where email = '$email' 
    and created_at >= now() - interval 1 hour
    and available = 1";
    $stmt = $dbConn->prepare($query);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    if($result){
        echo json_encode(array(
            "status" => true,
        ));
    }else{
        echo json_encode(array(
            "status" => false,
        ));
    }
} catch (Exception $th) {
    echo json_encode(array(
        "status" => false,
        "error" => $th->getMessage()
    ));
}