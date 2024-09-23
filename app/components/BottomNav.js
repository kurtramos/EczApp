// BottomNav.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router'; 

const BottomNav = () => {
  const router = useRouter();
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem}>
        <Icon name="home" size={24} color="#5D9386" onPress={() => router.push('/home')}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Icon name="clipboard" size={24} color="white" onPress={() => router.push('/poemsurvey')}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Icon name="camera" size={24} color="white" onPress={() => router.push('/camera')}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Icon name="heartbeat" size={24} color="white" onPress={() => router.push('/tracker')}/>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Icon name="user" size={24} color="white" onPress={() => router.push('/myaccount')}/>
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
    width: '90%', 
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
