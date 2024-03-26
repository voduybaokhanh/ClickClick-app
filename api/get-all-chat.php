<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './connection.php';

try {
    // Nhận dữ liệu từ yêu cầu
    $data = json_decode(file_get_contents("php://input"));

    // Kiểm tra xem có userid được gửi hay không
    if (!isset($data->SENDERID)) {
        http_response_code(400);
        echo json_encode(array('status' => false, 'message' => 'Thiếu tham số SENDERID'));
        exit;
    }

    // Kiểm tra xem có userid được gửi hay không
    if (!isset($data->RECEIVERID)) {
        http_response_code(400);
        echo json_encode(array('status' => false, 'message' => 'Thiếu tham số RECEIVERID'));
        exit;
    }

    $SENDERID = $data->SENDERID;
    $RECEIVERID = $data->RECEIVERID;

    // Truy vấn để lấy thông tin về cuộc trò chuyện
    $postQuery = "SELECT * FROM chats WHERE SENDERID = :SENDERID AND RECEIVERID = :RECEIVERID";
    $postStmt = $dbConn->prepare($postQuery);
    $postStmt->bindParam(':SENDERID', $SENDERID, PDO::PARAM_INT);
    $postStmt->bindParam(':RECEIVERID', $RECEIVERID, PDO::PARAM_INT);
    $postStmt->execute();
    $chats = $postStmt->fetchAll(PDO::FETCH_ASSOC);

    // Duyệt qua từng cuộc trò chuyện để lấy hình ảnh từ bài đăng (nếu có)
    foreach ($chats as &$chat) {
        $postid = $chat['postid']; // Lấy postid từ cuộc trò chuyện

        if ($postid) {
            // Truy vấn để lấy hình ảnh từ bài đăng
            $getPostImageQuery = "SELECT image FROM posts WHERE ID = :postid";
            $getPostImageStmt = $dbConn->prepare($getPostImageQuery);
            $getPostImageStmt->bindParam(':postid', $postid, PDO::PARAM_INT);
            $getPostImageStmt->execute();
            $postImage = $getPostImageStmt->fetch(PDO::FETCH_ASSOC);

            // Nếu có hình ảnh, thêm vào dữ liệu cuộc trò chuyện
            if ($postImage) {
                $chat['postid'] = $postImage['image'];
            }
        }
    }

    echo json_encode(array('status' => true, 'chats' => $chats));
} catch (Exception $e) {
    echo json_encode(array('status' => false, 'message' => $e->getMessage()));
}
?>
