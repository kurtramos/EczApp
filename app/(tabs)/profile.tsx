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

const ProfileScreen = () => {
  const router = useRouter();

  // States for profile fields
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

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
            setPhoneNumber(
              userData.mobileNumber ?? "No Phone Number Available"
            );
            setEmail(userData.email ?? user?.email);
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
    marginVertical: 50,
    textAlign: "center",
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
