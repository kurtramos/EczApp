import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import ImageView from 'react-native-image-viewing';
import BottomNav from '../components/BottomNav';
import BackArrow from '../components/BackArrow';
import { useRouter } from 'expo-router';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const doctorsImages = [
  require('../../assets/doctors/1.png'),
  require('../../assets/doctors/2.png'),
  require('../../assets/doctors/3.png'),
  require('../../assets/doctors/4.png'),
  require('../../assets/doctors/5.png'),
  require('../../assets/doctors/6.png'),
  require('../../assets/doctors/7.png'),
  require('../../assets/doctors/8.png'),
  require('../../assets/doctors/9.png'),
];

const Doctors = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => {
      setCurrentImage(index);
      setIsVisible(true);
    }}>
      <Image source={item} style={styles.imageStyle} resizeMode="contain" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <BackArrow onPress={() => router.push('/home')} />
      <Text style={styles.heading}>Doctors</Text>
      <Text style={styles.subheading}>FIND AN ALLERGY/IMMUNOLOGY SPECIALIST</Text>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.carouselContainer}>
          <Carousel
            loop
            width={windowWidth * 0.9}
            height={windowHeight * 0.35}  // Adjusted to move up closer to subheading
            autoPlay={true}
            data={doctorsImages}
            scrollAnimationDuration={2000}
            renderItem={renderItem}
          />
        </View>

        {/* Square Background moved down */}
        <View style={styles.squareBackground}>
          <Text style={styles.paragraph}>
            * insert information about the doctors here *
          </Text>
        </View>
      </ScrollView>

      <ImageView
        images={doctorsImages.map(image => ({ uri: Image.resolveAssetSource(image).uri }))}
        imageIndex={currentImage}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      />

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
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,  // Added padding to make sure everything scrolls smoothly
  },
  squareBackground: {
    backgroundColor: '#C3EFE5', 
    width: '100%', 
    height: 300,  // Adjusted height for better fit
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 20, 
    marginTop: 10, 
    alignSelf: 'stretch', 
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
    fontSize: 20,
    marginTop: 20,  // Reduced space between the subheading and the carousel
    color: '#85D3C0', 
    fontWeight: 'bold',
    textAlign: 'center', 
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'justify',
    marginBottom: 20,
    marginTop: 50, 
  },
  carouselContainer: {
    marginTop: -20,  // Reduced top margin to move carousel closer to the subheading
    marginBottom: 20,
    alignItems: 'center',  // Center the carousel
  },
  imageStyle: {
    width: windowWidth * 0.9,  // Fit the screen width while maintaining aspect ratio
    height: windowHeight * 0.35, // Adjust height for good visibility
    borderRadius: 15,
  },
});

export default Doctors;