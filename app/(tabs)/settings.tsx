import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure this package is installed
import BackArrow from '../components/BackArrow';
import { useRouter } from 'expo-router';
import BottomNav from '../components/BottomNav';

const SettingsScreen = () => {
  const router = useRouter();
  return (
      <View style={styles.container}>
          <BackArrow onPress={() => router.push('/myaccount')} />
          <ScrollView style={styles.scrollView}>
              <Text style={styles.title}>Settings</Text>

              <SettingOption icon="language" title="Language Setting" onPress={() => router.push('/languagesettings')} />
              <SettingOption icon="notifications" title="Notification Setting" onPress={() => router.push('/notificationsettings')} />
              <SettingOption icon="lock" title="Change Password" onPress={() => router.push('/changepassword')} />
              <SettingOption icon="delete" title="Delete Account" onPress={() => router.push('/deleteaccount')} />
          </ScrollView>

      </View>
  );
};

const SettingOption = ({ icon, title, onPress }) => {
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

export default SettingsScreen;


// import React from 'react';
// import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import BackArrow from '../components/BackArrow';
// import { useRouter } from 'expo-router'; 
// import BottomNav from '../components/BottomNav';

// const SettingsScreen = () => {
//     const router = useRouter();
//   return (
//     <View style={styles.container}>
//           <BackArrow onPress={() => router.push('/home')} />
//       <ScrollView>
        
//         <View style={styles.header}>

//           <Text style={styles.headerTitle}>Settings</Text>
//         </View>

//         <View style={styles.menuItem}>
//           <Icon name="language" size={24} color="#85D3C0" />
//           <Text style={styles.menuText}>Language Setting</Text>
//           <Icon name="navigate-next" size={20} color="#85D3C0" />
//         </View>

//         <View style={styles.menuItem}>
//           <Icon name="notifications" size={24} color="#85D3C0" />
//           <Text style={styles.menuText}>Notification Setting</Text>
//           <Icon name="navigate-next" size={20} color="#85D3C0" />
//         </View>

//         <View style={styles.menuItem}>
//           <Icon name="lock" size={24} color="#85D3C0" />
//           <Text style={styles.menuText}>Change Password</Text>
//           <Icon name="navigate-next" size={20} color="#85D3C0" />
//         </View>

//         <View style={styles.menuItem}>
//           <Icon name="delete" size={24} color="#85D3C0" />
//           <Text style={styles.menuText}>Delete Account</Text>
//           <Icon name="navigate-next" size={20} color="#85D3C0" />
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     paddingTop: 50,
//   },
//   header: {
//     // flexDirection: 'row',
//     alignItems: 'center',
//     // paddingLeft: 20,
//     marginBottom: 20,
//   },
//   headerTitle: {
//     fontSize: 24,
//     color: '#85D3C0',
//     fontWeight: '600',
//     // marginLeft: 20,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingLeft: 20,
//     paddingRight: 10,
//     height: 50,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E8E8E8',
//   },
//   menuText: {
//     flex: 1,
//     fontSize: 18,
//     marginLeft: 20,
//     color: 'black',
//   },
// });

// export default SettingsScreen;
