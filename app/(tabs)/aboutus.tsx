import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet, View, Image, TextInput, TouchableOpacity, Dimensions, Linking } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import ImageView from 'react-native-image-viewing';
import BottomNav from '../components/BottomNav';
import BackArrow from '../components/BackArrow';
import allergists from '../components/allergistspt1';
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
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering the list of doctors based on the search query
  const filteredDoctors = allergists.filter((doctor) => {
    const searchLower = searchQuery.toLowerCase();
  
    return (
      (doctor.name && doctor.name.toLowerCase().includes(searchLower)) ||
      (doctor.city && doctor.city.toLowerCase().includes(searchLower)) ||
      (doctor.hospital && doctor.hospital.toLowerCase().includes(searchLower)) ||
      (doctor.schedule && doctor.schedule.toLowerCase().includes(searchLower)) ||
      (doctor.unit && doctor.unit.toLowerCase().includes(searchLower)) || // Optional chaining for unit
      (doctor.contact && doctor.contact.toLowerCase().includes(searchLower)) || // Contact treated as string
      (doctor.platforms && doctor.platforms.some(platform => platform.toLowerCase().includes(searchLower))) // Filters by platforms
    );
  });
  

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
        {/* Informational Text */}
        <View style={styles.infoSection}>
          <Text style={styles.infoText}>
            Allergy and Immunology specialists are experts in diagnosing and treating allergic diseases and immune system disorders. These may include asthma, food allergies, eczema, allergic rhinitis, and autoimmune conditions.
          </Text>
        </View>

        {/* Carousel */}
        <View style={styles.carouselContainer}>
          <Carousel
            loop
            width={windowWidth * 0.9}
            height={windowHeight * 0.35} // Adjusted for visibility
            autoPlay={true}
            data={doctorsImages}
            scrollAnimationDuration={2000}
            renderItem={renderItem}
          />
        </View>

        {/* Source Information */}
        <View style={styles.infoSection}>
          <Text style={styles.psaaiSource}>
            PSAAI is a globally recognized organization of moral and ethical physicians with a passion for excellence in the field of Allergy and Immunology. It is committed to dedicated service, continuing education, training, and research, with the ultimate goal of providing the best healthcare for all people.
          </Text>
          <Text style={styles.scrollDown}>Scroll down to know more about the doctors.</Text>
        </View>

        {/* Search Bar */}
        <TextInput
          style={styles.searchBar}
          placeholder="Search for a doctor, city, hospital, unit, contact, or platform..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />

        {/* Doctor Details */}
        <View style={styles.squareBackground}>
          <ScrollView>
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor, index) => (
                <View key={index} style={styles.doctorCard}>
                  <Text style={styles.city}>{doctor.city.toUpperCase()}</Text>
                  <Text style={styles.doctorName}>{doctor.name}</Text>
                  <Text style={styles.doctorDetails}>{doctor.hospital}</Text>
                  {doctor.unit && <Text style={styles.doctorDetails}>{doctor.unit}</Text>}
                  <Text style={styles.doctorDetails}>{doctor.schedule}</Text>
                  <Text style={styles.doctorDetails}>Contact: {doctor.contact}</Text>
                  {doctor.platforms && doctor.platforms.length > 0 && (
                    <Text style={styles.doctorDetails}>Platforms: {doctor.platforms.join(', ')}</Text>
                  )}
                </View>
              ))
            ) : (
              <Text style={styles.noResults}>No doctors found matching your search.</Text>
            )}
          </ScrollView>
        </View>

        {/* Doctor List Source */}
        <Text style={styles.doctorSource}>
          The doctor list is sourced from{' '}
          <Text 
            style={styles.linkText}
            onPress={() => Linking.openURL('https://psaai.org/find-an-allergist/')}>
            https://psaai.org/find-an-allergist/
          </Text>.
        </Text>
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
    paddingBottom: 100,
  },
  searchBar: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
    fontSize: 16,
    marginTop: -10, // added margin to give space between carousel and search bar
  },
  squareBackground: {
    backgroundColor: '#C3EFE5',
    width: '100%',
    height: 300, 
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
    alignSelf: 'stretch',
    padding: 20,
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
    marginTop: 20,
    color: '#85D3C0',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoSection: {
    marginTop: -10,
    marginBottom: 15,
  },
  infoText: {
    fontSize: 13,
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 15,
  },
  psaaiSource: {
    fontSize: 13,
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 10,
  },
  scrollDown: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#85D3C0',
    marginTop: 0,
    marginBottom: 20,
  },
  doctorCard: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: '100%',
  },
  city: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFA500',
    marginBottom: 5,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  doctorDetails: {
    fontSize: 14,
    color: '#5A5858',
    marginTop: 5,
  },
  noResults: {
    fontSize: 16,
    color: '#FF0000',
    marginTop: 10,
  },
  doctorSource: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#5A5858',
    textAlign: 'center',
    marginBottom: 10, // spacing for readability
  },
  carouselContainer: {
    marginTop: -60,
    marginBottom: -20, // reduced space to accommodate the search bar below
    alignItems: 'center',
  },
  imageStyle: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.35,
    borderRadius: 15,
  },
  linkText: {
    color: '#1E90FF',
  },
});

export default Doctors;
