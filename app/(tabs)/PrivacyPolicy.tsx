import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import BackArrow from '../components/BackArrow';
import { useRouter } from 'expo-router'; 

const PrivacyPolicy = () => {
  const router = useRouter();
  return (
    
    <View style={styles.container}>
      <BackArrow onPress={() => router.push('/myaccount')} />
      <ScrollView style={styles.scrollView}>
        <Text style={styles.heading}>Privacy Policy</Text>
        <Text style={styles.paragraph}>
        EczemaCare is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, share, and protect 
        your personal information. By using EczemaCare, you agree to the collection and use of information as described in this policy.
        </Text>
        <Text style={styles.subHeading}>1. Information We Collect</Text>
          <Text style={styles.paragraph}>
          To provide you with a personalized experience and track your progress, 
          EczemaCare collects the following information:</Text>

        <Text style={styles.subHeading2}>Personal Information</Text>
          <Text style={styles.bullets}>• First and Last Name</Text>
          <Text style={styles.bullets}>• Date of Birth</Text>
          <Text style={styles.bullets}>• Contact Number</Text>
          <Text style={styles.bullets}>• Email Address</Text>

          <Text style={styles.subHeading2}>Medical Information</Text>
          <Text style={styles.bullets}>• Images of affected skin areas (uploaded by the user)</Text>
          <Text style={styles.bullets}>• Responses and scores from the POEM (Patient-Oriented Eczema Measure) survey</Text>

        <Text style={styles.subHeading}>2. How We Use Your Information</Text>
          <Text style={styles.paragraph}>
          EczemaCare uses your information for the following purposes: </Text>

          <Text style={styles.bullets}>• TREATMENT TRACKING: Your POEM survey scores allow us to monitor changes in your condition over time.</Text>
          <Text style={styles.bullets}>• COMMUNICATION: We may use your contact details to notify you about important updates, responses, or recommendations regarding your eczema care.</Text>
          <Text style={styles.bullets}>• RESEARCH AND ANALYSIS: Aggregated, anonymized data may be used for internal research to improve our services. Individual information will not be shared without your explicit consent.</Text>

          <Text style={styles.subHeading}>3. Data Sharing and Disclosure</Text>
          <Text style={styles.paragraph}>
          We will not share your personal information with third parties except: </Text>

          <Text style={styles.bullets}>• WITH YOUR CONSENT: We may share information with third parties when you explicitly consent.</Text>
          <Text style={styles.bullets}>• FOR LEGAL REQUIREMENTS: We may disclose information if required by law, court order, or government regulation.</Text>
          <Text style={styles.bullets}>• WITH OUR MEDICAL VALIDATOR: EczemaCare collaborates with a medical expert to ensure the effectiveness and accuracy of treatment recommendations. Your anonymized data may be shared with the medical expert for validation purposes.</Text>

        <Text style={styles.subHeading}>4. Data Security</Text>
          <Text style={styles.paragraph}>
          We implement robust security measures to protect your personal information from unauthorized access, use, or disclosure. 
          However, no method of data transmission over the internet is 100% secure, and we cannot guarantee absolute security. </Text>

          <Text style={styles.subHeading}>5. Data Retention</Text>
          <Text style={styles.paragraph}>
          We will retain your information as long as necessary to fulfill the purposes outlined in this Privacy Policy 
          or as required by law. You may request deletion of your personal data by contacting us directly, and we will process your request per applicable laws.</Text>

          <Text style={styles.subHeading}>6. Your Rights</Text>
          <Text style={styles.paragraph}>
          You have the right to access, correct, or request deletion of your personal information. If you would like to exercise any of these rights, please contact us through our support email at [Support Email]. </Text>

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
  bullets: {
    fontSize: 16,        
    color: '#000',      
    marginBottom: 10,    
    marginLeft: 40, 
  },
  scrollView: {
    flex: 1,
  },
  heading: {
    fontSize: 24,
    color: '#74BDB3',
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 18,
    color: '#74BDB3',
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
  },

  subHeading2: {
    fontSize: 18,
    color: '#74BDB3',
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 25,
  },

  paragraph: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'justify',
  },
});

export default PrivacyPolicy;
