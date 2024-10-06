import React, { useState } from 'react';
import { StyleSheet, Image, SafeAreaView, Text, Alert, TextInput, TouchableOpacity } from 'react-native';

const noHouseAssigned = ({ navigation }: any) => {
  const [inviteCode, setInviteCode] = useState('');

  const handleConfirmInviteCode = () => {
    if (inviteCode.trim() === '') {
      Alert.alert('Error', 'Please enter an invite code!');
    } else {
      Alert.alert('Success', `Invite code confirmed: ${inviteCode}`);

      navigation.navigate("Main");


    }



  };

  // Function to handle creating a new household
  const handleCreateHousehold = () => {
    Alert.alert('Success', 'New household created!');
    // Logic to create new household
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Hello</Text>

      <Image 
        source={{ uri: "https://res.cloudinary.com/du40sblw6/image/upload/v1721157256/samples/food/dessert.jpg" }}
        style={styles.landingImage}
      />

      <TextInput
        style={styles.inviteCodeBox}
        placeholder="Enter Invite Code"
        placeholderTextColor="#c4c4c4"
        value={inviteCode}
        onChangeText={setInviteCode}
      />

      {/* Button to confirm invite code */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmInviteCode}>
        <Text style={styles.buttonText}>Confirm Invite Code</Text>
      </TouchableOpacity>

      {/* Button to create a new household */}
      <TouchableOpacity style={styles.createHouseButton} onPress={handleCreateHousehold}>
        <Text style={styles.buttonText}>Create New Household</Text>
      </TouchableOpacity>    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2', // Soft background color
    paddingHorizontal: 20, // Padding for the whole view
  },
  title: {
    textAlign: 'center',
    color: '#333',
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  landingImage: {
    width: 280,
    height: 180,
    borderRadius: 15,
    marginBottom: 30,
    resizeMode: 'cover',
  },
  inviteCodeBox: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#67A21A',
    backgroundColor: '#fff', // Background for text input
    marginBottom: 15,
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  confirmButton: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3, // Shadow effect for Android
  },
  createHouseButton: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: '#67A21A',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default noHouseAssigned; 

