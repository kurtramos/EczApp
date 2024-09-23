import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure you have this icon library
import { useNavigation } from '@react-navigation/native'; // For navigation
import BackArrow from '../components/BackArrow';
import { useRouter } from 'expo-router'; 

const ChangePasswordScreen = () => {
    const router = useRouter();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <BackArrow onPress={() => router.push('/settings')} />
            <ScrollView>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Change Password</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Current Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            secureTextEntry={!currentPasswordVisible}
                            placeholder="*************"
                            placeholderTextColor="#bcbcbc"
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                            style={styles.input}
                        />
                        <TouchableOpacity
                            onPress={() => setCurrentPasswordVisible(!currentPasswordVisible)}
                            style={styles.eyeIcon}
                        >
                            <Ionicons
                                name={currentPasswordVisible ? 'eye' : 'eye-off'}
                                size={24}
                                color="grey"
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.forgotPassword} onPress={() => navigation.navigate('ForgotPassword')}>
                        Forgot Password?
                    </Text>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>New Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            secureTextEntry={!currentPasswordVisible}
                            placeholder="*************"
                            placeholderTextColor="#bcbcbc"
                            value={newPassword}
                            onChangeText={setNewPassword}
                            style={styles.input}
                        />
                        <TouchableOpacity
                            onPress={() => setCurrentPasswordVisible(!currentPasswordVisible)}
                            style={styles.eyeIcon}
                        >
                            <Ionicons
                                name={currentPasswordVisible ? 'eye' : 'eye-off'}
                                size={24}
                                color="grey"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Confirm New Password</Text>
                    <View style={styles.passwordContainer}>
                        <TextInput
                            secureTextEntry={!confirmPasswordVisible}
                            placeholder="*************"
                            placeholderTextColor="#bcbcbc"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            style={styles.input}
                        />
                        <TouchableOpacity
                            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                            style={styles.eyeIcon}
                        >
                            <Ionicons
                                name={confirmPasswordVisible ? 'eye' : 'eye-off'}
                                size={24}
                                color="grey"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={() => console.log('Change password')}>
                    <Text style={styles.buttonText}>Change Password</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 50,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 24,
        color: '#85D3C0',
        fontWeight: '600',
        textAlign: 'center',
        flex: 1,
    },
    inputContainer: {
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    passwordContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 13,
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#F3F3F3',
    },
    label: {
        fontSize: 20,
        color: 'black',
        marginBottom: 5,
    },
    input: {
        flex: 1,
        fontSize: 18,
    },
    eyeIcon: {
        marginLeft: 10,
    },
    forgotPassword: {
        fontSize: 15,
        color: '#303030',
        textDecorationLine: 'underline',
        textAlign: 'right',
        marginTop: 5,
    },
    button: {
        backgroundColor: '#85D3C0',
        borderRadius: 24,
        padding: 12,
        marginHorizontal: 30,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
    },
});

export default ChangePasswordScreen;
