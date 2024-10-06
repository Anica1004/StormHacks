import React, { createContext, useState, useContext, ReactNode } from 'react';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebaseConfig';

interface HouseholdContextType {
  hid: string | null;
  housename: string;
  rules: string | null;
  chores: string[] | null;
  announcement: string[] | null;
}

interface HouseholdContextProviderType extends HouseholdContextType {
  initHouse: (hid: string) => void;
  setHousename: (name: string) => void;
  setRules: (rules: string) => void;
  addChore: (chore: string) => void;
  removeChore: (chore: string) => void;
  addAnnouncement: (announcement: string) => void;
  removeAnnouncement: (announcement: string) => void;
}

const HouseContext = createContext<HouseholdContextProviderType | undefined>(undefined);

export const HouseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [household, setHousehold] = useState<HouseholdContextType>({
    hid: null,
    housename: "default name",
    rules: null,
    chores: null,
    announcement: null,
  });

  const updateDB = async (hid: string, updatedFields: Partial<HouseholdContextType>) => {
    try {
      const docRef = doc(db, "households", hid);
      await updateDoc(docRef, updatedFields);
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  const initHouse = async (hid: string) => {
    try {
      const docRef = doc(db, "households", hid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.error("House document not found");
        return;
      }

      const houseData = docSnap.data() as HouseholdContextType;

      setHousehold({
        hid: houseData.hid,
        housename: houseData.housename || "default name",
        rules: houseData.rules,
        chores: houseData.chores,
        announcement: houseData.announcement,
      });
    } catch (e) {
      console.error("Error initializing house: ", e);
    }
  };

  const setHousename = (housename: string) => {
    setHousehold(prev => ({ ...prev, housename }));
    if (household.hid) {
      updateDB(household.hid, { housename });
    }
  };

  const setRules = (rules: string) => {
    setHousehold(prev => ({ ...prev, rules }));
    if (household.hid) {
      updateDB(household.hid, { rules });
    }
  };

  const addChore = (chore: string) => {
    setHousehold(prev => ({
      ...prev,
      chores: prev.chores ? [...prev.chores, chore] : [chore],
    }));
    if (household.hid) {
      manageChores(household.hid, chore, 'add');
    }
  };

  const removeChore = (chore: string) => {
    setHousehold(prev => ({
      ...prev,
      chores: prev.chores ? prev.chores.filter(c => c !== chore) : null,
    }));
    if (household.hid) {
      manageChores(household.hid, chore, 'remove');
    }
  };

  const manageChores = async (hid: string, chore: string, action: 'add' | 'remove') => {
    try {
      const docRef = doc(db, "households", hid);
      if (action === 'add') {
        await updateDoc(docRef, { chores: arrayUnion(chore) });
      } else if (action === 'remove') {
        await updateDoc(docRef, { chores: arrayRemove(chore) });
      }
    } catch (error) {
      console.error("Error updating chores:", error);
    }
  };

  const addAnnouncement = (announcement: string) => {
    setHousehold(prev => ({
      ...prev,
      announcement: prev.announcement ? [...prev.announcement, announcement] : [announcement],
    }));
    if (household.hid) {
      manageAnnouncements(household.hid, announcement, 'add');
    }
  };

  const removeAnnouncement = (announcement: string) => {
    setHousehold(prev => ({
      ...prev,
      announcement: prev.announcement ? prev.announcement.filter(a => a !== announcement) : null,
    }));
    if (household.hid) {
      manageAnnouncements(household.hid, announcement, 'remove');
    }
  };

  const manageAnnouncements = async (hid: string, announcement: string, action: 'add' | 'remove') => {
    try {
      const docRef = doc(db, "households", hid);
      if (action === 'add') {
        await updateDoc(docRef, { announcement: arrayUnion(announcement) });
      } else if (action === 'remove') {
        await updateDoc(docRef, { announcement: arrayRemove(announcement) });
      }
    } catch (error) {
      console.error("Error updating announcements:", error);
    }
  };

  return (
    <HouseContext.Provider
      value={{
        ...household,
        initHouse,
        setHousename,
        setRules,
        addChore,
        removeChore,
        addAnnouncement,
        removeAnnouncement,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

// Custom hook for using the house context
export const useHouse = () => {
  const context = useContext(HouseContext);
  if (context === undefined) {
    throw new Error('useHouse must be used within a HouseProvider');
  }
  return context;
};
