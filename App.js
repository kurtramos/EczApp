import React from "react";
import SplashScreen from "./components/SplashScreen"; // Adjust the path according to your project structure
import firebase from 'firebase/app';
import 'firebase/auth'; // for authentication
import 'firebase/storage'; // for image storage
import { initializeApp } from 'firebase/app';

export default function App() {
  return <SplashScreen />;
}
// Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}