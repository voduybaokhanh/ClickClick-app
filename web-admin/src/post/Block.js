import React, { useState, useEffect } from "react";
import AxiosInstance from "../../../web-admin/src/helper/Axiostance"; // Đảm bảo đường dẫn và tên tệp đúng
import swal from 'sweetalert';

const Block = ({ saveUser }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const axiosInstance = await AxiosInstance();
            const response = await axiosInstance.get('/get-all-report.php');
            if (response.status) {
                const sortedPosts = response.posts.sort((a, b) => new Date(b.TIME) - new Date(a.TIME));
                console.log(sortedPosts);
                const users = {};
                sortedPosts.forEach(post => {
                    const userid = post.userid;
                    if (!users[userid]) {
                        users[userid] = 1;

                    } else {
                        users[userid]++;
                    }
                });
                const postsWithReportCount = sortedPosts.map(post => ({
                    ...post,
                    reportedPostsCount: users[post.userid] || 0
                }));
                setPosts(postsWithReportCount);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            swal("Oops!", "Something went wrong while fetching data", "error");
        }
    }

    const handleBlock = async (userid) => {
        swal({
            title: "Xác nhận khóa tài khoản?",
            text: "Khóa tài khoản trong hệ thống!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willBlock) => {
            if (willBlock) {
                try {
                    const axiosInstance = await AxiosInstance();
                    const response = await axiosInstance.post('/block.php', { userid }); // Gửi dữ liệu dưới dạng JSON
                    console.log(response);
                    if (response.status) { // Lấy dữ liệu từ response.data
                        swal('Khóa tài khoản thành công');
                    } else {
                        swal('Khóa tài khoản thất bại');
                    }
                } catch (error) {
                    console.error('Error blocking user:', error);
                    swal('Có lỗi trong quá trình khóa tài khoản');
                }
            }
        });
    }

    const handleUnBlock = async (userid) => {
        swal({
            title: "Xác nhận mở khóa tài khoản?",
            text: "Mở khóa tài khoản!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willUnBlock) => {
            if (willUnBlock) {
                try {
                    const axiosInstance = await AxiosInstance();
                    const response = await axiosInstance.post('/unblock.php', { userid }); // Gửi dữ liệu dưới dạng JSON
                    console.log("userid " + userid); //
                    console.log("response " + response); //
                    if (response.status) {
                        swal('Mở khóa tài khoản thành công');
                    } else {
                        swal('Mở khóa tài khoản thất bại');
                    }
                } catch (error) {
                    console.error('Có lỗi trong quá trình mở khóa tài khoản:', error);
                }
            }
        });
    }


    return (
        <div>
            <h1>Danh sách người dùng bị báo cáo</h1>
            <button className="btn btn-primary" onClick={() => saveUser(null)}>Đăng xuất</button>
            <a href="/block2" className="btn btn-warning">Chuyển đến block2</a>
            <table className="table">
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Ảnh đại diện</th>
                        <th>Số lượng bài viết bị báo cáo</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((item, index) => (
                        <tr key={item.ID}>
                            <td>{item.NAME}</td>
                            <td style={{ maxWidth: "15px", maxHeight: "15px" }}>
                                <img src={item.AVATAR} style={{ maxWidth: "100%", height: "auto" }} />
                            </td>
                            <td>{item.reportedPostsCount}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => handleUnBlock(item.ID)}>Mở khóa</button>
                                <button className="btn btn-danger" onClick={() => handleBlock(item.ID)}>Khóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Block;
