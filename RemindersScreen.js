import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, Button, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RemindersScreen = () => {
  const [medications, setMedications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [medName, setMedName] = useState('');
  const [adherence, setAdherence] = useState('');
  const [time, setTime] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [isViewingReminders, setIsViewingReminders] = useState(false);

  useEffect(() => {
    loadMedications();
  }, []);

  const loadMedications = async () => {
    try {
      const storedMeds = await AsyncStorage.getItem('medications');
      if (storedMeds) setMedications(JSON.parse(storedMeds));
    } catch (error) {
      console.error('Failed to load medications from storage', error);
    }
  };

  const saveMedications = async (newMedications) => {
    try {
      await AsyncStorage.setItem('medications', JSON.stringify(newMedications));
    } catch (error) {
      console.error('Failed to save medications to storage', error);
    }
  };

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const addMedicationReminder = () => {
    if (medName.trim() && adherence.trim() && time.trim()) {
      const newMed = {
        id: Math.random().toString(),
        name: medName,
        adherence: adherence,
        time: time,
        date: selectedDate,
      };

      const updatedMedications = [...medications, newMed];
      setMedications(updatedMedications);
      saveMedications(updatedMedications);

      setMedName('');
      setAdherence('');
      setTime('');
      setShowModal(false);
    } else {
      alert('Please fill in all fields');
    }
  };

  const editMedicationReminder = (id) => {
    const medToEdit = medications.find((med) => med.id === id);
    if (medToEdit) {
      setMedName(medToEdit.name);
      setAdherence(medToEdit.adherence);
      setTime(medToEdit.time);
      setSelectedDate(medToEdit.date);

      const updatedMedications = medications.filter((med) => med.id !== id);
      setMedications(updatedMedications);
      saveMedications(updatedMedications);

      setShowModal(true);
    }
  };

  const removeMedicationReminder = (id) => {
    const updatedMedications = medications.filter((med) => med.id !== id);
    setMedications(updatedMedications);
    saveMedications(updatedMedications);
  };

  return (
    <View style={{ flex: 1 }}>
      <Calendar
        current={'2024-11-08'}
        onDayPress={onDayPress}
        markedDates={{ [selectedDate]: { marked: true, dotColor: 'blue' } }}
        monthFormat={'yyyy MM'}
      />

      <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center' }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#4CAF50',
            paddingVertical: 10,
            paddingHorizontal: 30,
            borderRadius: 5,
            marginRight: 10,
          }}
          onPress={() => setShowModal(true)}
        >
          <Text style={{ color: 'white', fontSize: 18 }}>Add Reminder</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: '#2196F3',
            paddingVertical: 10,
            paddingHorizontal: 30,
            borderRadius: 5,
          }}
          onPress={() => setIsViewingReminders(!isViewingReminders)}
        >
          <Text style={{ color: 'white', fontSize: 18 }}>View Reminders</Text>
        </TouchableOpacity>
      </View>

      {isViewingReminders && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18 }}>All Reminders:</Text>
          {medications.length === 0 ? (
            <Text>No reminders available</Text>
          ) : (
            medications.map((med) => (
              <View key={med.id} style={{ marginBottom: 10 }}>
                <Text>Name: {med.name}</Text>
                <Text>Adherence: {med.adherence}</Text>
                <Text>Time: {med.time}</Text>
                <Text>Date: {med.date}</Text>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <TouchableOpacity onPress={() => editMedicationReminder(med.id)}>
                    <Text style={{ color: 'blue', marginRight: 10 }}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => removeMedicationReminder(med.id)}>
                    <Text style={{ color: 'red' }}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      )}

      <Modal
        visible={showModal}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 20, marginBottom: 20 }}>Add/Edit Medication Reminder</Text>
          <TextInput
            style={{
              height: 40,
              width: '80%',
              borderColor: 'gray',
              borderWidth: 1,
              marginBottom: 20,
              paddingLeft: 10,
            }}
            placeholder="Medication Name"
            value={medName}
            onChangeText={setMedName}
          />
          <TextInput
            style={{
              height: 40,
              width: '80%',
              borderColor: 'gray',
              borderWidth: 1,
              marginBottom: 20,
              paddingLeft: 10,
            }}
            placeholder="Adherence (e.g., 2 times a day)"
            value={adherence}
            onChangeText={setAdherence}
            keyboardType="numeric"
          />
          <TextInput
            style={{
              height: 40,
              width: '80%',
              borderColor: 'gray',
              borderWidth: 1,
              marginBottom: 20,
              paddingLeft: 10,
            }}
            placeholder="Time (e.g., 08:00 AM)"
            value={time}
            onChangeText={setTime}
          />
          <Button title="Save Reminder" onPress={addMedicationReminder} />
          <Button title="Cancel" onPress={() => setShowModal(false)} />
        </View>
      </Modal>

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18 }}>Reminders for {selectedDate}:</Text>
        {medications
          .filter((med) => med.date === selectedDate)
          .map((med) => (
            <View key={med.id} style={{ marginBottom: 10 }}>
              <Text>Name: {med.name}</Text>
              <Text>Adherence: {med.adherence}</Text>
              <Text>Time: {med.time}</Text>
            </View>
          ))}
        {medications.filter((med) => med.date === selectedDate).length === 0 && (
          <Text>No medications for this day</Text>
        )}
      </View>
    </View>
  );
};

export default RemindersScreen;