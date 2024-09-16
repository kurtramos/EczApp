import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';

const PrivacyPolicy = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
      <View style={styles.squareBackground}>
          <Text style={styles.heading}>Help</Text>
        </View>

        <View style={styles.circleBackground}>
          <Text style={styles.subheading}>ContactUs</Text>
        </View>
          
        
        <Text style={styles.paragraph}>
          * insert facts about eczema *
        </Text>
        
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
    backgroundColor: '#85D3C0', 
    width: '100%', 
    height: 90, 
    borderRadius: 0, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 20, 
    marginTop: 0, 
    alignSelf: 'stretch', 
  },

  circleBackground: {
    backgroundColor: '#85D3C0', 
    width: "40%",             
    height: 60,               
    borderRadius: 90,         
    justifyContent: 'center', 
    alignItems: 'center',     
    marginBottom: 20,         
    marginTop: 0,             
    alignSelf: 'center',     
  },

  heading: {
    fontSize: 24,
    color: 'white', 
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center', 
  },

  subheading: {
    fontSize: 15,
    color: 'white', 
    textAlign: 'center',
    justifyContent: 'center', 
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
