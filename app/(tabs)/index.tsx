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

export default function App() {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
        {/* Back Arrow */}
        <TouchableOpacity style={styles.backArrow} onPress={() => console.log('Back pressed')}>
        <Ionicons name="chevron-back" size={24} color="#85D3C0" />
      </TouchableOpacity>

      {/* <Text style={styles.welcomeText}>Welcome to EczApp!</Text> */}

      <View style={styles.rotatedBox}></View>
      <Text style={styles.logInText}>Log In</Text>
      <Text style={styles.welcomeLabelText}>Welcome</Text>
      <Text style={styles.descriptionText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Text>
      <Text style={styles.labelText}>Email or Mobile Number</Text>
      <TextInput
        style={styles.inputBox}
        placeholder="example@example.com"
        placeholderTextColor="black"
      />
      <Text style={styles.labelText}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputBox}
          placeholder="*************"
          placeholderTextColor="black"
          secureTextEntry={!passwordVisible} // Toggle visibility
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={passwordVisible ? "eye-off" : "eye"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <Text style={styles.forgotPasswordText}>Forget Password</Text>
      </TouchableOpacity>

      {/* New Section */}
      <View style={styles.buttonContainer}>
        <View style={styles.logInButton}></View>
        <Text style={styles.logInButtonText}>Log In</Text>
        <View style={styles.socialIconsContainer}>
          <View style={styles.circle}></View>
          <View style={styles.circle}></View>
          <View style={styles.circle}></View>
          <View style={styles.smallSquare1}></View>
          <View style={styles.smallSquare2}></View>
          <View style={styles.surroundingCircle}>
            <View style={styles.smallInnerCircle}></View>
            <View style={styles.smallVerticalLine}></View>
          </View>
        </View>
        <Text style={styles.orSignUpText}>or sign up with</Text>
        <View style={styles.signUpTextContainer}>
          <Text style={styles.noAccountText}>Don’t have an account? </Text>
          <Text style={styles.signUpText}>Sign Up</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "", // Background color
    padding: 20,
  },
  backArrow: {
    // position: 'absolute',
    top: 25,
    right: 145,
  },
  welcomeText: {
    color: "#85D3C0",
    fontSize: 20,
    marginBottom: 20,
  },
  // rotatedBox: {
  //   width: 14,
  //   height: 8,
  //   transform: [{ rotate: "-90deg" }],
  //   borderWidth: 2,
  //   borderColor: "#85D3C0",
  //   marginBottom: 20,
  // },
  logInText: {
    width: 121,
    textAlign: "center",
    color: "#85D3C0",
    fontSize: 24,
    fontFamily: "League Spartan",
    fontWeight: "600",
    textTransform: "capitalize",
    marginBottom: 10,
  },
  welcomeLabelText: {
    width: 300,
    color: "#85D3C0",
    fontSize: 24,
    fontFamily: "League Spartan",
    fontWeight: "600",
    textTransform: "capitalize",
    marginBottom: 10,
  },
  descriptionText: {
    width: 299,
    color: "#070707",
    fontSize: 11.5,
    fontFamily: "League Spartan",
    fontWeight: "300",
    textAlign: "left",
    marginBottom: 20,
  },
  labelText: {
    width: 300,
    color: "black",
    fontSize: 20,
    fontFamily: "League Spartan",
    fontWeight: "bold",
    textTransform: "capitalize",
    marginBottom: 5,
  },
  inputBox: {
    width: 299,
    height: 45,
    backgroundColor: "#F3F3F3",
    borderRadius: 13,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 18,
    fontFamily: "League Spartan",
  },
  passwordContainer: {
    width: 299,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#F3F3F3",
    borderRadius: 13,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    padding: 10,
    top: -1,
  },
  forgotPasswordText: {
    width: 280,
    textAlign: "right",
    color: "#5A5858",
    fontSize: 12,
    fontFamily: "League Spartan",
    fontWeight: "500",
    marginBottom: 20,
  },
  buttonContainer: {
    width: 273,
    height: 189,
    position: "relative",
    marginTop: 20,
  },
  logInButton: {
    width: 207,
    height: 45,
    position: "absolute",
    backgroundColor: "#85D3C0",
    borderRadius: 30,
    left: 33,
    top: 0,
  },
  logInButtonText: {
    width: 162,
    height: 14,
    position: "absolute",
    textAlign: "center",
    color: "white",
    fontSize: 24,
    fontFamily: "League Spartan",
    fontWeight: "500",
    textTransform: "capitalize",
    top: 16,
    left: 56,
  },
  socialIconsContainer: {
    width: 138,
    height: 40,
    position: "absolute",
    left: 68,
    top: 83,
  },
  circle: {
    width: 40,
    height: 40,
    position: "absolute",
    backgroundColor: "#C3EFE5",
    borderRadius: 9999,
  },
  smallSquare1: {
    width: 18,
    height: 18,
    position: "absolute",
    borderColor: "#85D3C0",
    borderWidth: 2,
    left: 12,
    top: 11,
  },
  smallSquare2: {
    width: 22,
    height: 23,
    position: "absolute",
    borderColor: "#85D3C0",
    borderWidth: 2,
    left: 107,
    top: 9,
  },
  surroundingCircle: {
    width: 24,
    height: 24,
    position: "absolute",
    left: 57,
    top: 8,
    borderRadius: 9999,
    borderColor: "#85D3C0",
    borderWidth: 2,
    backgroundColor: "#C3EFE5",
  },
  smallInnerCircle: {
    width: 8,
    height: 17,
    position: "absolute",
    borderColor: "#85D3C0",
    borderWidth: 2,
    left: 8,
    top: 7,
  },
  orSignUpText: {
    width: 273,
    height: 10,
    position: "absolute",
    textAlign: "center",
    color: "#070707",
    fontSize: 12,
    fontFamily: "League Spartan",
    fontWeight: "300",
    top: 61,
  },
  signUpTextContainer: {
    width: 273,
    height: 28,
    position: "absolute",
    textAlign: "center",
    top: 161,
    flexDirection: "row",
    justifyContent: "center",
  },
  noAccountText: {
    color: "#070707",
    fontSize: 12,
    fontFamily: "League Spartan",
    fontWeight: "300",
  },
  signUpText: {
    color: "#85D3C0",
    fontSize: 12,
    fontFamily: "League Spartan",
    fontWeight: "500",
  },
});
