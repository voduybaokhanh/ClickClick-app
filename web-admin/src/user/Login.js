import React, { useState } from "react";
import AxiosInstance from "../helper/Axiostance";

const Login = (props) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const body = { name, password };
            const result = await AxiosInstance().post('/login.php', body);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form>
                <div className="form-group">
                    <label>Name</label>
                    <input type="name" className="form-control" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button onClick={handleLogin} type="button" className="btn btn-primary btn-block">Submit</button>
            </form>
        </div>
    );
};

export default Login;
