import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; // useRouter from expo-router

export default function HomeScreen() {
  const router = useRouter(); // use useRouter for navigation

  return (
    <View style={styles.container}>
      {/* Cross and Leaf Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <View style={styles.verticalBar} />
          <View style={styles.horizontalBar} />
          <View style={styles.leafOne} />
          <View style={styles.leafTwoWhite} />
          <View style={styles.leafTwoColored} />
          <View style={styles.leafThreeWhite} />
          <View style={styles.leafThreeColored} />
        </View>
      </View>

      {/* App Title */}
      <Text style={styles.appTitle}>Eczema</Text>
      <Text style={styles.appSubtitle}>Care</Text>

      {/* Description Text */}
      <Text style={styles.subtitle}>
        A Symptoms Tracker And Recognition System For Atopic Dermatitis
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
  logoContainer: {
    width: 138,
    height: 138,
    marginBottom: 20,
  },
  logo: {
    position: 'relative',
  },
  verticalBar: {
    width: 47.77,
    height: 138,
    position: 'absolute',
    backgroundColor: '#85D3C0',
    borderRadius: 32.54,
    left: 45.65,
    top: 0,
  },
  horizontalBar: {
    width: 46.71,
    height: 138,
    position: 'absolute',
    transform: [{ rotate: '90deg' }],
    backgroundColor: '#85D3C0',
    borderRadius: 31.82,
    left: 138,
    top: 45.65,
  },
  leafOne: {
    width: 73.34,
    height: 11.04,
    position: 'absolute',
    transform: [{ rotate: '44.93deg' }],
    backgroundColor: 'white',
    left: 47.08,
    top: 40.34,
  },
  leafTwoWhite: {
    width: 31.46,
    height: 50.53,
    position: 'absolute',
    transform: [{ rotate: '35.54deg' }],
    backgroundColor: 'white',
    left: 77.48,
    top: 6.04,
  },
  leafTwoColored: {
    width: 28.60,
    height: 50.53,
    position: 'absolute',
    transform: [{ rotate: '35.54deg' }],
    backgroundColor: '#85D3C0',
    left: 77.48,
    top: 6.04,
  },
  leafThreeWhite: {
    width: 51.46,
    height: 37.43,
    position: 'absolute',
    transform: [{ rotate: '-137.93deg' }],
    backgroundColor: 'white',
    left: 43.55,
    top: 102.46,
  },
  leafThreeColored: {
    width: 51.49,
    height: 36.07,
    position: 'absolute',
    transform: [{ rotate: '-137.93deg' }],
    backgroundColor: '#85D3C0',
    left: 43.44,
    top: 102.59,
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
