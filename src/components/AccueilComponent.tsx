import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

/**
 * Menu du jeu (accueil)
 */
const HomeScreen = ({ navigation }) => {

    const { width, height } = Dimensions.get('window');
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

    /**
     * Force la transition au mode paysage et navige sur l'écran de jeu principal
     */
    const handlePress = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
        navigation.navigate('EcranDeJeuPrincipalComponent'); 
    };

    return (
        <View style={styles.container}>
            <Image 
                source={require('../assets/sols/Accueil.gif')} 
                style={{ width, height, position: 'absolute' }}
            />
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>JOUER</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginTop: "80%",
        backgroundColor: 'rgba(76, 52, 39, 1)',
        paddingVertical: 30,
        paddingHorizontal: 40,
        borderRadius: 3,
    },
    buttonText: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
