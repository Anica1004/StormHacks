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


import { useChore } from "../../context/choreContext"
import { doc, getDocs, collection, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useUser } from "../../context/userContext"; 
import { signInWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "../../firebaseConfig";
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

  const {
    choreID, 
    name, 
    frequency, 
    person, 
    recurring,
    status
} = useChore(); 

const { houseID } = useUser();
const [chores, setChores] = useState<ChoreData[]>([]);

useEffect(() => {
    fetchChoreData();
  }, []);


  // const mockChores: ChoreData[] = [
  //   {
  //     choreID: "1",
  //     name: "Dishes",
  //     frequency: "Daily",
  //     person: "John Doe",
  //     recurring: true,
  //     status: "Incomplete",
  //   },
  //   {
  //     choreID: "2",
  //     name: "Vacuum Living Room",
  //     frequency: "Weekly",
  //     person: "Alex Johnson",
  //     recurring: true,
  //     status: "Complete",
  //   },
  //   {
  //     choreID: "3",
  //     name: "Take out trash",
  //     frequency: "Every 3 days",
  //     person: "Alex Johnson",
  //     recurring: true,
  //     status: "Incomplete",
  //   },
  //   {
  //     choreID: "4",
  //     name: "Mow Lawn",
  //     frequency: "Bi-weekly",
  //     person: "",
  //     recurring: false,
  //     status: "Unclaimed",
  //   },
  //   {
  //     choreID: "5",
  //     name: "Clean Bathroom",
  //     frequency: "Weekly",
  //     person: "Jane Smith",
  //     recurring: true,
  //     status: "Complete",
  //   },
  //   {
  //     choreID: "6",
  //     name: "Give the Dog a Bath",
  //     frequency: "Every 3 days",
  //     person: "Jane Smith",
  //     recurring: true,
  //     status: "Incomplete",
  //   },
  //   {
  //     choreID: "7",
  //     name: "Clean Fish Tank",
  //     frequency: "Weekly",
  //     person: "Jane Smith",
  //     recurring: true,
  //     status: "Complete",
  //   },
  // ];

  // const [chores, setChores] = useState<ChoreData[]>([]);
  const [isModalVisible, setModalVisible] = useState(false); // State for modal visibility

  useEffect(() => {
    const sortedChores = sortChoresByStatus(chores);
    setChores(sortedChores);
  }, []);


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

  const handleRegister = (choreID: string) => {
    // Your register logic here, possibly using choreID to identify which chore to register for
    console.log(`Registering for chore ID: ${choreID}`);
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
    paddingVertical: 5,  
    paddingHorizontal: 10, 
    borderRadius: 5,
  },
  registerButtonText: {
    color: "#FFFFFF", 
    fontSize: 14, 
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#6200EE", // Customize your button color
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  closeButtonText: {
    fontSize: 18,
    color: "#6200EE", // Customize your close button color
  },
});

