// import React, { useEffect } from "react";
// import SplashScreen from "./components/SplashScreen"; // Adjust the path according to your project structure
// import * as Notifications from "expo-notifications";
// import firebase from "firebase/app";
// import { initializeAuth, getReactNativePersistence } from "firebase/auth"; // for authentication
// import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
// import "firebase/storage"; // for image storage
// import { initializeApp } from "firebase/app";

// // Firebase config
// const firebaseConfig = {
//   apiKey: "AIzaSyCdZ5rS-RaAHsPNXZEhR1Wf6jICthRZWyY",
//   authDomain: "eczemacare-1195e.firebaseapp.com",
//   databaseURL:
//     "https://eczemacare-1195e-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "eczemacare-1195e",
//   storageBucket: "eczemacare-1195e.appspot.com",
//   messagingSenderId: "53407213745",
//   appId: "1:53407213745:web:c88d68c00c19bc7b20da90",
//   measurementId: "G-SB0RWKBL0Y",
// };

// // Initialize Firebase
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }
// const scheduleSurveyReminder = async () => {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "Survey Reminder",
//       body: "It's time to take your weekly POEM survey!",
//       sound: true,
//     },
//     trigger: {
//       seconds: 5, // 7 days in seconds
//     },
//   });
// };
// // Function to request notification permissions and retrieve token
// const requestNotificationPermissions = async () => {
//   const { status: existingStatus } = await Notifications.getPermissionsAsync();
//   let finalStatus = existingStatus;

//   if (existingStatus !== "granted") {
//     const { status } = await Notifications.requestPermissionsAsync();
//     finalStatus = status;
//   }

//   if (finalStatus !== "granted") {
//     alert("Permission for notifications was not granted.");
//     return;
//   }

//   // Get the Expo push token
//   const token = (await Notifications.getExpoPushTokenAsync()).data;
//   console.log("Expo Push Token:", token);
//   // You can store the token in Firebase or use it as needed
// };

// export default function App() {
//   useEffect(() => {
//     // Request permissions for notifications on app start
//     requestNotificationPermissions();

//     // Set notification handler to ensure notifications are displayed on iOS
//     Notifications.setNotificationHandler({
//       handleNotification: async () => ({
//         shouldShowAlert: true,
//         shouldPlaySound: true,
//         shouldSetBadge: true,
//       }),
//     });

//     // Optional: Listen for notifications when app is in the foreground
//     const notificationListener = Notifications.addNotificationReceivedListener(
//       (notification) => {
//         console.log("Notification received in foreground:", notification);
//       }
//     );

//     // Optional: Listen for interactions with notifications
//     const responseListener =
//       Notifications.addNotificationResponseReceivedListener((response) => {
//         console.log("Notification clicked:", response);
//       });

//     // Cleanup listeners on unmount
//     return () => {
//       Notifications.removeNotificationSubscription(notificationListener);
//       Notifications.removeNotificationSubscription(responseListener);
//     };
//   }, []);

//   // return <SplashScreen />;
// }
