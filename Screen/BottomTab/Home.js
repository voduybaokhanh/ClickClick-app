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
  const [reload, setReload] = useState(0);

  const [likedPosts, setLikedPosts] = useState([]);
  const [datafriend, setdatafriend] = useState([
    { label: "Mọi người", value: "1" },
  ]);
  const [isThatim, setIsThatim] = useState("");

  useEffect(() => {
    fetchPosts();
    selectFriend();
  }, [reload]); // Thêm reload vào dependencies của useEffect


  const selectFriend = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("Token (userid) not found in AsyncStorage");
        return;
      }
      const instance = await AxiosInstance();
      const body = { userid: parseInt(token) }; // Assuming userid is an integer
      const responseFriend = await instance.post("/get-all-friend.php", body);

      // Chuyển đổi dữ liệu thành mảng các đối tượng có thuộc tính label và value
      const formattedData = responseFriend.friendships.map(
        (friendship, index) => ({
          label: responseFriend.friendName[index], // Trả về label từng đối tượng trong mảng friendName
          value: friendship.FRIENDSHIPID.toString(), // Convert USERID to string
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
      // Retrieve token (userid) from AsyncStorage
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("Token (userid) not found in AsyncStorage");
        return;
      }

      const instance = await AxiosInstance();
      const body = { userid: parseInt(token) }; // Assuming userid is an integer
      const response = await instance.post("/get-all-post-friend.php", body);

      // Thêm thuộc tính postid vào từng bài viết trong mảng post

      setPosts(response.posts);
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
  
      setPosts(response.posts);
      // Sử dụng postId thay vì postid
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  
  const handleBaocao = () => {
    // Xử lý khi icon được ấn
    console.log("Icon đã được ấn");
    // Thêm mã xử lý bạn muốn thực hiện khi icon được ấn
  };

  const handleThatim = async (postId) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      console.log("Token (userid) not found in AsyncStorage");
      return;
    }

    const instance = await AxiosInstance();
    const action = likedPosts.includes(postId) ? 0 : 1;
    const body = {
      userid: parseInt(token),
      action: action,
      postid: postId,
    };

    const response = await instance.post("/likes-post.php", body);

    const updatedLikedPosts = likedPosts.includes(postId)
      ? likedPosts.filter((id) => id !== postId)
      : [...likedPosts, postId];
    setLikedPosts(updatedLikedPosts);

    setIsThatim(action === 1);

    // Tăng giá trị reload để kích hoạt useEffect và tải lại trang
    setReload(reload + 1);

    console.log(response);
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
                {/* require('../../Image/avatar1.png' */}
                {/* uri: item.AVATAR */}
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
                {/* uri: item.IMAGE */}
                <View style={{ width: "90%", alignSelf: "center" }}>
                  <Text style={styles.status}>{item.CONTENT}</Text>
                </View>
                <View style={styles.tim_mes}>
                  <TouchableOpacity onPress={() => handleThatim(item.ID)}>
                    <Image
                      style={{
                        width: 40,
                        height: 45,
                        alignItems: "center",
                        tintColor: likedPosts.includes(item.ID)
                          ? "#FF0000"
                          : "#FFFFFF",
                      }}
                      source={require("../../Image/heart.png")}
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
    marginLeft: 10,
    height: 45,
    borderRadius: 24,
    width: "85%",
    paddingHorizontal: 10,
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
    top: 80,
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
