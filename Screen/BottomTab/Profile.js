import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions
} from "react-native";
import AxiosInstance from "../../helper/Axiostance";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import MasonryList from '@react-native-seoul/masonry-list';

const Profile = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null); // State to hold user data
  const [posts, setposts] = useState([]);
  const [friends, setfriends] = useState([]);

  useEffect(() => {
    fetchProfile(); // Call fetchProfile when the component mounts
  }, []);

  const fetchProfile = async () => {
    try {
      const userid = await AsyncStorage.getItem("token");
      const instance = await AxiosInstance();
      const result = await instance.get("/get-profile.php", {
        params: { userid: parseInt(userid) },
      });
      setUser(result.user); // Set the fetched user data into state
      setposts(result.posts);
      setfriends(result.friends);
    } catch (error) {
      console.error("Error fetching profile: ", error);
    }
  };

  return (
    <LinearGradient
      locations={[0.05, 0.4, 0.8, 1]}
      colors={["#FFFFFF", "#8B64DA", "#D195EE", "#CECBD3"]}
      style={styles.linearGradient}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.head}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require("../../Image/Vector.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
            <Image source={require("../../Image/edit.png")} />
          </TouchableOpacity>
        </View>
          {user && (
            <View style={{ alignSelf: "center" }}>
              <View style={styles.profileImage}>
                <Image source={{ uri: user.AVATAR }} style={styles.image1} />
              </View>

              <View style={styles.infoContainer}>
                <Text
                  style={[styles.name, { fontWeight: "500", fontSize: 21 }]}
                >
                  {user.NAME}
                </Text>
                <Text
                  style={[styles.text10, { color: "#4F39B4", fontSize: 20 }]}
                >
                  {user.EMAIL}
                </Text>
              </View>

              <View style={styles.statsContainer}>
                <View style={styles.statsBox}>
                  <Text style={[styles.text, styles.subText]}>
                    {posts.length}
                  </Text>
                  <Text style={[styles.text, styles.subText2]}>Posts</Text>
                </View>

                <View
                  style={[
                    styles.statsBox,
                    {
                      borderColor: "#FFFFFF",
                      borderLeftWidth: 1,
                    },
                  ]}
                >
                  <View style={styles.statsBox}>
                    <Text style={[styles.text, styles.subText]}>
                      {friends.length}
                    </Text>
                    <Text style={[styles.text, styles.subText2]}>Friend</Text>
                  </View>
                </View>
              </View>

              <Text style={styles.status}>
                {"'' "+ user.TEXT + " ''" || "No status available"}
              </Text>

              <MasonryList
                style={styles.flatList}
                data={posts}
                numColumns={2}
                renderItem={({ item, i }) => {
                  return (
                    <Image source={{ uri: item.IMAGE }} style={[styles.itemPost, i % 3 === 0 ? {height:240} : {}]} />
                  );
                }}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          )}
          {!user && (
            <View>
              <Text>Loading...</Text>
            </View>
          )}
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Profile;

const styles = StyleSheet.create({
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  name: {
    color: "#3B21B2",
    fontWeight: "bold",
  },
  image1: {
    height: 80,
    width: 80,
    borderRadius: 75,
    //overflow: "hidden",
    paddingTop: 2,
  },
  iconback: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginHorizontal: 16,
    color: "#FFFFFF",
  },

  pic: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 1,
    marginTop: 5,
  },

  row: {
    flexDirection: "row",
  },

  status: {
    color: "#FFFFFF",
    marginTop: 15,
    fontSize: 20,
    textAlign: "center",
    fontStyle:"italic",
    fontWeight:"300"
  },

  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 5,
  },

  statsBox: {
    alignItems: "center",
    flex: 1,
  },

  subText: {
    fontSize: 20,
    color: "#EFEFEF",
    fontWeight: "bold",
  },
  subText2: {
    fontSize: 20,
    color: "white",
    fontWeight: "300",
  },

  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    flex: 1,
    width: "100 %",
  },
  text10: {
    color: "#3B21B2",
    fontSize: 22,
    fontSize: "300",
  },

  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  profileImage: {
    alignItems: "center",
  },

  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 4,
  },

  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 1,
    padding: 1,
  },
  flatList: {
    flex: 1,
    marginTop: 10,
    marginBottom: 160
  },
  itemPost:{
    width: Dimensions.get('window').width/2 - 30,
    height: 150,
    resizeMode: 'cover',
    margin: 5,
    overflow: 'hidden',
    position: 'relative',
    borderRadius: 10
  }
});
