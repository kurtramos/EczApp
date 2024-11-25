import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, getAuth } from "firebase/auth";
import { auth } from "../firebaseConfig"; 
import BackArrow from "../components/BackArrow";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig"; 

export default function App() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const [emailForReset, setEmailForReset] = useState("");
  const router = useRouter();

  // Handle login with Firebase
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Check if email is verified
      if (!user.emailVerified) {
        Alert.alert(
          "Email Not Verified",
          "Please verify your email before logging in. Check your email inbox for the verification link.",
          [
            {
              text: "Resend Verification Email",
              onPress: async () => {
                try {
                  await sendEmailVerification(user);
                  Alert.alert("Verification Email Sent", "Please check your email.");
                } catch (error) {
                  Alert.alert("Error", error.message);
                }
              },
            },
            { text: "OK" },
          ]
        );
        return;
      }
  
      // Update Firestore to mark user as verified if necessary
      const userDocRef = doc(firestore, "users", user.email);
      const userDocSnap = await getDoc(userDocRef);
  
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        if (!userData.isVerified) {
          await updateDoc(userDocRef, { isVerified: true });
          console.log("Updated isVerified to true in Firestore");
        }
      }
  
      Alert.alert("Success", "Logged in successfully!");
      router.push("/home");
    } catch (error) {
      Alert.alert("Login Error", error.message);
    }
  };
  

  // Handle Password Reset
  const handleForgotPassword = async () => {
    if (!emailForReset) {
      Alert.alert("Enter Email", "Please enter your email address to reset your password.");
      return;
    }

    try {
      await sendPasswordResetEmail(getAuth(), emailForReset);
      Alert.alert("Password Reset Email Sent", "Please check your email to reset your password.");
      setForgotPasswordVisible(false);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <BackArrow onPress={() => router.push("/Homescreen")} />

      <Text style={styles.logInText}>Log In</Text>

      <Text style={styles.welcomeLabelText}>Welcome</Text>
      <Text style={styles.descriptionText}>
        EczemaCare App helps you monitor and manage your eczema symptoms.
        Proceed to login and start tracking today.
      </Text>

      <Text style={styles.labelText}>Email</Text>
      <TextInput
        style={styles.inputBox}
        placeholder="example@example.com"
        placeholderTextColor="#bcbcbc"
        value={email}
        onChangeText={(value) => {
          setEmail(value);
          setEmailForReset(value);
        }}
      />

      <Text style={styles.labelText}>Password</Text>
      <View style={styles.passwordWrapper}>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInputBox}
            placeholder="*************"
            placeholderTextColor="#bcbcbc"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.eyeIcon}
          >
            <Ionicons name={passwordVisible ? "eye" : "eye-off"} size={24} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.forgotPasswordWrapper}
          onPress={() => setForgotPasswordVisible(true)}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logInButton} onPress={handleLogin}>
        <Text style={styles.logInButtonText}>Log In</Text>
      </TouchableOpacity>

      {/* <Text style={styles.orSignUpText}>or log in with</Text>
      <View style={styles.socialIconsContainer}>
        <View style={styles.circle}>
          <FontAwesome name="google" size={24} color="#85D3C0" />
        </View>
        <View style={styles.circle}>
          <FontAwesome name="facebook" size={24} color="#85D3C0" />
        </View>
        <View style={styles.circle}>
          <MaterialIcons name="fingerprint" size={24} color="#85D3C0" />
        </View>
      </View> */}

      <View style={styles.signUpTextContainer}>
        <Text style={styles.noAccountText}>Don’t have an account? </Text>
        <Text style={styles.signUpText} onPress={() => router.push("/signup")}>
          Sign Up
        </Text>
      </View>

      {/* Forgot Password Modal */}
      <Modal
        visible={isForgotPasswordVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setForgotPasswordVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reset Password</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter your email"
              placeholderTextColor="#bcbcbc"
              value={emailForReset}
              onChangeText={setEmailForReset}
            />
            <TouchableOpacity style={styles.resetButton} onPress={handleForgotPassword}>
              <Text style={styles.resetButtonText}>Reset Password</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setForgotPasswordVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  backArrow: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  logInText: {
    fontSize: 24,
    color: "#85D3C0",
    fontWeight: "600",
    marginBottom: 10,
  },
  welcomeLabelText: {
    fontSize: 24,
    color: "#85D3C0",
    fontWeight: "600",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  descriptionText: {
    fontSize: 12,
    color: "#5A5858",
    textAlign: "left",
    width: 300,
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  labelText: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
    marginBottom: 5,
    width: "100%",
  },
  inputBox: {
    width: "100%",
    height: 45,
    backgroundColor: "#F3F3F3",
    borderRadius: 13,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
    color: "black",
  },
  passwordWrapper: {
    width: "100%",
  },
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F3F3",
    borderRadius: 13,
  },
  passwordInputBox: {
    width: "85%",
    height: 45,
    backgroundColor: "#F3F3F3",
    borderRadius: 13,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "black",
  },
  eyeIcon: {
    position: "absolute",
    right: 10,
    padding: 10,
  },
  forgotPasswordWrapper: {
    alignItems: "flex-end",
    marginTop: 5,
  },
  forgotPasswordText: {
    color: "#5A5858",
    fontSize: 12,
    marginRight: 10,
    textDecorationLine: "underline",
  },
  logInButton: {
    width: "50%",
    height: 45,
    backgroundColor: "#85D3C0",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  logInButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  socialIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 138,
    alignItems: "center",
    marginVertical: 20,
  },
  circle: {
    width: 40,
    height: 40,
    backgroundColor: "#C3EFE5",
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
  },
  orSignUpText: {
    fontSize: 12,
    color: "#5A5858",
    marginBottom: 10,
  },
  signUpTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  noAccountText: {
    color: "#5A5858",
    fontSize: 12,
  },
  signUpText: {
    color: "#85D3C0",
    fontSize: 12,
    fontWeight: "500",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    color: "#85D3C0",
    marginBottom: 20,
  },
  modalInput: {
    width: "100%",
    height: 45,
    backgroundColor: "#F3F3F3",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
    color: "black",
  },
  resetButton: {
    width: "100%",
    height: 45,
    backgroundColor: "#85D3C0",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  resetButtonText: {
    color: "white",
    fontSize: 16,
  },
  cancelText: {
    color: "#85D3C0",
    fontSize: 14,
    marginTop: 10,
    textDecorationLine: "underline",
  },
});
