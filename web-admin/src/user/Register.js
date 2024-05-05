import React, { useState } from "react";
import AxiosInstance from "../../../web-admin/src/helper/Axiostance";

const Register = () => {
    const [email, setEmail] = useState(""); // State để lưu trữ giá trị của email
    const [password, setPassword] = useState(""); // State để lưu trữ giá trị của password
    const [passwordConfirm, setPasswordConfirm] = useState(""); // State để lưu trữ giá trị của mật khẩu xác nhận
    const [role, setRole] = useState(""); // State để lưu trữ giá trị của vai trò

    const handleRegister = async (e) => {
        e.preventDefault(); // Ngăn chặn sự kiện mặc định của form

        try {
            // Kiểm tra xem mật khẩu có khớp không
            if (password !== passwordConfirm) {
                alert("Password confirmation does not match!");
                return;
            }

            // Tạo body để gửi lên server
            const body = { email, password, password_confirm: passwordConfirm, role };

            // Gọi API để thực hiện đăng ký
            const instance = await AxiosInstance();
            const response = await instance.post("/register_admin.php", body);

            // Xử lý kết quả từ server
            if (response.status === true) {
                alert("Registration successful!");
                // Reset các trường input
                setEmail("");
                setPassword("");
                setPasswordConfirm("");
                setRole("");
                // Chuyển hướng đến trang đăng nhập
                window.location.href = "/login";
            } else {
                alert("Registration failed!");
            }
        } catch (error) {
            console.error("Error during registration: ", error);
            alert("An error occurred during registration!");
        }
    };

    return (
        <div className="container" style={{
            backgroundColor: 'purple',
            background: 'linear-gradient(to bottom, #3B21B7, #8B64DA, #D195EE, #CECBD3)',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{ width: '100%', maxWidth: '500px' }}> 
                <h2 style={{ color: 'white', fontSize: '3rem', fontWeight: 'bold', textAlign: 'center' }}>Register</h2> {/* Larger heading */}
                <form onSubmit={handleRegister} style={{ width: '100%' }}>
                    <div className="form-group">
                        <label style={{ fontSize: '1.2rem' }}>Email</label>
                        <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ fontSize: '1rem' }} />
                    </div>
                    <div className="form-group">
                        <label style={{ fontSize: '1.2rem' }}>Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ fontSize: '1rem' }} />
                    </div>
                    <div class="form-group">
                        <label style={{ fontSize: '1.2rem' }}>Confirm Password</label>
                        <input type="password" className="form-control" placeholder="Re-enter password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} required style={{ fontSize: '1rem' }} />
                    </div>
                    <div className="form-group">
                        <label style={{ fontSize: '1.2rem' }}>Role</label>
                        <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)} required style={{ fontSize: '1rem' }}>
                            <option value="">Select a role</option>
                            <option value="admin">Administrator</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ fontSize: '1.5rem' }}>Register</button> {/* Increased button size */}
                </form>
            </div>
        </div>
    );
};

export default Register;