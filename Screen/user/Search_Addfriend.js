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
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const Search_Addfriend = () => {
  const [keyword, setKeyword] = useState(""); // State to store the search keyword
  const [searchResult, setSearchResult] = useState(null);
  const navigation = useNavigation();
  const [friendList, setFriendList] = useState([]);

  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetchFriendList();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      fetchFriendList();
    }, [])
  );

  const validateEmail = (email) => {
    // Regular expression để kiểm tra định dạng email
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const fetchFriendList = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("Token (userid) not found in AsyncStorage");
        return;
      }

      const instance = await AxiosInstance();
      const body = { userid: parseInt(token) };
      const response = await instance.post("/get-all-friend.php", body);
      // Lưu trạng thái action vào state friendList
      setFriendList(response.friendName);
    } catch (error) {
      console.error("Error fetching friend list:", error);
    }
  };
  const handledDleteFriend = async (friendshipid) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("Token (userid) not found in AsyncStorage");
        return;
      }

      const instance = await AxiosInstance();
      const body = {
        userid: parseInt(token),
        friendshipid: friendshipid,
      };
      const response = await instance.post("/delete-friend.php", body);
      fetchFriendList();
      // Handle success response
      Alert.alert("Friend deleted successfully");
      console.log("Friend deleted successfully");
    } catch (error) {
      console.error("Error deleting friend:", error);
      // Handle error (e.g., show error message to the user)
    }
  };
  const handledAddFriend = async (friendshipid) => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("Token (userid) not found in AsyncStorage");
        return;
      }
    
      const instance = await AxiosInstance();
      const body = {
        userid: parseInt(token),
        friendshipid: friendshipid,
      };
      const response = await instance.post("/add-friend.php", body);
      if (response.status) {
        fetchFriendList();
        setSearchResult();
        setKeyword(null);
        Alert.alert("Add friend successfully");
        console.log("Add friend successfully");
      }else{
        Alert.alert(response.message);
      }
      // Handle success response
     
    } catch (error) {
      console.error("Error deleting friend:", error);
      // Handle error (e.g., show error message to the user)
    }
  };


  const handleSearch = async () => {
    if (!validateEmail(keyword)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }
    const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log("Token (userid) not found in AsyncStorage");
        return;
      }
    const instance = await AxiosInstance();

    const response = await instance
      .post("/find-friend-keyword.php", { userid: token, keyword: keyword })
      .then((response) => {
        if (response.status) {
          setSearchResult(response);
          console.log(searchResult);
        } else {
          Alert.alert("Error", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        Alert.alert("Error", "An error occurred while searching.");
      });
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        locations={[0.05, 0.17, 0.8, 1]}
        colors={["#3B21B7", "#8B64DA", "#D195EE", "#CECBD3"]}
        style={styles.linearGradient}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../../Image/arrow-left.png")}
            style={{ top: 40 }}
          />
        </TouchableOpacity>
        <View style={{ top: 45, alignItems: "center" }}>
          <Text style={styles.creat}>Add your friends</Text>
          <Text style={styles.text}>
            You can only add friends with 20 people
          </Text>
        </View>
        <View style={{ alignItems: "center", marginTop: 15 }}>
          <TextInput
            style={styles.mes}
            placeholder="Search your email contacts"
            placeholderTextColor="#A99EDD"
            value={keyword}
            onChangeText={(text) => setKeyword(text)}
            onSubmitEditing={handleSearch}
          />
        </View>
        <View style={styles.searchResult}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image source={require("../../Image/image 16.png")} />
            <Text style={styles.text2}>Result</Text>
          </View>
          {searchResult && (
            <View style={styles.result}>
              <View style={styles.list}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    style={styles.image1}
                    source={{ uri: searchResult.user.AVATAR }}
                  />
                  <Text style={styles.name}>{searchResult.user.NAME}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {searchResult.friendship === "friend" ? ( // Kiểm tra mối quan hệ kết bạn
                    <TouchableOpacity
                      onPress={() => handledDleteFriend(searchResult.user.ID)}
                      style={styles.btn}
                    >
                      <Text style={styles.btntext}>- Unf </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => handledAddFriend(searchResult.user.ID)}
                      style={styles.btn}
                    >
                      <Text style={styles.btntext}>+ Add </Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={{ marginLeft: "auto" }}
                  >
                    <Image
                      style={styles.iconmore}
                      source={require("../../Image/more_icon.png")}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>

        <View style={styles.listfriend}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image source={require("../../Image/icons.png")} />
            <Text style={styles.text2}>List Friend</Text>
          </View>
          <FlatList
            data={friendList}
            keyExtractor={(item, index) => index.toString()}
            refreshing={reload}
            keyboardShouldPersistTaps="handled"
            onRefresh={fetchFriendList}
            renderItem={({ item }) => {
              return (
                <View style={styles.list}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      style={styles.image1}
                      source={{ uri: item.avatar }}
                    />
                    <Text style={styles.name}>{item.name}</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity
                      onPress={() => handledDleteFriend(item.friendshipid)}
                      style={styles.btn}
                    >
                      <Text style={styles.btntext}>- Unf </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ marginLeft: "auto" }}
                    >
                      <Image
                        style={styles.iconmore}
                        source={require("../../Image/more_icon.png")}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

export default Search_Addfriend;

const styles = StyleSheet.create({
  listfriend: {
    width: "100%",
    height: "100%",
  },
  image1: {
    height: 50,
    width: 50,
    borderRadius: 75,
    //overflow: "hidden",
    backgroundColor: "white",
    paddingTop: 2,
  },
  iconmore: {
    marginLeft: "auto",
  },
  btntext: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  btn: {
    borderRadius: 20,
    backgroundColor: "#574C8D",
    height: 45,
    padding: 10,
    marginLeft: "auto",
    marginRight: 10,
  },
  name: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    marginLeft: 10,
  },
  list: {
    flexDirection: "row",
    top: 15,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  mes: {
    backgroundColor: "#E5D7F7",
    height: 41,
    borderRadius: 20,
    width: "90%",
    paddingHorizontal: 20,
    fontSize: 17,
    marginTop: 40,
    color: "#635A8F", // Updated to a numeric value
  },
  text2: {
    fontSize: 22,
    color: "#574C8D",
    fontWeight: "bold",
    marginLeft: 7,
  },
  text: {
    fontSize: 15,
    color: "#F6ECF1",
    marginTop: 10,
  },
  creat: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    width: "100%",
    height: "100%",
  },
  searchResult: {
    width: "100%",
    height: 120,
    marginVertical: 10,
  },
});
