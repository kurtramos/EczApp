// import React from "react";
// import { View, Image, Text, StyleSheet, Dimensions } from "react-native";

// const SplashScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Image
//         source={require("../assets/images/react-logo.png")} // This is the correct way to include an image
//         style={styles.logo}
//       />
//       <Text style={styles.text}>Eczema Care</Text>
//     </View>
//   );
// };

// const { height } = Dimensions.get("window");

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#4eb5a6",
//     paddingBottom: height * 0.1,
//   },
//   logo: {
//     width: 100, // Adjust according to your design
//     height: 100, // Adjust according to your design
//     marginBottom: 20,
//   },
//   text: {
//     fontSize: 24,
//     color: "#FFFFFF",
//     fontFamily: "Inter, sans-serif", // Ensure this font is available
//     fontWeight: "300",
//   },
// });

// export default SplashScreen;

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons'; // Icon libraries
import { useRouter } from 'expo-router'; 
import BackArrow from '../components/BackArrow';


export default function App() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <BackArrow onPress={() => router.push('/Homescreen')} />

      <Text style={styles.logInText}>Log In</Text>

      {/* Welcome label and description aligned left */}
      <Text style={styles.welcomeLabelText}>Welcome</Text>
      <Text style={styles.descriptionText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Text>

      <Text style={styles.labelText}>Email or Mobile Number</Text>
      <TextInput
        style={styles.inputBox}
        placeholder="example@example.com"
        placeholderTextColor="#bcbcbc"
      />

      <Text style={styles.labelText}>Password</Text>
      
      {/* Password field with Forget Password */}
      <View style={styles.passwordWrapper}>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInputBox} // Adjust the width for the password input box
            placeholder="*************"
            placeholderTextColor="#bcbcbc"
            secureTextEntry={!passwordVisible} // Toggle visibility
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
        {/* Forget Password aligned right under the password field */}
        <TouchableOpacity style={styles.forgotPasswordWrapper}>
          <Text style={styles.forgotPasswordText}>Forget Password</Text>
        </TouchableOpacity>
      </View>

      {/* Log In Button */}
      <TouchableOpacity style={styles.logInButton} onPress={() => router.push('/home')}>
        <Text style={styles.logInButtonText}>Log In</Text>
      </TouchableOpacity>

      {/* New Section: Social Login Icons */}
      <Text style={styles.orSignUpText}>or sign up with</Text>
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
      </View>

      <View style={styles.signUpTextContainer}>
        <Text style={styles.noAccountText}>Don’t have an account? </Text>
        <Text style={styles.signUpText}>Sign Up</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white", // Background color
    padding: 20,
  },
  backArrow: {
    position: 'absolute',
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
    alignSelf: 'flex-start', // Align Welcome label to the left
  },
  descriptionText: {
    fontSize: 12,
    color: "#5A5858",
    textAlign: "left", // Align description to the left
    width: 300,
    alignSelf: 'flex-start', // Align with Welcome label
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
    width: "100%", // Full width for the wrapper
  },
  passwordContainer: {
    width: "100%",
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#F3F3F3",
    borderRadius: 13,
  },
  passwordInputBox: {
    width: "85%", // Adjust width to match the design
    height: 45,
    backgroundColor: "#F3F3F3",
    borderRadius: 13,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "black",
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    padding: 10,
  },
  forgotPasswordWrapper: {
    alignItems: 'flex-end', // Align Forget Password to the right
    marginTop: 5,
  },
  forgotPasswordText: {
    color: "#5A5858",
    fontSize: 12,
    marginRight: 10, // Margin for better positioning
  },
  logInButton: {
    width: "50%", // Shorten the button as per the design
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 138,
    alignItems: 'center',
    marginVertical: 20,
  },
  circle: {
    width: 40,
    height: 40,
    backgroundColor: "#C3EFE5",
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
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
});
