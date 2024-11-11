import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { firestore } from '../firebaseConfig';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';

const NotificationBell = ({ onPress }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchUnreadNotifications = async () => {
      const user = getAuth().currentUser;
      const userEmail = user?.email;
      if (!userEmail) return;

      try {
        const notificationsRef = collection(firestore, "users", userEmail, "notifications");
        const unreadQuery = query(notificationsRef, where("read", "==", false));
        const querySnapshot = await getDocs(unreadQuery);
        setUnreadCount(querySnapshot.size); // Set the count of unread notifications
      } catch (error) {
        console.error("Error fetching unread notifications:", error);
      }
    };

    fetchUnreadNotifications();
  }, []);

  return (
    <TouchableOpacity onPress={onPress} style={styles.bellContainer}>
      <Icon name="notifications" size={30} color="#85D3C0" />
      {unreadCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bellContainer: {
    position: 'relative',
    padding: 5,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default NotificationBell;
