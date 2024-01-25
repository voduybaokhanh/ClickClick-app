<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600"); 
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

//http://192.168.1.30:8686/login.php
// đăng nhập tk
// import connection.php
include_once './connection.php';
include_once './helpers/jwt.php';
try {
// đọc dữ liệu từ json
$data = json_decode(file_get_contents("php://input"));
// đọc dữ liệu từ json
$name = $data->name;
$password = $data->password;
// thêm dữ liệu vào database
$sqlQuery = "SELECT * FROM users WHERE name = '$name'";
// thực thi câu lệnh pdo
$stmt = $dbConn -> prepare($sqlQuery);
$stmt->execute();
// lấy dữ liệu từ pdo
$user = $stmt->fetch(PDO::FETCH_ASSOC);
// kiểm tra dữ liệu
if($user) {
    echo json_encode(
        array(
            "status" => true,
            "user" => $user,
        )
    );
}else{
    echo json_encode(array(
        "status" => false,
        "user" => null
    ));
}
} catch (Exception $e) {
    echo json_encode(array("message"=>$e->getMessage()));
}

?>