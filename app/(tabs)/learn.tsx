import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import BottomNav from '../components/BottomNav';
import BackArrow from '../components/BackArrow';
import { useRouter } from 'expo-router';

const Learn = () => {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState(null);

  // Function to toggle visibility of each section
  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section); // Toggle section
  };

  return (
    <View style={styles.container}>
      <BackArrow onPress={() => router.push('/home')} />
      <Text style={styles.heading}>LEARN</Text>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.squareBackground}>
          {/* Image */}
          <Image
            source={require('../../assets/logos/EczemaHandSample.png')} // Ensure this path is correct
            style={styles.image}
          />

          {/* Content */}
          <View style={styles.contentContainer}> 
            {/* Section 1: What is Eczema */}
            <TouchableOpacity onPress={() => toggleSection('whatIsEczema')}>
              <Text style={styles.sectionTitle}>What is Eczema?</Text>
            </TouchableOpacity>
            {activeSection === 'whatIsEczema' && (
              <Text style={styles.sectionContent}>
                Eczema, also known as atopic dermatitis, is a chronic skin condition that causes inflamed, itchy, and red skin. It occurs when the skin's protective barrier is weakened, making it more sensitive to irritants and allergens. Eczema often starts in childhood but can affect people of all ages.
              </Text>
            )}

            {/* Section 2: Is Eczema Curable */}
            <TouchableOpacity onPress={() => toggleSection('isEczemaCurable')}>
              <Text style={styles.sectionTitle}>Is Eczema Curable?</Text>
            </TouchableOpacity>
            {activeSection === 'isEczemaCurable' && (
              <Text style={styles.sectionContent}>
                Unfortunately, there is no cure for eczema. However, it can be managed with proper treatment and care. Symptoms can come and go, with periods of flare-ups followed by times of remission. Long-term management focuses on reducing flare-ups and controlling symptoms.
              </Text>
            )}

            {/* Section 3: Types of Eczema */}
            <TouchableOpacity onPress={() => toggleSection('typesOfEczema')}>
              <Text style={styles.sectionTitle}>Types of Eczema</Text>
            </TouchableOpacity>
            {activeSection === 'typesOfEczema' && (
              <Text style={styles.sectionContent}>
                There are several types of eczema, including:{"\n"}
                - <Text style={styles.bold}>Atopic Dermatitis</Text>: The most common type, often hereditary and linked to allergies.{"\n"}
                - <Text style={styles.bold}>Contact Dermatitis</Text>: Caused by direct contact with an irritant or allergen.{"\n"}
                - <Text style={styles.bold}>Dyshidrotic Eczema</Text>: Affects the hands and feet, causing blisters.{"\n"}
                - <Text style={styles.bold}>Nummular Eczema</Text>: Presents as coin-shaped spots on the skin.{"\n"}
                - <Text style={styles.bold}>Seborrheic Dermatitis</Text>: Causes scaly patches, often on the scalp (can cause dandruff).{"\n"}
                - <Text style={styles.bold}>Stasis Dermatitis</Text>: Occurs in the lower legs, often related to poor circulation.
              </Text>
            )}

            {/* Section 4: Symptoms */}
            <TouchableOpacity onPress={() => toggleSection('symptoms')}>
              <Text style={styles.sectionTitle}>Symptoms</Text>
            </TouchableOpacity>
            {activeSection === 'symptoms' && (
              <Text style={styles.sectionContent}>
                Eczema symptoms can vary, but common signs include:{"\n"}
                - Dry, scaly, or cracked skin{"\n"}
                - Itching, which can be severe, especially at night{"\n"}
                - Red or inflamed skin{"\n"}
                - Small, raised bumps that may leak fluid{"\n"}
                - Thickened skin (from scratching over time){"\n"}
                - Sensitive skin that reacts to irritants
              </Text>
            )}

            {/* Section 5: Remedies */}
            <TouchableOpacity onPress={() => toggleSection('remedies')}>
              <Text style={styles.sectionTitle}>Remedies</Text>
            </TouchableOpacity>
            {activeSection === 'remedies' && (
              <Text style={styles.sectionContent}>
                Eczema treatment typically involves:{"\n"}
                - <Text style={styles.bold}>Moisturizers</Text>: Using emollients to hydrate the skin and protect the barrier.{"\n"}
                - <Text style={styles.bold}>Topical Steroids</Text>: Creams or ointments that reduce inflammation during flare-ups.{"\n"}
                - <Text style={styles.bold}>Antihistamines</Text>: Medications to reduce itching.{"\n"}
                - <Text style={styles.bold}>Wet Wrap Therapy</Text>: Applying wet bandages over moisturized skin to calm inflammation.{"\n"}
                - <Text style={styles.bold}>Phototherapy</Text>: Controlled exposure to UV light for more severe cases.{"\n"}
                - <Text style={styles.bold}>Lifestyle Adjustments</Text>: Identifying and avoiding triggers to prevent flare-ups.
              </Text>
            )}

            {/* Section 6: What to Do */}
            <TouchableOpacity onPress={() => toggleSection('whatToDo')}>
              <Text style={styles.sectionTitle}>What to Do</Text>
            </TouchableOpacity>
            {activeSection === 'whatToDo' && (
              <Text style={styles.sectionContent}>
                - <Text style={styles.bold}>Keep Skin Moisturized</Text>: Regularly apply a fragrance-free moisturizer to prevent dryness.{"\n"}
                - <Text style={styles.bold}>Use Gentle Skincare Products</Text>: Choose soaps, cleansers, and lotions that are free from harsh chemicals.{"\n"}
                - <Text style={styles.bold}>Wear Soft, Breathable Fabrics</Text>: Cotton clothing is often best to prevent irritation.{"\n"}
                - <Text style={styles.bold}>Manage Stress</Text>: Since stress can trigger eczema, practicing relaxation techniques can help reduce flare-ups.{"\n"}
                - <Text style={styles.bold}>See a Dermatologist</Text>: Regular checkups can help manage the condition and adjust treatments as needed.
              </Text>
            )}

            {/* Section 7: What to Avoid */}
            <TouchableOpacity onPress={() => toggleSection('whatToAvoid')}>
              <Text style={styles.sectionTitle}>What to Avoid</Text>
            </TouchableOpacity>
            {activeSection === 'whatToAvoid' && (
              <Text style={styles.sectionContent}>
                - <Text style={styles.bold}>Harsh Soaps and Detergents</Text>: These can strip the skin of natural oils and trigger eczema.{"\n"}
                - <Text style={styles.bold}>Hot Showers or Baths</Text>: Hot water can dry out the skin, so use lukewarm water instead.{"\n"}
                - <Text style={styles.bold}>Scratching</Text>: As tempting as it is, scratching can worsen the irritation and lead to infections.{"\n"}
                - <Text style={styles.bold}>Environmental Triggers</Text>: Common allergens like dust mites, pet dander, or pollen can make eczema worse.{"\n"}
                - <Text style={styles.bold}>Rough or Synthetic Fabrics</Text>: Wool and other rough materials can irritate sensitive skin.
              </Text>
            )}

            {/* Section 8: Disclaimer */}
            <TouchableOpacity onPress={() => toggleSection('disclaimer')}>
              <Text style={styles.sectionTitle}>Disclaimer:</Text>
            </TouchableOpacity>
            {activeSection === 'disclaimer' && (
              <Text style={styles.sectionContent}>
                This application is designed to help track and monitor the severity of a patient’s eczema. It is not intended to replace professional medical advice or treatment. If symptoms persist or worsen, please consult your doctor for further evaluation and care.
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

export default Learn;
