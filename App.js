import { StyleSheet} from 'react-native';
import React from 'react';
import MenuDeroulantComponent from './src/components/MenuDeroulantComponent';
import ModifierTerrainComponent from './src/components/ModifierTerrainComponent';
import AjouterCheminComponent from './src/components/AjouterCheminComponent';
import EcranDeJeuPrincipalComponent from './src/components/EcranDeJeuPrincipalComponent';
import Terrain from './src/components/TerrainComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux'
import store from './src/store/Store'
import MusiqueComponent from './src/components/MusiqueComponent';




const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
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
              name="AjouterCheminComponent" 
              component={AjouterCheminComponent}
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
      </NavigationContainer>
    </Provider>
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
