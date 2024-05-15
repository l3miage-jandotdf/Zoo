import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { DataProvider } from './src/contexts/TerrainContext';
import MenuDeroulantComponent from './src/components/MenuDeroulantComponent';
import ModifierTerrainComponent from './src/components/ModifierTerrainComponent';
import EcranDeJeuPrincipalComponent from './src/components/EcranDeJeuPrincipalComponent';
import Terrain from './src/components/TerrainComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <DataProvider>
        <Stack.Navigator initialRouteName="EcranDeJeuPrincipalComponent">
          <Stack.Screen 
            name="Terrain" 
            component={Terrain}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="ModifierTerrainComponent" 
            component={ModifierTerrainComponent}
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="MenuDeroulantComponent" 
            component={MenuDeroulantComponent}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="EcranDeJeuPrincipalComponent" 
            component={EcranDeJeuPrincipalComponent}
            options={{ headerShown: false }} 
          />
        </Stack.Navigator>
      </DataProvider>
    </NavigationContainer>
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
