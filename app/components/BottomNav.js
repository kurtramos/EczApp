import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

const BottomNav = () => {
  const router = useRouter();
  
  // State to track the active route
  const [activeRoute, setActiveRoute] = useState('');

  // Helper function to handle navigation and set active route
  const handleNavigation = (route) => {
    setActiveRoute(route);
    router.push(route);
  };

  // Function to determine the icon color
  const getIconColor = (route) => {
    return activeRoute === route ? '#5D9386' : 'white';
  };

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem} onPress={() => handleNavigation('/home')}>
        <Icon name="home" size={24} color={getIconColor('/home')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => handleNavigation('/poemsurvey')}>
        <Icon name="clipboard" size={24} color={getIconColor('/poemsurvey')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => handleNavigation('/camera')}>
        <Icon name="camera" size={24} color={getIconColor('/camera')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => handleNavigation('/tracker')}>
        <Icon name="heartbeat" size={24} color={getIconColor('/tracker')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => handleNavigation('/myaccount')}>
        <Icon name="user" size={24} color={getIconColor('/myaccount')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#85D3C0',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    width: '100%', 
    alignSelf: 'center', 
    marginBottom: 20, 
    position: 'absolute', 
    bottom: 0,
  },
  navItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomNav;
