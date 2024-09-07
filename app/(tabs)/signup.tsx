import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SignUpScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Account</Text>
      <View style={styles.verticalLine} />
      <Text style={styles.label}>First name</Text>
      <Text style={styles.label}>Password</Text>
      <View style={styles.inputField} />
      <Text style={styles.placeholder}>example name</Text>
      <Text style={styles.label}>Email</Text>
      <Text style={styles.placeholder}>example@example.com</Text>
      <Text style={styles.label}>Mobile Number</Text>
      <Text style={styles.placeholder}>9123456789</Text>
      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>By continuing, you agree to{'\n'}</Text>
        <Text style={styles.termsLink}>Terms of Use</Text>
        <Text style={styles.termsText}> and </Text>
        <Text style={styles.termsLink}>Privacy Policy.</Text>
      </View>
      <View style={styles.signUpButtonContainer}>
        <View style={styles.signUpButton} />
        <Text style={styles.signUpButtonText}>Sign Up</Text>
        <View style={styles.socialButtonsContainer}>
          {/* Example social button */}
          <View style={styles.socialButton} />
          <View style={styles.socialButton} />
          <View style={styles.socialButton} />
          <View style={styles.smallButton} />
          <View style={styles.smallButton} />
          <View style={styles.mediumButton}>
            <View style={styles.mediumButtonInner} />
            <View style={styles.mediumButtonLine} />
          </View>
        </View>
        <Text style={styles.orSignUpText}>or sign up with</Text>
        <View style={styles.loginTextContainer}>
          <Text style={styles.loginText}>already have an account? </Text>
          <Text style={styles.loginLink}>Log in</Text>
        </View>
      </View>
      <View style={styles.extraFieldsContainer}>
        <View style={styles.extraField} />
        <Text style={styles.extraFieldLabel}>*************</Text>
        <Text style={styles.extraLabel}>Date of birth</Text>
        <Text style={styles.extraPlaceholder}>DD / MM / YYYY</Text>
        <Text style={styles.extraLabel}>Last name</Text>
        <View style={styles.extraField} />
        <Text style={styles.extraFieldLabel}>lastname</Text>
        <View style={styles.extraField} />
        <View style={styles.extraField} />
        <View style={styles.extraField} />
        <View style={styles.extraField} />
        <View style={styles.countryCodeContainer}>
          <View style={styles.countryCodeField} />
          <Text style={styles.countryCode}>+63</Text>
          <View style={styles.countryCodeField} />
          <View style={styles.iconContainer}>
            <View style={styles.iconInner} />
          </View>
        </View>
        <Text style={styles.confirmPasswordLabel}>Confirm Password</Text>
        <View style={styles.inputField} />
        <View style={styles.extraField} />
        <Text style={styles.extraFieldLabel}>*************</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    width: 235,
    height: 14,
    textAlign: 'center',
    color: '#85D3C0',
    fontSize: 24,
    fontFamily: 'League Spartan',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  verticalLine: {
    width: 14,
    height: 8,
    backgroundColor: '#85D3C0',
    borderWidth: 2,
    borderColor: '#85D3C0',
    transform: [{ rotate: '-90deg' }],
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  label: {
    width: 214,
    height: 14,
    color: 'black',
    fontSize: 19,
    fontFamily: 'League Spartan',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  placeholder: {
    width: 219,
    height: 14,
    color: 'black',
    fontSize: 15,
    fontFamily: 'League Spartan',
    fontWeight: '400',
    textTransform: 'lowercase',
  },
  inputField: {
    width: 299,
    height: 34,
    backgroundColor: '#F3F3F3',
    borderRadius: 13,
  },
  termsContainer: {
    width: 273,
    height: 28,
    textAlign: 'center',
  },
  termsText: {
    color: '#070707',
    fontSize: 12,
    fontFamily: 'League Spartan',
    fontWeight: '300',
  },
  termsLink: {
    color: '#85D3C0',
    fontSize: 12,
    fontFamily: 'League Spartan',
    fontWeight: '500',
  },
  signUpButtonContainer: {
    width: 273,
    height: 160,
    position: 'relative',
  },
  signUpButton: {
    width: 207,
    height: 45,
    position: 'absolute',
    backgroundColor: '#85D3C0',
    borderRadius: 30,
    left: 33,
    top: 0,
  },
  signUpButtonText: {
    width: 162,
    height: 14,
    position: 'absolute',
    textAlign: 'center',
    color: 'white',
    fontSize: 24,
    fontFamily: 'League Spartan',
    fontWeight: '500',
    textTransform: 'capitalize',
    left: 56,
    top: 15,
  },
  socialButtonsContainer: {
    width: 138,
    height: 40,
    position: 'absolute',
    left: 68,
    top: 83,
  },
  socialButton: {
    width: 40,
    height: 40,
    backgroundColor: '#C3EFE5',
    borderRadius: 9999,
    position: 'absolute',
  },
  smallButton: {
    width: 22,
    height: 23,
    borderWidth: 2,
    borderColor: '#85D3C0',
    position: 'absolute',
  },
  mediumButton: {
    width: 24,
    height: 24,
    position: 'absolute',
  },
  mediumButtonInner: {
    width: 24,
    height: 24,
    backgroundColor: '#C3EFE5',
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#85D3C0',
  },
  mediumButtonLine: {
    width: 8,
    height: 17,
    borderWidth: 2,
    borderColor: '#85D3C0',
    position: 'absolute',
    left: 8,
    top: 7,
  },
  orSignUpText: {
    width: 273,
    height: 10,
    textAlign: 'center',
    color: '#070707',
    fontSize: 12,
    fontFamily: 'League Spartan',
    fontWeight: '300',
  },
  loginTextContainer: {
    width: 273,
    height: 28,
    textAlign: 'center',
  },
  loginText: {
    color: '#070707',
    fontSize: 12,
    fontFamily: 'League Spartan',
    fontWeight: '300',
  },
  loginLink: {
    color: '#85D3C0',
    fontSize: 12,
    fontFamily: 'League Spartan',
    fontWeight: '500',
  },
  extraFieldsContainer: {
    marginTop: 20,
  },
  extraField: {
    width: 299,
    height: 34,
    backgroundColor: '#F3F3F3',
    borderRadius: 13,
    marginBottom: 10,
  },
  extraFieldLabel: {
    width: 133,
    height: 14,
    color: 'black',
    fontSize: 15,
    fontFamily: 'League Spartan',
    fontWeight: '400',
    textTransform: 'capitalize',
  },
  extraLabel: {
    width: 131,
    height: 14,
    color: 'black',
    fontSize: 19,
    fontFamily: 'League Spartan',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  extraPlaceholder: {
    width: 144,
    height: 14,
    color: 'black',
    fontSize: 15,
    fontFamily: 'League Spartan',
    fontWeight: '400',
    textTransform: 'capitalize',
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCodeField: {
    width: 46,
    height: 28,
    backgroundColor: '#D9D9D9',
    borderRadius: 13,
    marginTop: 10,
  },
});

export default SignUpScreen;