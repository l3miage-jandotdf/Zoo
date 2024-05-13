import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { DataProvider } from './src/contexts/TerrainContext';


import Terrain from './src/components/Terrain';


export default function App() {

  return (
    <View style={styles.container}>
      <DataProvider>
        <Terrain />
      </DataProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
