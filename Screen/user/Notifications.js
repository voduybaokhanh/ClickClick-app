import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AxiosInstance from "../../helper/Axiostance";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [listFriendStatus, setlistFriendStatus] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);
  useEffect(() => {
    // Gọi API để lấy danh sách thông báo khi component được tải lần đầu
  }, []); // Truyền mảng rỗng để chỉ gọi một lần sau khi component được tải
  const fetchNotifications = async () => {
    try {
      const instance = await AxiosInstance();
      const idUser = await AsyncStorage.getItem("token");
      // Gọi API để lấy danh sách thông báo
      //
      const responseNoti = await instance.post("/get-all-notifications.php", {
        userid: idUser,
      });
      const responseFriendStatus = await instance.post(
        "/get-all-friendships.php",
        { userid: idUser }
      );
      if (responseFriendStatus.status) {
        console.log(responseFriendStatus.invitations);
        setlistFriendStatus([...responseFriendStatus.invitations]);
      }
      // Thay thế 'URL_API' và 'ID_NGUOI_DUNG' bằng URL và ID người dùng thực tế
      if (responseNoti.status) {
        // Nếu lấy dữ liệu thành công
        setNotifications(responseNoti.notifications); // Cập nhật state với danh sách thông báo từ API
      } else {
        console.error("Error fetching notifications:", responseNoti);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Function để render mỗi mục trong danh sách thông báo
  const renderItem = useCallback(({ item }) => {
    return (
      <View style={styles.notificationItem}>
        <Image
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              backgroundColor: "white",
            }}
            source={{uri: item.AVATAR}}
          />
        <View style={{ flexDirection: "column" }}>
          <Text
            style={[
              styles.textNoti,
              { width: Dimensions.get("window").width * 0.7 },
            ]}
            numberOfLines={2}
          >
            {item.CONTENT}
          </Text>
          <Text style={styles.textNoti}>
            {item.TIME.substring(item.TIME.length - 8, item.TIME.length - 3)}
          </Text>
        </View>
      </View>
    );
  }, []);
  const renderItemFriend = useCallback(({ item, index }) => {
    return (
      <View style={[styles.notificationItem, { flexDirection: "column" }]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              backgroundColor: "white",
            }}
            source={{uri: item.AVATAR}}
          />
          {item.STATUS == "pending" && (
            <View>
              <Text style={[styles.textNoti, { marginLeft: 10 }]}>
                {item.NAME} sent a friend request
              </Text>
              <Text style={[styles.textNoti, { marginLeft: 10 }]}>
                {item.TIME.substring(
                  item.TIME.length - 8,
                  item.TIME.length - 3
                )}
              </Text>
            </View>
          )}
        </View>
        {item.STATUS == "pending" && (
          <View
            style={{ flexDirection: "row", gap: 10, justifyContent: "center" }}
          >
            <Pressable
              onPress={() => handleAcceptFriend(item.ID, item.NAME)}
              style={[styles.btnFriend, { backgroundColor: "#8f3cc9", flex: 1 }]}
            >
              <Text style={styles.textBtnFriend}>Accept</Text>
            </Pressable>
            <Pressable
              onPress={() => handleDeleteFriend(item.ID)}
              style={[styles.btnFriend, { backgroundColor: "#8f3cc9", flex: 1 }]}
            >
              <Text style={styles.textBtnFriend}>Delete</Text>
            </Pressable>
          </View>
        )}
      </View>
    );
  }, []);

  const handleAcceptFriend = (friendshipid, name) => {
    const acceptFriend = async () => {
      const instance = await AxiosInstance();
      const idUser = await AsyncStorage.getItem("token");
      const res = await instance.post("/accept-friend.php", {
        userid: idUser,
        friendshipid: friendshipid,
      });
      if (res.status) {
        setNotifications((val) => [
          {
            CONTENT: `Bạn đã chấp nhận lời mời kết bạn từ ${name}.`,
            ID: 99,
            RECEIVERID: idUser,
            TIME: "2024-03-30 16:54:06",
            USERID: friendshipid,
          },
          ...val,
        ]);
      }
    };

    acceptFriend();
    setlistFriendStatus((val) =>
      val.filter((item) => item.ID !== friendshipid)
    );
  };

  const handleDeleteFriend = async (friendshipid) => {
    setlistFriendStatus((val) =>
      val.filter((item) => item.ID !== friendshipid)
    );
    const instance = await AxiosInstance();
    const idUser = await AsyncStorage.getItem("token");
    const res = await instance.post("/delete-add-friend.php", {
      userid: friendshipid,
      friendshipid: idUser,
    });
    console.log(res);
  };

  return (
    <LinearGradient
      locations={[0.05, 0.17, 0.8, 1]}
      colors={["#3B21B7", "#8B64DA", "#D195EE", "#CECBD3"]}
      style={[styles.linearGradient, styles.container]}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={styles.title}>Notifications</Text>
        {/* Sử dụng FlatList để hiển thị danh sách thông báo */}
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()} // Sử dụng trường ID làm key
          refreshing={reload}
          keyboardShouldPersistTaps="handled"
          onRefresh={fetchNotifications}

        />
      </SafeAreaView>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Add friend</Text>
        <FlatList
          data={listFriendStatus.flat()}
          renderItem={renderItemFriend}
          refreshing={reload}
          keyboardShouldPersistTaps="handled"
          onRefresh={fetchNotifications}
        />
      </View>
    </LinearGradient>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    color:"white",
  },
  notificationItem: {
    flexDirection: "row",
    padding: 10,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
  },
  avatar: {
    borderRadius: 50,
    backgroundColor: "white",
    width: 50,
    height: 50,
    borderWidth: 0.5,
    borderColor: "gray",
  },
  textNoti: {
    fontSize: 18,
    color: "white",
  },
  linearGradient: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    width: "100%",
  },
  btnFriend: {
    backgroundColor: '#8f3cc9',
    width: 100,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#635A8F",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  textBtnFriend: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  textNotiFriend: {
    color: "#fff",
    fontSize: 20,
  },
});
