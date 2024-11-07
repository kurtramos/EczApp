import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Image,
    FlatList,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BackArrow from '../components/BackArrow';

const { width } = Dimensions.get('window');
const imageSize = width / 3 - 10; // To fit 3 images in a row with spacing

const images = [
    { uri: 'https://akfamilyderm.com/wp-content/uploads/2022/10/blog-eczema-img-2.jpg' },
    { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjWKtUMo4IDzNfJAoZ40k4Xj8SebmhIWL6QA&s' },
    { uri: 'https://www.health.com/thmb/Nmt0eGt3Gj8m7pPaQd-yocwMgJ8=/850x0/filters:no_upscale():max_bytes(150000):strip_icc()/psoriasis-eczema-d50e904a5b934809be74dc8f2fa2743c.jpg' },
    { uri: 'https://images.everydayhealth.com/images/skin-beauty/eczema/what-is-eczema-02-hand-eczema-722x406.jpg?sfvrsn=3b197278_5' },
    // { uri: 'https://example.com/sample5.jpg' },
    // { uri: 'https://example.com/sample6.jpg' },
    // { uri: 'https://example.com/sample7.jpg' },
    // { uri: 'https://example.com/sample8.jpg' },
    // { uri: 'https://example.com/sample9.jpg' },
];

const GalleryScreen = () => {
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const openModal = (image) => {
        setSelectedImage(image);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedImage(null);
    };

    const renderImage = ({ item }) => (
        <TouchableOpacity onPress={() => openModal(item)}>
            <Image source={item} style={styles.imageThumbnail} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <BackArrow onPress={() => router.push('/camerascreen')} />
            <Text style={styles.header}>Eczema Samples Gallery</Text>
            
            <FlatList
                data={images}
                renderItem={renderImage}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
                contentContainerStyle={styles.galleryContainer}
            />
            
            {/* Modal for zoomed image view */}
            <Modal visible={modalVisible} transparent={true}>
                <View style={styles.modalBackground}>
                    <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                        <Ionicons name="close" size={30} color="white" />
                    </TouchableOpacity>
                    {selectedImage && (
                        <Image source={selectedImage} style={styles.fullImage} resizeMode="contain" />
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
    galleryContainer: {
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageThumbnail: {
        width: imageSize,
        height: imageSize,
        margin: 5,
        borderRadius: 10,
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
    fullImage: {
        width: width - 40,
        height: '80%',
    },
});

export default GalleryScreen;
