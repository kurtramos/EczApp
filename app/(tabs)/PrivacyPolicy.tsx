import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';

const PrivacyPolicy = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.heading}>Privacy Policy</Text>
        <Text style={styles.paragraph}>
          Welcome to our Privacy Policy page! When you use our app, you trust us with your information. 
          This Privacy Policy is meant to help you understand what data we collect, why we collect it, 
          and what we do with it. This is important, so we hope you will take time to read it carefully.
        </Text>
        <Text style={styles.subHeading}>Information We Collect</Text>
        <Text style={styles.paragraph}>
          We collect information to provide better services to all of our users – from figuring out basic stuff 
          like your language, to more complex things like what kind of services will work best for you.
        </Text>
        <Text style={styles.subHeading}>How We Use Information</Text>
        <Text style={styles.paragraph}>
          The information we collect is used to maintain and improve the app. We do not share personal 
          information with companies, organizations, or individuals outside of the app unless one of the 
          following circumstances applies: for legal reasons or with your consent.
        </Text>
        {/* Add more sections of the Privacy Policy here */}
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
  heading: {
    fontSize: 24,
    color: '#85D3C0',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 18,
    color: '#85D3C0',
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'justify',
  },
});

export default PrivacyPolicy;
