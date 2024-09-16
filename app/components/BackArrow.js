// components/BackArrow.js
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; 

const BackArrow = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.backArrow} onPress={onPress}>
      <Ionicons name="chevron-back" size={24} color="#85D3C0" />
    </TouchableOpacity>
  );
};

const styles = {
  backArrow: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
};

export default BackArrow;
