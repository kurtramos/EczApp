import React from 'react';
import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import BottomNav from '../components/BottomNav';
import BackArrow from '../components/BackArrow';
import { useRouter } from 'expo-router'; 

const PrivacyPolicy = () => {
  const router = useRouter();
  return (
    
    <View style={styles.container}>
       <BackArrow onPress={() => router.push('/home')} />
       <Text style={styles.heading}>FAQs</Text>
      <ScrollView style={styles.scrollView}>

          
        <View style={styles.squareBackground}>
        <Text style={styles.subheading}>What is Eczema?</Text>
        <Text style={styles.paragraph}>
        Eczema, also known as atopic dermatitis, is a chronic skin condition that causes the skin to become itchy, inflamed, and dry. It often appears as red patches, which may sometimes ooze or become scaly.
        </Text>

        <Text style={styles.subheading}>Is eczema common among Filipinos?</Text>
        <Text style={styles.paragraph}>
        Eczema is relatively common among Filipinos, especially due to the country's tropical climate, which can trigger flare-ups from heat, humidity, or environmental allergens.        </Text>

        <Text style={styles.subheading}>What are the common triggers of eczema in Filipinos?</Text>
        <Text style={styles.paragraph}>
        Common triggers include: {"\n"}

      - Heat and humidity{"\n"}
      - Sweat{"\n"}
      - Certain fabrics (like wool or synthetic materials){"\n"}
      - Harsh soaps or detergents{"\n"}
      - Stress{"\n"}
      - Food allergens like seafood{"\n"}
      - Environmental allergens such as dust mites, pollen, and mold {"\n"} 
      </Text>

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
    height: '100%', 
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
});

export default PrivacyPolicy;
