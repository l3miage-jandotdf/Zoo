import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

/**
 * @returns un spinner pour dire à l'utilisateur de patienter
 */
const Spinner = () => {
    return (
        <View style={styles.spinnerContainer}>
            <ActivityIndicator size="large" color="white" />
        </View>
    );
};

const styles = StyleSheet.create({
    spinnerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)', 
    },
});

export default Spinner;
