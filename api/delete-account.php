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
    // Nhận dữ liệu từ JSON
    $data = json_decode(file_get_contents("php://input"));

    // Kiểm tra xem dữ liệu `userid` đã được truyền hay chưa
    if (!isset($data->userid)) {
        echo json_encode(array('status' => false, 'message' => 'Thiếu tham số userid'));
        exit;
    }

    // Lấy userid từ dữ liệu đầu vào
    $userid = $data->userid;

    // Bắt đầu một giao dịch để đảm bảo tính nhất quán của cơ sở dữ liệu
    $dbConn->beginTransaction();

    // Xóa các bản ghi từ bảng likes liên quan đến người dùng
    $deleteLikesQuery = "DELETE FROM likes WHERE userid = :userid";
    $deleteLikesStmt = $dbConn->prepare($deleteLikesQuery);
    $deleteLikesStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
    $deleteLikesStmt->execute();

    // Xóa các bản ghi từ bảng friendships liên quan đến người dùng
    $friendshipQuery = "DELETE FROM friendships WHERE userid = :userid OR friendshipid = :userid";
    $friendshipStmt = $dbConn->prepare($friendshipQuery);
    $friendshipStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
    $friendshipStmt->execute();

    // Xóa các bản ghi từ bảng notifications liên quan đến người dùng
    $notificationQuery = "DELETE FROM notifications WHERE userid = :userid";
    $notificationStmt = $dbConn->prepare($notificationQuery);
    $notificationStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
    $notificationStmt->execute();

    // Xóa các bản ghi từ bảng chats liên quan đến người dùng
    $chatQuery = "DELETE FROM chats WHERE SENDERID = :userid OR RECEIVERID = :userid";
    $chatStmt = $dbConn->prepare($chatQuery);
    $chatStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
    $chatStmt->execute();

    // Xóa các bản ghi từ bảng posts liên quan đến người dùng
    $postQuery = "DELETE FROM posts WHERE userid = :userid";
    $postStmt = $dbConn->prepare($postQuery);
    $postStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
    $postStmt->execute();

    // Xóa người dùng chính từ bảng users
    $userQuery = "DELETE FROM users WHERE id = :userid";
    $userStmt = $dbConn->prepare($userQuery);
    $userStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
    $userStmt->execute();

    // Hoàn thành giao dịch
    $dbConn->commit();

    // Trả về kết quả thành công
    echo json_encode(array("status" => true, "message" => "Successfully deleted user and related data!"));
} catch (Exception $e) {
    // Nếu có lỗi xảy ra, hủy bỏ giao dịch và in ra thông báo lỗi
    $dbConn->rollBack();
    echo json_encode(array("status" => false, "message" => "Failed to delete user and related data! Error: " . $e->getMessage()));
}
?>
