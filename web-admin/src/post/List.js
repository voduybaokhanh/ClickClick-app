import React, { useState, useEffect } from "react";
import AxiosInstance from "../helper/Axiostance";
import swal from 'sweetalert';

const List = ({ saveUser }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const axiosInstance = await AxiosInstance();
                const response = await axiosInstance.get('/get-all-report.php');
                if (response.status) {
                    setPosts(response.posts);
                } else {
                    throw new Error(response.message);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                swal("Oops!", "Something went wrong while fetching data", "error");
            }
        }
        fetchData();
    }, []);

    const handleDelete = async (id) => {
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
                    const response = await axiosInstance.delete(`/delete-post.php?id=${id}`);
                    if (response.status) {
                        swal('Xóa thành công');
                        // Update the state after successful deletion
                        setPosts(posts.filter(post => post.id !== id)); 
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
    const handleCancelReport = async (id) => {
        try {
            const axiosInstance = await AxiosInstance();
            const response = await axiosInstance.post(`/cancel.php?id=${id}`);
            if (response.status) {
                swal('Hủy báo cáo thành công');
                // Refresh list after successful cancellation
                const updatedPosts = posts.filter(post => post.id !== id);
                setPosts(updatedPosts);
            } else {
                swal('Hủy báo cáo thất bại');
            }
        } catch (error) {
            console.error('Error canceling report:', error);
            swal('Lỗi khi hủy báo cáo');
        }
    }

    return (
        <div>
            <h1>Danh sách bài viết bị báo cáo</h1>
            <button className="btn btn-primary" onClick={() => saveUser(null)}>Đăng xuất</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Nội dung</th>
                        <th>Ảnh</th>
                        <th>Thời gian</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((item, index) => (
                        <tr key={item.ID}> {/* Lưu ý: ID được viết hoa vì đây là key trong dữ liệu JSON */}
                            <td>{item.ID}</td>
                            <td>{item.NAME}</td>
                            <td>{item.CONTENT}</td>
                            <td>{item.IMAGE}</td>
                            <td>{item.TIME}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => handleCancelReport(item.ID)}>Cancle</button>
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
