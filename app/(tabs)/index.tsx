import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router'; // useRouter from expo-router


const { width, height } = Dimensions.get('window');

export default function FirstScreen() {
  const router = useRouter(); // use useRouter for navigation
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logos/EczemaCareLogoW.png')} 
        style={styles.logo}
      />

      <Text style={styles.titleText}>Eczema</Text>
      <Text style={styles.subtitleText}>Care</Text>
      <TouchableOpacity style={styles.nextButton} onPress={() => router.push('/WelcomeLanguage')}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
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
    nextButton: {
    width: '50%',
    height: 45,
    top: 100,
    backgroundColor: '#85D3C0',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 24,
    fontFamily: 'League Spartan',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
});

