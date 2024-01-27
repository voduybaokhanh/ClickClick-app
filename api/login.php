<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './connection.php';
include_once './../api/helpers/jwt.php';

try {
    $data = json_decode(file_get_contents("php://input"));
    $name = $data->name;
    $password = $data->password;

    // Use a question mark as a placeholder instead of named placeholders
    $sqlQuery = "SELECT ID, name, password FROM users WHERE name = ?";
    $stmt = $dbConn->prepare($sqlQuery);
    $stmt->bindParam(1, $name, PDO::PARAM_STR);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);


    if ($name === $user["name"] && $password === $user["password"]) {
        echo json_encode(
            array(
                "status" => true,
                "data" => array(
                    "id" => $user["ID"],
                    "name" => $user["name"],
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