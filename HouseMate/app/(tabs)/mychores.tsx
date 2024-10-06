import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { MaterialIcons } from "@expo/vector-icons";
import { useUser } from "../../context/userContext";
import { useChore } from "../../context/choreContext";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useFocusEffect } from "@react-navigation/native"; // Import useFocusEffect

interface ChoreData {
  choreID: string;
  name: string;
  frequency: string;
  person: string;
  recurring: boolean;
  status: string;
}

export default function MyChores() {
  const { houseID, currentChores } = useUser();
  const [chores, setChores] = useState<ChoreData[]>([]);

  const fetchChoreData = async () => {
    const chorePaths = currentChores.map((chore) => {
      return `households/${houseID}/chores/${chore}`;
    });

    try {
      const choreData: ChoreData[] = [];
      for (const path of chorePaths) {
        const choreDoc = doc(db, path);
        const choreSnap = await getDoc(choreDoc);

        if (choreSnap.exists()) {
          choreData.push({ choreID: choreSnap.id, ...choreSnap.data() } as ChoreData);
        } else {
          console.log(`No such document at ${path}`);
        }
      }
      setChores(choreData);
    } catch (error) {
      console.error("Error fetching chore data:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchChoreData(); // Fetch chores every time the tab is focused
    }, [currentChores, houseID]) // Add dependencies
  );

  const sortChoresByStatus = (chores: ChoreData[]) => {
    return chores.sort((a, b) => {
      const statusOrder = { Unclaimed: 1, Incomplete: 2, Complete: 3 };
      return statusOrder[a.status] - statusOrder[b.status];
    });
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Complete":
        return { backgroundColor: "#E0F5CC", color: "#45820B" };
      case "Incomplete":
        return { backgroundColor: "#FFF2DC", color: "#830707" };
      case "Unclaimed":
        return { backgroundColor: "#ECD6F7", color: "#820B76" };
      default:
        return { backgroundColor: "#F0F0F0", color: "#000" };
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Complete":
        return <MaterialIcons name="celebration" size={30} color="#45820B" />;
      case "Incomplete":
        return <MaterialIcons name="hourglass-empty" size={30} color="#830707" />;
      case "Unclaimed":
        return <MaterialIcons name="notifications" size={30} color="#820B76" />;
      default:
        return null;
    }
  };

  const handleComplete = async (choreID: string) => {
    try {
      // Find the document reference for the chore in Firestore
      const choreDocRef = doc(db, `households/${houseID}/chores/${choreID}`);
      
      // Update the chore status to 'Complete' in Firestore
      await updateDoc(choreDocRef, {
        status: "Complete",
      });
  
      // Update the local state only after Firestore is updated
      const updatedChores = chores.map((chore) =>
        chore.choreID === choreID ? { ...chore, status: "Complete" } : chore
      );
      setChores(updatedChores);
    } catch (error) {
      console.error("Error updating chore status:", error);
    }
  };



  const handleRegister = (choreID: string) => {
    console.log(`Registering for chore ID: ${choreID}`);
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedText style={styles.title}>My Chores this Week</ThemedText>
        <View style={styles.container}>
          {chores.length > 0 ? (
            chores.map((chore) => {
              const statusStyle = getStatusStyle(chore.status);
              return (
                <View
                  key={chore.choreID}
                  style={[styles.choreCard, { backgroundColor: statusStyle.backgroundColor }]}
                >
                  <View style={styles.rowContainer}>
                    <View style={styles.iconContainer}>{getStatusIcon(chore.status)}</View>
                    <View style={styles.textContainer}>
                      <View style={styles.statusContainer}>
                        <ThemedText
                          style={{ color: statusStyle.color, fontFamily: "Montserrat-Black", fontSize: 19 }}
                        >
                          {chore.status}
                        </ThemedText>
                      </View>
                      <ThemedText style={{ fontFamily: "Montserrat-Bold", fontSize: 17 }}>
                        {chore.name}
                      </ThemedText>
                    </View>
                  </View>
                  
                  {chore.status === "Unclaimed" && (
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={styles.registerButton}
                        onPress={() => handleRegister(chore.choreID)}
                      >
                        <Text style={styles.registerButtonText}>Sign up</Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  {chore.status === "Incomplete" && (
                    <View style={styles.buttonBelowText}>
                      <TouchableOpacity
                        style={styles.completeButton}
                        onPress={() => handleComplete(chore.choreID)}
                      >
                        <Text style={styles.completeButtonText}>Mark as Complete</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              );
            })
          ) : (
            <Text style={styles.noChoresText}>No chores available</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
  scrollContainer: {
    paddingVertical: 20,
    flexGrow: 1,
  },
  title: {
    fontFamily: "Montserrat-Bold",
    fontSize: 30,
    paddingTop: 80,
    alignItems: "center",
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  choreCard: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    width: "90%",
    justifyContent: "center",
    alignItems: "flex-start",
    position: "relative",
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContainer: {
    marginRight: 20,
    marginLeft: 10,
  },
  textContainer: {
    flex: 1,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  noChoresText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  buttonBelowText: {
    marginTop: 10, // Push the button below the text
    alignSelf: "stretch", // Full width button
  },
  registerButton: {
    backgroundColor: "#820B66",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    textAlign: "center",
  },
  completeButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: "60%",
    alignSelf: 'center'
  },
  completeButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    textAlign: "center",
  },
});
