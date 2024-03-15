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

const data = [
  { label: "Mọi người", value: "1" },
  { label: "Bạn A", value: "2" },
  { label: "Bạn B", value: "3" },
  { label: "Bạn C", value: "4" },
  { label: "Bạn D", value: "5" },
];

const TestPost = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const instance = await AxiosInstance();
      const userid = 32; // Đặt giá trị userid tại đây
      const body = { userid };
      const response = await instance.post("/get-all-post-friend.php", body);
      setPosts(response.posts);
      console.log(response.posts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }

    const [isThatim, setIsThatim] = useState(false);
    const handleBaocao = () => {
      // Xử lý khi icon được ấn
      console.log("Icon đã được ấn");
      // Thêm mã xử lý bạn muốn thực hiện khi icon được ấn
    };

    const handleThatim = () => {
      // Xử lý khi icon được ấn
      console.log("Icon đã được ấn");
      setIsThatim(!isThatim);
      // Thêm mã xử lý bạn muốn thực hiện khi icon được ấn
    };
  };
  const [isThatim, setIsThatim] = useState(false);
  const handleBaocao = () => {
    // Xử lý khi icon được ấn
    console.log("Icon đã được ấn");
    // Thêm mã xử lý bạn muốn thực hiện khi icon được ấn
  };

  const handleThatim = () => {
    // Xử lý khi icon được ấn
    console.log("Icon đã được ấn");
    setIsThatim(!isThatim);
    // Thêm mã xử lý bạn muốn thực hiện khi icon được ấn
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
              placeholder="Mọi người "
              placeholderStyle={styles.placeholderStyle}
              iconstyle={styles.iconStyle}
              selectedTextStyle={styles.placeholderStyle}
              data={data}
              labelField="label"
              valueField="value"
              onChange={(item) => {
                setValue(item.value);
                setIsfocus(false);
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
                  <Text style={styles.name}>tên: {item.NAME}</Text>
                  <Text style={styles.time}>thời gian: {item.TIME}</Text>
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
              </View>
              <View style={styles.tim_mes}>
                <TouchableOpacity onPress={handleThatim}>
                  <Image
                    source={
                      isThatim
                        ? require("../../Image/hearted.png")
                        : require("../../Image/heart.png")
                    }
                  />
                </TouchableOpacity>
                <TextInput
                  style={styles.mes}
                  placeholder="Add a message"
                  placeholderTextColor={"#635A8F"}
                />
              </View>
              <Text style={styles.postText}>số lượt like: {item.LIKES}</Text>
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
    fontSize: 16,
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
    height: 35,
    borderRadius: 24,
    width: "90%",
    paddingHorizontal: 10,
  },
  tim_mes: {
    flexDirection: "row",
    width: "90%",
    bottom: 10,
  },
  status: {
    color: "white",
    fontSize: 14,
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

export default TestPost;
