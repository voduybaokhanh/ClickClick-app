import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <LinearGradient
      locations={[0.05, 0.17, 0.8, 1]}
      colors={["#3B21B7", "#8B64DA", "#D195EE", "#CECBD3"]}
      style={styles.linearGradient}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ alignSelf: "center" }}>
            <View style={styles.profileImage}>
              <Image
                source={require("../Image/jisoo1.jpg")}
                style={styles.image}
              ></Image>
            </View>

            <View style={styles.infoContainer}>
              <Text style={[styles.text, { fontWeight: "400", fontSize: 30 }]}>
                Jisoo
              </Text>
              <Text style={[styles.text, { color: "#4F39B4", fontSize: 20 }]}>
                BlackPink
              </Text>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statsBox}>
                <Text style={[styles.text, { fontSize: 20 }]}>483</Text>
                <Text style={[styles.text, styles.subText]}>Posts</Text>
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
                <Text style={[styles.text, { fontSize: 20 }]}>20 </Text>
                <Text style={[styles.text, styles.subText]}>Friend </Text>
              </View>
            </View>

            <Text style={styles.status}>‘’I can draw my life by myself’’</Text>

            <View style={styles.pic}>
              <View style={{ marginTop: 32 }}>
                <View style={styles.row}>
                <View style={styles.mediaImageContainer}>
                  <Image
                    source={require("../Image/2.png")}
                    style={styles.image}
                    resizeMode="cover"
                  ></Image>
                </View>
                <View style={styles.mediaImageContainer}>
                  <Image
                    source={require("../Image/2.png")}
                    style={styles.image}
                    resizeMode="cover"
                  ></Image>
                </View>

                
                </View>
                
              </View>
              
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Profile;

const styles = StyleSheet.create({
  pic:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  row:{
    flexDirection: 'row',
  },

  status: {
    color: "#FFFFFF",
    marginTop: 15,
    fontSize: 20,
    textAlign: "center",
  },

  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32,
  },

  statsBox: {
    alignItems: "center",
    flex: 1,
  },

  subText: {
    fontSize: 12,
    color: "#FFFFFF",
    textTransform: "uppercase",
    fontWeight: "500",
  },

  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    flex: 1,
    width: "100 %",
  },

  text: {
    fontFamily: "HelveticaNeue",
    color: "#3B21B2",
  },

  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },

  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: "hidden",
    left: 120,
    paddingTop: 2,
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
    marginHorizontal: 10,
    padding: 5,
  },
});
