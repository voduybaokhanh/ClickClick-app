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

    const [likedPosts, setLikedPosts] = useState([]);
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

    const checkLikedPosts = async (userid) => {
      try {
        const storedLikedPosts = await AsyncStorage.getItem("likedPosts");
        if (storedLikedPosts) {
          // Nếu có dữ liệu trong AsyncStorage, cập nhật trạng thái đã like theo userid
          const likedPostsByUser = JSON.parse(storedLikedPosts)[userid] || [];
          setLikedPosts(likedPostsByUser);

          // Cập nhật trạng thái của nút "like" cho từng bài viết khi trang được tải
          const postsWithLikeStatus = posts.map((post) => ({
            ...post,
            isLiked: likedPostsByUser.includes(post.ID),
          }));
          setPosts(postsWithLikeStatus);
        }
      } catch (error) {
        console.error("Error retrieving liked posts from AsyncStorage:", error);
      }
    };

    useEffect(() => {
      const loadLikedPosts = async () => {
        try {
          const userid = await getUserID();
          if (userid) {
            checkLikedPosts(userid);
          }
        } catch (error) {
          console.error("Error loading liked posts:", error);
        }
      };

      fetchPosts();
      selectFriend();
      loadLikedPosts();

      // Cập nhật màu cho các bài viết đã được thích
      posts.forEach((post) => {
        if (post.isLiked) {
          // Áp dụng màu cho các bài viết đã thích
          // Ví dụ:
          // post.backgroundColor = 'màu bạn muốn áp dụng';
        }
      });
    }, [reload, selectedFriend]);

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

        // Thêm thuộc tính postid và backgroundColor vào từng bài viết trong mảng post
        const postsWithPostId = response.posts.map((post) => ({
          ...post,
          postId: post.ID,
          backgroundColor: post.isLiked
            ? require("../../Image/hearted.png")
            : require("../../Image/heart.png"),
        }));

        setPosts(postsWithPostId);
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
        const postsWithPostId = response.posts.map((post) => ({
          ...post,
          postId: post.ID,
        }));

        setPosts(postsWithPostId);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    const handleBaocao = () => {
      // Xử lý khi icon được ấn
      console.log("Icon đã được ấn");
      // Thêm mã xử lý bạn muốn thực hiện khi icon được ấn
    };

    const handleThatim = async (postId, userId) => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          console.log("Token (userid) not found in AsyncStorage");
          return;
        }

        const instance = await AxiosInstance();
        const action = likedPosts[userId]?.includes(postId) ? 0 : 1;
        const body = {
          userid: parseInt(token),
          action: action,
          postid: postId,
        };

        const response = await instance.post("/likes-post.php", body);

        // Cập nhật likedPosts
        const updatedLikedPosts = { ...likedPosts };
        if (updatedLikedPosts[userId]) {
          updatedLikedPosts[userId] = updatedLikedPosts[userId].includes(postId)
            ? updatedLikedPosts[userId].filter((id) => id !== postId)
            : [...updatedLikedPosts[userId], postId];
        } else {
          updatedLikedPosts[userId] = [postId];
        }
        setLikedPosts(updatedLikedPosts);
        await AsyncStorage.setItem(
          "likedPosts",
          JSON.stringify(updatedLikedPosts)
        );

        // Cập nhật trạng thái isLiked cho từng bài đăng
        const updatedPosts = posts.map((post) => {
          if (post.postId === postId) {
            return { ...post, isLiked: action === 1 };
          }
          return post;
        });
        setPosts(updatedPosts);
        // setReload(!reload);
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
                      onPress={() => handleThatim(item.postId, item.USERID)}
                    >
                      <Image
                        style={{
                          width: 40,
                          height: 45,
                          alignItems: "center",
                        }}
                        source={
                          item.isLiked
                            ? require("../../Image/hearted.png")
                            : require("../../Image/heart.png")
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
