import React from "react";
import AxiosInstance from "../../helper/Axiostance";

const Login = (props) => {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleLogin = async () => {
        try {
            const axiosInstance = await AxiosInstance();

            console.log(response);
        } catch (error) {
            console.error('Lỗi khi đăng nhập: ', error);
        }
    };

    return (
        <div>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Đăng nhập</button>
        </div>
    );
}