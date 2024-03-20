import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AxiosInstance from "../../helper/Axiostance";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dropdown } from "react-native-element-dropdown";
import { StatusBar } from "expo-status-bar";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [reload, setReload] = useState(false);
  const [isLikedMap, setIsLikedMap] = useState({});
  const [datafriend, setdatafriend] = useState([
    { label: "Mọi người", value: "1" },
  ]);

  // Thêm state để lưu trạng thái của người dùng (tất cả hoặc bạn bè)
  const [selectedFriend, setSelectedFriend] = useState("all");

  const getUserID = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      return token;
    } catch (error) {
      console.error("Error retrieving userid from AsyncStorage:", error);
    }
  };

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
    restoreLikedPosts(); // Khôi phục trạng thái isLiked từ AsyncStorage khi trang được load lại
  }, [reload, selectedFriend]);

  useEffect(() => {
    restoreLikedPosts();
  }, []);
  // Hàm lưu danh sách các bài viết đã thích vào AsyncStorage
  const saveLikedPosts = async (likedPosts) => {
    try {
      await AsyncStorage.setItem("likedPosts", JSON.stringify(likedPosts));
    } catch (error) {
      console.error("Error saving liked posts to AsyncStorage:", error);
    }
  };

  const selectFriend = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("Token (userid) not found in AsyncStorage");
        return;
      }
      const instance = await AxiosInstance();
      const body = { userid: parseInt(token) };
      const responseFriend = await instance.post("/get-all-friend.php", body);

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

  const handleBaocao = () => {
    // Xử lý khi icon được ấn
    console.log("Icon đã được ấn");
    // Thêm mã xử lý bạn muốn thực hiện khi icon được ấn
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
          <View style={{ alignItems: "center" }}>
            <Dropdown
              style={styles.search}
              placeholder="Mọi người"
              placeholderStyle={styles.placeholderStyle}
              iconstyle={styles.iconStyle}
              selectedTextStyle={styles.placeholderStyle}
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
        </View>
        <FlatList
          style={styles.FlatList}
          data={posts}
          // Trong FlatList renderItem:
          renderItem={({ item }) => (
            <View style={styles.itempost}>
              <View style={styles.namepost}>
                <Image
                  source={require("../../Image/avatar1.png")}
                  style={styles.avt}
                />
                <View style={{ flexDirection: "column", marginLeft: 10 }}>
                  <Text style={styles.name}>{item.NAME}</Text>
                  <Text style={styles.time}>{item.TIME}</Text>
                </View>
                <TouchableOpacity
                  style={{ marginLeft: "auto" }}
                  onPress={handleBaocao}
                >
                  <Image
                    style={styles.iconmore}
                    source={require("../../Image/more_icon.png")}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ width: "90%", marginBottom: 20 }}>
                <Image
                  style={{ width: "auto" }}
                  source={require("../../Image/picture.png")}
                />
                <View style={{ width: "90%", alignSelf: "center" }}>
                  <Text style={styles.status}>{item.CONTENT}</Text>
                </View>
                <View style={styles.tim_mes}>
                  <TouchableOpacity
                    onPress={() => handleThatim(item.postid, item.USERID)}
                  >
                    <Image
                      style={{
                        width: 30,
                        height: 35,
                        alignItems: "center",
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
                  />
                </View>
              </View>
            </View>
          )}
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
    fontSize: 20,
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
    fontSize: 18,
    marginLeft: 5,
    color:"white",
    top:5
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    width: "100%",
  },
  mes: {
    backgroundColor: "#E5D7F7",
    marginLeft: 10,
    height: 45,
    borderRadius: 24,
    width: "90%",
    paddingHorizontal: 15,
    top: 5,
    fontSize:16
  },
  tim_mes: {
    flexDirection: "row",
    width: "90%",
    bottom: 10,
    marginTop: 20,
    alignItems:"center"
  },
  status: {
    color: "white",
    fontSize: 15,
    position: "absolute",
    bottom: 5,
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
  avt: {},
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
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 100,
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
    width: 145,
    fontWeight: "bold",
  },
  linearGradient: {
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    flex: 1,
    width: "100%",
  },
});

export default Home;
