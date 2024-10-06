import React from 'react';
import { StyleSheet, Image, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { useHouse } from "../../context/householdContext";
import LottieView from "lottie-react-native";

export default function HouseLandingPage() {
    const { housename } = useHouse();
    
    // Sample data for house history
    const [isHistoryVisible, setHistoryVisible] = useState(false);
    const houseHistory = [
        { name: 'John', chores: ['Dishes', 'Vacuuming', 'Trash'] },
        { name: 'Jane', chores: ['Laundry', 'Grocery Shopping'] },
        { name: 'Alex', chores: ['Bathroom Cleaning'] },
    ];

    const toggleHistory = () => {
        setHistoryVisible(!isHistoryVisible);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Text style={styles.title}>
                Welcome back to {housename}!
            </Text>

        <LottieView
          autoPlay
          style={styles.icon}
          source={require("../../assets/animation/houseIcon.json")}
        />

            <TouchableOpacity style={styles.button} onPress={toggleHistory}> 
                <View>
                    <Text style={styles.buttonText}>House Rules</Text>
                    <Text>Check out your roommate agreement.</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={toggleHistory}> 
                <View>
                    <Text style={styles.buttonText}>House History</Text>
                    <Text>Written by all of you.</Text>
                </View>
            </TouchableOpacity>

            {isHistoryVisible && (
                <FlatList 
                    data={houseHistory}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <View style={styles.historySection}>
                            <Text style={styles.historyName}>{item.name}</Text>
                            <Text style={styles.historyChores}>
                                {item.chores.join(', ')}
                            </Text>
                        </View>
                    )}
                />
            )}
        </SafeAreaView>
    ); 
}

const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      textAlign: 'center',
      marginVertical: 8,
      color: "black",
      marginTop: 30,
      fontSize: 36,
    }, 
    landingImage: {
        width: 300,
        height: 200,
        borderRadius: 10,
        marginBottom: 16,
        alignContent: 'center'
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 10,
        alignItems: 'flex-start',
        width: '85%',           
        height: '10%',
        marginVertical: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    historySection: {
        marginTop: 10,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#67A21A',
        width: '100%',
    },
    historyName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    historyChores: {
        fontSize: 16,
        color: '#fff',
    },
});

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
