import React, { useState, useEffect } from "react";
import AxiosInstance from "../AxiosInstance";
import { useSearchParams } from "react-router-dom";

const ResetPassword = () => {
    // Lấy 2 query param là token và email từ url
    const [params, setParams] = useSearchParams();
    const [email, setEmail] = useState(params.get('email'));
    const [token, setToken] = useState(params.get('token')); // Thêm state cho token
    const [password, setPassword] = useState('');
    const [password_confirmation, setPassword_confirmation] = useState('');
    console.log(email);

    const [isValid, setisValid] = useState(false);

    // Check token và email có hợp lệ hay không
    // useEffect(() => {
    //     const checkToken = async () => {
    //         try {
    //             const body = {
    //                 email: email
    //             }
    //             const response = await AxiosInstance()
    //                 .post('....../api/check-token.php', body);
    //             setisValid(response.status);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     checkToken();
    // }, [email]);

    const handleResetPassword = async () => {
        try {
            const body = {
                email: email,
                password: password,
                password_confirmation: password_confirmation
            }
            const response = await AxiosInstance().post(`./api/reset-password.php`, body);
            console.log(response);
            alert('Đổi mật khẩu thành công');
            window.location.href = "/";
        } catch (error) {
            console.log(error);
        }
    }

    // Nếu token và email hợp lệ thì hiển thị form đổi mật khẩu
    if (!email || !token || !isValid) { // Thêm token vào điều kiện kiểm tra
        return (
            <div>
                <h1>404</h1>
            </div>
        )
    }

    return (
        <div>
            <h1>Reset Password</h1>
            <form>
                <div className="form-group">
                    <label>New Password</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" className="form-control" />
                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                        value={password_confirmation}
                        onChange={(e) => setPassword_confirmation(e.target.value)}
                        type="password" className="form-control" />
                </div>
                <button onClick={handleResetPassword} type="button" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )

}
export default ResetPassword;
