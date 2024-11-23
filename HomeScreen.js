import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to Hypertension Chronic Care App</Text>
      <Button 
        title="Login"
        onPress={() => navigation.navigate('LoginScreen')}
      />
      <Button 
        title="Register"
        onPress={() => navigation.navigate('RegisterScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  welcome: {
    fontSize: 24,
    marginBottom: 20
  }
});

export default HomeScreen;