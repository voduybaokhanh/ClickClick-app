import React, { useState } from "react";
import AxiosInstance from "../../../web-admin/src/helper/Axiostance";

const Login = (props) => {
  const { saveUser } = props;
  const [email, setEmail] = useState(""); // State để lưu trữ giá trị của email
  const [password, setPassword] = useState(""); // State để lưu trữ giá trị của password
  const actionLogin = async () => {
    try {
      const body = { email, password };
      const instance = await AxiosInstance();
      const result = await instance.post("/login.php", body);
      if (result.status) {
        // Kiểm tra vai trò của người dùng sau khi đăng nhập thành công
        if (result.role === "admin") {
          // Nếu là admin, lưu thông tin người dùng vào state và chuyển hướng tới trang admin
          saveUser(result);
          alert("Đăng nhập thành công");
          // Chuyển hướng tới trang admin
          // window.location.href = "/admin";
        } else {
          // Nếu không phải admin, thông báo lỗi và không lưu thông tin người dùng
          alert("Bạn không có quyền truy cập vào trang này");
        }
      } else {
        alert("Đăng nhập thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi thực hiện đăng nhập: ", error);
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" placeholder="Enter name" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button onClick={actionLogin} type="button" className="btn btn-primary btn-block">Submit</button>
      </form>
    </div>
  );
};

export default Login;
