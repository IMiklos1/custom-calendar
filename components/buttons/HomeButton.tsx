import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const HomeButton: React.FC = () => {
    const router = useRouter();

    const navigateHome = () => {
        router.push('/(tabs)');
    };

    return (
        <TouchableOpacity style={styles.button} onPress={navigateHome}>
            <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HomeButton;