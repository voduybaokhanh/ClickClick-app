import React, { useState, useEffect } from "react";
import AxiosInstance from "../../../web-admin/src/helper/Axiostance"; // Đảm bảo rằng đường dẫn và tên file đúng
import swal from 'sweetalert';

const List = ({ saveUser }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const axiosInstance = await AxiosInstance();
            const response = await axiosInstance.get('/get-all-report.php');
            if (response.status) {
                // sắp xếp theo thời gian mới nhất
                const sortedPosts = response.posts.sort((a, b) => new Date(b.TIME) - new Date(a.TIME));
                setPosts(sortedPosts);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            swal("Oops!", "Something went wrong while fetching data", "error");
        }
    }

    const handleDelete = async (ID) => { // Thay đổi tham số từ ID thành postid
        swal({
            title: "Xác nhận xóa?",
            text: "Xóa dữ liệu khỏi hệ thống!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                try {
                    const axiosInstance = await AxiosInstance();
                    const response = await axiosInstance.delete(`/delete-post-admin.php?postid=${ID}`); // Sử dụng postid thay vì ID
                    console.log(response);
                    if (response.status) {
                        swal('Xóa thành công');
                        // Update the state after successful deletion
                        setPosts(posts.filter(post => post.ID !== ID)); // Sử dụng postid thay vì ID
                    } else {
                        swal('Xóa thất bại');
                    }
                } catch (error) {
                    console.error('Error deleting post:', error);
                    swal('Lỗi khi xóa dữ liệu');
                }
            }
        });
    }

    const handleCancelReport = async (ID) => {
        try {
            const axiosInstance = await AxiosInstance();
            const response = await axiosInstance.get(`/cancel.php?postid=${ID}`); // Thay đổi phương thức từ post sang get và truyền postid qua URL
            console.log(response);
            if (response.status) {
                swal('Hủy báo cáo thành công');
                // Refresh list after successful cancellation
                const updatedPosts = posts.filter(post => post.ID !== ID);
                setPosts(updatedPosts);
            } else {
                swal('Hủy báo cáo thất bại');
            }
        } catch (error) {
            console.error('Error canceling report:', error);
        }
    }

    return (
        <div>
            <h1>Danh sách bài viết bị báo cáo</h1>
            <button className="btn btn-primary" onClick={() => saveUser(null)}>Đăng xuất</button>
            <a href="/block2" className="btn btn-warning">Chuyển đến trang quản lý người dùng</a>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Nội dung bài viết</th>
                        <th>Ảnh</th>
                        <th>Thời gian</th>
                        <th>Lý do tố cáo</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((item, index) => (
                        <tr key={item.ID}>
                            <td>{item.ID}</td>
                            <td>{item.NAME}</td>
                            <td>{item.CONTENT}</td>
                            <td style={{ maxWidth: "15px", maxHeight: "15px" }}>
                                <img src={item.IMAGE} style={{ maxWidth: "100%", height: "auto" }} /> {/* Điều chỉnh kích thước hình ảnh */}
                            </td>
                            <td>{item.TIME}</td>
                            <td>{item.REASON}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => handleCancelReport(item.ID)}>Hủy</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(item.ID)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


export default List;

