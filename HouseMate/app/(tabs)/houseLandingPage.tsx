import React from 'react';
import { StyleSheet, Image, Platform, SafeAreaView, Text, Alert, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';


import {useHouse} from "../../context/householdContext";


export default function houseLandingPage() {
    const {housename} = useHouse();

return(
    <SafeAreaView style={[styles.safeArea]}>

        <Text style={styles.title}>
            Welcome back to {housename}!
        </Text>

        <Image source={require('../../assets/images/icons8-house-200.png')} />

        <TouchableOpacity style={[styles.button]}> 
            <View>
                <Text style={styles.buttonText}>House Rules</Text>
                <Text>Check out your roommate agreement.</Text>
            </View>
        
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button]}> 
            <View>
                <Text style={styles.buttonText}>House History</Text>
                <Text>Written by all of you.</Text>
            </View>
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
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 10,
        alignItems: 'flex-start',
        width: '85%',           
        height: '10%',
        marginVertical: 10, // Space between buttons
    },

    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
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
  