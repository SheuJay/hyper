import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Patient Information</Text>
      <Text>Name: John Doe</Text>
      <Text>Age: 45</Text>
      <Text>Medical History: Hypertension, Diabetes</Text>
      <Text>Medication List: Aspirin, Metformin</Text>
      <Text>Healthcare Providers: Dr. Smith, Dr. Johnson</Text>
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

export default ProfileScreen;