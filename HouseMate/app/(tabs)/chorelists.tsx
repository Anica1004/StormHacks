import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { MaterialIcons } from '@expo/vector-icons';
import CreateChore from './createChore'; // Make sure the path is correct
import { useChore } from "../../context/choreContext";
import { doc, getDocs, collection, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useUser } from "../../context/userContext"; 
import { useFocusEffect } from "@react-navigation/native";

interface ChoreData {
  choreID: string; 
  name: string;
  frequency: string;
  person: string;
  recurring: boolean;
  status: string; 
}

export default function Chorelists() {
  const { houseID, username, addChore } = useUser();
  const [chores, setChores] = useState<ChoreData[]>([]);
  const [isModalVisible, setModalVisible] = useState(false); // State for modal visibility

  // Function to fetch chore data
  const fetchChoreData = async () => {
    try {
      const data = await getDocs(collection(db, `households/${houseID}/chores`));
      const choreData: ChoreData[] = [];
  
      data.forEach((doc) => {
        const currData = doc.data();
        const currUser = {
          choreID: currData.choreID as string,
          name: currData.name as string,
          frequency: currData.frequency as string, 
          person: currData.person as string,
          recurring: currData.recurring as boolean,
          status: currData.status as string,
        };
        choreData.push(currUser);
      });
  
      setChores(choreData);
      console.log("Fetched chore data: ", choreData);
  
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  // Call fetchChoreData when the component is focused
  useFocusEffect(
    React.useCallback(() => {
      fetchChoreData();
    }, [])
  );

  const sortChoresByStatus = (chores: ChoreData[]) => {
    return chores.sort((a, b) => {
      const statusOrder = { "Unclaimed": 1, "Incomplete": 2, "Complete": 3 };
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

  const handleRegister = async (choreID: string) => {
    try {
      const choreDocRef = doc(db, `households/${houseID}/chores`, choreID);
      const choreDoc = await getDoc(choreDocRef);
  
      if (choreDoc.exists()) {
        await updateDoc(choreDocRef, {
          status: "Incomplete",
          person: username, 
        });

        addChore(choreID);
        console.log(`Chore with ID ${choreID} updated successfully.`);
  
        fetchChoreData(); // Re-fetch chore data after registration
  
      } else {
        console.log("No such chore found!");
      }
    } catch (error) {
      console.error("Error updating chore frequency: ", error);
    }
  };
  
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedText style={styles.title}>Chores of the Week</ThemedText>

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
                    <View style={styles.iconContainer}>
                      {getStatusIcon(chore.status)}
                    </View>
                    <View style={styles.textContainer}>
                      <View style={styles.statusContainer}>
                        <ThemedText
                          style={{
                            color: statusStyle.color,
                            fontFamily: "Montserrat-Black",
                            fontSize: 19,
                          }}
                        >
                          {chore.status}
                        </ThemedText>
                      </View>
                      <ThemedText style={{ fontFamily: "Montserrat-Bold", fontSize: 17 }}>
                        {chore.name}
                      </ThemedText>
                      <ThemedText style={{ color: "#878787", fontWeight: 0 }}>
                        {chore.person || ""}
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
                </View>
              );
            })
          ) : (
            <Text style={styles.noChoresText}>No chores available</Text>
          )}
        </View>
        
        <TouchableOpacity style={styles.addButton} onPress={openModal}>
          <Text style={styles.addButtonText}>Add Chore</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal for Create Chore */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <CreateChore />
          </View>
        </View>
      </Modal>
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
  buttonContainer: {
    position: "absolute", 
    bottom: 10, 
    right: 10, 
  },
  registerButton: {
    backgroundColor: "#820B66", 
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  registerButtonText: {
    color: "#fff", 
    fontWeight: "bold", 
  },
  addButton: {
    backgroundColor: "#4CAF50", 
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff", 
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  closeButton: {
    alignSelf: "flex-end", 
    padding: 10,
  },
  closeButtonText: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
