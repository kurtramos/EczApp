import React, { useState } from 'react'; 
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import BackArrow from '../components/BackArrow'; 
import BottomNav from '../components/BottomNav'; 
import { useRouter } from 'expo-router'; 
import * as ImagePicker from 'expo-image-picker';

const screenWidth = Dimensions.get('window').width;

const CameraScreen = () => {
    const router = useRouter();
    const [imageUri, setImageUri] = useState(null); // State to store the selected image URI

    // Function to open the camera
    const openCamera = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (permission.granted) {
            const result = await ImagePicker.launchCameraAsync();
            if (!result.cancelled) {
                setImageUri(result.uri); // Set the captured image URI
            }
        } else {
            Alert.alert("Camera permission not granted");
        }
    };

    // Function to open the image gallery
    const openImageGallery = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permission.granted) {
            const result = await ImagePicker.launchImageLibraryAsync();
            if (!result.cancelled) {
                setImageUri(result.uri); // Set the selected image URI
            }
        } else {
            Alert.alert("Media library permission not granted");
        }
    };

    return (
        <View style={styles.container}>
            <BackArrow onPress={() => router.push('/home')} />
            <View style={styles.header}>
                <Text style={styles.headerText}>CAMERA</Text>
            </View>
            <TouchableOpacity style={styles.cameraPlaceholder} onPress={openCamera}>
                <Text style={styles.placeholderText}>CLICK TO OPEN CAMERA</Text>
            </TouchableOpacity>
            {imageUri && (
                <View style={styles.imagePreview}>
                    <Text style={styles.previewText}>Selected Image:</Text>
                    <Image source={{ uri: imageUri }} style={styles.image} />
                </View>
            )}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.actionButton} onPress={openCamera}>
                    <Text style={styles.buttonText}>Retake</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={openImageGallery}>
                    <Text style={styles.buttonText}>Image Upload</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={() => Alert.alert("Image Saved")}>
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
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: 'white',
        fontSize: 18,
    },
    imagePreview: {
        marginTop: 20,
        alignItems: 'center',
    },
    previewText: {
        fontSize: 16,
        color: '#5D9386',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginTop: 10,
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
