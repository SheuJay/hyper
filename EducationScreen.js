import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';

const resources = [
  { id: '1', title: 'Managing Diabetes', type: 'Article' },
  { id: '2', title: 'Hypertension Awareness', type: 'Video' }
];

const EducationScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search Resources"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList 
        data={filteredResources}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text>{item.title} - {item.type}</Text>}
      />
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

export default EducationScreen;