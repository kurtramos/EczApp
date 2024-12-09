// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import getStorage
import { getDatabase } from "firebase/database"; // Import Realtime Database
import { getFunctions } from "firebase/functions"; // Import Cloud Functions

const firebaseConfig = {
  apiKey: "AIzaSyCdZ5rS-RaAHsPNXZEhR1Wf6jICthRZWyY",
  authDomain: "eczemacare-1195e.firebaseapp.com",
  databaseURL: "https://eczemacare-1195e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "eczemacare-1195e",
  storageBucket: "eczemacare-1195e.appspot.com",
  messagingSenderId: "53407213745",
  appId: "1:53407213745:web:c88d68c00c19bc7b20da90",
  measurementId: "G-SB0RWKBL0Y",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app); // Initialize storage
const database = getDatabase(app); // Initialize the Realtime Database
const functions = getFunctions(app); // Initialize Cloud Functions

export { auth, firestore, storage, database, functions }; // Export storage
