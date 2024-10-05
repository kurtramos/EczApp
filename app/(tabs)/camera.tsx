import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackArrow from '../components/BackArrow'; // If you have a custom BackArrow component
import BottomNav from '../components/BottomNav';
import { useRouter } from 'expo-router'; 

const screenWidth = Dimensions.get('window').width;

const CameraScreen = () => {
    const router = useRouter();
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <BackArrow onPress={() => router.push('/home')} />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.header}>CAMERA</Text>
                <Text style={styles.description}>
                    Use the camera to capture images for skin condition recognition. Follow the instructions below for better accuracy.
                </Text>

                {/* Info Block with Instructions */}
                <View style={styles.infoContainer}>
                    <View style={styles.infoBlock}>
                        <Text style={styles.infoTitle}>Step 1: Lighting</Text>
                        <Text style={styles.infoText}>
                            Ensure the area is well-lit. Natural lighting is preferred for better accuracy in recognizing skin conditions.
                        </Text>
                    </View>

                    <View style={styles.infoBlock}>
                        <Text style={styles.infoTitle}>Step 2: Positioning</Text>
                        <Text style={styles.infoText}>
                            Hold the camera steady and ensure the affected skin is centered in the frame. Keep the phone 6-8 inches away.
                        </Text>
                    </View>

                    <View style={styles.infoBlock}>
                        <Text style={styles.infoTitle}>Step 3: Focus</Text>
                        <Text style={styles.infoText}>
                            Make sure the image is clear and not blurry. Tap on the screen to focus on the area of interest.
                        </Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => router.push('/camerascreen')}>
                    <Text style={styles.buttonText}>Proceed</Text>
                </TouchableOpacity>
            </ScrollView>
            <BottomNav /> 
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 20, // Adjusted to create more space at the top
    },
    scrollContainer: {
        alignItems: 'center',
        paddingBottom: 20, // Add bottom padding to avoid content being cut off
    },
    header: {
        fontSize: 32,
        color: '#85D3C0',
        fontWeight: '600',
        textAlign: 'center',
        marginVertical: 23, // Increased margin for more spacing
    },
    description: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
        marginBottom: 30, // Increased margin for more spacing
    },
    infoContainer: {
        width: screenWidth - 40,
        alignItems: 'center',
        marginBottom: 20,
    },
    infoBlock: {
        width: '100%',
        backgroundColor: 'rgba(195, 239, 228, 0.5)',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    infoText: {
        fontSize: 14,
        color: '#333',
    },
    button: {
        backgroundColor: '#85D3C0',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 30,
        width: screenWidth - 60,
        alignItems: 'center',
        marginTop: 20, // Adjusting margin to create more space above the button
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default CameraScreen;
