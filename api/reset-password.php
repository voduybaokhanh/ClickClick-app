<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// http://172.16.117.36:8686/reset-password.php
// đọc otp, password, password_confirm từ body
// đặt lại mật khẩu
try {
    include_once './connection.php';
    $data = json_decode(file_get_contents("php://input"));
    // $email = $data->email;
    $password = $data->password;
    $password_confirm = $data->password_confirm;
    $otp = $data->otp;
    // kiểm tra password và password_confirm có giống nhau hay k

    if($password != $password_confirm){
        echo json_encode(array(
        "status" => false,
        "error" => "Password and Password confirmation are not the same"
        ));
        return;
    }
  
    $sqlQuery = "SELECT * FROM users WHERE  otp = :otp";
    $stmt = $dbConn->prepare($sqlQuery);
    $stmt->bindParam(':otp', $data->otp, PDO::PARAM_STR);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user) {
        // Nếu đã xác nhận, tiếp tục với cập nhật thông tin
        $sqlUpdate = "UPDATE users SET password = :password WHERE otp = :otp";
        $stmtUpdate = $dbConn->prepare($sqlUpdate);
        $stmtUpdate->bindParam(':password', $data->password, PDO::PARAM_STR);
        $stmtUpdate->bindParam(':otp', $data->otp, PDO::PARAM_STR);
        $stmtUpdate->execute();

        echo json_encode(
            array(
                "status" => true,
                "message" => "Cập nhật mật khẩu thành công"
            )
        );
    } else {
        // Nếu chưa xác nhận, thông báo lỗi
        echo json_encode(
            array(
                "status" => false,
                "message" => "Mã OTP chưa được xác nhận"
            )
        );
    }
} catch (\Throwable $th) {
    echo json_encode(array(
        "status" => false,
        "error" => $th->getMessage()
    ));
}