import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DropdownMenu = () => {
  const [estOuvert, setEstOuvert] = useState(false);

  const toggleMenu = () => {
    setEstOuvert(!estOuvert);
  };

  const navigation = useNavigation();

  return (
    <View style={[styles.container, estOuvert ? styles.openMenu : null]}>
      <TouchableOpacity onPress={toggleMenu} style={styles.toggleButton}>
        {estOuvert ? (
          <Text style={styles.arrow}>→</Text>
        ) : (
          <Text style={styles.arrow}>←</Text>
        )}
      </TouchableOpacity>
      {estOuvert && (
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.add}
            onPress={() =>
              {
                setEstOuvert(false);
                navigation.navigate('ModifierTerrainComponent', {
                  terrainType: 'Enclos',
                })
              }
            }
          >
            <Text style={styles.addText}>Ajouter un enclos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.add}
            onPress={() =>
              {
                setEstOuvert(false);
                navigation.navigate('ModifierTerrainComponent', {
                  terrainType: 'Zebre',
                })
              }
            }
          >
            <Text style={styles.addText}>Ajouter un zèbre</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.add}
            onPress={() =>
              {
                setEstOuvert(false);
                navigation.navigate('ModifierTerrainComponent', {
                  terrainType: 'Autruche',
                })
              }
            }
          >
            <Text style={styles.addText}>Ajouter une autruche</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.add}
            onPress={() =>
              {
                setEstOuvert(false);
                navigation.navigate('ModifierTerrainComponent', {
                  terrainType: 'Panda',
                })
              }
            }
          >
            <Text style={styles.addText}>Ajouter un panda</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.add}
            onPress={() =>
              {
                setEstOuvert(false);
                navigation.navigate('AjouterCheminComponent', {
                  terrainType: 'Chemin',
                })
              }
            }
          >
            <Text style={styles.addText}>Ajouter un chemin</Text>
          </TouchableOpacity>

        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    height: '100%',
    justifyContent: 'center'
  },
  openMenu: {
    width: '66%',
  },
  toggleButton: {
    width: 100,
    height: 100,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center'
  },
  arrow: {
    fontSize: 40,
    color: 'black'
  },
  menu: {
    position: 'absolute',
    top: 0,
    right: 0,
    transform: [{ translateX: 100 }],
    backgroundColor: 'lightblue',
    elevation: 999,
    width: '100%',
    height: '100%'
  },
  add: {
    width: 200,
    height: 50,
    backgroundColor: "white",
    marginTop: 20,
    marginLeft: 30,
  },
  addText: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 'auto',
    marginBottom: 'auto'
  }
});

export default DropdownMenu;
