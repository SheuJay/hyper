import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

const MedicationRemindersScreen = () => {
  const [medications, setMedications] = useState([]);

  useEffect(() => {
    const fetchMedications = async () => {
      const storedMedications = await AsyncStorage.getItem('medications');
      if (storedMedications) {
        setMedications(JSON.parse(storedMedications));
      } else {
        // Fallback to initial data or fetch from an API if connected
        const defaultMedications = [
          { id: '1', name: 'Aspirin', dosage: '500mg', frequency: 'Twice a day' },
          { id: '2', name: 'Metformin', dosage: '1000mg', frequency: 'Once a day' },
        ];
        setMedications(defaultMedications);
      }
    };
    fetchMedications();
  }, []);

  const storeMedications = async (newMedications) => {
    try {
      await AsyncStorage.setItem('medications', JSON.stringify(newMedications));
      setMedications(newMedications);
    } catch (e) {
      console.error('Failed to save medications', e);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.medItem}>
      <Text>{item.name} - {item.dosage} - {item.frequency}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medication Reminders</Text>
      <FlatList
        data={medications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Button title="Update Medications" onPress={() => storeMedications(medications)} />
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
  medItem: {
    marginBottom: 20,
  },
});

export default MedicationRemindersScreen;
