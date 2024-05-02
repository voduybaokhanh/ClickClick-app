<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './connection.php';

try {

    // Nhận dữ liệu từ yêu cầu
    $data = json_decode(file_get_contents("php://input"));

    // Kiểm tra đăng nhập
    if (!isset($data->SENDERID)) {
        echo json_encode(array('status' => false, 'message' => 'Please login.'));
        exit;
    }

    // Kiểm tra xem có RECEIVERID và content được gửi hay không
    if (!isset($data->RECEIVERID) || !isset($data->content)) {
        http_response_code(400);
        echo json_encode(array('status' => false, 'message' => 'Missing RECEIVERID or content parameter'));
        exit;
    }

    $SENDERID = $data->SENDERID;
    $RECEIVERID = $data->RECEIVERID;
    $content = $data->content;

    // Kiểm tra xem người bạn đã tồn tại hay chưa
    $checkFriendQuery = "SELECT * FROM users WHERE ID = :RECEIVERID";
    $checkFriendStmt = $dbConn->prepare($checkFriendQuery);
    $checkFriendStmt->bindParam(':RECEIVERID', $RECEIVERID, PDO::PARAM_INT);
    $checkFriendStmt->execute();
    $friend = $checkFriendStmt->fetch(PDO::FETCH_ASSOC);

    // Kiểm tra xem người bạn có phải là chính người dùng hiện tại hay không
    if ($RECEIVERID == $SENDERID) {
        throw new Exception('Can not message yourself');
    }

    if (!$friend) {
        echo json_encode(array('status' => false, 'message' => 'Friend does not exist.'));
        exit;
    }

    // Nếu có truyền vào postid, lấy thông tin bài đăng
    if (isset($data->postid)) {
        $postid = $data->postid;

        // Kiểm tra xem postid có tồn tại trong cơ sở dữ liệu hay không
        $checkPostQuery = "SELECT * FROM posts WHERE ID = :postid";
        $checkPostStmt = $dbConn->prepare($checkPostQuery);
        $checkPostStmt->bindParam(':postid', $postid, PDO::PARAM_INT);
        $checkPostStmt->execute();
        $existingPost = $checkPostStmt->fetch(PDO::FETCH_ASSOC);

        if (!$existingPost) {
            echo json_encode(array('status' => false, 'message' => 'Post does not exist.'));
            exit;
        }
    } else {
        $postid = null;
    }

    // Lưu trữ tin nhắn vào cơ sở dữ liệu
    $insertMessageQuery = "INSERT INTO CHATS (SENDERID, RECEIVERID, CONTENT, POSTID, TIME) VALUES (:SENDERID, :RECEIVERID, :content, :postid, NOW())";
    $insertMessageStmt = $dbConn->prepare($insertMessageQuery);
    $insertMessageStmt->bindParam(':SENDERID', $SENDERID, PDO::PARAM_INT);
    $insertMessageStmt->bindParam(':RECEIVERID', $RECEIVERID, PDO::PARAM_INT);
    $insertMessageStmt->bindParam(':content', $content, PDO::PARAM_STR);
    $insertMessageStmt->bindParam(':postid', $postid, PDO::PARAM_INT);
    $insertMessageStmt->execute();

    // Lấy thông tin bài đăng
    $postQuery = "SELECT content, image, name, time FROM posts WHERE ID = :postid";
    $postStmt = $dbConn->prepare($postQuery);
    $postStmt->bindParam(':postid', $postid, PDO::PARAM_INT);
    $postStmt->execute();
    $post = $postStmt->fetch(PDO::FETCH_ASSOC);

    if ($post === false) {
        $post = null;
    }
    

    // Truy vấn để lấy thông tin người dùng từ userid
    $getUserNameQuery = "SELECT NAME FROM users WHERE ID = :userid";
    $getUserNameStmt = $dbConn->prepare($getUserNameQuery);
    $getUserNameStmt->bindParam(':userid', $SENDERID, PDO::PARAM_INT); // Sử dụng $SENDERID thay vì $userid
    $getUserNameStmt->execute();
    $userName = $getUserNameStmt->fetch(PDO::FETCH_COLUMN);

    if ($userName) {
        // Thêm thông báo vào cơ sở dữ liệu
        $notificationContent = "$userName sent you a message.";
        $addNotificationQuery = "INSERT INTO notifications (userid, content, time,RECEIVERID) VALUES (:userid, :content, now(),:RECEIVERID)";
        $addNotificationStmt = $dbConn->prepare($addNotificationQuery);
        $addNotificationStmt->bindParam(':userid', $SENDERID, PDO::PARAM_INT); // Thông báo gửi cho người nhận
        $addNotificationStmt->bindParam(':content', $notificationContent, PDO::PARAM_STR);
        $addNotificationStmt->bindParam(':RECEIVERID', $RECEIVERID, PDO::PARAM_INT); // Thông báo gửi cho người nhận
        $addNotificationStmt->execute();

        echo json_encode(array('status' => true, 'message' => $userName . ' sent you a message. ', 'post' => $post));
    } else {
        // Xử lý khi không tìm thấy thông tin người dùng
        echo json_encode(array('status' => false, 'message' => 'Error'));
    }

} catch (Exception $e) {
    echo json_encode(array('status' => false, 'message' => $e->getMessage()));
}
?>
