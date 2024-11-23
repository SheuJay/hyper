import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const DashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>
      <Button 
        title="Medication Reminders"
        onPress={() => navigation.navigate('RemindersScreen')}
      />
      <Button 
        title="Messaging"
        onPress={() => navigation.navigate('MessagingScreen')}
      />
      <Button 
        title="Educational Resources"
        onPress={() => navigation.navigate('EducationScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  header: {
    fontSize: 24,
    marginBottom: 20
  }
});

export default DashboardScreen;