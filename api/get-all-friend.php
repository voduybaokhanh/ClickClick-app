<?php
// get-friendship.php
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
    if (!isset($data->userid)) {
        http_response_code(400);
        echo json_encode(array('status' => false, 'message' => 'Thiếu tham số userid'));
        exit;
    }

    $userid = $data->userid;

    // Truy vấn để lấy thông tin về mối quan hệ có trạng thái "friend" dựa trên userid
    $getFriendshipsQuery = "SELECT * FROM friendships WHERE userid = :userid AND status = 'friend'";
    $getFriendshipsStmt = $dbConn->prepare($getFriendshipsQuery);
    $getFriendshipsStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
    $getFriendshipsStmt->execute();
    $friendships = $getFriendshipsStmt->fetchAll(PDO::FETCH_ASSOC);

    $friendNames = array();
    foreach ($friendships as $friendship) {
        $friendshipid = $friendship["FRIENDSHIPID"]; // Sửa tên cột thành friendshipid

        // Truy vấn để lấy tin nhắn gần nhất dựa trên userid và FRIENDSHIPID
        $getLastMessageQuery = "SELECT CONTENT FROM chats WHERE (senderid = :userid AND receiverid = :FRIENDSHIPID) OR (senderid = :FRIENDSHIPID AND receiverid = :userid) ORDER BY TIME DESC LIMIT 1";
        $getLastMessageStmt = $dbConn->prepare($getLastMessageQuery);
        $getLastMessageStmt->bindParam(':userid', $userid, PDO::PARAM_INT);
        $getLastMessageStmt->bindParam(':FRIENDSHIPID', $friendshipid, PDO::PARAM_INT);
        $getLastMessageStmt->execute();
        $lastMessage = $getLastMessageStmt->fetch(PDO::FETCH_ASSOC);

        // Truy vấn để lấy tên của người bạn dựa trên friendshipid
        $getFriendNameQuery = "SELECT id,name, AVATAR FROM users WHERE id = :FRIENDSHIPID"; // Sửa tên cột thành userid
        $getFriendNameStmt = $dbConn->prepare($getFriendNameQuery);
        $getFriendNameStmt->bindParam(':FRIENDSHIPID', $friendshipid, PDO::PARAM_INT);
        $getFriendNameStmt->execute();
        $friendName = $getFriendNameStmt->fetch(PDO::FETCH_ASSOC);

        // Thêm tên của người bạn vào mảng
        if ($friendName) {
            $friendNames[] = array(
                "name" => $friendName["name"],
                "avatar" => $friendName["AVATAR"],
                "lastMessage" => $lastMessage,
                "friendshipid" => $friendshipid
            );
        }
    }

    // Trả về friendNames theo index
    echo json_encode(array('status' => true, 'friendships' => $friendships, 'friendName' => array_values($friendNames)));

} catch (Exception $e) {
    echo json_encode(array('status' => false, 'message' => $e->getMessage()));
}
?>
