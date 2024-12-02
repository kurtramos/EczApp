import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Modal } from "react-native";
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
  const [failedAttempts, setFailedAttempts] = useState(0); // Track failed attempts
  const [cooldown, setCooldown] = useState(false); // Track cooldown state
  const [cooldownTime, setCooldownTime] = useState(15); // Cooldown duration in seconds
  const router = useRouter();
  const cooldownTimer = useRef(null); // To hold the cooldown timer

  // Handle login with Firebase
  const handleLogin = async () => {
    // Step 1: Check if cooldown is active
    if (cooldown) {
      Alert.alert(
        "Cooldown Active",
        `You have reached the maximum number of attempts. Please try again in ${cooldownTime} seconds.`
      );
      return;
    }

    // Step 2: Validate Email Format
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    // Step 3: Convert email to lowercase
    const emailLowerCase = email.toLowerCase();

    // Validate the email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailLowerCase)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    // Step 4: Check if the email ends with '@gmail.com' or other valid domains
    const validDomains = ['@gmail.com', '@ust.edu.ph']; // You can add more domains here
    const emailDomain = emailLowerCase.split('@')[1];

    if (!validDomains.includes(`@${emailDomain}`)) {
      Alert.alert("Invalid Email", "Please use a valid email domain (@gmail.com).");
      return;
    }

    // Step 5: Check if the email exists in Firestore
    try {
      const userDocRef = doc(firestore, "users", emailLowerCase); // Use lowercase email here
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        // If email is not found in Firestore, prompt user to register
        Alert.alert(
          "Email Not Registered",
          "It seems you don't have an account. Would you like to register?",
          [
            {
              text: "Register",
              onPress: () => router.push("/signup"), // Navigate to sign-up page
            },
            {
              text: "Cancel",
              onPress: () => console.log("User chose not to register"),
            },
          ]
        );
        return; // Exit the function as email isn't registered
      }

      // Step 6: Proceed to Firebase Authentication (sign in)
      const userCredential = await signInWithEmailAndPassword(auth, emailLowerCase, password); // Use lowercase email here
      const user = userCredential.user;

      // Step 7: Check if email is verified
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

      // Step 8: Update Firestore to mark the user as verified if necessary
      const userDocRefForUpdate = doc(firestore, "users", user.email);
      const userDocSnapForUpdate = await getDoc(userDocRefForUpdate);

      if (userDocSnapForUpdate.exists()) {
        const userData = userDocSnapForUpdate.data();
        if (!userData.isVerified) {
          await updateDoc(userDocRefForUpdate, { isVerified: true });
          console.log("Updated isVerified to true in Firestore");
        }
      }

      // Step 9: Proceed to the home screen after successful login
      Alert.alert("Success", "Logged in successfully!");
      router.push("/home"); // Navigate to the home page

      // Reset failed attempts on successful login
      setFailedAttempts(0);

    } catch (error) {
      // Handle failed login attempts
      const updatedFailedAttempts = failedAttempts + 1;
      setFailedAttempts(updatedFailedAttempts);

      if (updatedFailedAttempts >= 5) {
        // Start cooldown if failed attempts exceed 5
        setCooldown(true);
        Alert.alert(
          "Too Many Attempts",
          "You have exceeded the maximum number of attempts. Please try again in 15 seconds."
        );

        // Start cooldown timer
        if (cooldownTimer.current) clearInterval(cooldownTimer.current);
        
        cooldownTimer.current = setInterval(() => {
          setCooldownTime((prevTime) => {
            if (prevTime === 1) {
              clearInterval(cooldownTimer.current);
              setCooldown(false);
              setCooldownTime(15); // Reset cooldown time
            }
            return prevTime - 1;
          });
        }, 1000);
      } else {
        if (error.code === "auth/invalid-email") {
          Alert.alert("Invalid Email", "Please enter a valid email address.");
        } else if (error.code === "auth/user-not-found") {
          Alert.alert("Login Error", "This email is not registered. Please sign up.");
        } else if (error.code === "auth/wrong-password") {
          Alert.alert("Login Error", "Incorrect password. Please try again.");
        }

        Alert.alert(
          "Login Error",
          `Incorrect credentials. You have ${5 - updatedFailedAttempts} attempts remaining before the cooldown starts.`
        );
      }
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
        placeholder="example@gmail.com"
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
