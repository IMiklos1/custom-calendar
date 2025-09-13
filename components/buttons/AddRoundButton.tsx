import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const AddRoundButton: React.FC<{ onPress: () => void }> = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <View style={styles.plusContainer}>
                <Text style={styles.plus}>+</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    plusContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    plus: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        lineHeight: 30,
    },
});

export default AddRoundButton;