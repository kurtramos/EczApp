import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useFocusEffect } from "expo-router";
import BackArrow from "../components/BackArrow";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import { FontAwesome } from '@expo/vector-icons'; // Using FontAwesome for badge icon

const ProfileScreen = () => {
  const router = useRouter();

  // States for profile fields
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isVerified, setIsVerified] = useState(false); // New state for verification status

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const userDocRef = doc(firestore, "users", user.email ?? "");
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setFirstName(userData.firstName ?? "No First Name Available");
            setLastName(userData.lastName ?? "No Last Name Available");
            setPhoneNumber(userData.mobileNumber ?? "No Phone Number Available");
            setEmail(userData.email ?? user?.email);
            setIsVerified(userData.isVerified ?? false); // Set verification status
          } else {
            console.log("No user data found in Firestore.");
          }
        }
      };

      fetchUserData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <BackArrow onPress={() => router.push("/myaccount")} />
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>

          {/* Verification Badge */}
          <View style={styles.badgeContainer}>
            {isVerified ? (
              <View style={styles.verifiedBadge}>
                <FontAwesome name="check-circle" size={20} color="#4CAF50" />
                <Text style={styles.badgeText}>Verified User</Text>
              </View>
            ) : (
              <View style={styles.notVerifiedBadge}>
                <FontAwesome name="times-circle" size={20} color="#F44336" />
                <Text style={styles.badgeText}>Not Yet Verified</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>First Name</Text>
          <Text style={styles.value}>{firstName}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Last Name</Text>
          <Text style={styles.value}>{lastName}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Phone Number</Text>
          <Text style={styles.value}>{phoneNumber}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{email}</Text>
        </View>

        {/* Navigate to EditProfile when the button is pressed */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/editprofile")}
        >
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      </ScrollView>
      {/* <BottomNav /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    color: "#85D3C0",
    fontWeight: "600",
    marginVertical: 20,
    textAlign: "center",
  },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  notVerifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFEBEE",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  badgeText: {
    marginLeft: 5,
    fontSize: 16,
    color: "#333",
  },
  field: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
  },
  label: {
    fontSize: 20,
    color: "black",
    fontWeight: "500",
  },
  value: {
    fontSize: 20,
    color: "black",
    fontWeight: "400",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#85D3C0",
    borderRadius: 30,
    padding: 10,
    margin: 30,
    marginHorizontal: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "500",
  },
});

export default ProfileScreen;
