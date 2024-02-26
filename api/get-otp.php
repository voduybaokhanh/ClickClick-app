<?php
header("Content-Type: application/json; charset=UTF-8");
include_once './connection.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/helpers/PHPMailer-master/src/PHPMailer.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/helpers/PHPMailer-master/src/SMTP.php';
include_once $_SERVER['DOCUMENT_ROOT'] . '/helpers/PHPMailer-master/src/Exception.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

// lấy otp
function generateOTP()
{
    return rand(100000, 999999);
}

try {
    $data = json_decode(file_get_contents("php://input"));
    $email = $data->email;

    // kiểm tra email đã tồn tại chưa 
    $sqlQuery = "SELECT * FROM users WHERE email = '$email'";
    $stmt = $dbConn->prepare($sqlQuery); // Thêm dòng này để khai báo $stmt
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    // Nếu email đã tồn tại, bạn có thể cập nhật OTP hiện tại hoặc tạo một OTP mới tùy thuộc vào yêu cầu cụ thể của bạn.
    $otp = generateOTP();
    $expirationTime = time() + 300; // Mã OTP hết hạn sau 5 phút
    // Cập nhật thông tin OTP của người dùng hiện tại trong cơ sở dữ liệu
    // (bạn cần thêm mã cho phần này)

    // Đăng ký thành công

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
        $mail->FromName = "Đỗ Thanh Bình";

        $mail->addAddress($email, "hello");
        $mail->Subject = 'Xác nhận đăng ký - Mã OTP';
        $otp = generateOTP();
        $mail->Body = 'Mã OTP của bạn là: ' . $otp;
        $mail->send();

        $expirationTime = time() + 300; // Mã OTP hết hạn sau 5 phút

        if ($user) {
            // Nếu email đã tồn tại, cập nhật mã OTP và thời gian hết hạn
            $updateQuery = "UPDATE users SET otp = :otp, otp_expiration = :expiration WHERE email = :email";
            $updateStmt = $dbConn->prepare($updateQuery);
            $updateStmt->bindParam(':otp', $otp, PDO::PARAM_STR);
            $updateStmt->bindParam(':expiration', $expirationTime, PDO::PARAM_INT);
            $updateStmt->bindParam(':email', $email, PDO::PARAM_STR);
            $updateStmt->execute();
            echo json_encode(
                array(
                    "status" => true,
                    "message" => "email đã tồn tại cập nhật otp gửi mã thành công!",
                    "otp" => $otp
                )
            );
        } else {
            // Nếu email chưa tồn tại, thêm mới người dùng với mã OTP và thời gian hết hạn
            $insertQuery = "INSERT INTO users (email, otp, otp_expiration) VALUES (:email, :otp, :expiration)";
            $insertStmt = $dbConn->prepare($insertQuery);
            $insertStmt->bindParam(':email', $email, PDO::PARAM_STR);
            $insertStmt->bindParam(':otp', $otp, PDO::PARAM_STR);
            $insertStmt->bindParam(':expiration', $expirationTime, PDO::PARAM_INT);
            $insertStmt->execute();
            echo json_encode(
                array(
                    "status" => true,
                    "message" => "gửi mã thành công!",
                    "otp" => $otp
                )
            );
        }
    } catch (Exception $e) {
        echo json_encode(
            array(
                "status" => false,
                "message" => "Đăng ký thành công, nhưng không thể gửi mã OTP. Lỗi: {$mail->ErrorInfo}"
            )
        );
    }
} catch (Exception $e) {
    echo json_encode(array("message" => "lấy otp thất bại."));
    echo json_encode(
        array(
            "status" => false,
            "message" => $e->getMessage()
        )
    );
}
?>