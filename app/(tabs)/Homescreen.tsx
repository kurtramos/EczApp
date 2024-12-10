import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router'; // useRouter from expo-router
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useFonts } from "expo-font";

export default function HomeScreen() {
  const router = useRouter(); // use useRouter for navigation

  
  return (
    <View style={styles.container}>
      {/* Logo Image */}
      <Image
        source={require('../../assets/logos/EczemaCareLogoG.png')} // Ensure this path is correct
        style={styles.logo}
      />

      {/* App Title */}
      <Text style={styles.appTitle}>Eczema</Text>
      <Text style={styles.appSubtitle}>Care</Text>

      {/* Description Text */}
      <Text style={styles.subtitle}>
      A Mobile Application for Monitoring and Severity Tracking of Atopic Dermatitis
      </Text>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signUpButton} onPress={() => router.push('/signup')}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Have an Account Text */}
      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={styles.haveAccountText}>Have An Account?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: 138,
    height: 138,
    marginBottom: 20,
    resizeMode: 'contain', // Ensures the image scales properly
  },
  appTitle: {
    fontSize: 48,
    color: '#85D3C0',
    fontWeight: '100',
    textAlign: 'center',
    textTransform: 'capitalize',
    fontFamily: 'League Spartan',
  },
  appSubtitle: {
    fontSize: 48,
    color: '#85D3C0',
    fontWeight: '100',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(162, 218, 204, 0.83)',
    textAlign: 'center',
    width: 250,
    fontWeight: '600',
    marginBottom: 40,
  },
  signUpButton: {
    width: 200,
    height: 45,
    backgroundColor: '#85D3C0',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  haveAccountText: {
    fontSize: 14,
    color: '#85D3C0',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});
