import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Make sure this package is installed
import BackArrow from '../components/BackArrow';
import { useRouter } from 'expo-router'; 
import BottomNav from '../components/BottomNav';

// Define the props interface for AccountOption
interface AccountOptionProps {
  icon: string; // The name of the icon from MaterialIcons
  title: string; // The title text
  onPress: () => void; // Function to be called on press
}

const MyAccountScreen = () => {
  const router = useRouter();
  
  return (
      <View style={styles.container}>
          <BackArrow onPress={() => router.push('/home')} />
          <ScrollView style={styles.scrollView}>
              <Text style={styles.title}>My Account</Text>
              
              <AccountOption icon="person" title="Profile" onPress={() => router.push('/profile')} />
              <AccountOption icon="record-voice-over" title="My Record" onPress={() => router.push('/myrecord')} />
              <AccountOption icon="settings" title="Settings" onPress={() => router.push('/settings')} />
              <AccountOption icon="lock" title="Privacy Policy" onPress={() => router.push('/PrivacyPolicy')} />
              <AccountOption icon="exit-to-app" title="Logout" onPress={() => router.push('/')} />
          </ScrollView>

      </View>
  );
};

// Define the AccountOption component
const AccountOption: React.FC<AccountOptionProps> = ({ icon, title, onPress }) => {
  return (
      <TouchableOpacity style={styles.option} onPress={onPress}>
          <Icon name={icon} size={24} color="#85D3C0" style={styles.icon} />
          <Text style={styles.optionText}>{title}</Text>
          <Icon name="chevron-right" size={24} color="#85D3C0" />
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  backArrow: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    color: '#85D3C0',
    fontWeight: '600',
    marginVertical: 50,
    textAlign: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  icon: {
    marginRight: 20,
  },
  optionText: {
    fontSize: 20,
    flex: 1,
  },
});

export default MyAccountScreen;
