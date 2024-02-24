<?php
// FILEPATH: /D:/bt/GItHub/ClickClick-app/api/otp.php
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
//http://192.168.1.30:8686/getAllUsers.php
//import file connection.php
include_once './connection.php';

// đọc dữ liệu từ database
$sqlQuery = "SELECT * FROM USERS";
$stmt = $dbConn->prepare($sqlQuery);
$stmt->execute();
// Function to generate OTP
function generateOTP()
{
    $otp = rand(100000, 999999);
    return $otp;
}

// Function to send OTP via SMS
function sendOTP($phoneNumber, $otp)
{
    // Code to send OTP via SMS
    echo 'Code sent to your phone number :' . $phoneNumber . '<br>' .
        'Your OTP is :' . $otp;
}

// Check if phone number is valid
function isValidPhoneNumber($phoneNumber)
{
    // Code to validate phone number
    return true;
    // Replace this with your actual phone number validation code
    // Example: return preg_match('/^[0-9]{10}$/', $phoneNumber);
}

// Get the phone number from the request
$phoneNumber = $_POST['phone'];

// Check if the phone number is valid
if (isValidPhoneNumber($phoneNumber)) {
    // Generate OTP
    $otp = generateOTP();

    // Send OTP via SMS
    sendOTP($phoneNumber, $otp);

    // Return success response
    echo json_encode(['success' => true, 'message' => 'OTP sent successfully']);
} else {
    // Return error response
    echo json_encode(['success' => false, 'message' => 'Invalid phone number']);
}
