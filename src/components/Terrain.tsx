import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

const Grid = () => {
  const [cellColors, setCellColors] = useState([]);

  useEffect(() => {
    // Générer les couleurs aléatoires pour chaque case une seule fois au chargement initial
    const colors = Array(1000).fill().map(() => generateRandomColor());
    setCellColors(colors);
  }, []);

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
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
      <View style={styles.gridContainer}>
        {/* Afficher les cases de la grille avec les couleurs générées au chargement initial */}
        {cellColors.map((color, index) => (
          <View key={index} style={[styles.gridCell, { backgroundColor: color }]} />
        ))}
      </View>
    </ReactNativeZoomableView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  gridContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  gridCell: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: 'black',
  }
});

export default Grid;