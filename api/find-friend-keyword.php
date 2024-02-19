<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once './connection.php';
$data = json_decode(file_get_contents("php://input"));
$keyword = $_GET['keyword'];
// tìm bạn theo email, tên , sdt
try {
    // Đọc dữ liệu từ cơ sở dữ liệu
    $sqlQuery = "SELECT Email,NAME,SDT FROM users WHERE EMAIL LIKE '%$keyword%' or NAME LIKE '%$keyword%' or SDT LIKE '%$keyword%'";
    $sqlQuery = $dbConn->prepare($sqlQuery);
    $sqlQuery->execute();
    $user = $sqlQuery->fetch(PDO::FETCH_ASSOC);

    echo json_encode(
        array(
            "status" => true,
            "user" => $user
        )
    );
    
} catch (PDOException $e) {
    echo json_encode(array("error" => $e->getMessage()));
}
?>