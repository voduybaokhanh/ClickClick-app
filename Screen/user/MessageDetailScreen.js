import React from "react";
import { View, Text } from "react-native";

const MessageDetailScreen = ({ route }) => {
  const { messageId } = route.params;

  return (
    <View>
      <Text>Chi tiết tin nhắn</Text>
      <Text>ID tin nhắn: {messageId}</Text>
      {/* Hiển thị nội dung tin nhắn tương ứng với ID */}
    </View>
  );
};

export default MessageDetailScreen;
