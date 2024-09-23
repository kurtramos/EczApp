import React from 'react';
import { View, Text, Switch, ScrollView, StyleSheet } from 'react-native';
import BackArrow from '../components/BackArrow';
import { useRouter } from 'expo-router'; 
import BottomNav from '../components/BottomNav';

const NotificationSettingScreen = () => {
    const router = useRouter();
  const [generalNotification, setGeneralNotification] = React.useState(true);
  const [sound, setSound] = React.useState(true);
  const [vibrate, setVibrate] = React.useState(false);

  return (
    <View style={styles.container}>
    <BackArrow onPress={() => router.push('/settings')} />
      <ScrollView>
        <Text style={styles.headerTitle}>Notification Setting</Text>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>General Notification</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={generalNotification ? '#f5dd4b' : '#f4f3f4'}
            onValueChange={() => setGeneralNotification(previousState => !previousState)}
            value={generalNotification}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Sound</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={sound ? '#f5dd4b' : '#f4f3f4'}
            onValueChange={() => setSound(previousState => !previousState)}
            value={sound}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingText}>Vibrate</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={vibrate ? '#f5dd4b' : '#f4f3f4'}
            onValueChange={() => setVibrate(previousState => !previousState)}
            value={vibrate}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 30,
  },
  headerTitle: {
    fontSize: 24,
    color: '#85D3C0',
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8'
  },
  settingText: {
    fontSize: 20,
    flex: 1,
  },
});

export default NotificationSettingScreen;
