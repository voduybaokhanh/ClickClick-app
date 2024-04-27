<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Include the database connection
include_once './connection.php';

try {
    $decodedData = stripslashes(file_get_contents("php://input"));
    $data = json_decode($decodedData);

    if ($data === null  || !isset($data->email) || !isset($data->password) || !isset($data->password_confirm) || !isset($data->role)) {
        echo json_encode(
            array(
                "status" => false,
                "message" => "Invalid JSON data"
            )
        );
        exit;
    }

    // Check if email already exists
    $sqlQuery = "SELECT * FROM users WHERE email = :email";
    $stmt = $dbConn->prepare($sqlQuery);
    $stmt->bindParam(':email', $data->email, PDO::PARAM_STR);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($user) {
        echo json_encode(
            array(
                "status" => false,
                "message" => "Email already exists"
            )
        );
        return;
    }

    // Compare password and confirm password
    if ($data->password != $data->password_confirm) {
        echo json_encode(
            array(
                "status" => false,
                "message" => "Passwords do not match"
            )
        );
        return;
    }

    // Insert user data into the database
    $email = $data->email;
    $password = $data->password;
    $role = $data->role;

    $sqlInsert = "INSERT INTO users (email, password, role) VALUES (:email, :password, :role)";
    $stmtInsert = $dbConn->prepare($sqlInsert);
    $stmtInsert->bindParam(':email', $email, PDO::PARAM_STR);
    $stmtInsert->bindParam(':password', $password, PDO::PARAM_STR);
    $stmtInsert->bindParam(':role', $role, PDO::PARAM_STR);
    $stmtInsert->execute();

    echo json_encode(
        array(
            "status" => true,
            "message" => "Registration successful"
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
