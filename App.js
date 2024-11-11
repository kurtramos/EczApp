import React, { useEffect } from "react";
import SplashScreen from "./components/SplashScreen"; // Adjust the path according to your project structure
import * as Notifications from 'expo-notifications';
import firebase from 'firebase/app';
import 'firebase/auth'; // for authentication
import 'firebase/storage'; // for image storage
import { initializeApp } from 'firebase/app';

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
const scheduleSurveyReminder = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Survey Reminder",
      body: "It's time to take your weekly POEM survey!",
      sound: true,
    },
    trigger: {
      seconds: 5 // 7 days in seconds
    },
  });
}
// Function to request notification permissions and retrieve token
const requestNotificationPermissions = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    alert('Permission for notifications was not granted.');
    return;
  }

  // Get the Expo push token
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log("Expo Push Token:", token);
  // You can store the token in Firebase or use it as needed
};

export default function App() {
  useEffect(() => {
    // Request permissions for notifications on app start
    requestNotificationPermissions();

    // Set notification handler to ensure notifications are displayed on iOS
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });

    // Optional: Listen for notifications when app is in the foreground
    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      console.log("Notification received in foreground:", notification);
    });

    // Optional: Listen for interactions with notifications
    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("Notification clicked:", response);
    });

    // Cleanup listeners on unmount
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return <SplashScreen />;
}
