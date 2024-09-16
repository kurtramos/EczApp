import React from 'react';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import BottomNav from '../components/BottomNav';
import BackArrow from '../components/BackArrow';
import { useRouter } from 'expo-router'; 

const PrivacyPolicy = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <BackArrow onPress={() => router.push('/home')} />
      <ScrollView style={styles.scrollView}>
          <Text style={styles.heading}>ABOUT US</Text>
          
        <View style={styles.squareBackground}>
        <Text style={styles.paragraph}>
          * insert About Us *
        </Text>
        </View>
      </ScrollView>
      <BottomNav/>
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
    marginTop: 25, 
    marginLeft: 40,
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
