import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
  Switch,
  Image,
} from "react-native";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import BackArrow from "../components/BackArrow";
import termsAndConditions from '../components/TermsAndConditions';

// Firebase imports
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { firestore } from "../firebaseConfig";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const SignUpScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [tempDate, setTempDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const scrollViewRef = useRef(null);
  const router = useRouter();

  const handleNameChange = (
    value: string,
    setName: {
      (value: React.SetStateAction<string>): void;
      (value: React.SetStateAction<string>): void;
      (arg0: any): void;
    }
  ) => {
    const alphabetRegex = /^[A-Za-z\s]+$/;
    if (value === "" || alphabetRegex.test(value)) {
      setName(value);
    } else {
      Alert.alert(
        "Invalid Input",
        "Name must contain only alphabetic characters."
      );
    }
  };

  const handleMobileNumberChange = (
    value: any[] | React.SetStateAction<string>
  ) => {
    const numericRegex = /^[0-9]*$/;
    if (numericRegex.test(value) && value.length <= 10) {
      setMobileNumber(value);
    } else if (value.length > 10) {
      Alert.alert(
        "Invalid Input",
        "Mobile number must be up to 10 digits only."
      );
    }
  };

  const onDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setTempDate(selectedDate); // Temporarily save the selected date
    }
  };

  const confirmDateOfBirth = () => {
    setDateOfBirth(tempDate); // Set the confirmed date as date of birth
    setShowDatePicker(false); // Close the date picker modal
  };

  const handleScroll = (event) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    if (contentOffset.y + layoutMeasurement.height >= contentSize.height - 50) {
      setHasScrolledToBottom(true);
    }
  };

  const closeTermsModal = () => {
    if (hasScrolledToBottom) {
      setShowTermsModal(false);
      setTermsAccepted(true);
    } else {
      Alert.alert("Please scroll to the bottom to accept the terms.");
    }
  };

  const handleCheckboxPress = () => {
    setShowTermsModal(true); // Automatically open the modal when the checkbox is clicked
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }
    if (!email || !password) {
      Alert.alert("Error", "Please fill all the fields!");
      return;
    }
    if (!termsAccepted) {
      Alert.alert(
        "Error",
        "You must accept the Terms of Use & Privacy Policy."
      );
      return;
    }

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);
      Alert.alert(
        "Verification Email Sent",
        "Please check your email to verify your account."
      );

      // Add user details to Firestore
      const docRef = doc(firestore, "users", email);
      await setDoc(docRef, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNumber: mobileNumber,
        dateOfBirth: dateOfBirth,
        isVerified: false, // New field to track email verification status
        language: "English",
      });

      Alert.alert("Success", "Account created successfully!");
      router.push("/login");
    } catch (error) {
      console.error("Sign-Up Error:", error);
      const errorMessage = error.message || "An unknown error occurred";
      Alert.alert("Sign-Up Error", errorMessage);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <BackArrow onPress={() => router.push("/Homescreen")} />

        <Text style={styles.title}>New Account</Text>

        <Text style={styles.label}>First name</Text>
        <TextInput
          style={styles.inputField}
          placeholder="example name"
          placeholderTextColor="#bcbcbc"
          value={firstName}
          onChangeText={(value) => handleNameChange(value, setFirstName)}
        />

        <Text style={styles.label}>Last name</Text>
        <TextInput
          style={styles.inputField}
          placeholder="lastname"
          placeholderTextColor="#bcbcbc"
          value={lastName}
          onChangeText={(value) => handleNameChange(value, setLastName)}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.inputField}
          placeholder="example@example.com"
          placeholderTextColor="#bcbcbc"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
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
            <Ionicons
              name={passwordVisible ? "eye" : "eye-off"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="*************"
            placeholderTextColor="#bcbcbc"
            secureTextEntry={!confirmPasswordVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={confirmPasswordVisible ? "eye" : "eye-off"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Mobile Number</Text>
        <View style={styles.mobileNumberContainer}>
          <View style={styles.countryCodeContainer}>
            <Text style={styles.countryCode}>+63</Text>
          </View>
          <TextInput
            style={styles.mobileInput}
            placeholder="9123456789"
            placeholderTextColor="#bcbcbc"
            value={mobileNumber}
            onChangeText={handleMobileNumberChange}
            keyboardType="numeric"
          />
        </View>

        <Text style={styles.label}>Date Of Birth</Text>
        <TouchableOpacity
          style={styles.inputField}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateOfBirthText}>
            {dateOfBirth.toLocaleDateString()}
          </Text>
        </TouchableOpacity>

        <Modal
          visible={showDatePicker}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalContainer}>
            <View style={styles.datePickerContainer}>
              <DateTimePicker
                value={tempDate}
                mode="date"
                display="default"
                onChange={onDateChange}
                maximumDate={new Date()}
              />
              {/* Confirm Button */}
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={confirmDateOfBirth}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Terms of Use with Checkbox */}
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            onPress={handleCheckboxPress}
            style={styles.checkbox}
          >
            {termsAccepted && (
              <Ionicons name="checkmark" size={20} color="white" />
            )}
          </TouchableOpacity>
          <Text style={styles.termsText}>
            By continuing, you agree to{" "}
            <Text
              style={styles.linkText}
              onPress={() => setShowTermsModal(true)}
            >
              Terms of Use
            </Text>{" "}
            and{" "}
            <Text
              style={styles.linkText}
              onPress={() => setShowTermsModal(true)}
            >
              Privacy Policy.
            </Text>
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.signUpButton, { opacity: termsAccepted ? 1 : 0.6 }]}
          onPress={handleSignUp}
          disabled={!termsAccepted}
        >
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.loginTextContainer}>
          <Text style={styles.loginText}>already have an account? </Text>
          <Text style={styles.loginLink} onPress={() => router.push("/login")}>
            Log in
          </Text>
        </View>

 {/* Terms of Use Modal */}
