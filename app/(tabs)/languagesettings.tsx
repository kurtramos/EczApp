import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router"; // useRouter from expo-router
import { useFocusEffect } from "expo-router";
import { useFonts } from "expo-font";
import BackArrow from "../components/BackArrow";
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import { useTranslation } from "react-i18next";
const { width, height } = Dimensions.get("window");

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [modalVisible, setModalVisible] = useState(false);

  const languages = ["English", "Filipino"];
  const router = useRouter(); // use useRouter for navigation

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
            setSelectedLanguage(userData.language);
          } else {
            console.log("No user data found in Firestore.");
          }
        }
      };

      fetchUserData();
    }, [])
  );

  useFocusEffect(
    React.useCallback(() => {
      const updateLanguage = async () => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const userDocRef = doc(firestore, "users", user.email ?? "");
          await updateDoc(userDocRef, { language: selectedLanguage });
          i18n.changeLanguage(selectedLanguage);
        }
      };

      updateLanguage();
    }, [selectedLanguage, i18n])
  );

  return (
    <View style={styles.container}>
      <BackArrow onPress={() => router.push("/settings")} />
      <View style={styles.selectorContainer}>
        <Text style={styles.welcomeText}>{t("settings.change_language")}</Text>

        <TouchableOpacity
          style={styles.languageBox}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.languageText}>{selectedLanguage}</Text>
          <View style={styles.dropdownIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => router.push("/settings")}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* Language Picker Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Picker
              selectedValue={selectedLanguage}
              onValueChange={(itemValue) => {
                setSelectedLanguage(itemValue);
                setModalVisible(false);
              }}
              style={styles.picker}
            >
              {languages.map((language, index) => (
                <Picker.Item key={index} label={language} value={language} />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  selectorContainer: {
    width: "100%",
    maxWidth: 400, // Max width for larger screens
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 24,
    color: "#85D3C0",
    fontFamily: "League Spartan",
    fontWeight: "600",
    textTransform: "capitalize",
    marginBottom: 50, // Reduced margin for better fit on smaller screens
  },
  languageBox: {
    width: "100%",
    height: 45,
    backgroundColor: "#F3F3F3",
    borderRadius: 13,
    justifyContent: "center",
    paddingHorizontal: 15,
    marginBottom: 100, // Ensure there is space between elements
  },
  languageText: {
    fontSize: 20,
    fontFamily: "League Spartan",
    fontWeight: "400",
    color: "black",
  },
  dropdownIcon: {
    width: 12,
    height: 12,
    borderWidth: 2,
    borderColor: "#85D3C0",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRadius: 2,
    transform: [{ rotate: "40deg" }],
    top: 14,
    position: "absolute",
    right: 15,
  },
  nextButton: {
    width: "50%",
    height: 45,
    top: 100,
    backgroundColor: "#85D3C0",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  nextButtonText: {
    color: "white",
    fontSize: 24,
    fontFamily: "League Spartan",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Semi-transparent background
  },
  modalContent: {
    width: "80%",
    maxWidth: 400, // Max width for the modal content
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
  },
  picker: {
    height: 150,
    width: "100%",
  },
});

export default LanguageSelector;
