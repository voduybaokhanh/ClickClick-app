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
    if (!isset($data->userid)) {
        echo json_encode(array('status' => false, 'message' => 'Vui lòng đăng nhập.'));
        exit;
    }

    // Kiểm tra xem có RECEIVERID và content được gửi hay không
    if (!isset($data->RECEIVERID) || !isset($data->content)) {
        http_response_code(400);
        echo json_encode(array('status' => false, 'message' => 'Thiếu tham số RECEIVERID hoặc content'));
        exit;
    }

    $SENDERID = $data->userid;
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
        throw new Exception('Không thể nhắn tin với chính bản thân.');
    }

    if (!$friend) {
        echo json_encode(array('status' => false, 'message' => 'Người bạn không tồn tại.'));
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
            echo json_encode(array('status' => false, 'message' => 'Bài đăng không tồn tại.'));
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

    echo json_encode(array('status' => true, 'message' => 'Tin nhắn đã được gửi.', 'post' => $post));

} catch (Exception $e) {
    echo json_encode(array('status' => false, 'message' => $e->getMessage()));
}
?>