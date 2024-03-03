<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './connection.php';

try {
    $data = json_decode(file_get_contents("php://input"));

    // Kiểm tra loại thông báo và thực hiện các hành động tương ứng
    if ($data->type === "like_post") {
        $userid = $data->userid;
        $postid = $data->postid;

        // Lấy thông tin bài viết
        $getPostQuery = "SELECT * FROM posts WHERE id = :postid";
        $getPostStmt = $dbConn->prepare($getPostQuery);
        $getPostStmt->bindParam(':postid', $postid, PDO::PARAM_INT);
        $getPostStmt->execute();
        $post = $getPostStmt->fetch(PDO::FETCH_ASSOC);

        if (!$post) {
            http_response_code(404);
            echo json_encode(array('status' => false, 'message' => 'Bài viết không tồn tại'));
            exit;
        }

        // Thêm thông báo vào bảng notifications
        $addNotificationQuery = "INSERT INTO notifications (userid, content, time) VALUES (:userid, :content, NOW())";
        $content = "Người dùng " . $userid . " đã thích bài viết của bạn";
        $addNotificationStmt = $dbConn->prepare($addNotificationQuery);
        $addNotificationStmt->bindParam(':userid', $post['userid'], PDO::PARAM_INT);
        $addNotificationStmt->bindParam(':content', $content, PDO::PARAM_STR);
        $addNotificationStmt->execute();

        echo json_encode(array('status' => true, 'message' => 'Thông báo đã được tạo thành công'));
    } elseif ($data->type === "friend_request") {
        $userid = $data->userid;
        $friendshipid = $data->friendshipid;

        // Lấy thông tin người dùng gửi lời mời kết bạn
        $getSenderQuery = "SELECT name FROM users WHERE id = :friendshipid";
        $getSenderStmt = $dbConn->prepare($getSenderQuery);
        $getSenderStmt->bindParam(':friendshipid', $friendshipid, PDO::PARAM_INT);
        $getSenderStmt->execute();
        $sender = $getSenderStmt->fetch(PDO::FETCH_ASSOC);

        if (!$sender) {
            http_response_code(404);
            echo json_encode(array('status' => false, 'message' => 'Người dùng không tồn tại'));
            exit;
        }

        // Thêm thông báo vào bảng notifications
        $addNotificationQuery = "INSERT INTO notifications (userid, content, time) VALUES (:userid, :content, NOW())";
        $content = "Người dùng " . $sender['name'] . " đã gửi lời mời kết bạn";
        $addNotificationStmt = $dbConn->prepare($addNotificationQuery);
        $addNotificationStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
        $addNotificationStmt->bindParam(':content', $content, PDO::PARAM_STR);
        $addNotificationStmt->execute();

        echo json_encode(array('status' => true, 'message' => 'Thông báo đã được tạo thành công'));
    } else {
        http_response_code(400);
        echo json_encode(array('status' => false, 'message' => 'Loại thông báo không hợp lệ'));
    }
} catch (Exception $e) {
    echo json_encode(array('status' => false, 'message' => $e->getMessage()));
}
