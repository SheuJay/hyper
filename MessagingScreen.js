import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';

const MessagingScreen = () => {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState('');

  const sendMessage = () => {
    setMessages([...messages, { id: messages.length + 1, text: messageText }]);
    setMessageText('');
  };

  const renderItem = ({ item }) => (
    <Text>{item.text}</Text>
  );

  return (
    <View style={styles.container}>
      <FlatList 
        data={messages}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
      <TextInput 
        style={styles.input}
        value={messageText}
        onChangeText={setMessageText}
        placeholder="Type a message"
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: '100%'
  }
});

export default MessagingScreen;