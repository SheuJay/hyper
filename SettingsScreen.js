import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <Button title="Notification Preferences" onPress={() => {}} />
      <Button title="Password Reset" onPress={() => {}} />
      <Button title="Help/Support" onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  }
});

export default SettingsScreen;