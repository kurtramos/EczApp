import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // For navigation
import Icon from "react-native-vector-icons/MaterialIcons"; // Ensure you have this package installed
import BackArrow from "../components/BackArrow";
import { useRouter } from "expo-router";
import BottomNav from "../components/BottomNav";
import { getAuth } from "firebase/auth";

const ProfileScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        setEmail(user.email ?? "No Email Available");
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <BackArrow onPress={() => router.push("/myaccount")} />
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>First Name</Text>
          <Text style={styles.value}>John</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Last Name</Text>
          <Text style={styles.value}>Doe</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Phone Number</Text>
          <Text style={styles.value}>+123 567 89000</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{email}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Date of Birth</Text>
          <Text style={styles.value}>01 / 28 / 2002</Text>
        </View>

        <TouchableOpacity style={styles.button}>
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
    // flexDirection: 'row',
    alignItems: "center",
    // padding: 20,
  },
  headerTitle: {
    // fontSize: 24,
    // color: '#85D3C0',
    // fontWeight: '600',
    // textAlign: 'center',
    // flex: 1,
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
