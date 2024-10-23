// import * as Google from 'expo-auth-session/providers/google';
// import { useEffect } from 'react';
// import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
// import { Alert } from 'react-native';
// import * as WebBrowser from 'expo-web-browser';

// WebBrowser.maybeCompleteAuthSession(); // Required for Expo's Google auth flow

// // Google Login Function
// const useGoogleLogin = () => {
//   const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
//     clientId: '53407213745-imhm40io7284jck0bh3iu9asmfh8vmpm.apps.googleusercontent.com', // Add your Google client ID here
//   });

//   useEffect(() => {
//     if (response?.type === 'success') {
//       const { id_token } = response.params;
//       const auth = getAuth();
//       const credential = GoogleAuthProvider.credential(id_token);
//       signInWithCredential(auth, credential)
//         .then(() => {
//           Alert.alert('Success', 'Logged in with Google!');
//         })
//         .catch((error) => {
//           Alert.alert('Error', 'An error occurred during Google login.');
//           console.error('Google Login Error:', error);
//         });
//     }
//   }, [response]);

//   return { request, promptAsync };
// };

// export default useGoogleLogin;


import * as Google from 'expo-auth-session/providers/google';
import { useEffect } from 'react';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants'; // For accessing app.json configurations

WebBrowser.maybeCompleteAuthSession(); // Required for Expo's Google auth flow

// Google Login Function
const useGoogleLogin = () => {
  const clientId = (Constants.manifest && Constants.manifest.extra && Constants.manifest.extra.googleClientId) || 'your-google-client-id.apps.googleusercontent.com';

  const redirectUri = Constants.manifest
    ? `https://auth.expo.io/@${Constants.manifest.owner}/${Constants.manifest.slug}`
    : 'your-fallback-redirect-uri'; // Set a fallback URI for development mode

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId,
    redirectUri,
    scopes: ['profile', 'email'], // Request profile and email permissions
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => {
          Alert.alert('Success', 'Logged in with Google!');
        })
        .catch((error) => {
          Alert.alert('Error', 'An error occurred during Google login.');
          console.error('Google Login Error:', error);
        });
    } else if (response?.type === 'cancel') {
      Alert.alert('Login Canceled', 'Google login was canceled.');
    } else if (response?.type === 'error') {
      Alert.alert('Error', 'Google login failed.');
      console.error('Google Login Error:', response.error);
    }
  }, [response]);

  return { request, promptAsync };
};

export default useGoogleLogin;
