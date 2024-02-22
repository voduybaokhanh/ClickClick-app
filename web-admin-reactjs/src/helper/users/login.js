import React, { useState } from "react";
import AxiosInstance from '../AxiosInstance';

const Login = (props) => {
    const { saveUser } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        try {
            const body = { email, password }
            const result = await AxiosInstance().post('login.php', body);
            console.log(result);
            if (result.data.status) {
                localStorage.setItem('token', result.data.token);
                saveUser(result.data.user);
            } else {
                alert("Đăng nhập thất bại");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1>Login</h1>
            <div className="form-group">
                <label>Email</label>
                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email" className="form-control" />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" className="form-control" />
            </div>
            <button onClick={login} type="button" className="btn btn-primary">Login</button>
        </div>
    );
}

export default Login;
