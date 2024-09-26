import React, { useState } from 'react'; 
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import BackArrow from '../components/BackArrow'; 
import BottomNav from '../components/BottomNav'; 
import { useRouter } from 'expo-router'; 
import * as ImagePicker from 'expo-image-picker';

const screenWidth = Dimensions.get('window').width;

const CameraScreen = () => {
    const router = useRouter();

    // Function to open the camera
    const openCamera = async () => {
        // Request camera permission
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (permission.granted) {
            // Launch camera
            const result = await ImagePicker.launchCameraAsync();
            if (!result.cancelled) {
                // Handle the captured image
                console.log(result.uri); // You can store or display the image as needed
            }
        } else {
            console.log("Camera permission not granted");
        }
    };

    return (
        <View style={styles.container}>
            <BackArrow onPress={() => router.push('/home')} />
            <View style={styles.header}>
                <Text style={styles.headerText}>CAMERA</Text>
            </View>
            <TouchableOpacity style={styles.cameraPlaceholder} onPress={openCamera}>
                <Text style={styles.placeholderText}>*text*</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.buttonText}>Retake</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.buttonText}>Capture</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.galleryButton}>
                <Text style={styles.galleryText}>Gallery</Text>
            </TouchableOpacity>
            <View style={styles.bottomNav}>
                <Icon name="home" size={24} color="#5D9386" />
                <Icon name="folder" size={24} color="#5D9386" />
                <Icon name="camera" size={24} color="#5D9386" />
                <Icon name="monitor-heart" size={24} color="#5D9386" />
                <Icon name="person" size={24} color="#5D9386" />
            </View>
            <BottomNav />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
   
        overflow: 'hidden',
        alignItems: 'center',
        paddingTop: 40,
    },
    headerText: {
        fontSize: 32,
        color: '#85D3C0',
        fontWeight: '600',
        textAlign: 'center',
        flex: 1,
        marginTop: 3,
    },
    cameraPlaceholder: {
        width: screenWidth - 40,
        height: 382,
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
