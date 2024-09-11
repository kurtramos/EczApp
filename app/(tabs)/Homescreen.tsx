import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function FirstScreen() {
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
