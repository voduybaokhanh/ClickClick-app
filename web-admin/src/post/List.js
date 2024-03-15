import React, { useState, useEffect } from "react";
import AxiosInstance from "../helper/Axiostance";
import swal from 'sweetalert';

const List = (props) => {
    const { user, saveUser } = props;
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const axiosInstance = await AxiosInstance();
                const result = await axiosInstance.get('/get-all-posts.php');
                setPosts(result); // Đảm bảo rằng bạn đã nhận được một mảng posts từ kết quả trả về
            } catch (error) {
                console.error('Error fetching data:', error);
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
        }).then(async (will) => {
            if (will) {
                try {
                    const axiosInstance = await AxiosInstance();
                    const result = await axiosInstance.delete(`/delete-posts.php?id=${id}`);
                    console.log(result);
                    if (result.status) {
                        swal('Xóa thành công');
                        // Sau khi xóa thành công, cập nhật lại danh sách bài viết bằng cách gọi fetchData
                    } else {
                        swal('Xóa thất bại');
                    }
                } catch (error) {
                    console.error('Error deleting post:', error);
                }
            }
        });
    }

    return (
        <div>
            <h1>List</h1>
            <button className="btn btn-primary" onClick={() => saveUser(null)}>Đăng xuất</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.title}</td>
                            <td>{item.content}</td>
                            <td>
                                <a href={`/edit/${item.id}`} className="btn btn-primary">Sửa</a>
                                <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default List;
