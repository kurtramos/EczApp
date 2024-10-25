import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Or another icon library
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { useFocusEffect } from "expo-router";
import BottomNav from "../components/BottomNav";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";

export default function HomeScreen() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [fullName, setFullName] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserData = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          setUserEmail(user.email ?? "Unknown Email");
          setProfileImage(user.photoURL || "https://via.placeholder.com/72x72");

          const userDocRef = doc(firestore, "users", user.email ?? "");
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setFullName(userData.firstName + " " + userData.lastName);
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
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Profile Section */}
        <View style={styles.header}>
          <Image
            style={styles.profileImage}
            source={{
              uri: profileImage || "https://via.placeholder.com/72x72",
            }}
          />
          <View style={styles.greeting}>
            <Text style={styles.welcomeText}>Hi, Welcome Back</Text>
            <Text style={styles.welcomeText}>{fullName || "Guest"}</Text>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              style={styles.iconCircle}
              onPress={() => router.push("/notification")}
            >
              <Icon name="bell" size={20} color="#5A5858" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconCircle}
              onPress={() => router.push("/settings")}
            >
              <Icon name="cog" size={20} color="#5A5858" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Icon
            name="search"
            size={15}
            color="#5A5858"
            style={styles.searchIcon}
          />
          <TextInput style={styles.searchInput} placeholder="Search..." />
        </View>

        {/* Calendar Section */}
        <View style={styles.calendarContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.calendarItem}>
              <Text style={styles.calendarDay}>9</Text>
              <Text style={styles.calendarLabel}>Mon</Text>
            </View>
            <View style={styles.calendarItem}>
              <Text style={styles.calendarDay}>10</Text>
              <Text style={styles.calendarLabel}>Tue</Text>
            </View>
            <View style={[styles.calendarItem, styles.selectedDay]}>
              <Text style={styles.calendarDaySelected}>11</Text>
              <Text style={styles.calendarLabelSelected}>Wed</Text>
            </View>
            <View style={styles.calendarItem}>
              <Text style={styles.calendarDay}>12</Text>
              <Text style={styles.calendarLabel}>Thu</Text>
            </View>
            <View style={styles.calendarItem}>
              <Text style={styles.calendarDaySelected}>13</Text>
              <Text style={styles.calendarLabelSelected}>Fri</Text>
            </View>
            <View style={styles.calendarItem}>
              <Text style={styles.calendarDaySelected}>14</Text>
              <Text style={styles.calendarLabelSelected}>Sat</Text>
            </View>
          </ScrollView>
        </View>

        {/* Appointment Section */}
        <View style={styles.appointmentCard}>
          <Text style={styles.appointmentTime}>11 Wednesday - Today</Text>
          <Text style={styles.doctorName}>Dr. Malizza Custodio, M.D.</Text>
          <Text style={styles.appointmentDetails}>
            Treatment and prevention of Atopic Dermatitis.
          </Text>
        </View>

        {/* Sections for Learn, FAQs, About Us */}
        <TouchableOpacity
          style={styles.infoCard}
          onPress={() => router.push("/learn")}
        >
          <Text style={styles.infoTitle}>LEARN</Text>
          <Text style={styles.infoText}>Learn about eczema.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoCard} onPress={() => router.push('/faqs')}>
          <Text style={styles.infoTitle}>HOW TO USE</Text>
          <Text style={styles.infoText}>
            How to use certain features and navigate the app.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.infoCard}
          onPress={() => router.push("/aboutus")}
        >
          <Text style={styles.infoTitle}>DOCTORS</Text>
          <Text style={styles.infoText}>
            Learn more about the doctors.
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNav/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // alignItems: 'center',
    paddingTop: 20,
  },
  scrollViewContent: {
    paddingBottom: 80, // Adjust this value to fit the height of your BottomNav
  },
  header: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
  },
  profileImage: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  greeting: {
    marginLeft: 20,
  },
  welcomeText: {
    fontSize: 14,
    color: "#85D3C0",
    fontWeight: "700",
  },
  userName: {
    fontSize: 14,
    fontWeight: "400",
    color: "#303030",
  },
  iconContainer: {
    marginLeft: "auto",
    flexDirection: "row",
  },
  iconCircle: {
    width: 27,
    height: 27,
    backgroundColor: "#C3EFE5",
    borderRadius: 9999,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F3F3",
    borderRadius: 23,
    padding: 10,
    marginHorizontal: 20,
    marginTop: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#303030",
  },
  calendarContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  calendarItem: {
    marginRight: 10,
    alignItems: "center",
  },
  calendarDay: {
    fontSize: 24,
    color: "#303030",
    fontWeight: "500",
  },
  calendarLabel: {
    fontSize: 12,
    color: "#303030",
    fontWeight: "300",
  },
  selectedDay: {
    backgroundColor: "#85D3C0",
    borderRadius: 18,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  calendarDaySelected: {
    color: "white",
  },
  calendarLabelSelected: {
    color: "white",
  },
  appointmentCard: {
    backgroundColor: "#C3EFE5",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 17,
  },
  appointmentTime: {
    fontSize: 12,
    color: "#5A5858",
    fontWeight: "300",
  },
  doctorName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#303030",
    marginTop: 10,
  },
  appointmentDetails: {
    fontSize: 12,
    fontWeight: "300",
    color: "#5A5858",
    marginTop: 5,
  },
  infoCard: {
    backgroundColor: "#C3EFE5",
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 17,
  },
  infoTitle: {
    fontSize: 32,
    fontWeight: "600",
    color: "#5D9386",
  },
  infoText: {
    fontSize: 12,
    fontWeight: "300",
    color: "#5A5858",
  },
});
