import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker"; // Importing date picker
import { useRouter } from "expo-router";
import { useFocusEffect } from "expo-router";
import BackArrow from "../components/BackArrow";
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import { useTranslation } from "react-i18next";

const EditProfile = () => {
  const { t } = useTranslation();
  const router = useRouter();

  // States for text fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(""); // State for DOB
  const [showDatePicker, setShowDatePicker] = useState(false); // State for showing date picker

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

            // Set Date of Birth if available
            if (userData.dateOfBirth) {
              const dob = new Date(userData.dateOfBirth.seconds * 1000); // Firestore Timestamp
              setDateOfBirth(dob.toISOString().substring(0, 10)); // Format to YYYY-MM-DD
            }
          } else {
            console.log("No user data found in Firestore.");
          }
        }
      };

      fetchUserData();
    }, [])
  );

  const handlePhoneNumberChange = (text) => {
    const numericText = text.replace(/[^0-9]/g, ""); // Allow only numeric input
    if (numericText.length <= 10) {
      setPhoneNumber(numericText); // Limit input to 10 characters
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false); // Hide date picker
    if (selectedDate) {
      setDateOfBirth(selectedDate.toISOString().substring(0, 10)); // Format to YYYY-MM-DD
    }
  };

  const handleSave = async () => {
    try {
      const user = getAuth().currentUser;

      // Update details in Firestore
      const docRef = doc(firestore, "users", user?.email ?? "");
      await updateDoc(docRef, {
        firstName,
        lastName,
        mobileNumber: phoneNumber,
        dateOfBirth: new Date(dateOfBirth), // Convert string to Date object
      });

      Alert.alert(
        t("account.save"),
        `${t("account.first_name")}: ${firstName}\n${t(
          "account.last_name"
        )}: ${lastName}\n${t("account.phone_number")}: ${phoneNumber}\n${t(
          "account.date_of_birth"
        )}: ${dateOfBirth}`
      );

      router.push("/myaccount");
    } catch (error) {
      console.error("Error saving profile: ", error);
      alert("Failed to save profile.");
    }
  };

  return (
    <View style={styles.container}>
    <BackArrow onPress={() => router.push("/myaccount")} />
      <Text style={styles.title}>{t("account.edit_profile")}</Text>

      {/* First Name Input */}
      <TextInput
        style={styles.input}
        placeholder={t("account.first_name")}
        value={firstName}
        onChangeText={setFirstName}
      />

      {/* Last Name Input */}
      <TextInput
        style={styles.input}
        placeholder={t("account.last_name")}
        value={lastName}
        onChangeText={setLastName}
      />

        {/* Email Input */}
        <TextInput
        style={[styles.input, styles.disabledInput]} // Add disabledInput style
        placeholder={t("account.email")}
        value={email}
        editable={false} // Disable editing
        keyboardType="email-address"
      />

      {/* Phone Number Input */}
      <TextInput
        style={styles.input}
        placeholder={t("account.phone_number")}
        value={phoneNumber}
        onChangeText={handlePhoneNumberChange}
        keyboardType="phone-pad"
      />

    


      {/* Date of Birth Input */}
      <TouchableOpacity
        style={[styles.input, styles.dateInput]}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateText}>
          {dateOfBirth || t("account.date_of_birth")}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={dateOfBirth ? new Date(dateOfBirth) : new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>{t("account.save")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    fontSize: 18,
  },
  dateInput: {
    justifyContent: "center",
  },
  dateText: {
    color: "#333",
    fontSize: 18,
  },
  saveButton: {
    backgroundColor: "#85D3C0",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  disabledInput: {
    backgroundColor: "#f0f0f0", // Light gray background
    color: "#a9a9a9", // Gray text color
  },
  
});

export default EditProfile;
