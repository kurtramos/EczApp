import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router'; 
import BackArrow from '../components/BackArrow';

// Firebase imports
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const SignUpScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(''); // Added email state
  const [password, setPassword] = useState(''); // Added password state
  const [confirmPassword, setConfirmPassword] = useState(''); // Added confirm password state
  const [mobileNumber, setMobileNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [tempDate, setTempDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const router = useRouter();

  // Error Handling
  const handleNameChange = (value: string, setName: { (value: React.SetStateAction<string>): void; (value: React.SetStateAction<string>): void; (arg0: any): void; }) => {
    const alphabetRegex = /^[A-Za-z\s]+$/;
    if (value === '' || alphabetRegex.test(value)) {
      setName(value);
    } else {
      Alert.alert('Invalid Input', 'Name must contain only alphabetic characters.');
    }
  };

  const handleMobileNumberChange = (value: any[] | React.SetStateAction<string>) => {
    const numericRegex = /^[0-9]*$/;
    if (numericRegex.test(value) && value.length <= 10) {
      setMobileNumber(value);
    } else if (value.length > 10) {
      Alert.alert('Invalid Input', 'Mobile number must be up to 10 digits only.');
    }
  };

  const onDateChange = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate || tempDate;
    setTempDate(currentDate);
  };

  const confirmDateSelection = () => {
    setDateOfBirth(tempDate);
    setShowDatePicker(false);
  };

  // Firebase Sign-up Logic
  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all the fields!');
      return;
    }
  
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Account created successfully!');
      // You can navigate to another screen or clear form fields here
      router.push('/login'); // Redirect to login screen after sign-up
    } catch (error) {
      const errorMessage = error.message || "An unknown error occurred"; // Safely access error.message
      Alert.alert('Sign-Up Error', errorMessage);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <BackArrow onPress={() => router.push('/Homescreen')} />

        <Text style={styles.title}>New Account</Text>

        {/* First Name */}
        <Text style={styles.label}>First name</Text>
        <TextInput
          style={styles.inputField}
          placeholder="example name"
          placeholderTextColor="#bcbcbc"
          value={firstName}
          onChangeText={(value) => handleNameChange(value, setFirstName)}
        />

        {/* Last Name */}
        <Text style={styles.label}>Last name</Text>
        <TextInput
          style={styles.inputField}
          placeholder="lastname"
          placeholderTextColor="#bcbcbc"
          value={lastName}
          onChangeText={(value) => handleNameChange(value, setLastName)}
        />

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.inputField}
          placeholder="example@example.com"
          placeholderTextColor="#bcbcbc"
          value={email}
          onChangeText={setEmail} // Set email value
        />

        {/* Password */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="*************"
            placeholderTextColor="#bcbcbc"
            secureTextEntry={!passwordVisible}
            value={password} // Set password value
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={passwordVisible ? "eye" : "eye-off"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password */}
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="*************"
            placeholderTextColor="#bcbcbc"
            secureTextEntry={!confirmPasswordVisible}
            value={confirmPassword} // Set confirm password value
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity
            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={confirmPasswordVisible ? "eye" : "eye-off"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>

        {/* Mobile Number */}
        <Text style={styles.label}>Mobile Number</Text>
        <View style={styles.mobileNumberContainer}>
          <View style={styles.countryCodeContainer}>
            <Text style={styles.countryCode}>+63</Text>
          </View>
          <TextInput
            style={styles.mobileInput}
            placeholder="9123456789"
            placeholderTextColor="#bcbcbc"
            value={mobileNumber}
            onChangeText={handleMobileNumberChange}
            keyboardType="numeric"
          />
        </View>

        {/* Date of Birth */}
        <Text style={styles.label}>Date Of Birth</Text>
        <TouchableOpacity
          style={styles.inputField}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.dateOfBirthText}>
            {dateOfBirth.toLocaleDateString()}
          </Text>
        </TouchableOpacity>

        {/* Date Picker Modal */}
        <Modal visible={showDatePicker} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.datePickerContainer}>
              <DateTimePicker
                value={tempDate}
                mode="date"
                display="default"
                onChange={onDateChange}
                maximumDate={new Date()} // Prevent future dates
              />
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={confirmDateSelection}
              >
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  backArrow: {
    position: 'absolute',
    top: 50,
    left: 20,
  },
  title: {
    textAlign: 'center',
    color: '#85D3C0',
    fontSize: 24,
    fontWeight: '600',
    marginTop: 30,  // Add marginTop to give more space
    marginVertical: 10,
  },
  label: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    width: '100%',
  },
  inputField: {
    width: '100%',
    height: 45,
    backgroundColor: '#F3F3F3',
    borderRadius: 13,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 16,
    justifyContent: 'center',
  },
  dateOfBirthText: {
    color: '#bcbcbc',
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%', //for flexible screen sizes
    backgroundColor: '#F3F3F3',
    borderRadius: 13,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    height: 45,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  eyeIcon: {
    paddingRight: 10,
  },
  mobileNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    width: '100%', //for flexible screen sizes
    borderRadius: 13,
    marginBottom: 10,
  },
  countryCodeContainer: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    height: 45,
    backgroundColor: '#F3F3F3',
  },
  countryCode: {
    fontSize: 16,
    color: 'black',
  },
  mobileInput: {
    flex: 1,
    height: 45,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  datePickerContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 30,
  },
  confirmButton: {
    backgroundColor: '#85D3C0',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
  },
  termsContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  termsText: {
    fontSize: 12,
    color: '#070707',
    textAlign: 'center',
  },
  termsLink: {
    color: '#85D3C0',
    fontWeight: '500',
  },
  signUpButton: {
    width: '50%',
    height: 45,
    backgroundColor: '#85D3C0',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  orSignUpText: {
    fontSize: 12,
    color: '#5A5858',
    textAlign: 'center',
    marginBottom: 10,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 138,
    alignSelf: 'center',
    marginBottom: 20,
  },
  circle: {
    width: 40,
    height: 40,
    backgroundColor: '#C3EFE5',
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: '#5A5858',
    fontSize: 12,
  },
  loginLink: {
    color: '#85D3C0',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default SignUpScreen;
