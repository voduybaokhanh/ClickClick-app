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
    if (!isset($data->userid)) {
        echo json_encode(array('status' => false, 'message' => 'Vui lòng đăng nhập.'));
        exit;
    }

    // Kiểm tra xem có postid và action được gửi hay không
    if (!isset($data->postid) || !isset($data->action)) {
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

    // Lấy trường likes của bài đăng trong bảng posts
    $getPostLikesQuery = "SELECT likes FROM posts WHERE ID = :postid";
    $getPostLikesStmt = $dbConn->prepare($getPostLikesQuery);
    $getPostLikesStmt->bindParam(':postid', $postid, PDO::PARAM_INT);
    $getPostLikesStmt->execute();
    $postLikes = $getPostLikesStmt->fetch(PDO::FETCH_ASSOC);

    // Lấy số lượng likes từ kết quả truy vấn
    $likes = $postLikes['likes'];

    if ($action == '1') {
        if ($existingLike) {
            echo json_encode(array('status' => false, 'message' => 'Bạn đã like bài đăng này trước đó.'));
            exit;
        }

        // Thêm "like" mới vào cơ sở dữ liệu
        $addLikeQuery = "INSERT INTO likes (userid, postid,time) VALUES (:userid, :postid,now())";
        $addLikeStmt = $dbConn->prepare($addLikeQuery);
        $addLikeStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
        $addLikeStmt->bindParam(':postid', $postid, PDO::PARAM_INT);
        $addLikeStmt->execute();


        // cập nhật post
        $updateLikesCountQuery = "UPDATE posts SET likes = likes + 1 WHERE ID = :postid";
        $updateLikesCountStmt = $dbConn->prepare($updateLikesCountQuery);
        $updateLikesCountStmt->bindParam(':postid', $postid, PDO::PARAM_INT);
        $updateLikesCountStmt->execute();

        // Truy vấn để lấy userid từ postid
        $getUserIdFromPostIdQuery = "SELECT userid FROM posts WHERE ID = :postid";
        $getUserIdFromPostIdStmt = $dbConn->prepare($getUserIdFromPostIdQuery);
        $getUserIdFromPostIdStmt->bindParam(':postid', $postid, PDO::PARAM_INT);
        $getUserIdFromPostIdStmt->execute();
        $postUserId = $getUserIdFromPostIdStmt->fetch(PDO::FETCH_COLUMN);
        $RECEIVERID = $postUserId;

        //lấy tên người dùng từ userid
        // Truy vấn để lấy thông tin người dùng từ userid
        $getUserNameQuery = "SELECT NAME FROM users WHERE ID = :userid";
        $getUserNameStmt = $dbConn->prepare($getUserNameQuery);
        $getUserNameStmt->bindParam(':userid', $userid, PDO::PARAM_INT); // Đổi 'userid' thành cột chứa ID của người tạo bài đăng
        $getUserNameStmt->execute();
        $userName = $getUserNameStmt->fetch(PDO::FETCH_COLUMN);

        if ($userName) {
            // Sử dụng $userName trong nội dung thông báo
            // Thêm "Thông báo" mới vào cơ sở dữ liệu
            $notificationContent = "$userName đã thích bài đăng của bạn.";
            $addNotificationQuery = "INSERT INTO notifications (userid, content, time,RECEIVERID) VALUES (:userid, :content, now(),:RECEIVERID)";
            $addNotificationStmt = $dbConn->prepare($addNotificationQuery);
            $addNotificationStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
            $addNotificationStmt->bindParam(':content', $notificationContent, PDO::PARAM_STR);
            $addNotificationStmt->bindParam(':RECEIVERID', $RECEIVERID, PDO::PARAM_INT);
            $addNotificationStmt->execute();

            echo json_encode(array('status' => true, 'message' => $userName . ' đã like bài đăng của bạn.'));

        } else {
            // Xử lý khi không tìm thấy thông tin người dùng
            echo json_encode(array('status' => true, 'message' => 'Người dùng đã like bài đăng thành công.'));
        }


    } elseif ($action == '0') {
        if (!$existingLike) {
            echo json_encode(array('status' => false, 'message' => 'Bạn chưa like bài đăng này.'));
            exit;
        }

        // Xóa "like" từ cơ sở dữ liệu
        $deleteLikeQuery = "DELETE FROM likes WHERE userid = :userid AND postid = :postid";
        $deleteLikeStmt = $dbConn->prepare($deleteLikeQuery);
        $deleteLikeStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
        $deleteLikeStmt->bindParam(':postid', $postid, PDO::PARAM_INT);
        $deleteLikeStmt->execute();

        echo json_encode(array('status' => false, 'message' => 'Unlike bài đăng thành công.'));

        $updateLikesCountQuery = "UPDATE posts SET likes = likes - 1 WHERE ID = :postid";
        $updateLikesCountStmt = $dbConn->prepare($updateLikesCountQuery);
        $updateLikesCountStmt->bindParam(':postid', $postid, PDO::PARAM_INT);
        $updateLikesCountStmt->execute();
    }
} catch (Exception $e) {
    echo json_encode(array('status' => false, 'message' => $e->getMessage()));
}
?>