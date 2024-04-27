<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST"); // Thay đổi từ GET sang POST
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './connection.php';

try {
    // Nhận dữ liệu từ yêu cầu POST
    $data = json_decode(file_get_contents("php://input"));

    // Kiểm tra xem có userid được gửi hay không
    if (!isset($data->SENDERID) || !isset($data->RECEIVERID)) {
        http_response_code(400);
        echo json_encode(array('status' => false, 'message' => 'Thiếu tham số SENDERID hoặc RECEIVERID'));
        exit;
    }

    $SENDERID = $data->SENDERID;
    $RECEIVERID = $data->RECEIVERID;

    // Truy vấn để lấy thông tin về cuộc trò chuyện
    $postQuery = "SELECT * FROM chats WHERE (SENDERID = :SENDERID AND RECEIVERID = :RECEIVERID) OR (SENDERID = :RECEIVERID AND RECEIVERID = :SENDERID) ORDER BY chats.time ASC";

    $postStmt = $dbConn->prepare($postQuery);
    $postStmt->bindParam(':SENDERID', $SENDERID, PDO::PARAM_INT);
    $postStmt->bindParam(':RECEIVERID', $RECEIVERID, PDO::PARAM_INT);
    $postStmt->execute();
    $chats = $postStmt->fetchAll(PDO::FETCH_ASSOC);

    // Duyệt qua từng cuộc trò chuyện để lấy hình ảnh từ bài đăng (nếu có)
    foreach ($chats as &$chat) {
        $POSTID = $chat['POSTID']; // Lấy POSTID từ cuộc trò chuyện
        if ($POSTID) {
            // Truy vấn để lấy hình ảnh từ bài đăng
            $getPostImageQuery = "SELECT image FROM posts WHERE ID = :POSTID";
            $getPostImageStmt = $dbConn->prepare($getPostImageQuery);
            $getPostImageStmt->bindParam(':POSTID', $POSTID, PDO::PARAM_INT);
            $getPostImageStmt->execute();
            $postImage = $getPostImageStmt->fetch(PDO::FETCH_ASSOC);

            // Nếu có hình ảnh, thêm vào dữ liệu cuộc trò chuyện
            if ($postImage) {
                $chat['POSTID'] = $postImage['image'];
            }
        }
    }

    echo json_encode(array('status' => true, 'chats' => $chats));
} catch (Exception $e) {
    echo json_encode(array('status' => false, 'message' => $e->getMessage()));
}
