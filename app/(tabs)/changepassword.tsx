import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  getAuth,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  signOut,
} from "firebase/auth";
import BackArrow from "../components/BackArrow";
import { useTranslation } from "react-i18next";

const ChangePasswordScreen = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const auth = getAuth();

  // Handle Password Change
  const handleChangePassword = async () => {
    // Check if any field is empty
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Error", t("settings.please_fill_in_all_fields"));
      return;
    }

    // Check if new password matches the confirm password
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", t("settings.new_passwords_do_not_match"));
      return;
    }

    // Check if the new password is the same as the current password
    if (currentPassword === newPassword) {
      Alert.alert("Error", t("settings.new_password_same_as_current"));
      return;
    }

    const user = auth.currentUser;
    if (user && user.email) {
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );

      try {
        // Reauthenticate user
        await reauthenticateWithCredential(user, credential);

        // Update password
        await updatePassword(user, newPassword);

        Alert.alert("Success", t("settings.password_changed_successfully"));

        // Sign out the user after password change and redirect to login
        await signOut(auth);
        router.push("/login");
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <BackArrow onPress={() => router.push("/settings")} />
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {t("settings.change_password")}
          </Text>
        </View>

        {/* Current Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{t("settings.current_password")}</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              secureTextEntry={!currentPasswordVisible}
              placeholder={t("settings.current_password")}
              placeholderTextColor="#bcbcbc"
              value={currentPassword}
              onChangeText={setCurrentPassword}
              style={styles.input}
            />
            <TouchableOpacity
              onPress={() => setCurrentPasswordVisible(!currentPasswordVisible)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={currentPasswordVisible ? "eye" : "eye-off"}
                size={24}
                color="grey"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* New Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{t("settings.new_password")}</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              secureTextEntry={!newPasswordVisible}
              placeholder={t("settings.new_password")}
              placeholderTextColor="#bcbcbc"
              value={newPassword}
              onChangeText={setNewPassword}
              style={styles.input}
            />
            <TouchableOpacity
              onPress={() => setNewPasswordVisible(!newPasswordVisible)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={newPasswordVisible ? "eye" : "eye-off"}
                size={24}
                color="grey"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm New Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{t("settings.confirm_new_password")}</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              secureTextEntry={!newPasswordVisible}
              placeholder={t("settings.confirm_new_password")}
              placeholderTextColor="#bcbcbc"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.input}
            />
            <TouchableOpacity
              onPress={() => setNewPasswordVisible(!newPasswordVisible)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={newPasswordVisible ? "eye" : "eye-off"}
                size={24}
                color="grey"
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>{t("settings.change_password")}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    color: "#85D3C0",
    fontWeight: "600",
    textAlign: "center",
    flex: 1,
  },
  inputContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 13,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#F3F3F3",
  },
  label: {
    fontSize: 20,
    color: "black",
    marginBottom: 5,
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#85D3C0",
    borderRadius: 24,
    padding: 12,
    marginHorizontal: 30,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
});

export default ChangePasswordScreen;
