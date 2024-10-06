import React from 'react';
import { StyleSheet, Image, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { useHouse } from "../../context/householdContext";
import LottieView from "lottie-react-native";

export default function houseLandingPage() {
  const { housename } = useHouse();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          Welcome back to {housename}!
        </Text>

        <LottieView
          autoPlay
          style={styles.icon}
          source={require("../../assets/animation/houseIcon.json")}
        />

        <TouchableOpacity style={styles.button}> 
          <View>
            <Text style={styles.buttonText}>House Rules</Text>
            <Text style={styles.subText}>Check out your roommate agreement.</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}> 
          <View>
            <Text style={styles.buttonText}>House History</Text>
            <Text style={styles.subText}>Written by all of you.</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  ); 
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f4f7", // Light neutral background
    alignItems: 'center',
    justifyContent: 'center',
  },

  contentContainer: {
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 30,
  },

  title: {
    textAlign: 'center',
    color: "#34495e", // Darker neutral text color
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  landingImage: {
    width: 220,
    height: 220,
    borderRadius: 20,
    marginBottom: 40,
    resizeMode: 'contain', // Makes sure the image fits without distortion
  },

  button: {
    backgroundColor: '#45820B', // Vibrant blue for buttons
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 12,
    width: '90%',
    marginVertical: 10,
    shadowColor: '#000', // Subtle shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },

  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },

  icon: {
    width: 200, 
    height: 200, 

  },
  subText: {
    color: '#ffffffcc', // Lighter text for the sub-description
    fontSize: 14,
    marginTop: 5,
  },
});
