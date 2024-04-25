import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import AxiosInstance from "../../helper/Axiostance";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dropdown } from "react-native-element-dropdown";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [reload, setReload] = useState(false);
  const [isLikedMap, setIsLikedMap] = useState({});
  const [content, setContent] = useState("");
  const [friendID, setfriendID] = useState("");
  const navigation = useNavigation();
  const [datafriend, setdatafriend] = useState([
    { label: "Mọi người", value: "1" },
  ]);

  // Thêm state để lưu trạng thái của người dùng (tất cả hoặc bạn bè)
  const [selectedFriend, setSelectedFriend] = useState("all");
  const restoreLikedPosts = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("Token (userid) not found in AsyncStorage");
        return;
      }

      const instance = await AxiosInstance();
      const body = { userid: parseInt(token) };
      const response = await instance.post("/get-all-like.php", body);

      if (response.status) {
        const likedPostsFromAPI = response.likes.map((like) =>
          like.postid.toString()
        );
        const newIsLikedMap = {};
        likedPostsFromAPI.forEach((postid) => {
          newIsLikedMap[postid] = true;
        });
        setIsLikedMap(newIsLikedMap);
      } else {
        console.error(
          "Error: Response from API does not contain expected data format."
        );
      }
    } catch (error) {
      console.error("Error restoring liked posts from API:", error);
    }
  };
  useEffect(() => {
    fetchPosts();
    selectFriend();
    restoreLikedPosts();
    // Lấy và lưu trữ ID người dùng hiện tại khi trang được load
  }, [reload, selectedFriend]);

  useEffect(() => {
    restoreLikedPosts();
  }, []);
  const selectFriend = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("Token (userid) not found in AsyncStorage");
        return;
      }
      const instance = await AxiosInstance();
      const body = { userid: parseInt(token) };
      const responseFriend = await instance.post(
        "/get-all-friendlist.php",
        body
      );

      // Chuyển đổi dữ liệu thành mảng các đối tượng có thuộc tính label và value
      const formattedData = responseFriend.friendships.map(
        (friendship, index) => ({
          label: responseFriend.friendName[index],
          value: friendship.FRIENDSHIPID.toString(),
        })
      );

      // Thêm người dùng hiện tại vào mảng datafriend
      const currentUser = { label: "Tôi", value: token };
      const updatedDataFriend = [currentUser, ...formattedData];

      // Thêm mục "Mọi người" vào đầu danh sách bạn bè
      updatedDataFriend.unshift({ label: "Mọi người", value: "all" });

      // Gán giá trị cho datafriend
      setdatafriend(updatedDataFriend);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const sendMessage = async (USERID, ID) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("Token (userid) not found in AsyncStorage");
        return;
      }
      // Kiểm tra nếu SENDERID và RECEIVERID giống nhau
      if (parseInt(token) === USERID) {
        alert("Không thể nhắn tin cho chính bạn!");
        return; // Kết thúc hàm nếu người dùng cố gắng gửi tin nhắn cho chính họ
      }
      const instance = await AxiosInstance();
      const body = {
        SENDERID: parseInt(token),
        RECEIVERID: USERID, // Thay đổi RECEIVERID theo người dùng nhận tin nhắn
        content: content, // Nội dung tin nhắn
        postid: ID,
      };
      console.log(body);
      const response = await instance.post("/chats.php", body);
      if (response.status) {
        // Tin nhắn gửi thành công, có thể cập nhật giao diện hoặc thực hiện các hành động khác
        alert("Tin nhắn đã được gửi");
        setContent(""); // Xóa nội dung tin nhắn sau khi gửi
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const fetchPosts = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("Token (userid) not found in AsyncStorage");
        return;
      }

      const instance = await AxiosInstance();
      const body = { userid: parseInt(token) };
      const response = await instance.post("/get-all-post-friend.php", body);
      setfriendID(response.posts);
      // Thêm thuộc tính isLiked và postid vào từng bài viết trong mảng post
      const postsWithpostid = response.posts.map((post) => ({
        ...post,
        postid: post.ID,
      }));

      // Lưu trạng thái action vào state posts
      setPosts(postsWithpostid);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchPostsFriend = async (userId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("Token (userid) not found in AsyncStorage");
        return;
      }
      const instance = await AxiosInstance();
      const body = { userid: parseInt(userId) };
      const response = await instance.post("/get-all-post-userid.php", body);
      setfriendID(response.posts);
      // Thêm thuộc tính postid vào từng bài viết trong mảng post
      const postsWithpostid = response.posts.map((post) => ({
        ...post,
        postid: post.ID,
      }));
      // Lưu trạng thái action vào state posts
      setPosts(postsWithpostid);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleMore = async (postid, userId) => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      console.log("Token (userid) not found in AsyncStorage");
      return;
    }
    if (parseInt(token) === userId) {
      // Người dùng đang xem bài viết của mình
      Alert.alert(
        "Xác nhận xóa bài viết",
        "Bạn có chắc chắn muốn xóa bài viết này?",
        [
          {
            text: "Hủy",
            style: "cancel",
          },
          {
            text: "Xóa",
            onPress: () => handleDelete(postid), // Gọi hàm xóa bài viết khi người dùng xác nhận
          },
        ]
      );
    } else {
      // Người dùng đang xem bài viết của người khác
      Alert.prompt(
        "Xác nhận báo cáo bài viết",
        "Nhập lý do của bạn:",
        [
          {
            text: "Hủy",
            style: "cancel",
          },
          {
            text: "Báo cáo",
            onPress: (reason) => {
              // Kiểm tra lý do nhập và gọi hàm xử lý báo cáo bài viết
              if (reason && reason.trim() !== "") {
                handleBaocao(postid, reason);
              } else {
                Alert.alert("Lỗi", "Vui lòng nhập lý do báo cáo bài viết");
              }
            },
          },
        ],
        "plain-text"
      );
    }
  };

  const handleDelete = async (postid) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("Token (userid) not found in AsyncStorage");
        return;
      }
      const instance = await AxiosInstance();
      const body = {
        postid: postid,
      };

      const response = await instance.post("/delete-post.php", body);
      if (response.status) {
        alert("xóa bài viết thành công");
      } else {
        alert("xóa bài viết không thành công: ");
      }
    } catch (error) {
      console.error("Error reporting post:", error);
    }
  };

  const handleBaocao = async (postid, reason) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("Token (userid) not found in AsyncStorage");
        return;
      }

      const instance = await AxiosInstance();
      const body = {
        userid: parseInt(token),
        postid: postid,
        reason: reason, // Thay bằng lý do thực tế từ người dùng
      };

      const response = await instance.post("/report.php", body);
      if (response.status) {
        alert("Báo cáo bài viết thành công");
      } else {
        alert("Báo cáo bài viết không thành công: " + response.data.message);
      }
    } catch (error) {
      console.error("Error reporting post:", error);
    }
  };
  // Trong phần xử lý phản hồi từ API:
  const handleThatim = async (postid, userId) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("Token (userid) not found in AsyncStorage");
        return;
      }
      const instance = await AxiosInstance();
      const action = 1; // Action khi người dùng thích bài viết
      const body = {
        userid: parseInt(token),
        action: action,
        postid: postid,
      };

      const response = await instance.post("/likes-post.php", body);
      // Cập nhật trạng thái isLikedMap
      const newIsLikedMap = { ...isLikedMap };
      newIsLikedMap[postid] = response.action === 1;
      setIsLikedMap(newIsLikedMap);

      // Lấy danh sách các bài viết đã thích từ AsyncStorage
      const storedLikedPosts = await AsyncStorage.getItem("likedPosts");
      let likedPosts = storedLikedPosts ? JSON.parse(storedLikedPosts) : {};
      // Cập nhật danh sách bài viết đã thích tương ứng với userId
      likedPosts[userId] = likedPosts[userId] || [];
      if (response.action === 1) {
        likedPosts[userId].push(postid);
      } else {
        likedPosts[userId] = likedPosts[userId].filter((id) => id !== postid);
      }
      // Lưu danh sách bài viết đã thích vào AsyncStorage
      await AsyncStorage.setItem("likedPosts", JSON.stringify(likedPosts));

      // Cập nhật trạng thái dữ liệu của bài viết trong posts
      const updatedPosts = posts.map((post) => {
        if (post.postid === postid) {
          return {
            ...post,
            isLiked: response.action === 1,
            LIKES: response.LIKES, // Cập nhật số lượt thích mới
          };
        }
        return post;
      });
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        locations={[0.05, 0.17, 0.8, 1]}
        colors={["#3B21B7", "#8B64DA", "#D195EE", "#CECBD3"]}
        style={styles.linearGradient}
      >
        <View style={styles.header}>
          <Image
            style={styles.iconsetting}
            source={require("../../Image/chu_click.png")}
          />
          <View>
            <Dropdown
              style={styles.search}
              placeholder="Mọi người"
              placeholderStyle={styles.placeholderStyle}
              iconstyle={styles.iconStyle}
              selectedTextStyle={styles.placeholderStyle}
              containerStyle={styles.dropdown}
              data={datafriend}
              labelField="label"
              valueField="value"
              onChange={async (item) => {
                if (item.value === "all") {
                  await fetchPosts(); // Gọi hàm fetchPosts khi chọn mục "Mọi người"
                } else {
                  await fetchPostsFriend(item.value); // Truyền giá trị được chọn vào hàm fetchPostsFriend
                }
              }}
            />
          </View>
          <View style={styles.viewSetting}>
            <TouchableOpacity onPress={() => navigation.navigate("Setting")}>
              <Image
                style={styles.iconsetting}
                source={require("../../Image/setting_icon.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          style={styles.FlatList}
          data={posts}
          refreshing={reload}
          onRefresh={fetchPosts}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          // Trong FlatList renderItem:
          renderItem={({ item, index }) => {
            return (
              <View
                style={[
                  styles.itempost,
                  index + 1 === posts.length ? { marginBottom: 90 } : {},
                ]}
              >
                <View style={styles.namepost}>
                  <Image source={{ uri: item.AVATAR }} style={styles.avt} />
                  <View style={{ flexDirection: "column", marginLeft: 10 }}>
                    <Text style={styles.name}>{item.NAME}</Text>
                    <Text style={styles.time}>{item.TIME}</Text>
                  </View>
                  <TouchableOpacity
                    style={{ marginLeft: "auto" }}
                    onPress={() => handleMore(item.postid, item.userid)}
                  >
                    <Image
                      style={styles.iconmore}
                      source={require("../../Image/more_icon.png")}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ width: "90%", marginBottom: 20 }}>
                  <Image
                    style={{ width: 300, height: 300 }}
                    source={{ uri: item.IMAGE }}
                  />
                  <View style={{ width: "90%", alignSelf: "center" }}>
                    <Text style={styles.status}>{item.CONTENT}</Text>
                  </View>
                  <View style={styles.tim_mes}>
                    <TouchableOpacity
                      onPress={() => handleThatim(item.postid, item.userid)}
                    >
                      <Image
                        style={{
                          width: 38,
                          height: 42,
                        }}
                        source={
                          isLikedMap[item.postid]
                            ? require("../../Image/hearted.png") // Nếu đã like, hiển thị icon hearted
                            : require("../../Image/heart.png") // Ngược lại, hiển thị icon heart
                        }
                      />
                    </TouchableOpacity>
                    <Text style={styles.postText}>{item.LIKES}</Text>
                    <TextInput
                      style={styles.mes}
                      placeholder="Add a message"
                      placeholderTextColor={"#635A8F"}
                      value={content.toString()}
                      onChangeText={(e) => setContent(e)}
                    />
                    <TouchableOpacity
                      onPress={() => sendMessage(item.userid, item.ID)}
                    >
                      <Image
                        style={{ height: 40, width: 40, top: 5, left: 5 }}
                        source={require("../../Image/sent.png")}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  FlatList: {
    marginTop: 60,
  },
  iconStyle: {
    color: "#fff",
  },
  placeholderStyle: {
    color: "#fff",
    fontSize: 18,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  post: {
    marginBottom: 10,
  },
  postText: {
    color: "white",
    fontSize: 20,
    marginLeft: 5,
    top: 13,
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    width: "100%",
  },
  mes: {
    backgroundColor: "#E5D7F7",
    marginLeft: 5,
    height: 45,
    borderRadius: 24,
    width: "75%",
    paddingHorizontal: 15,
    top: 5,
  },
  tim_mes: {
    flexDirection: "row",
    width: "90%",
    bottom: 10,
    marginTop: 20,
  },
  status: {
    color: "white",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "bold",
    position: "absolute",
    bottom: 5,
    color: "white",
    alignSelf: "center",
  },
  namepost: {
    flexDirection: "row",
    alignItems: "center",
    top: 12,
    width: "90%",
    marginBottom: 20,
  },
  iconmore: {
    marginLeft: "auto",
  },
  avt: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  time: {
    color: "white",
  },
  name: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  itempost: {
    width: "auto",
    height: "auto",
    backgroundColor: "#BFA7FF",
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    top: 63,
    position: "relative",
  },
  iconsetting: {},
  iconStyle: {
    color: "#fff",
  },
  placeholderStyle: {
    color: "#fff",
    fontSize: 20,
  },
  search: {
    height: 53,
    paddingLeft: 20,
    paddingRight: 10,
    backgroundColor: "#443A74",
    borderRadius: 24,
    fontSize: 13,
    width: 160,
    fontWeight: "bold",
  },
  linearGradient: {
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    flex: 1,
    width: "100%",
  },
  viewSetting: {
    width: 70,
    alignItems: "flex-end",
  },
  dropdown: {
    marginTop: 5,
    borderRadius: 24,
  },
});

export default Home;
