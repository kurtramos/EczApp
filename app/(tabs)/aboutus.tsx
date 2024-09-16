import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';

const PrivacyPolicy = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
          <Text style={styles.heading}>ABOUT US</Text>
          
        <View style={styles.squareBackground}>
        <Text style={styles.paragraph}>
          * insert About Us *
        </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  scrollView: {
    flex: 1,
  },
  squareBackground: {
    backgroundColor: '#C3EFE5', 
    width: '100%', 
    height: '100%', 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 20, 
    marginTop: 50, 
    alignSelf: 'stretch', 
  },
  heading: {
    fontSize: 24,
    color: '#85D3C0', 
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 20, 
  },
  
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'justify',
    marginBottom: 20,
    marginTop: 50, 
  },
});

export default PrivacyPolicy;
