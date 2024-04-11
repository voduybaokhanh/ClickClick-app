import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

const Profileuser = () => {
  return (
    <LinearGradient
      locations={[0.05, 0.17, 0.8, 1]}
      colors={["#3B21B7", "#8B64DA", "#D195EE", "#CECBD3"]}
      style={styles.linearGradient}
    >
      <SafeAreaView style={styles.container}>
      <View style={styles.iconback}>
              <Image source={require("../Image/Vector.png")}>
                
              </Image>

            </View>

        <ScrollView showsVerticalScrollIndicator={false}>
       
          <View style={{ alignSelf: "center" }}>
            <View style={styles.profileImage}>
              <Image
                source={require("../Image/messi.webp")}
                style={styles.image}
              ></Image>
            </View>
            

            <View style={styles.infoContainer}>
              <Text style={[styles.text, { fontWeight: "400", fontSize: 30 }]}>
                Messi
              </Text>
              <Text style={[styles.text, { color: "#4F39B4", fontSize: 20 }]}>
                FootBall Player
              </Text>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statsBox}>
                <Text style={[styles.text, { fontSize: 20 }]}>20</Text>
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

            <View style={styles.socialButtonContainer}>
              <Pressable style={styles.Buttonfriend}>
                <Text style={styles.ButtonMessFriendLable}>UnFriend</Text>
              </Pressable>

              <Pressable style={styles.ButtonMess}>
                <Text style={styles.ButtonMessFriendLable}>Message</Text>
              </Pressable>
            </View>

            <Text style={styles.status}>
              ‘’ I am the best player in the world ’’
            </Text>

            <View style={styles.pic}>
              <View style={{ marginTop: 32 }}>
                <View style={styles.row}>
                <View style={styles.mediaImageContainer}>
                  <Image
                    source={require("../Image/si4.jpg")}
                    style={styles.image}
                    resizeMode="cover"
                  ></Image>
                </View>
                <View style={styles.mediaImageContainer}>
                  <Image
                    source={require("../Image/si1.jpg")}
                    style={styles.image}
                    resizeMode="cover"
                  ></Image>
                </View>

                
                </View>
                
                
              </View>
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

            

            

          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Profileuser;

const styles = StyleSheet.create({
  iconback: {
   flexDirection : 'row',
   justifyContent : 'space-between',
   marginTop : 10,
   marginHorizontal : 16,
   color : '#FFFFFF'
   
  
    
  },

  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10,
    padding: 5,
  },

  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },

  pic:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  row:{
    flexDirection: 'row',
  },

  ButtonMessFriendLable: {
    fontWeight: "600",
    fontSize: 14,
    color: "#635A8F",
    letterSpacing: 0.12,
  },

  ButtonMess: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 12,
    height: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    right: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  Buttonfriend: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 12,
    height: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    left: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  socialButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  status: {
    color: "#FFFFFF",
    marginTop: 15,
    fontSize: 20,
    textAlign: "center",
    fontFamily: "HelveticaNeue",
  },

  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 20,
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

  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 4,
  },

  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    flex: 1,
    width: "100 %",
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
    paddingTop: 2,
    alignSelf: "center",
  },
});
