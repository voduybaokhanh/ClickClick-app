import React, { useState } from "react";
import AxiosInstance from "../../../web-admin/src/helper/Axiostance";
import { useHistory } from "react-router-dom";
import Login from "./Login";

const Register = () => {
    const [email, setEmail] = useState(""); // State để lưu trữ giá trị của email
    const [password, setPassword] = useState(""); // State để lưu trữ giá trị của password
    const [passwordConfirm, setPasswordConfirm] = useState(""); // State để lưu trữ giá trị của password confirm
    const [role, setRole] = useState(""); // State để lưu trữ giá trị của vai trò
    const history = useHistory();

    const handleRegister = async (e) => {
        e.preventDefault(); // Ngăn chặn sự kiện mặc định của form

        try {
            // Kiểm tra mật khẩu và mật khẩu xác nhận có khớp nhau không
            if (password !== passwordConfirm) {
                alert("Mật khẩu xác nhận không khớp!");
                return;
            }

            // Tạo object body để gửi lên server
            const body = { email, password, password_confirm: passwordConfirm, role };

            // Gọi API để thực hiện đăng ký
            const instance = await AxiosInstance();
            const response = await instance.post("/register_admin.php", body);

            // Kiểm tra kết quả từ server
            if (response.status === true) {
                alert("Đăng ký thành công!");
                // Reset các trường input
                setEmail("");
                setPassword("");
                setPasswordConfirm("");
                setRole("");
                //chuyen qua login
                history.push("/login");
            } else {
                alert("Đăng ký thất bại!");
            }
        } catch (error) {
            console.error("Lỗi khi thực hiện đăng ký: ", error);
            alert("Đã xảy ra lỗi khi thực hiện đăng ký!");
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" placeholder="Confirm password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Role</label>
                    <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)} required>
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Đăng Ký</button>
            </form>
        </div>
    );
};

export default Register;
