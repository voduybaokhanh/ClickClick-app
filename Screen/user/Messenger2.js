import React from "react";
import { View, FlatList, Text } from "react-native";

const Messenger2 = () => {
  // Tạo một mảng gồm 20 phần tử từ 0 đến 19
  const data = Array.from(Array(20).keys());

  // Hàm render mỗi dòng của danh sách
  const renderItem = ({ item }) => (
    <View
      style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" }}
    >
      <Text>{`Item ${item}`}</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.toString()}
    />
  );
};

export default Messenger2;
