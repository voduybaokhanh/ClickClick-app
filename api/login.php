<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './connection.php';
include_once './../api/helpers/jwt.php';
// đăng nhập

try {
    $data = json_decode(file_get_contents("php://input"));
    $email = $data->email;
    $password = $data->password;

    // Use a question mark as a placeholder instead of emaild placeholders
    $sqlQuery = "SELECT ID, email, password FROM users WHERE email = ?";
    $stmt = $dbConn->prepare($sqlQuery);
    $stmt->bindParam(1, $email, PDO::PARAM_STR);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);


    if ($email === $user["email"] && $password === $user["password"]) {
        echo json_encode(
            array(      
                    "status" => true,
                    "user" => array(
                        "id" => $user["ID"],
                        "email"=> $user["email"],
                    )
                )
                    );
    } else {
        echo json_encode(
            array(
                "status" => false,

                "message" => "sai rồi kiểm tra lại"
            )
        );
    }
} catch (Exception $e) {
    echo json_encode(
        array(
            "status" => false,
            "error" => "Authentication failed. Please try again."
        )
    );
}
?>