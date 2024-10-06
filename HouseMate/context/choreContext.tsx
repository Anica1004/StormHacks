import React, { createContext, useState, useContext, ReactNode } from 'react';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebaseConfig';


interface ChoreContextType {
    choreID: string | null; 
    name: string;
    frequency: string | null;
    person: string | null;
    recurring: boolean;
    status: string; 
  }
  

  interface ChoreContextProviderType extends ChoreContextType {
    initChore: (choreID: string) => void; 
    setChoreID: (choreID: string | null) => void; 
    setName: (name: string | null) => void; 
    setFrequency: (frequency: string | null) => void; 
    setRecurring: (recurring: boolean) => void; 
    setPerson: (person: string | null) => void; 
    setStatus: (status: string) => void; 
  }

  const ChoreContext = createContext<ChoreContextProviderType | undefined>(undefined);


  export const ChoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [chore, setChore] = useState<ChoreContextType>({
      choreID: null,
      name: "",
      frequency: null,
      person: null,
      recurring: false,
      status: "", 
    });
  
    const updateDB = async (choreID: string, updatedFields: Partial<ChoreContextType>) => {
      try {
        const docRef = doc(db, "households/placeholder/chores", choreID);
        await updateDoc(docRef, updatedFields);
      } catch (e) {
        console.error("Error updating document: ", e);
      }
    };
  
    const initChore = async (choreID: string) => {
      try {
        const docRef = doc(db, "households/placeholder/chores", choreID);
        const docSnap = await getDoc(docRef);
  
        if (!docSnap.exists()) {
          console.error("Chore document not found");
          return;
        }
  
        const choreData = docSnap.data();
  
        setChore(prevChor => ({
          ...prevChor,
          choreID: choreID,
          name: choreData?.name || null,
          frequency: choreData?.frequency || null,
          person: choreData?.person || null,
          recurring: choreData?.recurring || false,
          status: choreData?.status || "", 
        }));
      } catch (e) {
        console.error("Error initializing user: ", e);
      }
    };
  
    const setChoreID = (choreID: string | null) => {
      setChore(prevChore => ({
        ...prevChore,
        choreID: choreID
      }));
      if (choreID) {
        updateDB(choreID, { choreID: choreID });
      }
    };
  
    const setName = (name: string) => {
      setChore(prevChore => ({
        ...prevChore,
        name
      }));
      if (chore.choreID) {
        updateDB(chore.choreID, { name : name });
      }
    };

    const setFrequency = (frequency: string | null) => {
      setChore(prevChore => ({
        ...prevChore,
        frequency
      }));
      if (chore.choreID) {
        updateDB(chore.choreID, { frequency : frequency });
      }
    };

    const setRecurring = (recurring: boolean) => {
      setChore(prevChore => ({
        ...prevChore,
        recurring
      }));
      if (chore.choreID) {
        updateDB(chore.choreID, { recurring : recurring });
      }
    };

    const setPerson = (person: string | null) => {
      setChore(prevChore => ({
        ...prevChore,
        person
      }));
      if (chore.choreID) {
        updateDB(chore.choreID, { person : person });
      }
    };

    const setStatus = (status: string) => {
      setChore(prevChore => ({
        ...prevChore,
        status
      }));
      if (chore.choreID) {
        updateDB(chore.choreID, { status : status });
      }
    };




  
    return (
      <ChoreContext.Provider value={{
        ...chore,
        initChore, 
        setChoreID, 
        setName, 
        setFrequency, 
        setRecurring, 
        setPerson, 
        setStatus, 
      }}>
        {children}
      </ChoreContext.Provider>
    );
  };
 
  export const useChore = () => {
    const context = useContext(ChoreContext);
    if (context === undefined) {
      throw new Error('useChore must be used within a ChoreProvider');
    }
    return context;
  };
  