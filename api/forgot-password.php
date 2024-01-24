<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

use PHPMailer\PHPMailer\PHPMailer;

include_once $_SERVER['DOCUMENT_ROOT'] . '/helpers/PHPMailer-master/src/PHPMailer.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/helpers/PHPMailer-master/src/SMTP.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/helpers/PHPMailer-master/src/Exception.php';


// http://192.168.1.33:8686/forgot-password.php
// quên mật khẩu
// import connection.php
include_once './connection.php';
try {
    //đọc email từ body
    $data = json_decode(file_get_contents("php://input"));
    $email = $data->email;

    // kiểm tra có email có trong db hay k?
    $sqlQuery = "SELECT id FROM users WHERE email ='$email'";
    $stmt = $dbConn->prepare($sqlQuery);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    if($result){
        // nếu có email trong db thì gửi email
        // send email otp
        // gửi email có link reset mật khẩu
        $link = "<a href='http://127.0.0.1:3000/reset-password?email="
            . $email . "'>Click to reset password</a>";
        $mail = new PHPMailer();
        $mail->CharSet = "utf-8";
        $mail->isSMTP();
        $mail->SMTPAuth = true;
        $mail->Username = "ThanhBinhoke";
        $mail->Password = "dfzkzeeyxgfmabub";
        $mail->SMTPSecure = "ssl";
        $mail->Host = "ssl://smtp.gmail.com";
        $mail->Port = "465";
        $mail->From = "Thanhbinhoke@gmail.com";
        $mail->FromName =  "Đỗ Thanh Bình
        ";
        $mail->addAddress($email, 'Hello');
        $mail->Subject = "Reset Password";
        $mail->isHTML(true);
        $mail->Body = "Click on this link to reset password " . $link . " ";
        $res = $mail->Send();
        if ($res) {
            echo json_encode(array(
                "message" => "Email sent.",
                "status" => true
            ));
        } else {
            echo json_encode(array(
                "message" => "Email sent failed.",
                "status" => false
            ));
        }
    }
    else{
        // nếu không có email trong db thì trả về thông báo
        echo json_encode(array(
            "status" => false,
            "message"=>"Email Không tồn tại."));
    }
}  catch (Exception $e) {
    echo json_encode(array("message"=>"thêm mới danh mục thất bại."));
    echo json_encode(array(
        "status" => false,
        "message"=>$e->getMessage()
    ));
}