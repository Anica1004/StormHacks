import React, { createContext, useState, useContext, ReactNode } from 'react';
import { doc, addDoc, updateDoc, arrayUnion, getDocs, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';

interface Announcement {
  image: string | null;
  text: string | null;
  title: string | null;
  name: string | null;
  seenBy: string[]; 
}

interface AnnouncementContextType {
  announcements: Announcement[]; 
  createAnnouncement: (announcement: Announcement) => Promise<void>;
  addSeenBy: (announcementId: string, userId: string) => Promise<void>;
  loadAnnouncements: () => Promise<void>; 
}

const AnnouncementContext = createContext<AnnouncementContextType | undefined>(undefined);

export const AnnouncementProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]); 

  const createAnnouncement = async (announcementData: Announcement) => {
    try {
      const announcementsCollectionRef = collection(db, "households/placeholder/announcements");
  
      const docRef = await addDoc(announcementsCollectionRef, {
        ...announcementData, 
        title: announcementData.title, 
      });
  
      console.log("Announcement created with ID: ", docRef.id);
      setAnnouncements(prev => [...prev, { ...announcementData }]); 
    } catch (error) {
      console.error("Error creating announcement: ", error);
    }
  }

  const addSeenBy = async (announcementId: string, userId: string) => {
    try {
      const docRef = doc(db, "announcements", announcementId);
      await updateDoc(docRef, {
        seenBy: arrayUnion(userId)
      });
      console.log(`User ${userId} marked as seen for announcement ${announcementId}`);
    } catch (error) {
      console.error("Error updating seenBy: ", error);
    }
  };

  const loadAnnouncements = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "announcements"));
      const allAnnouncements: Announcement[] = [];
      querySnapshot.forEach((doc) => {
        allAnnouncements.push({ ...doc.data() } as Announcement); 
      });
      setAnnouncements(allAnnouncements);
      console.log("Loaded announcements: ", allAnnouncements);
    } catch (error) {
      console.error("Error loading announcements: ", error);
    }
  };

  return (
    <AnnouncementContext.Provider value={{
      announcements,
      createAnnouncement,
      addSeenBy,
      loadAnnouncements
    }}>
      {children}
    </AnnouncementContext.Provider>
  );
};

export const useAnnouncement = () => {
  const context = useContext(AnnouncementContext);
  if (context === undefined) {
    throw new Error('useAnnouncement must be used within an AnnouncementProvider');
  }
  return context;
};
