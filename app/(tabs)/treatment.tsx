import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import BottomNav from '../components/BottomNav';
import BackArrow from '../components/BackArrow';
import { useRouter } from 'expo-router'; 

const Treatment = () => {
  const router = useRouter();
  const [poemScore, setPoemScore] = useState(5); // You can change this to your desired initial value or fetch it from elsewhere

  // Function to determine severity based on POEM score
  const getSeverityLevel = (score) => {
    if (score <= 7) return "Mild";
    if (score >= 8 && score <= 16) return "Moderate";
    if (score >= 17 && score <= 24) return "Severe";
    if (score >= 25) return "Very Severe";
    return "Unknown";
  };

  return (
    <View style={styles.container}>
      <BackArrow onPress={() => router.push('/home')} />
      <Text style={styles.heading}>TREATMENT</Text>
      <ScrollView style={styles.scrollView}>
        <View style={styles.squareBackground}>
          <Text style={styles.subheading}>Treatment Information</Text>
          <Text style={styles.paragraph}>
            The remedies provided below are for managing mild cases of eczema. If symptoms persist or worsen, it is important to consult your doctor for further evaluation and treatment. Always seek professional medical advice for more severe conditions.
          </Text>

          <Text style={styles.subheading}>Your POEM score is:</Text>
          <Text style={styles.poemScore}>{poemScore}</Text> {/* Display the POEM score */}
          
          <Text style={styles.severityLabel}>Severity Level:</Text>
          <Text style={styles.severityValue}>{getSeverityLevel(poemScore)}</Text> {/* Display severity based on the score */}
        </View>
      </ScrollView>

      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  backArrow: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  squareBackground: {
    backgroundColor: '#C3EFE5', 
    width: '100%', 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 20, 
    marginTop: 20, 
    alignSelf: 'stretch', 
    padding: 30,
  },
  heading: {
    fontSize: 24,
    color: '#85D3C0', 
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 48, 
    marginLeft: 60,
  },
  subheading: {
    fontSize: 25,
    color: '#85D3C0', 
    fontWeight: 'bold',
    textAlign: 'left', 
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'justify',
    marginBottom: 20,
    marginTop: 30, 
  },
  poemScore: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 10,
  },
  severityLabel: {
    fontSize: 22,
    color: '#85D3C0', 
    fontWeight: '600',
    marginTop: 20,
  },
  severityValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 5,
  },
});

export default Treatment;
