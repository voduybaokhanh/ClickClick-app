<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// http://192.168.1.28:8686/register.php
include_once './connection.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/helpers/PHPMailer-master/src/PHPMailer.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/helpers/PHPMailer-master/src/SMTP.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/helpers/PHPMailer-master/src/Exception.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

function generateOTP()
{
    return rand(100000, 999999);
}

try {
    $decodedData = stripslashes(file_get_contents("php://input"));
    $data = json_decode($decodedData);

    if ($data === null || !isset($data->email) || !isset($data->name) || !isset($data->password) || !isset($data->password_confirm)) {
        echo json_encode(
            array(
                "status" => false,
                "message" => "Dữ liệu JSON không hợp lệ"
            )
        );
        exit;
    }

    $email = $data->email;
    $name = $data->name;
    $password = $data->password;
    $password_confirm = $data->password_confirm;

    // so sánh password và confirm password
    if ($password != $password_confirm) {
        echo json_encode(
            array(
                "status" => false,
                "message" => "Mật khẩu không khớp"
            )
        );
        return;
    }

    // kiểm tra email đã tồn tại chưa 
    $sqlQuery = "SELECT * FROM users WHERE email = :email";
    $stmt = $dbConn->prepare($sqlQuery);
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($user) {
        echo json_encode(
            array(
                "status" => false,
                "message" => "Email đã tồn tại"
            )
        );
        return;
    }

    // thêm dữ liệu vào db
    $sqlQuery = "INSERT INTO users(email, password, name) VALUES (:email, :password, :name)";
    $stmt = $dbConn->prepare($sqlQuery);
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->bindParam(':password', $password, PDO::PARAM_STR);
    $stmt->bindParam(':name', $name, PDO::PARAM_STR);
    $stmt->execute();

    // Đăng ký thành công, tạo mã OTP và lưu vào CSDL
    $otp = generateOTP();
    $expirationTime = time() + 300; // Mã OTP hết hạn sau 5 phút
    // Lưu thông tin OTP vào CSDL (bạn cần thêm code cho phần này)

    // Gửi email với mã OTP
    try {
        $mail = new PHPMailer();
        $mail->CharSet = "utf-8";
        $mail->SMTPAuth = true;
        $mail->isSMTP();
        $mail->SMTPAuth = true;
        $mail->Username = "ThanhBinhoke";
        $mail->Password = "dfzkzeeyxgfmabub"; // Thay bằng mật khẩu email của bạn
        $mail->SMTPSecure = "ssl";
        $mail->Host = "ssl://smtp.gmail.com";
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = "465";
        $mail->From = "Thanhbinhoke@gmail.com";
        $mail->FromName =  "Đỗ Thanh Bình
        ";
        $mail->addAddress($email, $name);
        $mail->Subject = "Register";
        $mail->isHTML(true);
        $mail->Subject = 'Xác nhận đăng ký - Mã OTP';
        $mail->Body = 'Mã OTP của bạn là: ' . $otp;

        $mail->send();

        echo json_encode(
            array(
                "otp" => $otp,
                "status" => true,
                "message" => "Đăng ký thành công. Mã OTP đã được gửi đến địa chỉ email của bạn."
            )
        );
    } catch (Exception $e) {
        echo json_encode(
            array(
                "status" => false,
                "message" => "Đăng ký thành công, nhưng không thể gửi mã OTP. Lỗi: {$mail->ErrorInfo}"
            )
        );
    }
} catch (Exception $e) {
    echo json_encode(
        array(
            "status" => false,
            "message" => $e->getMessage()
        )
    );
}