<Modal visible={showTermsModal} transparent={true} animationType="slide">
  <View style={styles.fullScreenModalContainer}>
    <ScrollView
      contentContainerStyle={styles.modalContentContainer}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>EczemaCare</Text>
        <Text style={styles.modalSubtitle}>Terms and Conditions Update</Text>

        {/* Illustration (replace source with actual image) */}
        <Image
          source={require("../../assets/logos/EczemaCareLogoG.png")} // Ensure this path is correct
          style={styles.illustration}
        />

        {/* Insert Terms and Conditions Below */}
        {termsAndConditions.map((section, index) => (
          <View key={index}>
            <Text style={styles.termsTitle}>{section.title}</Text>
            <Text style={styles.termsText}>{section.content}</Text>
          </View>
        ))}

        {/* Checkbox with Terms Agreement */}
        <View style={styles.checkboxContainer}>
          <Switch
            value={termsAccepted}
            onValueChange={(value) => setTermsAccepted(value)}
            trackColor={{ false: "#D3D3D3", true: "#85D3C0" }}
            thumbColor={termsAccepted ? "#FFFFFF" : "#f4f3f4"}
          />
          <Text style={styles.checkboxLabel}>
            I have read and agree to the Terms
          </Text>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={[
            styles.continueButton,
            { opacity: termsAccepted ? 1 : 0.6 },
          ]}
          onPress={closeTermsModal}
          disabled={!termsAccepted}
        >
          <Text style={styles.continueButtonText}>I Accept</Text>
          <Ionicons name="arrow-forward-outline" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  </View>
</Modal>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  fullScreenModalContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 50, // Optional, you can adjust padding to make space for title bar, etc.
  },
  modalContentContainer: {
    padding: 1, // Adjust as needed
  },
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    color: "#85D3C0",
    fontSize: 24,
    fontWeight: "600",
    marginTop: 30,
    marginVertical: 10,
  },
  label: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    width: "100%",
  },
  inputField: {
    width: "100%",
    height: 45,
    backgroundColor: "#F3F3F3",
    borderRadius: 13,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 16,
    justifyContent: "center",
  },
  dateOfBirthText: {
    color: "#bcbcbc",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  datePickerContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: "#85D3C0",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  confirmButtonText: {
    color: "white",
    fontSize: 18,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#F3F3F3",
    borderRadius: 13,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    height: 45,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  eyeIcon: {
    paddingRight: 10,
  },
  mobileNumberContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F3F3",
    width: "100%",
    borderRadius: 13,
    marginBottom: 10,
  },
  countryCodeContainer: {
    justifyContent: "center",
    paddingHorizontal: 10,
    height: 45,
    backgroundColor: "#F3F3F3",
  },
  countryCode: {
    fontSize: 16,
    color: "black",
  },
  // datepickerContainer: {
  //   zIndex: 10,
  // },
  mobileInput: {
    flex: 1,
    height: 45,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  // modalContainer: {
  //   flex: 1,
  //   justifyContent: "center",
  //   backgroundColor: "rgba(0,0,0,0.5)",
  //   zIndex: 1,
  // },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 30,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#85D3C0",
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 20,
  },
  illustration: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  //terms change text
  termsContainer: {
    padding: 20,
  },
  termsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  termsText: {
    fontSize: 12,
    color: "#070707",
    fontFamily: "League Spartan",
    fontWeight: "300",
    textAlign: "justify",
    lineHeight: 14,
  },
  linkText: {
    color: "#85D3C0",
    fontWeight: "500",
    fontFamily: "League Spartan",
  },
  updateText: {
    fontSize: 14,
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    backgroundColor: "#85D3C0",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#000",
    marginLeft: 10,
  },
  continueButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 45,
    backgroundColor: "#85D3C0",
    borderRadius: 30,
    marginTop: 20,
  },
  continueButtonText: {
    fontSize: 18,
    color: "white",
    marginRight: 10,
  },
  // confirmButton: {
  //   backgroundColor: "#85D3C0",
  //   borderRadius: 20,
  //   paddingVertical: 10,
  //   paddingHorizontal: 30,
  //   marginTop: 20,
  // },
  // confirmButtonText: {
  //   color: "white",
  //   fontSize: 18,
  // },
  signUpButton: {
    width: "50%",
    height: 45,
    backgroundColor: "#85D3C0",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  signUpButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  orSignUpText: {
    fontSize: 12,
    color: "#5A5858",
    textAlign: "center",
    marginBottom: 10,
  },
  socialIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 138,
    alignSelf: "center",
    marginBottom: 20,
  },
  circle: {
    width: 40,
    height: 40,
    backgroundColor: "#C3EFE5",
    borderRadius: 9999,
    justifyContent: "center",
    alignItems: "center",
  },
  loginTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  loginText: {
    color: "#5A5858",
    fontSize: 12,
  },
  loginLink: {
    color: "#85D3C0",
    fontSize: 12,
    fontWeight: "500",
  },
});

export default SignUpScreen;
