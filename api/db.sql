-- Active: 1699102041762@@127.0.0.1@3306

-- tạo database
CREATE DATABASE IF NOT EXISTS `DUAN`;
USE `DUAN`;

-- tạo bảng
CREATE TABLE IF NOT EXISTS `USERS` (
  `ID` int(255) NOT NULL AUTO_INCREMENT,
  `EMAIL` varchar(255) UNIQUE NOT NULL,
  `PASSWORD` varchar(255) NOT NULL,
  `NAME` varchar(255) NOT NULL,
  `ROLE` varchar(255) NOT NULL,
  `AVATAR` varchar(255) NOT NULL,
  `SDT` INTEGER(11) NOT NULL,
  PRIMARY KEY (`ID`)
);

-- thêm dữ liệu vào bảng User
INSERT INTO `USERS` (`ID`, `EMAIL`, `PASSWORD`, `NAME`, `ROLE`, `AVATAR`,`SDT`) VALUES
(1, 'admin@gmail.com', '123', 'Nguyen van a', 'admin', 'https://www.w3schools.com/howto/img_avatar.png',0778554734),
(2, 'binh@gmail.com', '123', 'Nguyen van b', 'user', 'https://www.w3schools.com/howto/img_avatar.png',0933774840),
(3, 'khang@gmail.com', '123', 'Nguyen van c', 'user', 'https://www.w3schools.com/howto/img_avatar.png',0907778450);

-- quên mật khẩu
CREATE TABLE IF NOT EXISTS `password_resets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `available` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET=utf8mb4;

