import React, { useState } from "react";
import { View, Text, Button } from "react-native";

const MessageListScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Tin nhắn 1" },
    { id: 2, text: "Tin nhắn 2" },
    { id: 3, text: "Tin nhắn 3" },
  ]);

  const addNewMessage = () => {
    const newMessage = {
      id: messages.length + 1,
      text: `Tin nhắn ${messages.length + 1}`,
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <View>
      <Text>Danh sách tin nhắn</Text>
      {messages.map((message) => (
        <Button
          key={message.id}
          title={message.text}
          onPress={() =>
            navigation.navigate("MessageDetail", { messageId: message.id })
          }
        />
      ))}
      <Button title="Thêm tin nhắn mới" onPress={addNewMessage} />
    </View>
  );
};

export default MessageListScreen;
