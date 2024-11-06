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

// Firebase imports
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification  } from "firebase/auth";
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

  const onDateChange = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate || tempDate;
    setDateOfBirth(currentDate);
    setShowDatePicker(false);
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
      Alert.alert("Verification Email Sent", "Please check your email to verify your account.");

      // Add user details to Firestore

      // Add user details to db
      const docRef = doc(firestore, "users", email);
      await setDoc(docRef, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNumber: mobileNumber,
        dateOfBirth: dateOfBirth,
        isVerified: false, // New field to track email verification status
      });

      Alert.alert("Success", "Account created successfully!");
      router.push("/login");
    } catch (error) {
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

        <Text style={styles.orSignUpText}>or sign up with</Text>

        <View style={styles.socialIconsContainer}>
          <View style={styles.circle}>
            <FontAwesome name="google" size={24} color="#85D3C0" />
          </View>
          <View style={styles.circle}>
            <Ionicons name="logo-facebook" size={24} color="#85D3C0" />
          </View>
          <View style={styles.circle}>
            <MaterialIcons name="fingerprint" size={24} color="#85D3C0" />
          </View>
        </View>

        <View style={styles.loginTextContainer}>
          <Text style={styles.loginText}>already have an account? </Text>
          <Text style={styles.loginLink} onPress={() => router.push("/login")}>
            Log in
          </Text>
        </View>

        {/* Terms of Use Modal */}
        <Modal
          visible={showTermsModal}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.fullScreenModalContainer}>
            {/* <ScrollView style={styles.modalContainer}> */}
            <ScrollView
              contentContainerStyle={styles.modalContentContainer}
              onScroll={handleScroll}
              scrollEventThrottle={16}
            >
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>EczemaCare</Text>
                <Text style={styles.modalSubtitle}>
                  Terms and Conditions Update
                </Text>

                {/* Illustration (replace source with actual image) */}
                <Image
                  source={require("../../assets/logos/EczemaCareLogoG.png")} // Ensure this path is correct
                  style={styles.illustration}
                />

                {/* Insert Terms and Conditions Below */}
                <Text style={styles.termsText}>
                  EczemaCare - Terms and Conditions {"\n"}
                  {"\n"}
                  Last Updated: October 23, 2024 {"\n"}
                  {"\n"}
                  Welcome to EczemaCare, a mobile health application designed to
                  help users manage Atopic Dermatitis (eczema) by tracking
                  symptoms, medication, and treatments. These Terms and
                  Conditions ("Agreement") govern your use of the EczemaCare
                  application ("App"). By creating an account and using the App,
                  you agree to be bound by this Agreement. If you do not agree,
                  please discontinue use of the App. {"\n"}
                  {"\n"}
                  1. Acceptance of Terms {"\n"}
                  By accessing or using the EczemaCare App, you agree to the
                  terms and conditions outlined in this Agreement. You must read
                  and agree to these terms before using the App. If you do not
                  agree, you must not use the App. {"\n"}
                  {"\n"}
                  2. Personal Information Collection {"\n"}
                  EczemaCare collects personal and health-related information to
                  provide a personalized experience for users. By using the App,
                  you consent to the collection, processing, and storage of the
                  following types of data: {"\n"}- Personal Identifiable
                  Information (PII): Name, email, age, and other contact
                  information provided during account creation. {"\n"}-
                  Health-related Information: Information about your symptoms,
                  treatments, medication usage, medical history, and related
                  health data that you voluntarily enter into the App. {"\n"}
                  {"\n"}
                  All personal information will be handled in compliance with
                  applicable data protection regulations, including, but not
                  limited to, the General Data Protection Regulation (GDPR) and
                  the Data Privacy Act of 2012 (Republic Act No. 10173) in the
                  Philippines. {"\n"}
                  {"\n"}
                  3. Data Usage {"\n"}
                  The personal and health-related information collected will be
                  used for: {"\n"}- Personalizing your experience with the App.{" "}
                  {"\n"}- Providing reports and insights about your condition.{" "}
                  {"\n"}- Assisting healthcare professionals, if authorized by
                  the user, in tracking and managing your eczema. {"\n"}-
                  Improving the functionality and effectiveness of the App.{" "}
                  {"\n"}
                  {"\n"}
                  4. Data Privacy and Security {"\n"}
                  We are committed to ensuring the security and confidentiality
                  of your personal data. EczemaCare implements industry-standard
                  security measures to protect your information from
                  unauthorized access, disclosure, or misuse. {"\n"}
                  {"\n"}
                  Your information will only be shared with third parties in the
                  following cases: {"\n"}- With your explicit consent to share
                  information with healthcare providers or caregivers. {"\n"}-
                  When required by law, such as in response to a legal request
                  by authorities. {"\n"}
                  {"\n"}
                  5. User Responsibilities {"\n"}
                  As a user, you agree to: {"\n"}- Provide accurate and complete
                  information when registering and inputting data into the App.{" "}
                  {"\n"}- Use the App for its intended purpose of managing and
                  tracking Atopic Dermatitis-related information. {"\n"}-
                  Protect your login credentials and notify us immediately if
                  you suspect unauthorized use of your account. {"\n"}
                  {"\n"}
                  6. Health Disclaimer {"\n"}
                  The information provided by EczemaCare is for general
                  informational and self-management purposes only. It is not
                  intended to replace or substitute professional medical advice,
                  diagnosis, or treatment. Always consult a qualified healthcare
                  professional before making any medical decisions. {"\n"}
                  {"\n"}
                  EczemaCare does not offer any guarantees regarding the
                  accuracy, completeness, or effectiveness of the health
                  information provided through the App. Use of the App is at
                  your own risk. {"\n"}
                  {"\n"}
                  7. Changes to Terms and Conditions {"\n"}
                  We reserve the right to modify or update these Terms and
                  Conditions at any time. If changes are made, you will be
                  notified through the App or via email. Continued use of the
                  App after modifications are made constitutes your acceptance
                  of the updated Terms and Conditions. {"\n"}
                  {"\n"}
                  8. Termination {"\n"}
                  EczemaCare reserves the right to terminate your access to the
                  App if you violate any terms outlined in this Agreement. You
                  may also discontinue your use of the App at any time by
                  deleting your account and uninstalling the App. {"\n"}
                  {"\n"}
                  9. Governing Law {"\n"}
                  These Terms and Conditions are governed by the laws of the
                  Philippines and are subject to the jurisdiction of Philippine
                  courts. {"\n"}
                  {"\n"}
                  10. Contact Information {"\n"}
                  If you have any questions or concerns regarding these Terms
                  and Conditions, or how your personal data is handled, you may
                  contact us at: {"\n"}
                  {"\n"}
                  EczemaCare Support Team {"\n"}
                  Email: support@eczemacare.com {"\n"}
                  Address: Manila, Philippines {"\n"}
                  {"\n"}
                  By clicking "I Accept" or proceeding with the use of the
                  EczemaCare App, you acknowledge that you have read,
                  understood, and agree to these Terms and Conditions.{"\n"}
                </Text>

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
                  <Ionicons
                    name="arrow-forward-outline"
                    size={20}
                    color="white"
                  />
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
  datepickerContainer: {
    zIndex: 10,
  },
  mobileInput: {
    flex: 1,
    height: 45,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1,
  },
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
