import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import BottomNav from '../components/BottomNav';
import BackArrow from '../components/BackArrow';
import { useRouter } from 'expo-router';

const FAQ = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState(null);

  // Function to toggle visibility of each section
  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section); // Toggle section
  };

  return (
    <View style={styles.container}>
      <BackArrow onPress={() => router.push('/home')} />
      <Text style={styles.heading}>FAQs</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.squareBackground}>
          {/* Image */}
          <Image
            source={require('../../assets/logos/faqs.jpg')}
            style={styles.image}
          />

          {/* Content */}
          <View style={styles.contentContainer}>
            {/* Section 1: How to Use the Camera */}
            <TouchableOpacity onPress={() => toggleSection('howToUseCamera')}>
              <Text style={styles.sectionTitle}>How to Use the Camera</Text>
            </TouchableOpacity>
            {activeSection === 'howToUseCamera' && (
              <Text style={styles.sectionContent}>
                To use the camera in the EczemaCare app:{"\n"}
                1. Navigate to the <Text style={styles.bold}>“Camera”</Text> section from the app menu.{"\n"}
                2. Point your camera at the affected skin area you want to monitor.{"\n"}
                3. Tap the shutter button to take a clear photo.{"\n"}
                4. Save the image, which will be stored in your personal health records for easy reference.{"\n\n"}
                <Text style={styles.bold}>Tip:</Text> Ensure good lighting and a close-up shot for better accuracy.
              </Text>
            )}

            {/* Section 2: What Is the Camera For */}
            <TouchableOpacity onPress={() => toggleSection('whatIsCameraFor')}>
              <Text style={styles.sectionTitle}>What Is the Camera For?</Text>
            </TouchableOpacity>
            {activeSection === 'whatIsCameraFor' && (
              <Text style={styles.sectionContent}>
                The camera feature in the EczemaCare app allows you to:{"\n"}
                • Take photos of your skin condition to track changes over time.{"\n"}
                • Compare current skin health with past images to observe improvements or flare-ups.{"\n"}
                • Store the images in the app for the healthcare provider to view and provide better diagnosis and management.
              </Text>
            )}

            {/* Section 3: When to Answer the POEM Survey */}
            <TouchableOpacity onPress={() => toggleSection('whenToAnswerPoem')}>
              <Text style={styles.sectionTitle}>When to Answer the POEM Survey</Text>
            </TouchableOpacity>
            {activeSection === 'whenToAnswerPoem' && (
              <Text style={styles.sectionContent}>
                You should complete the <Text style={styles.bold}>POEM (Patient-Oriented Eczema Measure)</Text> survey:{"\n"}
                • Once a week to monitor your eczema symptoms. The survey can be taken as needed for when the case gets worse.{"\n"}
                • After significant changes in your condition or treatment adjustments.{"\n"}
                • Before a scheduled check-up with your healthcare provider to give them updated information about your symptoms.
              </Text>
            )}

            {/* Section 4: How to Use the Tracker */}
            <TouchableOpacity onPress={() => toggleSection('howToUseTracker')}>
              <Text style={styles.sectionTitle}>How to Use the Tracker</Text>
            </TouchableOpacity>
            {activeSection === 'howToUseTracker' && (
              <Text style={styles.sectionContent}>
                To use the tracker effectively:{"\n"}
                1. Access the <Text style={styles.bold}>Tracker</Text> section from the menu.{"\n"}
                2. Input details about your symptoms, medications, and daily skin care routine.{"\n"}
                3. Use the tracker to log any changes in your skin condition or flare-ups.{"\n"}
                4. Review your progress by checking the weekly or monthly summaries to see patterns or improvements.
              </Text>
            )}

            {/* Section 5: What Is the POEM Score */}
            <TouchableOpacity onPress={() => toggleSection('whatIsPoemScore')}>
              <Text style={styles.sectionTitle}>What Is the POEM Score?</Text>
            </TouchableOpacity>
            {activeSection === 'whatIsPoemScore' && (
              <Text style={styles.sectionContent}>
                The <Text style={styles.bold}>POEM score</Text> is a measure used to assess the severity of your eczema symptoms. It’s based on a series of questions related to:{"\n"}
                • Itching and discomfort.{"\n"}
                • Sleep disturbance.{"\n"}
                • Frequency and extent of eczema flare-ups.{"\n\n"}
                Your responses generate a score, which helps both you and your healthcare provider understand how well your eczema is being managed and whether treatment adjustments are needed.
              </Text>
            )}

            {/* Section 6: How Can I Get Treatment */}
            <TouchableOpacity onPress={() => toggleSection('howToGetTreatment')}>
              <Text style={styles.sectionTitle}>How Can I Get Treatment?</Text>
            </TouchableOpacity>
            {activeSection === 'howToGetTreatment' && (
              <Text style={styles.sectionContent}>
                For treatment options:{"\n"}
                1. Visit the <Text style={styles.bold}>Treatment</Text> section in the app, where you’ll find personalized recommendations based on your POEM score and tracking data.{"\n"}
                2. Schedule an appointment with your dermatologist through the app's integrated telehealth feature, or consult your healthcare provider in person.{"\n"}
                3. Ensure you follow the prescribed treatment plan, including medications, moisturizers, and lifestyle adjustments.{"\n\n"}
                <Text style={styles.bold}>Note:</Text> Always consult a healthcare professional before making any changes to your treatment plan.
              </Text>
            )}
          </View>
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
  heading: {
    fontSize: 24,
    color: '#85D3C0',
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 48,
    marginLeft: 60,
  },
  squareBackground: {
    backgroundColor: '#C3EFE5',
    width: '90%',
    borderRadius: 20,
    padding: 20,
    alignSelf: 'center',
    marginTop: 30,
  },
  scrollViewContent: {
    paddingBottom: 100,
  },
  contentContainer: {
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: 159,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#85D3C0',
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 14,
    fontWeight: '300',
    fontFamily: 'League Spartan',
    lineHeight: 20,
    color: 'black',
    textAlign: 'justify',
    marginBottom: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
});

export default FAQ;
