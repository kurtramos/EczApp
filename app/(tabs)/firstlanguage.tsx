import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import { useTranslation } from "react-i18next";

const firstlanguage = () => {
  const { t, i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const languages = ["English", "Filipino"];

  // Save selected language in Firestore and navigate to sign up page
  const saveLanguage = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      // Save language to Firestore
      const userDocRef = doc(firestore, "users", user.email ?? "");
      await setDoc(userDocRef, { language: selectedLanguage }, { merge: true });

      // Change language in i18n
      i18n.changeLanguage(selectedLanguage);

      // Navigate to the sign-up screen
      router.push("/signup");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("welcome.select_language")}</Text>

      <TouchableOpacity
        style={styles.languageBox}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.languageText}>{selectedLanguage}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.nextButton} onPress={saveLanguage}>
        <Text style={styles.nextButtonText}>{t("common.next")}</Text>
      </TouchableOpacity>

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
  title: {
    fontSize: 24,
    color: "#85D3C0",
    fontFamily: "League Spartan",
    fontWeight: "600",
    textTransform: "capitalize",
    marginBottom: 50,
  },
  languageBox: {
    width: "100%",
    height: 45,
    backgroundColor: "#F3F3F3",
    borderRadius: 13,
    justifyContent: "center",
    paddingHorizontal: 15,
    marginBottom: 30,
  },
  languageText: {
    fontSize: 20,
    fontFamily: "League Spartan",
    fontWeight: "400",
    color: "black",
  },
  nextButton: {
    width: "50%",
    height: 45,
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    maxWidth: 400,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
  },
  picker: {
    height: 150,
    width: "100%",
  },
});

export default firstlanguage;
