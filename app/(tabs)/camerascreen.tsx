import React, { useState } from 'react'; 
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert, Image } from 'react-native';
import BackArrow from '../components/BackArrow'; 
import BottomNav from '../components/BottomNav'; 
import { useRouter } from 'expo-router'; 
import * as ImagePicker from 'expo-image-picker';
import { getAuth } from 'firebase/auth';
import { firestore, storage } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const screenWidth = Dimensions.get('window').width;

const CameraScreen = () => {
    const router = useRouter();
    const [imageUri, setImageUri] = useState(null);  // Stores the selected or captured image URI

    // Function to open the camera
    const openCamera = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (permission.granted) {
            const result = await ImagePicker.launchCameraAsync();
            if (!result.cancelled && result.assets && result.assets[0].uri) {
                setImageUri(result.assets[0].uri); // Set the captured image URI
                console.log("Camera image URI:", result.assets[0].uri);
            } else {
                console.log("Camera capture was cancelled or URI is undefined");
                Alert.alert("Camera capture was cancelled or failed.");
            }
        } else {
            Alert.alert("Camera permission not granted");
        }
    };
    
    const openImageGallery = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permission.granted) {
            const result = await ImagePicker.launchImageLibraryAsync();
            if (!result.cancelled && result.assets && result.assets[0].uri) {
                setImageUri(result.assets[0].uri); // Set the selected image URI
                console.log("Gallery image URI:", result.assets[0].uri);
            } else {
                console.log("Image selection was cancelled or URI is undefined");
                Alert.alert("Image selection was cancelled or failed.");
            }
        } else {
            Alert.alert("Media library permission not granted");
        }
    };
    
    // Function to save image to Firebase Storage and Firestore
    const saveImage = async () => {
        if (!imageUri) {
            Alert.alert("No image selected");
            return;
        }

        try {
            const user = getAuth().currentUser;
            const userEmail = user?.email;

            if (!userEmail) {
                Alert.alert("No user is currently logged in.");
                return;
            }

            // Create a unique path for each image
            const imageName = `images/${userEmail}/${Date.now()}_image.jpg`;
            const storageRef = ref(storage, imageName);

            console.log("Fetching image as blob...");
            const response = await fetch(imageUri);
            const blob = await response.blob();
            console.log("Uploading blob to Firebase Storage...");
            await uploadBytes(storageRef, blob);

            console.log("Getting download URL...");
            const downloadURL = await getDownloadURL(storageRef);
            console.log("Download URL:", downloadURL);

            // Save the image URL to Firestore
            const imagesCollectionRef = collection(firestore, "users", userEmail, "images");
            await addDoc(imagesCollectionRef, {
                imageUrl: downloadURL,
                timestamp: new Date().toISOString(),
            });

            Alert.alert("Image saved successfully!");
        } catch (error) {
            console.error("Error saving image:", error);
            Alert.alert("Failed to save image");
        }
    };

    return (
        <View style={styles.container}>
            <BackArrow onPress={() => router.push('/home')} />
            <View style={styles.header}>
                <Text style={styles.headerText}>CAMERA</Text>
            </View>

            {/* Display the selected image in the placeholder area if it exists */}
            <TouchableOpacity style={styles.cameraPlaceholder} onPress={!imageUri ? openCamera : null}>
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.cameraPlaceholderImage} />
                ) : (
                    <Text style={styles.placeholderText}>CLICK TO OPEN CAMERA</Text>
                )}
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.actionButton} onPress={openCamera}>
                    <Text style={styles.buttonText}>Retake</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={openImageGallery}>
                    <Text style={styles.buttonText}>Image Upload</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={saveImage}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.galleryButton} onPress={() => router.push('/gallery')}>
                <Text style={styles.galleryText}>Gallery</Text>
            </TouchableOpacity>

            <BottomNav />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: 20,
    },
    header: {
        fontSize: 32,
        color: '#85D3C0',
        fontWeight: '600',
        textAlign: 'center',
        marginVertical: 20,
    },
    headerText: {
        fontSize: 32,
        color: '#85D3C0',
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 3,
    },
    cameraPlaceholder: {
        width: screenWidth - 40,
        height: 330,
        backgroundColor: 'black',
        borderRadius: 13,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraPlaceholderImage: {
        width: '100%',
        height: '100%',
        borderRadius: 13,
        resizeMode: 'cover',
    },
    placeholderText: {
        color: 'white',
        fontSize: 18,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    actionButton: {
        backgroundColor: '#85D3C0',
        borderRadius: 24,
        paddingVertical: 10,
        paddingHorizontal: 20,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '400',
    },
    galleryButton: {
        backgroundColor: 'rgba(132.89, 211.21, 192.41, 0.42)',
        borderRadius: 13,
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    galleryText: {
        color: '#5D9386',
        fontSize: 14,
        fontWeight: '400',
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderColor: '#E8E8E8',
    },
});

export default CameraScreen;
