import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import axios from 'axios'; // Import axios để gọi API
import AxiosInstance from '../../helper/Axiostance';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]); // State để lưu trữ danh sách thông báo
  useEffect(() => {
    // Gọi API để lấy danh sách thông báo khi component được tải lần đầu
    fetchNotifications();
  }, []); // Truyền mảng rỗng để chỉ gọi một lần sau khi component được tải

  const fetchNotifications = async () => {
    try {
     const instance = await  AxiosInstance()

      // Gọi API để lấy danh sách thông báo
      const response = await instance.get('/get-all-notifications.php', { userid: 1 }); // Thay thế 'URL_API' và 'ID_NGUOI_DUNG' bằng URL và ID người dùng thực tế
      if (response.data.status) {
        // Nếu lấy dữ liệu thành công
        console.log(response.data);
        setNotifications(response.data.notifications); // Cập nhật state với danh sách thông báo từ API
      } else {
        console.error('Error fetching notifications:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // Function để render mỗi mục trong danh sách thông báo
  const renderItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text>{item.CONTENT}</Text> {/* Hiển thị nội dung thông báo */}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      {/* Sử dụng FlatList để hiển thị danh sách thông báo */}
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.ID.toString()} // Sử dụng trường ID làm key
      />
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  notificationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
