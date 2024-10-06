import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView, 
  StyleSheet,
  Platform,
} from "react-native";

import { useChore } from "../../context/choreContext";
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useUser } from "../../context/userContext"; 

interface ChoreData {
    choreID: string; 
    name: string;
    frequency: string ;
    person: string;
    recurring: boolean;
    status: string; 
}

export default function MyChores() { // Component names should start with an uppercase letter
    const { houseID, currentChores } = useUser();
    const [chores, setChores] = useState<ChoreData[]>([]);
    
    useEffect(() => {
        fetchChoreData();
    }, []);

    const fetchChoreData = async () => {
        const chorePaths = currentChores.map((chore) => {
            return `households/${houseID}/chores/${chore}`; // Add return statement here
        });

        try {
            const choreData: ChoreData[] = [];

            // Loop through each path and fetch the document
            for (const path of chorePaths) {
                const choreDoc = doc(db, path);
                const choreSnap = await getDoc(choreDoc); // Use getDoc here

                if (choreSnap.exists()) {
                    choreData.push({ choreID: choreSnap.id, ...choreSnap.data() } as ChoreData);
                } else {
                    console.log(`No such document at ${path}`);
                }
            }

            setChores(choreData);
            console.log(choreData);
        } catch (error) {
            console.error("Error fetching chore data:", error);
        }
    };

    return (
        <ScrollView>
            <View>
                {chores.map(chore => (
                    <View key={chore.choreID} style={styles.choreItem}>
                        <Text style={styles.choreName}>{chore.name}</Text>
                        <Text>Frequency: {chore.frequency}</Text>
                        <Text>Assigned to: {chore.person}</Text>
                        <Text>Status: {chore.status}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    choreItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    choreName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
