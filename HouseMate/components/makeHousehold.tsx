import React from 'react';
import { StyleSheet, Image, Platform, SafeAreaView, Text, Alert, View, TextInput, TouchableOpacity } from 'react-native';

export default function makeHousehold() {
return(
    <SafeAreaView style={[styles.safeArea]}>

        <Text style={styles.title}>
            Make your virtual house here!
        </Text>

        <TextInput style = {styles.inviteCodeBox}>
            House Name
        </TextInput>

        <TextInput style = {styles.ruleTextBox}>
            House Rules
        </TextInput>
        <TouchableOpacity style={styles.createHouse}>
            <Text>Create</Text>
        </TouchableOpacity>    
    </SafeAreaView>
); 
}

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      justifyContent: 'center', // Center vertically
      alignItems: 'center',     // Center horizontally
    },

    title: {
      textAlign: 'center',
      marginVertical: 8,
      color: "#ccc",
      marginTop: 30,
      fontSize: 36,
    }, 

    createHouse: {
      backgroundColor: '#67A21A', 
      color: '#ccc',
      padding: 10, 
      textAlign: 'center',
      display: 'flex', // display should be 'flex' in React Native
      fontSize: 16, // font size without quotes
      borderRadius: 10,
      margin: 10
    },

    landingImage: {
        width: 300, // Set the width of the image
        height: 200, // Set the height of the image
        borderRadius: 10, 
        marginBottom: 16, // space between the image and the title text
        alignContent: 'center'
    },
    
    inviteCodeBox: {
        color: 'white',
        borderColor: "#67A21A", // Sets the color of the border
        borderRadius: 10, // Rounds the corners of the box
        borderWidth: 2, // Adds a visible border with a width of 2
        padding: 10, // Adds padding inside the text input
        width: 250, // Adjust the width as needed
        marginVertical: 10, // Adds vertical spacing
        fontSize: 16, 
    },
    
    button: {
        backgroundColor:"#67A21A",
    },

    ruleTextBox: {
        width: 250,      // Set a specific width
        height: 200,     // Set the height to make it square
        padding: 10,     // Adjust padding for text inside the box
        fontSize: 16,    // Increase font size for larger text
        borderWidth: 2,  // Add a border if necessary
        borderColor: '#67A21A', // Color for the border
        borderRadius: 10, // Optional: Control roundness of corners
        textAlignVertical: 'top', // Align text to start from the top
        color: 'white'
    },

    
  });
  