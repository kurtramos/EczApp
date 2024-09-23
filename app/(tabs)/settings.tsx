import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRouter } from 'expo-router'; 

const SettingsScreen = () => {
    const router = useRouter();
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity>
            <Icon name="arrow-back" size={24} color="#85D3C0" onPress={() => router.push('/home')} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        <View style={styles.menuItem}>
          <Icon name="language" size={24} color="#85D3C0" />
          <Text style={styles.menuText}>Language Setting</Text>
          <Icon name="navigate-next" size={20} color="#85D3C0" />
        </View>

        <View style={styles.menuItem}>
          <Icon name="notifications" size={24} color="#85D3C0" />
          <Text style={styles.menuText}>Notification Setting</Text>
          <Icon name="navigate-next" size={20} color="#85D3C0" />
        </View>

        <View style={styles.menuItem}>
          <Icon name="lock" size={24} color="#85D3C0" />
          <Text style={styles.menuText}>Change Password</Text>
          <Icon name="navigate-next" size={20} color="#85D3C0" />
        </View>

        <View style={styles.menuItem}>
          <Icon name="delete" size={24} color="#85D3C0" />
          <Text style={styles.menuText}>Delete Account</Text>
          <Icon name="navigate-next" size={20} color="#85D3C0" />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    color: '#85D3C0',
    fontWeight: '600',
    marginLeft: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 10,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  menuText: {
    flex: 1,
    fontSize: 18,
    marginLeft: 20,
    color: 'black',
  },
});

export default SettingsScreen;
