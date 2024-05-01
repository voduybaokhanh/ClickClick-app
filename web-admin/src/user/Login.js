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
      const result = await instance.post("/login_admin.php", body);
      if (result.status) {
        saveUser(result.user); // Assuming user data is returned from the API as `result.user`
        alert("Login successful");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Failed to login: ", error);
    }
  };

  return (
    <div className="container" style={{
      backgroundColor: 'purple',
      background: 'linear-gradient(to bottom, #3B21B7, #8B64DA, #D195EE, #CECBD3)',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h2 style={{ color: 'white', fontSize: '3rem', fontWeight: 'bold', textAlign: 'center' }}>LOGIN</h2> {/* Increase font size */}
      <div style={{
        width: '100%', // Full width
        maxWidth: '500px', // Limit width to ensure it doesn't stretch too much
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <form style={{ width: '100%' }}> {/* Ensure form occupies full available width */}
          <div className="form-group">
            <label style={{ fontSize: '1.2rem' }}>Email</label> {/* Increase label font size */}
            <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ fontSize: '1rem' }} /> {/* Increase input font size */}
          </div>
          <div className="form-group">
            <label style={{ fontSize: '1.2rem' }}>Password</label> {/* Increase label font size */}
            <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ fontSize: '1rem' }} /> {/* Increase input font size */}
          </div>
          <button onClick={actionLogin} type="button" className="btn btn-success" style={{ fontSize: '1.5rem' }}>SUBMIT</button> {/* Increase button font size */}
          <a href="/Register" className="btn btn-link" style={{ fontSize: '1.2rem' }}>SIGN UP</a> {/* Increase link font size */}
        </form>
      </div>
    </div>
  );
};

export default Login;
