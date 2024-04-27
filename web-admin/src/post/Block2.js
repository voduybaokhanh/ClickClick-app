import React, { useState, useEffect } from "react";
import AxiosInstance from "../../../web-admin/src/helper/Axiostance";
import swal from 'sweetalert';

const Block = ({ saveUser }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const axiosInstance = await AxiosInstance();
            const response = await axiosInstance.get('/get-all-user-reported.php');
            if (response.status) {
                setPosts(response.reported_users);
            } else {
                throw new Error(response.msg);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            swal("Oops!", "Something went wrong while fetching data", "error");
        }
    }

    const toggleBlockStatus = async (userid, currentStatus) => {
        const action = currentStatus ? 'Mở khóa' : 'Khóa';
        const url = currentStatus ? '/unblock.php' : '/block.php';

        const confirmationMessage = currentStatus ? 'Xác nhận mở khóa tài khoản?' : 'Xác nhận khóa tài khoản?';
        const successMessage = currentStatus ? 'Mở khóa tài khoản thành công' : 'Khóa tài khoản thành công';

        swal({
            title: confirmationMessage,
            text: currentStatus ? "Mở khóa tài khoản!" : "Khóa tài khoản trong hệ thống!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willToggle) => {
            if (willToggle) {
                try {
                    const axiosInstance = await AxiosInstance();
                    const response = await axiosInstance.post(url, { userid });
                    if (response.status) {
                        swal(successMessage);
                        // Cập nhật trạng thái của người dùng trong mảng `posts`
                        setPosts(prevPosts => {
                            return prevPosts.map(item => {
                                if (item.USERID === userid) {
                                    return { ...item, Available: currentStatus ? 1 : 0 };
                                }
                                return item;
                            }).sort((a, b) => {
                                // Sắp xếp người dùng khóa lên đầu
                                return a.Available - b.Available || a.USERID - b.USERID;
                            });
                        });
                    } else {
                        swal(`Thất bại khi ${action} tài khoản`);
                    }
                } catch (error) {
                    console.error(`Error ${action}ing user:`, error);
                    swal(`Có lỗi trong quá trình ${action} tài khoản`);
                }
            }
        });
    }

    return (
        <div>
            <h1>Danh sách người dùng bị báo cáo</h1>
            <button className="btn btn-primary" onClick={() => { saveUser(null); fetchData(); }}>Đăng xuất và cập nhật</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Userid</th>
                        <th>Số lượng bài viết bị báo cáo</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((item, index) => (
                        <tr key={index}>
                            <td>{item.USERID}</td>
                            <td>{item.reported_count}</td>
                            <td>
                                {item.Available === 0 ? (
                                    <button className="btn btn-primary" onClick={() => toggleBlockStatus(item.USERID, true)}>
                                        Mở khóa
                                    </button>
                                ) : (
                                    <button className="btn btn-danger" onClick={() => toggleBlockStatus(item.USERID, false)}>
                                        Khóa
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Block;