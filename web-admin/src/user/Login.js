import React, { useState } from "react";
import AxiosInstance from "../../../web-admin/src/helper/Axiostance";
import { Link } from 'react-router-dom';

const Login = (props) => {
  const { saveUser } = props;
  const [email, setEmail] = useState(""); // State để lưu trữ giá trị của email
  const [password, setPassword] = useState(""); // State để lưu trữ giá trị của password
  const actionLogin = async () => {
    try {
      const body = { email, password };
      const instance = await AxiosInstance();
      const result = await instance.post("/login_admin.php", body)
      if (result.status) {
        // Lưu thông tin người dùng vào localStorage
        saveUser(result.user); // Assumed that user data is returned from the API as result.data
        alert("Đăng nhập thành công");
      } else {
        alert("Đăng nhập thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi thực hiện đăng nhập: ", error);
    }
  };

  return (
    <div>
      <h2>Đăng nhập</h2>
      <form>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" placeholder="Nhập email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Mật khẩu</label>
          <input type="password" className="form-control" placeholder="Nhập mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button onClick={actionLogin} type="button" className="btn btn-primary btn-block">Xác nhận</button>
        <button>
          <Link type="button" className="btn btn-primary btn-block" to="/Register">Đăng ký</Link>
        </button>

      </form>
    </div>
  );
};

export default Login;
