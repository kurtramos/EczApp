import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router'; // useRouter from expo-router

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter(); // use useRouter for navigation
  
  useEffect(() => {
    // Set a timer to automatically navigate after 3 seconds
    const timer = setTimeout(() => {
      router.push('/login');
    }, 1200); // 3000ms = 3 seconds

    // Clear the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logos/EczemaCareLogoW.png')} 
        style={styles.logo}
      />

      <Text style={styles.titleText}>Eczema</Text>
      <Text style={styles.subtitleText}>Care</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#85D3C0', 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  logo: {
    width: 130, 
    height: 130, 
    resizeMode: 'contain', 
    marginBottom: 20, 
  },
  titleText: {
    fontSize: 48, 
    color: 'white',
    fontFamily: 'League Spartan',
    fontWeight: '100',
    textAlign: 'center',
    marginBottom: 10, 
  },
  subtitleText: {
    fontSize: 48, 
    color: 'white',
    fontFamily: 'League Spartan',
    fontWeight: '100',
    textAlign: 'center',
    marginBottom: 30, 
  },
});
