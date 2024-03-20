import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const notification = [
  { id: "1", name: "Nguyễn Văn A" },
  { id: "2", name: "Trần Thị B" },
  { id: "3", name: "Lê Văn C" },
];

const Notifications = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Messenger </Text>

      <FlatList
        data={notification}
        renderItem={({ item }) => (
          <Text style={styles.member}>{item.name}</Text>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  member: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default Notifications;
