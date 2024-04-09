<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './connection.php';


try {
    $userid = isset($_GET['userid']) ? $_GET['userid'] : -1;
    if($userid == -1 || !is_numeric($userid) ){
        throw new Exception('id không hợp lệ');
    }

    // Truy vấn để lấy thông tin người dùng
    $query_user = "SELECT * FROM USERS WHERE ID = :userid";
    $stmt_user = $dbConn ->prepare($query_user);
    $stmt_user->bindParam(":userid", $userid);
    $stmt_user->execute();
    $user = $stmt_user->fetch(PDO::FETCH_ASSOC);

    // Truy vấn để lấy danh sách bài viết của người dùng
    $query_posts = "SELECT * FROM POSTS WHERE USERID = :userid";
    $stmt_posts = $dbConn ->prepare($query_posts);
    $stmt_posts->bindParam(":userid", $userid);
    $stmt_posts->execute();
    $posts = $stmt_posts->fetchAll(PDO::FETCH_ASSOC);

    // Truy vấn để lấy danh sách bạn bè của người dùng
    $query_friends = "SELECT USERS.ID,USERS.NAME,USERS.EMAIL,USERS.AVATAR  FROM USERS INNER JOIN FRIENDSHIPS ON (USERS.ID = FRIENDSHIPS.FRIENDSHIPID) WHERE FRIENDSHIPS.USERID = :userid AND FRIENDSHIPS.STATUS = 'friend'";
    $stmt_friends = $dbConn ->prepare($query_friends);
    $stmt_friends->bindParam(":userid", $userid);
    $stmt_friends->execute();
    $friends = $stmt_friends->fetchAll(PDO::FETCH_ASSOC);

    // Tạo mảng kết quả
    $result = array(
        "status" => true,
        "user" => $user,
        "posts" => $posts,
        "friends" => $friends
    );

    // Trả về kết quả dưới dạng JSON
    echo json_encode($result);
} catch (Exception $e) {
    echo json_encode(array("status" => false, "message" => $e->getMessage()));
}
?>