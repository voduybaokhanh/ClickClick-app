<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


include_once './connection.php';

$data = json_decode(file_get_contents("php://input"));

// Kiểm tra xem có từ khóa được gửi hay không
if (!isset($data->keyword) || !isset($data->userid)) {
    http_response_code(400);
    echo json_encode(array('status' => false, 'message' => 'Thiếu tham số keyword hoặc userid'));
    exit;
}

$keyword = $data->keyword;
$userid = $data->userid;

try {
    // Tìm kiếm người dùng dựa trên từ khóa
    $sqlQuery = "SELECT ID, Email, NAME, AVATAR FROM users WHERE EMAIL LIKE '%$keyword%'";
    $sqlQuery = $dbConn->prepare($sqlQuery);
    $sqlQuery->execute();
    $user = $sqlQuery->fetch(PDO::FETCH_ASSOC);

    // Kiểm tra mối quan hệ kết bạn
    $sqlQueryCheckFriendship = "SELECT status FROM friendships WHERE (userid = :currentUserID AND friendshipid = :searchedUserID) OR (userid = :searchedUserID AND friendshipid = :currentUserID)";
    $sqlQueryCheckFriendship = $dbConn->prepare($sqlQueryCheckFriendship);
    $sqlQueryCheckFriendship->bindParam(':currentUserID', $userid);
    $sqlQueryCheckFriendship->bindParam(':searchedUserID', $user['ID']);
    $sqlQueryCheckFriendship->execute();
    $friendship = $sqlQueryCheckFriendship->fetch(PDO::FETCH_ASSOC);

    // Trả về kết quả
    if ($friendship) {
        // Có mối quan hệ kết bạn giữa hai người dùng
        echo json_encode(array("status" => true, "user" => $user, "friendship" => $friendship['status']));
    } else {
        // Không có mối quan hệ kết bạn giữa hai người dùng
        echo json_encode(array("status" => true, "user" => $user, "friendship" => null));
    }
} catch (PDOException $e) {
    echo json_encode(array("error" => $e->getMessage()));
}
?>
