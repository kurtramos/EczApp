import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Image,
    ScrollView,
    Dimensions,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useFocusEffect } from 'expo-router';
import BackArrow from '../components/BackArrow';
import { getAuth } from 'firebase/auth';
import { firestore } from '../firebaseConfig';
import { collection, query, getDocs, doc, getDoc } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import { useTranslation } from "react-i18next";


const { width } = Dimensions.get('window');
const imageSize = width / 3 - 10;

const GalleryScreen = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [profileInfo, setProfileInfo] = useState({
        firstName: 'Unknown',
        lastName: 'Unknown',
        email: 'Unknown',
    });

    const user = getAuth().currentUser;

    useFocusEffect(
        useCallback(() => {
            if (user) {
                fetchUserImages();
                fetchProfileInfo();
            } else {
                Alert.alert('Error', 'No user is logged in');
            }
        }, [user])
    );

    // Fetch user's profile information
    const fetchProfileInfo = async () => {
        try {
            const userDocRef = doc(firestore, 'users', user.email);
            const userDocSnap = await getDoc(userDocRef);
            if (userDocSnap.exists()) {
                const data = userDocSnap.data();
                setProfileInfo({
                    firstName: data.firstName || 'Unknown',
                    lastName: data.lastName || 'Unknown',
                    email: data.email || user.email,
                });
            } else {
                console.log("No profile information found for the user.");
            }
        } catch (error) {
            console.error("Error fetching profile info:", error);
            Alert.alert("Error", "Failed to load profile information.");
        }
    };

    // Fetch user's images
    const fetchUserImages = async () => {
        try {
            setLoading(true);
            const imagesCollectionRef = collection(firestore, 'users', user.email, 'images');
            const imagesQuery = query(imagesCollectionRef);
            const querySnapshot = await getDocs(imagesQuery);

            const userImages = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                uri: doc.data().imageUrl,
                timestamp: doc.data().timestamp instanceof Timestamp ? doc.data().timestamp.toDate() : 'Unknown',
            }));

            const groupedImages = groupImagesByDate(userImages);
            setImages(groupedImages);
        } catch (error) {
            console.error('Error fetching images:', error);
            Alert.alert('Error', 'Could not fetch images.');
        } finally {
            setLoading(false);
        }
    };

    // Group images by date
    const groupImagesByDate = (images) => {
            // Sort images by timestamp in descending order (latest to oldest)
    images.sort((a, b) => b.timestamp - a.timestamp);
    
        const grouped = images.reduce((acc, image) => {
            const date = new Date(image.timestamp).toLocaleDateString(); // Format to a readable date
            if (!acc[date]) acc[date] = [];
            acc[date].push(image);
            return acc;
        }, {});

        return Object.entries(grouped).map(([date, images]) => ({
            title: date,
            data: images,
        }));
    };

    const openModal = (image) => {
        setSelectedImage(image);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedImage(null);
    };

    return (
        <View style={styles.container}>
            <BackArrow onPress={() => router.push('/camerascreen')} />
            <Text style={styles.header}>{t("gallery.captures")}</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#85D3C0" style={styles.loadingIndicator} />
            ) : images.length > 0 ? (
                <ScrollView>
                    {images.map((group, index) => (
                        <View key={index} style={styles.groupContainer}>
                            <Text style={styles.groupHeader}>{group.title}</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageRow}>
                                {group.data.map((image) => (
                                    <TouchableOpacity key={image.id} onPress={() => openModal(image)}>
                                        <Image source={{ uri: image.uri }} style={styles.imageThumbnail} />
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    ))}
                </ScrollView>
            ) : (
                <Text style={styles.noImagesText}>{t("gallery.noimages")}</Text>
            )}

            {/* Modal for zoomed image view with details */}
            <Modal visible={modalVisible} transparent={true}>
                <View style={styles.modalBackground}>
                    <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                        <Ionicons name="close" size={30} color="white" />
                    </TouchableOpacity>
                    {selectedImage && (
                        <View style={styles.detailsContainer}>
                            <Image source={{ uri: selectedImage.uri }} style={styles.fullImage} resizeMode="contain" />
                            <Text style={styles.detailsText}>
                            {t("gallery.capturedby")}{profileInfo.firstName} {profileInfo.lastName}
                            </Text>
                            <Text style={styles.detailsText}>{t("gallery.email")}{profileInfo.email}</Text>
                            <Text style={styles.detailsText}>{t("gallery.created")}{new Date(selectedImage.timestamp).toLocaleString()}</Text>
                        </View>
                    )}
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 20,
    },
    header: {
        fontSize: 24,
        color: '#85D3C0',
        fontWeight: '600',
        textAlign: 'center',
        marginVertical: 28,
    },
    groupContainer: {
        marginBottom: 20,
    },
    groupHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 10,
        marginBottom: 10,
    },
    imageRow: {
        flexDirection: 'row',
        paddingHorizontal: 10,
    },
    imageThumbnail: {
        width: imageSize,
        height: imageSize,
        marginRight: 5,
        borderRadius: 10,
    },
    loadingIndicator: {
        marginTop: 20,
    },
    noImagesText: {
        textAlign: 'center',
        color: '#888',
        fontSize: 16,
        marginTop: 20,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 1,
    },
    detailsContainer: {
        alignItems: 'center',
        padding: 20,
    },
    fullImage: {
        width: width - 40,
        height: '80%',
        borderRadius: 10,
    },
    detailsText: {
        color: 'white',
        fontSize: 16,
        marginTop: 10,
    },
});

export default GalleryScreen;
