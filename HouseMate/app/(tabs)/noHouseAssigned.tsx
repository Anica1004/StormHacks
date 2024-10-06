import React from 'react';
import { StyleSheet, Image, Platform, Button, SafeAreaView, Text, Alert, View, TextInput, TouchableOpacity } from 'react-native';



export default function noHouseAssigned() {



return(
    <SafeAreaView style={[styles.safeArea]}>

        <Text style={styles.title}>
            Hello Name!
        </Text>

        <Image source= {{uri : "https://res.cloudinary.com/du40sblw6/image/upload/v1721157256/samples/food/dessert.jpg"}}style={[styles.landingImage]}></Image>

        <TextInput style = {styles.inviteCodeBox}>
            Invite Code
        </TextInput>
        <TouchableOpacity style={styles.createHouse}>
            <Text>Make new household</Text>
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
      color: "white",
      marginTop: 30,
      fontSize: 36,
    }, 
    createHouse: {
      backgroundColor: '#67A21A', 
      color: 'white',
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
    },
    
    button: {
        backgroundColor:"#67A21A",
    }

    
  });
  