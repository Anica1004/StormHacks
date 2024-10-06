import { React, useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { useHouse } from "../../context/householdContext";
import LottieView from "lottie-react-native";

export default function HouseLandingPage() {
    const { housename } = useHouse();

    // Sample data for house history
    const [isHistoryVisible, setHistoryVisible] = useState(false);
    const [areRulesVisible, setRulesVisible] = useState(false); // State for house rules visibility

    // Updated house history data
    const houseHistory = [
        { chore: 'Dishes', name: 'John' },
        { chore: 'Vacuuming', name: 'John' },
        { chore: 'Trash', name: 'John' },
        { chore: 'Laundry', name: 'Jane' },
        { chore: 'Grocery Shopping', name: 'Jane' },
        { chore: 'Bathroom Cleaning', name: 'Alex' },
    ];

    const houseRules = [
        { id: 1, rule: "No loud music after 10 PM." },
        { id: 2, rule: "Keep common areas clean." },
        { id: 3, rule: "Respect each other's privacy." },
    ];

    const toggleHistory = () => {
        setHistoryVisible(!isHistoryVisible);
    };

    const toggleHouseRules = () => {
        setRulesVisible(!areRulesVisible);
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

            <TouchableOpacity style={styles.button} onPress={toggleHouseRules}>
                <View>
                    <Text style={styles.buttonText}>House Rules</Text>
                    <Text>Check out your roommate agreement.</Text>
                </View>
            </TouchableOpacity>

            {areRulesVisible && (
                <View style={styles.rulesContainer}>
                    <Text style={styles.rulesTitle}>House Rules:</Text>
                    <FlatList 
                        data={houseRules}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <Text style={styles.ruleItem}>{item.rule}</Text>
                        )}
                    />
                </View>
            )}

            <TouchableOpacity style={styles.button} onPress={toggleHistory}>
                <View>
                    <Text style={styles.buttonText}>House History</Text>
                    <Text>Written by all of you.</Text>
                </View>
            </TouchableOpacity>

            {isHistoryVisible && (
                <FlatList 
                    data={houseHistory}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.historySection}>
                            <Text style={styles.historyChore}>
                                {item.chore} - <Text style={styles.historyName}>{item.name}</Text>
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
        backgroundColor: "#f0f4f7",
    },
    title: {
        textAlign: 'center',
        marginVertical: 8,
        color: "black",
        marginTop: 30,
        fontSize: 36,
        fontFamily: 'Montserrat-Bold'
    },
    icon: {
        width: 200, 
        height: 200,
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
    rulesContainer: {
        marginVertical: 10,
        backgroundColor: '#67A21A',
        borderRadius: 8,
        padding: 10,
        width: '85%',
    },
    rulesTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    ruleItem: {
        fontSize: 16,
        color: '#fff',
        marginVertical: 2,
    },
    historySection: {
        marginTop: 10,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#67A21A',
        width: '100%',
        marginBottom: 10,
    },
    historyChore: {
        fontSize: 18,
        color: '#fff',
    },
    historyName: {
        fontWeight: 'bold',
    },
});
