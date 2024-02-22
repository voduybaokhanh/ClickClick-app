import React, { useState } from "react";
import AxiosInstance from "../helper/AxiosInstance";
import Register from "./Register";
const Login = (props) => {
    const {saveUser} = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        try {
            const body = { email, password }
            const result = await AxiosInstance().post('/login.php', body);
            console.log(result);
            if(result.status){
                // lưu token vào trong storage
                localStorage.setItem('token',result.token); 
                saveUser(result.user);
            }
            else{
                alert("đăng ký thất bại");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form>
            <div className="mb-3 mt-3">
                <label className="form-label">Email:</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)}
                    type="email" className="form-control"
                    placeholder="Enter email" name="email" />
            </div>
            <div className="mb-3">
                <label className="form-label">Password:</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)}
                    type="password" className="form-control"
                    placeholder="Enter password" name="pswd" />
            </div>
            <button onClick={login} type="button" className="btn btn-primary">Submit</button>
            <a href={`/register`} className="btn btn-primary">đăng ký</a>

        </form>
    )
}


export default Login;
