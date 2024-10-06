import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView, 
  StyleSheet,
  Platform,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useFocusEffect } from "@react-navigation/native";
import { signInWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useChore } from "../../context/choreContext";
import { doc, getDocs, collection, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useUser } from "../../context/userContext"; 




interface ChoreData{
    choreID: string; 
    name: string;
    frequency: string ;
    person: string;
    recurring: boolean;
    status: string; 
}


export default function chorelists() {
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

  
      const fetchChoreData = async () => {
        try {
          const data = await getDocs(collection(db,  `households/${houseID}/chores`));
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
    

return(
<ScrollView>
    <View>



    </View>
</ScrollView>
);

}