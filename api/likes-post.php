<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './connection.php';

try {
    $data = json_decode(file_get_contents("php://input"));

    // Kiểm tra đăng nhập
    if (!isset ($data->userid)) {
        echo json_encode(array('status' => false, 'message' => 'Vui lòng đăng nhập.'));
        exit;
    }

    // Kiểm tra xem có postid và action được gửi hay không
    if (!isset ($data->postid) || !isset ($data->action)) {
        http_response_code(400);
        echo json_encode(array('status' => false, 'message' => 'Thiếu tham số postid hoặc action'));
        exit;
    }

    $userid = $data->userid;
    $action = $data->action; // Có thể là 'like' hoặc 'unlike'
    $postid = $data->postid;

    // Kiểm tra action hợp lệ
    if ($action != 1 && $action != 0) {
        http_response_code(400);
        echo json_encode(array('status' => false, 'message' => 'Hành động không hợp lệ.'));
        exit;
    }

    // Kiểm tra xem postid có tồn tại trong cơ sở dữ liệu hay không
    $checkPostQuery = "SELECT * FROM posts WHERE ID = :postid";
    $checkPostStmt = $dbConn->prepare($checkPostQuery);
    $checkPostStmt->bindParam(':postid', $postid, PDO::PARAM_INT);
    $checkPostStmt->execute();
    $existingPost = $checkPostStmt->fetch(PDO::FETCH_ASSOC);

    if (!$existingPost) {
        echo json_encode(array('status' => false, 'message' => 'Bài đăng không tồn tại.'));
        exit;
    }

    // Kiểm tra xem người dùng đã "like" post này trước đó chưa
    $checkLikeQuery = "SELECT * FROM likes WHERE userid = :userid AND postid = :postid";
    $checkLikeStmt = $dbConn->prepare($checkLikeQuery);
    $checkLikeStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
    $checkLikeStmt->bindParam(':postid', $postid, PDO::PARAM_INT);
    $checkLikeStmt->execute();
    $existingLike = $checkLikeStmt->fetch(PDO::FETCH_ASSOC);

    if ($action == '1') {
        if ($existingLike) {
            // Xóa "like" từ cơ sở dữ liệu
            $deleteLikeQuery = "DELETE FROM likes WHERE userid = :userid AND postid = :postid";
            $deleteLikeStmt = $dbConn->prepare($deleteLikeQuery);
            $deleteLikeStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
            $deleteLikeStmt->bindParam(':postid', $postid, PDO::PARAM_INT);
            $deleteLikeStmt->execute();

            // Cập nhật số lượt "like" của bài đăng
            $updateLikesCountQuery = "UPDATE posts SET likes = likes - 1 WHERE ID = :postid";
            $updateLikesCountStmt = $dbConn->prepare($updateLikesCountQuery);
            $updateLikesCountStmt->bindParam(':postid', $postid, PDO::PARAM_INT);
            $updateLikesCountStmt->execute();

            // Truy vấn SQL để lấy số lượt thích dựa trên postid
            $getLikesCountQuery = "SELECT likes FROM posts WHERE ID = :postid"; // Sửa tên cột thành 'likes'
            $getLikesCountStmt = $dbConn->prepare($getLikesCountQuery);
            $getLikesCountStmt->bindParam(':postid', $postid, PDO::PARAM_INT);
            $getLikesCountStmt->execute();
            $likesCount = $getLikesCountStmt->fetch(PDO::FETCH_ASSOC)['likes'];


            echo json_encode(array('status' => true, 'message' => 'Unlike bài đăng thành công.', 'action' => 0, 'LIKES' => $likesCount));
            exit; // Kết thúc xử lý "unlike"
        }
        // Thêm "like" mới vào cơ sở dữ liệu
        $addLikeQuery = "INSERT INTO likes (userid, postid, time) VALUES (:userid, :postid, now())";
        $addLikeStmt = $dbConn->prepare($addLikeQuery);
        $addLikeStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
        $addLikeStmt->bindParam(':postid', $postid, PDO::PARAM_INT);
        $addLikeStmt->execute();

        // Cập nhật số lượt "like" của bài đăng
        $updateLikesCountQuery = "UPDATE posts SET likes = likes + 1 WHERE ID = :postid";
        $updateLikesCountStmt = $dbConn->prepare($updateLikesCountQuery);
        $updateLikesCountStmt->bindParam(':postid', $postid, PDO::PARAM_INT);
        $updateLikesCountStmt->execute();

        // Lấy userid từ postid
        $getUserIdFromPostIdQuery = "SELECT userid FROM posts WHERE ID = :postid";
        $getUserIdFromPostIdStmt = $dbConn->prepare($getUserIdFromPostIdQuery);
        $getUserIdFromPostIdStmt->bindParam(':postid', $postid, PDO::PARAM_INT);
        $getUserIdFromPostIdStmt->execute();
        $postUserId = $getUserIdFromPostIdStmt->fetch(PDO::FETCH_COLUMN);
        $RECEIVERID = $postUserId;

        // Lấy tên người dùng từ userid
        $getUserNameQuery = "SELECT NAME FROM users WHERE ID = :userid";
        $getUserNameStmt = $dbConn->prepare($getUserNameQuery);
        $getUserNameStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
        $getUserNameStmt->execute();
        $userName = $getUserNameStmt->fetch(PDO::FETCH_COLUMN);

        if ($userName) {
            // Thêm thông báo vào cơ sở dữ liệu
            $notificationContent = "$userName đã thích bài đăng của bạn.";
            $addNotificationQuery = "INSERT INTO notifications (userid, content, time, RECEIVERID) VALUES (:userid, :content, now(), :RECEIVERID)";
            $addNotificationStmt = $dbConn->prepare($addNotificationQuery);
            $addNotificationStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
            $addNotificationStmt->bindParam(':content', $notificationContent, PDO::PARAM_STR);
            $addNotificationStmt->bindParam(':RECEIVERID', $RECEIVERID, PDO::PARAM_INT);
            $addNotificationStmt->execute();

            // Truy vấn SQL để lấy số lượt thích dựa trên postid
            $getLikesCountQuery = "SELECT likes FROM posts WHERE ID = :postid"; // Sửa tên cột thành 'likes'
            $getLikesCountStmt = $dbConn->prepare($getLikesCountQuery);
            $getLikesCountStmt->bindParam(':postid', $postid, PDO::PARAM_INT);
            $getLikesCountStmt->execute();
            $likesCount = $getLikesCountStmt->fetch(PDO::FETCH_ASSOC)['likes'];


            echo json_encode(array('status' => true, 'message' => $userName . ' đã like bài đăng của bạn.', 'action' => 1, 'LIKES' => $likesCount));
        } else {
            echo json_encode(array('status' => true, 'message' => 'Người dùng đã thích bài đăng thành công.'));
        }
        exit; // Kết thúc xử lý khi thêm "like" mới
    }
} catch (Exception $e) {
    echo json_encode(array('status' => false, 'message' => $e->getMessage()));
}
?>