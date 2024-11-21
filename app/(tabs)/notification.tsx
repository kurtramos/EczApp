import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import BackArrow from "../components/BackArrow";
import NotificationBell from "../components/notificationbell";
import { useRouter } from "expo-router";
import { useFocusEffect } from "expo-router";
import { firestore } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import {
  doc,
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

interface Notification {
  id: number;
  title: string;
  details: string;
  opened: boolean;
  timestamp: Date;
}

const NotificationScreen: React.FC = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchNotifications = async () => {
        const user = getAuth().currentUser;
        const userEmail = user?.email;
        if (!userEmail) return;

        try {
          const notificationsRef = collection(
            firestore,
            "users",
            userEmail,
            "notifications"
          );
          const notificationsQuery = query(
            notificationsRef,
            orderBy("timestamp", "desc")
          );
          const querySnapshot = await getDocs(notificationsQuery);

          const fetchedNotifications = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              title: data.title || "Untitled Notification",
              details: data.details || "No Details",
              timestamp:
                data.timestamp instanceof Timestamp
                  ? data.timestamp.toDate()
                  : new Date(),
            };
          });

          setNotifications(fetchedNotifications);

          // Opened all notifs
          querySnapshot.forEach(async (notifDoc) => {
            const docRef = doc(
              firestore,
              "users",
              userEmail,
              "notifications",
              notifDoc.id.toString()
            );
            await updateDoc(docRef, { opened: true });
          });
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      };

      fetchNotifications();
    }, [])
  );

  const formatTimeAgo = (date: Date): string => {
    if (!(date instanceof Date)) {
      console.error("Invalid date format:", date);
      return "Invalid date";
    }

    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const days = Math.floor(diffInSeconds / 86400);

    return days > 0 ? `${days} D` : `${Math.floor(diffInSeconds / 3600)} H`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <BackArrow onPress={() => router.push("/home")} />
      </View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notification</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            time={formatTimeAgo(notification.timestamp)}
            title={notification.title}
            details={notification.details}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const NotificationItem: React.FC<{
  time: string;
  title: string;
  details: string;
}> = ({ time, title, details }) => {
  return (
    <View style={styles.notificationItem}>
      <Icon name="event-note" size={24} color="#85D3C0" style={styles.icon} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.details}>{details}</Text>
      </View>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    color: "#85D3C0",
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 45,
  },
  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DBFFF6",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15, // Add space between each notification item
  },
  icon: {
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: "black",
  },
  details: {
    fontSize: 12,
    color: "black",
    opacity: 0.6,
  },
  time: {
    fontSize: 12,
    color: "black",
  },
});

export default NotificationScreen;
