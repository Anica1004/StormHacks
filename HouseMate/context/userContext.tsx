import React, { createContext, useState, useContext, ReactNode } from 'react';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useHouse } from './householdContext';

interface UserContextType {
  UID: string | null;
  username: string | null;
  email: string | null;
  houseID: string;
  profilePic: string;
  currentChores: string[];
  choreHistory: string[];
  host: boolean;
}

interface UserContextProviderType extends UserContextType {
  initUser: (uid: string) => void;
  setUserUID: (uid: string | null) => void;
  setUsername: (name: string) => void;
  setEmail: (email: string) => void;
  setProfilePic: (profilePic: string) => void;
  setCurrentChores: (chores: string[]) => void;
  addChore: (chore: string) => void;
  removeChore: (chore: string) => void;
  addChoreHistory: (chore: string) => void;
}

const UserContext = createContext<UserContextProviderType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const {initHouse} = useHouse();
  const [user, setUser] = useState<UserContextType>({
    UID: null,
    username: null,
    email: null,
    houseID: "",
    profilePic: "",
    currentChores: [],
    choreHistory: [],
    host: false,
  });

  const updateDB = async (uid: string, updatedFields: Partial<UserContextType>) => {
    try {
      const docRef = doc(db, "users", uid);
      await updateDoc(docRef, updatedFields);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  const initUser = async (uid: string) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.error("User document not found");
        return;
      }

      const userData = docSnap.data() as UserContextType; // Cast to UserContextType

      setUser(prevUser => ({
        ...prevUser,
        UID: uid,
        username: userData.username || null,
        email: userData.email || null,
        houseID: userData.houseID || "",
        profilePic: userData.profilePic || "",
        currentChores: userData.currentChores || [], // Ensure this is an array
        choreHistory: userData.choreHistory || [], // Ensure this is an array
        host: userData.host || false,
      }));
      console.log(user.houseID);
      initHouse(user.houseID);
    } catch (e) {
      console.error("Error initializing user: ", e);
    }
  };

  const setUserUID = (uid: string | null) => {
    setUser(prevUser => ({
      ...prevUser,
      UID: uid
    }));
    if (uid) {
      updateDB(uid, { UID: uid });
    }
  };

  const setUsername = (username: string) => {
    setUser(prevUser => ({
      ...prevUser,
      username
    }));
    if (user.UID) {
      updateDB(user.UID, { username });
    }
  };

  const setEmail = (email: string) => {
    setUser(prevUser => ({
      ...prevUser,
      email
    }));
    if (user.UID) {
      updateDB(user.UID, { email });
    }
  };

  // const setHouseID = (houseID: string) => {
  //   setUser(prevUser => ({
  //     ...prevUser,
  //     houseID
  //   }));
  //   if (user.UID) {
  //     updateDB(user.UID, { houseID });
  //   }
  // };

  const setProfilePic = (profilePic: string) => {
    setUser(prevUser => ({
      ...prevUser,
      profilePic
    }));
    if (user.UID) {
      updateDB(user.UID, { profilePic });
    }
  };

  const setCurrentChores = (chores: string[]) => {
    setUser(prevUser => ({
      ...prevUser,
      currentChores: chores
    }));
    if (user.UID) {
      updateDB(user.UID, { currentChores: chores });
    }
  };

  const addChore = (chore: string) => {
    setUser(prevUser => ({
      ...prevUser,
      currentChores: [...prevUser.currentChores, chore]
    }));
    
    if (user.UID) {
      manageChores(user.UID,chore, 'add');
    }
  };

  const removeChore = (chore: string) => {
    setUser(prevUser => ({
      ...prevUser,
      currentChores: prevUser.currentChores.filter(c => c !== chore)
    }));

    if (user.UID) {
        manageChores(user.UID, chore, 'remove');
    }
  };

  const manageChores = async (uid: string, chore: string, action: 'add' | 'remove' ) => {
    try {
        const docRef = doc(db, "users", uid);
        if (action === 'add') {
          await updateDoc(docRef, { currentChores: arrayUnion(chore) });
        } else if (action === 'remove') {
          await updateDoc(docRef, { currentChores: arrayRemove(chore) });
        }
      } catch (error) {
        console.error("Error updating images:", error);
      }
  }

  const addChoreHistory = (chore: string) => {
    setUser(prevUser => ({
      ...prevUser,
      choreHistory: [...prevUser.choreHistory, chore]
    }));

    if (user.UID) {
        manageChoreHistory(user.UID,chore, 'add');
    }
  };

  const manageChoreHistory = async (uid: string, chore: string, action: 'add' | 'remove' ) => {
    try {
        const docRef = doc(db, "users", uid);
        if (action === 'add') {
          await updateDoc(docRef, { currentChores: arrayUnion(chore) });
        } else if (action === 'remove') {
          await updateDoc(docRef, { currentChores: arrayRemove(chore) });
        }
      } catch (error) {
        console.error("Error updating images:", error);
      }
  } 

  return (
    <UserContext.Provider value={{
      ...user,
      initUser,
      setUserUID,
      setUsername,
      setEmail,
      setProfilePic,
      setCurrentChores,
      addChore,
      removeChore,
      addChoreHistory,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
