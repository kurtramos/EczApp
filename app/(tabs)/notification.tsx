import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure to install this package
import BackArrow from '../components/BackArrow';
import { useRouter } from 'expo-router'; 


const NotificationScreen = () => {
    const router = useRouter();
  return (
    <View style={styles.container}>
    <BackArrow onPress={() => router.push('/home')} />
      <ScrollView style={styles.scrollView}>

        <View style={styles.header}>
          {/* <TouchableOpacity>
            <Icon name="arrow-back" size={24} color="#85D3C0" />
          </TouchableOpacity> */}

          <Text style={styles.headerTitle}>Notification</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today</Text>
          <NotificationItem time="2 M" title="Scheduled Appointment" details="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
          <NotificationItem time="2 H" title="Scheduled Change" details="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
          <NotificationItem time="3 H" title="Medical Notes" details="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Yesterday</Text>
          <NotificationItem time="1 D" title="Scheduled Appointment" details="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>15 April</Text>
          <NotificationItem time="5 D" title="Medical History Update" details="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
        </View>
      </ScrollView>
    </View>
  );
};

const NotificationItem = ({ time, title, details }) => {
  return (
    <View style={styles.notificationItem}>
      <Icon name="event-note" size={24} color="#85D3C0" style={styles.icon} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.details}>{details}</Text>
      </View>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  backArrow: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    color: '#85D3C0', 
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 25, 
    marginLeft: 40,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#5D9386',
    marginBottom: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DBFFF6',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: 'black',
  },
  details: {
    fontSize: 12,
    color: 'black',
    opacity: 0.6,
  },
  time: {
    fontSize: 12,
    color: 'black',
  },
});

export default NotificationScreen;
