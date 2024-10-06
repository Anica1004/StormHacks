// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getAuth } from "firebase/auth"; // Import Auth
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEMF5csAjrqq2sirjIGYs_rJ9sLEZdyrE",
  authDomain: "chorely-c0210.firebaseapp.com",
  projectId: "chorely-c0210",
  storageBucket: "chorely-c0210.appspot.com",
  messagingSenderId: "58107129774",
  appId: "1:58107129774:web:f75253b87c165f2a4da23f",
  measurementId: "G-Z104ECV5TE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {app, db, auth};
