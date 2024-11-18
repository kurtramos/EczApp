import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BackArrow from '../components/BackArrow';
import { useRouter } from 'expo-router';
import { getAuth } from "firebase/auth";
import { firestore } from "../firebaseConfig";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { getStorage, ref, listAll, deleteObject } from "firebase/storage";

const SettingsScreen = () => {
  const router = useRouter();

  const handleDeleteAccount = async () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete your account? This action is irreversible, and all your data and files will be permanently deleted.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: deleteAccount,
        },
      ]
    );
  };

  const deleteAccount = async () => {
    const user = getAuth().currentUser;

    if (!user) {
      Alert.alert("Error", "No user is currently logged in.");
      return;
    }

    const userEmail = user.email;
    const storage = getStorage();

    try {
      // Delete Firestore user document
      const userDocRef = doc(firestore, "users", userEmail);
      await deleteDoc(userDocRef);

      // Delete Firestore sub-collections (e.g., POEMScores, POEMSurvey, notifications)
      const subCollections = ["POEMScores", "POEMSurvey", "notifications"];
      for (const subCollection of subCollections) {
        const subCollectionRef = collection(firestore, "users", userEmail, subCollection);
        const querySnapshot = await getDocs(subCollectionRef);
        querySnapshot.forEach(async (docSnapshot) => {
          await deleteDoc(docSnapshot.ref);
        });
      }

      // Delete storage files
      const userStorageRef = ref(storage, `images/${userEmail}`);
      const files = await listAll(userStorageRef);
      files.items.forEach(async (fileRef) => {
        await deleteObject(fileRef);
      });

      // Delete Firebase Authentication account
      await user.delete();

      Alert.alert("Success", "Your account has been deleted successfully.");
      router.push("/Homescreen"); // Redirect to home or login screen
    } catch (error) {
      console.error("Error deleting account:", error);
      Alert.alert("Error", "Failed to delete your account. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <BackArrow onPress={() => router.push('/myaccount')} />
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Settings</Text>

        <SettingOption icon="language" title="Language Setting" onPress={() => router.push('/languagesettings')} />
        <SettingOption icon="notifications" title="Notification Setting" onPress={() => router.push('/notificationsettings')} />
        <SettingOption icon="lock" title="Change Password" onPress={() => router.push('/changepassword')} />
        <SettingOption icon="delete" title="Delete Account" onPress={handleDeleteAccount} />
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
