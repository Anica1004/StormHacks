import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Ionicons } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';

const CreateChore = () => {
  const [choreName, setChoreName] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [frequency, setFrequency] = useState<'Daily' | 'Weekly' | null>(null);
  const [isRecurring, setIsRecurring] = useState(false);

  const handleDateSelect = (day: { dateString: string }) => {
    setSelectedDate(day.dateString);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Create a Chore</Text>
          <TouchableOpacity>
            <Ionicons name="close" size={24} color="grey" />
          </TouchableOpacity>
        </View>

        {/* Chore Name Input */}
        <TextInput
          style={styles.input}
          placeholder="Chore Name"
          placeholderTextColor="grey"
          value={choreName}
          onChangeText={setChoreName}
        />

        {/* Calendar */}
        <View style={styles.calendarContainer}>
          <Text style={styles.label}>Choose Date</Text>
          <Calendar
            onDayPress={handleDateSelect}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: 'green' },
            }}
            theme={{
              textSectionTitleColor: 'grey',
              selectedDayBackgroundColor: 'green',
              selectedDayTextColor: 'white',
            }}
          />
        </View>

        {/* Recurring Checkbox */}
        <View style={styles.checkboxContainer}>
          <CheckBox
            title="Recurring?"
            checked={isRecurring}
            onPress={() => setIsRecurring(!isRecurring)}
            containerStyle={styles.checkbox}
            textStyle={styles.checkboxText}
            checkedColor="green"
          />
        </View>

        {/* Frequency Selection */}
        {isRecurring && (
          <View style={styles.frequencyContainer}>
            <Text style={styles.label}>Frequency</Text>
            <View style={styles.frequencyButtons}>
              <TouchableOpacity
                style={[
                  styles.frequencyButton,
                  frequency === 'Daily' && styles.selectedButton,
                ]}
                onPress={() => setFrequency('Daily')}
              >
                <Text style={[styles.frequencyText, frequency === 'Daily' && styles.selectedText]}>
                  Daily
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.frequencyButton,
                  frequency === 'Weekly' && styles.selectedButton,
                ]}
                onPress={() => setFrequency('Weekly')}
              >
                <Text style={[styles.frequencyText, frequency === 'Weekly' && styles.selectedText]}>
                  Weekly
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Add Button */}
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollViewContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    paddingTop:50,
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: 'black',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'grey',
    elevation: 2,
  },
  calendarContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkboxContainer: {
    marginBottom: 20,
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
  },
  checkboxText: {
    fontSize: 16,
    color: 'grey',
  },
  frequencyContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    elevation: 5,
  },
  frequencyButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  frequencyButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'grey',
  },
  selectedButton: {
    backgroundColor: 'green',
    borderColor: 'green',
  },
  frequencyText: {
    fontSize: 16,
    color: 'grey',
  },
  selectedText: {
    color: 'white',
  },
  addButton: {
    backgroundColor: 'green',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default CreateChore;
