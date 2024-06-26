import React from 'react';
import { View, StyleSheet } from 'react-native';

import Terrain from './TerrainComponent';
import MenuDeroulantComponent from './MenuDeroulantComponent';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';

/**
 * Écran de jeu principal, renvoie le terrain et le bouton de menu
 * Utilise ReactNativeZoomableView pour le déplacement et le zoom, couramment appelé "god-game" dans les jeux de gestion
 */
const EcranDeJeuPrincipal = () => {

    return (
        <View style={styles.container}>
            <ReactNativeZoomableView
            maxZoom={2}
            minZoom={0.5}
            zoomStep={0.5}
            initialZoom={1}
            bindToBorders={false}
            style={{
                padding: 10,
                backgroundColor: 'black',
            }}
        >
            <Terrain/>
            </ReactNativeZoomableView>
            <MenuDeroulantComponent/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default EcranDeJeuPrincipal;
