import React, { useState, useEffect } from "react";
import AxiosInstance from "../../../web-admin/src/helper/Axiostance";
import swal from 'sweetalert';

const Block = ({ saveUser }) => {
  const [reportedUsers, setReportedUsers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const axiosInstance = await AxiosInstance();
      const response = await axiosInstance.get('/get-all-user-reported.php');

      if (response.data.status) {
        const reportedUsersData = response.data.reported_users;

        // Map the user data and set it to state
        const users = reportedUsersData.map((user) => ({
          userId: user.USERID,
          name: user.NAME,
          avatar: user.AVATAR,
          reportedPostsCount: user.reported_count,
          available: true // Initial assumption for availability
        }));

        setReportedUsers(users);
      } else {
        throw new Error(response.data.msg);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      swal("Oops!", "Something went wrong while fetching data", "error");
    }
  };

  const handleBlock = async (userId) => {
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
          const response = await axiosInstance.post('/block.php', { userId });

          if (response.data.status) {
            swal("Khóa tài khoản thành công");
            setReportedUsers((prev) =>
              prev.map((user) =>
                user.userId === userId ? { ...user, available: false } : user
              )
            );
          } else {
            swal("Khóa tài khoản thất bại");
          }
        } catch (error) {
          console.error("Error blocking user:", error);
          swal("Có lỗi trong quá trình khóa tài khoản");
        }
      }
    });
  };

  const handleUnBlock = async (userId) => {
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
          const response = await axiosInstance.post('/unblock.php', { userId });

          if (response.data.status) {
            swal("Mở khóa tài khoản thành công");
            setReportedUsers((prev) =>
              prev.map((user) =>
                user.userId === userId ? { ...user, available: true } : user
              )
            );
          } else {
            swal("Mở khóa tài khoản thất bại");
          }
        } catch (error) {
          console.error("Error unblocking user:", error);
          swal("Có lỗi trong quá trình mở khóa tài khoản");
        }
      }
    });
  };

  return (
    <div>
      <h1>Danh sách người dùng bị báo cáo</h1>
      <button className="btn btn-primary" onClick={() => saveUser(null)}>Đăng xuất</button>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Ảnh đại diện</th>
            <th>Số lượng bài viết bị báo cáo</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {reportedUsers.map((user) => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.name}</td>
              <td>
                <img src={user.avatar || ''} alt={user.name} style={{ maxWidth: "100%", height: "auto" }} />
              </td>
              <td>{user.reportedPostsCount}</td>
              <td>
                {user.available ? (
                  <button className="btn btn-danger" onClick={() => handleBlock(user.userId)}>Khóa</button>
                ) : (
                  <button className="btn btn-primary" onClick={() => handleUnBlock(user.userId)}>Mở khóa</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Block;
