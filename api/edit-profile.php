<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './connection.php';

try {
    $decodedData = stripslashes(file_get_contents("php://input"));
    $data = json_decode($decodedData);

    if ($data === null || !isset($data->id) || !isset($data->name) || !isset($data->avatar) || !isset($data->sdt) || !isset($data->text)) {
        echo json_encode(
            array(
                "status" => false,
                "message" => "Thiếu dữ liệu bắt buộc"
            )
        );
        exit;
    }

    $id = $data->id;

    // Kiểm tra xem người dùng có tồn tại không
    $sqlQuery = "SELECT * FROM users WHERE id = :id";
    $stmt = $dbConn->prepare($sqlQuery);
    $stmt->bindParam(':id', $id, PDO::PARAM_STR);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode(
            array(
                "status" => false,
                "message" => "Người dùng không tồn tại"
            )
        );
        exit;
    }
      // Kiểm tra xem tên và số điện thoại đã tồn tại trong cơ sở dữ liệu chưa
      $sqlCheck = "SELECT * FROM users WHERE name = :name";
      $stmt = $dbConn->prepare($sqlCheck);
      $stmt->bindParam(':name', $name, PDO::PARAM_STR);
      $stmt->execute();
      $existingUser = $stmt->fetch(PDO::FETCH_ASSOC);
  
      if ($existingUser && $existingUser['id'] != $id) {
          echo json_encode(
              array(
                  "status" => false,
                  "message" => "Tên đã tồn tại"
              )
          );
          exit;
      }
          // Kiểm tra xem tên và số điện thoại đã tồn tại trong cơ sở dữ liệu chưa
          $sqlCheck = "SELECT * FROM users WHERE sdt = :sdt";
          $stmt = $dbConn->prepare($sqlCheck);
          $stmt->bindParam(':sdt', $sdt, PDO::PARAM_STR);
          $stmt->execute();
          $existingUser = $stmt->fetch(PDO::FETCH_ASSOC);
      
          if ($existingUser && $existingUser['id'] != $id) {
              echo json_encode(
                  array(
                      "status" => false,
                      "message" => "số điện thoại đã tồn tại"
                  )
              );
              exit;
          }

    // Cập nhật hồ sơ người dùng
    $sqlUpdate = "UPDATE users SET name = :name, avatar = :avatar, sdt = :sdt, text = :text WHERE id = :id";
    $stmt = $dbConn->prepare($sqlUpdate);
    $stmt->bindParam(':id', $id, PDO::PARAM_STR);
    $stmt->bindParam(':name', $data->name, PDO::PARAM_STR);
    $stmt->bindParam(':avatar', $data->avatar, PDO::PARAM_STR);
    $stmt->bindParam(':sdt', $data->sdt, PDO::PARAM_STR);
    $stmt->bindParam(':text', $data->text, PDO::PARAM_STR);
    $stmt->execute();

    echo json_encode(
        array(
            "status" => true,
            "message" => "Hồ sơ đã được cập nhật thành công"
        )
    );

} catch (Exception $e) {
    echo json_encode(
        array(
            "status" => false,
            "message" => $e->getMessage()
        )
    );
}
?>
