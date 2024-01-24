<?php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once './connection.php';
//http://192.168.1.30:8686/get-user-id.php?id=1
$id = $_GET['id']; 
$sqlQuery = "SELECT id, email, password, name, role , avatar,sdt FROM users WHERE id = $id";
$stmt = $dbConn -> prepare($sqlQuery);
$stmt -> execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);
echo json_encode($user);
?>

