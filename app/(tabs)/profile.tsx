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
import { FontAwesome } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const ProfileScreen = () => {
  const { t } = useTranslation();
  const router = useRouter();

  // States for profile fields
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(""); // State for Date of Birth
  const [isVerified, setIsVerified] = useState(false);

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
            setFirstName(userData.firstName ?? t("account.no_first_name"));
            setLastName(userData.lastName ?? t("account.no_last_name"));
            setPhoneNumber(
              userData.mobileNumber ?? t("account.no_phone_number")
            );
            setEmail(userData.email ?? user?.email);
            setIsVerified(userData.isVerified ?? false);

            // Format and set the Date of Birth
            if (userData.dateOfBirth) {
              const dob = new Date(userData.dateOfBirth.seconds * 1000); // Firestore Timestamp to JS Date
              setDateOfBirth(dob.toLocaleDateString()); // Format to readable date
            } else {
              setDateOfBirth(t("account.no_data")); // Placeholder if no DOB
            }
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
          <Text style={styles.headerTitle}>{t("account.profile")}</Text>

          {/* Verification Badge */}
          <View style={styles.badgeContainer}>
            {isVerified ? (
              <View style={styles.verifiedBadge}>
                <FontAwesome name="check-circle" size={20} color="#4CAF50" />
                <Text style={styles.badgeText}>
                  {t("account.verified_user")}
                </Text>
              </View>
            ) : (
              <View style={styles.notVerifiedBadge}>
                <FontAwesome name="times-circle" size={20} color="#F44336" />
                <Text style={styles.badgeText}>
                  {t("account.not_verified")}
                </Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>{t("account.first_name")}</Text>
          <Text style={styles.value}>{firstName}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>{t("account.last_name")}</Text>
          <Text style={styles.value}>{lastName}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>{t("account.email")}</Text>
          <Text style={styles.value}>{email}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>{t("account.phone_number")}</Text>
          <Text style={styles.value}>{phoneNumber}</Text>
        </View>

      

        {/* Date of Birth Field */}
        <View style={styles.field}>
          <Text style={styles.label}>{t("account.date_of_birth")}</Text>
          <Text style={styles.value}>{dateOfBirth}</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/editprofile")}
        >
          <Text style={styles.buttonText}>{t("account.edit_profile")}</Text>
        </TouchableOpacity>
      </ScrollView>
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
    marginTop: 30,
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
