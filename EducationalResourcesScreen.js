import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const EducationalResourcesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Educational Resources</Text>
      {/* Add search functionality and list of articles/videos */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default EducationalResourcesScreen;
