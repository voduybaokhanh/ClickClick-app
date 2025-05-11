# ClickClick - Ứng dụng Mạng xã hội

ClickClick là một ứng dụng mạng xã hội di động được phát triển bằng React Native và Expo, kết hợp với backend PHP và MySQL. Ứng dụng cho phép người dùng đăng ký, đăng nhập, đăng bài viết, kết bạn, nhắn tin và tương tác với nhau.

## Tác giả

- **Võ Duy Bảo Khánh** - _Phát triển chính_ - [GitHub](https://github.com/voduybaokhanh)

## Tính năng chính

### Người dùng

- Đăng ký tài khoản với xác thực OTP
- Đăng nhập
- Quên mật khẩu và đặt lại mật khẩu
- Chỉnh sửa thông tin cá nhân
- Tìm kiếm và kết bạn với người dùng khác

### Bài viết

- Đăng bài viết với nội dung và hình ảnh
- Xem bài viết của bạn bè hoặc tất cả người dùng
- Thích và bình luận bài viết
- Xóa bài viết của mình

### Tương tác xã hội

- Gửi và nhận lời mời kết bạn
- Nhắn tin trực tiếp với bạn bè
- Nhận thông báo về các hoạt động

### Quản trị viên

- Giao diện web riêng cho quản trị viên
- Quản lý người dùng và bài viết
- Chặn người dùng vi phạm

## Công nghệ sử dụng

### Frontend Mobile

- React Native
- Expo
- React Navigation
- Axios
- AsyncStorage
- Linear Gradient

### Frontend Web (Admin)

- React.js
- React Router
- Bootstrap

### Backend

- PHP
- MySQL
- JWT (JSON Web Tokens)
- PHPMailer

## Cấu trúc dự án

```
ClickClick-app/
├── api/                  # Backend PHP API
│   ├── connection.php    # Kết nối cơ sở dữ liệu
│   ├── helpers/          # Các hàm trợ giúp (JWT, PHPMailer)
│   └── ...               # Các API endpoint
├── assets/               # Tài nguyên ứng dụng
├── components/           # Các component React Native tái sử dụng
├── helper/               # Các hàm trợ giúp frontend
├── Image/                # Hình ảnh và icon
├── Screen/               # Các màn hình ứng dụng
│   ├── BottomTab/        # Các tab chính (Home, Profile, AddPost...)
│   └── user/             # Màn hình liên quan đến người dùng
├── web-admin/            # Ứng dụng web cho quản trị viên
│   ├── public/
│   └── src/
├── App.js                # Component chính của ứng dụng
├── app.json              # Cấu hình Expo
├── db.sql                # Cấu trúc cơ sở dữ liệu
└── package.json          # Cấu hình npm và dependencies
```

## Cài đặt và chạy ứng dụng

### Yêu cầu

- Node.js và npm
- Expo CLI
- XAMPP hoặc môi trường PHP/MySQL tương tự

### Cài đặt ứng dụng di động

1. Clone repository:

   ```
   git clone https://github.com/Phong908/ClickClick-app.git
   cd ClickClick-app
   ```

2. Cài đặt dependencies:

   ```
   npm install
   ```

3. Chạy ứng dụng:

   ```
   npm start
   ```

4. Sử dụng Expo Go trên thiết bị di động hoặc máy ảo để chạy ứng dụng

### Cài đặt ứng dụng web admin

1. Di chuyển vào thư mục web-admin:

   ```
   cd web-admin
   ```

2. Cài đặt dependencies:

   ```
   npm install
   ```

3. Chạy ứng dụng web:
   ```
   npm start
   ```

### Cài đặt backend

1. Cài đặt XAMPP hoặc môi trường PHP/MySQL tương tự
2. Khởi động Apache và MySQL
3. Tạo cơ sở dữ liệu bằng cách import file `db.sql`
4. Cấu hình kết nối cơ sở dữ liệu trong file `api/connection.php`
5. Đặt thư mục `api` vào thư mục htdocs của XAMPP

## Cấu hình

- Cấu hình kết nối API trong `helper/Axiostance.js`
- Cấu hình cơ sở dữ liệu trong `api/connection.php`

## Đóng góp

Mọi đóng góp đều được chào đón. Vui lòng tạo issue hoặc pull request để đóng góp vào dự án.

## Liên hệ

Nếu bạn có bất kỳ câu hỏi hoặc góp ý nào, vui lòng liên hệ với chúng tôi qua email hoặc tạo issue trên GitHub.

## Giấy phép

© 2024 ClickClick. Bản quyền thuộc về các tác giả.
