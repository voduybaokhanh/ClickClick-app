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

const Profileuser = () => {
  return (
    <LinearGradient
    locations={[0.05, 0.17, 0.8, 1]}
    colors={["#3B21B7", "#8B64DA", "#D195EE", "#CECBD3"]}
    style={styles.linearGradient}>

      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{alignSelf: "center"}}>
            <View style={styles.profileImage}>
                <Image source={require('../Image/messi.webp')}
                style={styles.image}
                >
                    
                </Image>

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


          </View>


        </ScrollView>
        
    </SafeAreaView>  

    </LinearGradient>
 
  )
}

export default Profileuser

const styles = StyleSheet.create({

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
        alignSelf : 'center',
        

       
        
      }, 

})