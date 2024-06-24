import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DropdownMenu = () => {
  const [estOuvert, setEstOuvert] = useState(false);
  const [afficherAnimaux, setAfficherAnimaux] = useState(false);
  const [afficherStructure, setAfficherStructure] = useState(false);

  const toggleMenu = () => {
    setEstOuvert(!estOuvert);
  };

  const toggleAfficherAnimaux = () => {
    setAfficherAnimaux(!afficherAnimaux);
  };

  const toggleAfficherStructure = () => {
    setAfficherStructure(!afficherStructure);
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
        <ScrollView contentContainerStyle={styles.scrollContainer}>

          <View style={styles.menu}>
            <TouchableOpacity
              style={[styles.add, afficherAnimaux && styles.activeButton]}
              onPress={toggleAfficherAnimaux}
            >
              <Text style={styles.addText}>Ajouter un animal</Text>
            </TouchableOpacity>

            {afficherAnimaux && (
              <View style={styles.animauxContainer}>
                <TouchableOpacity
                  style={styles.addSub}
                  onPress={() =>
                    navigation.navigate('ModifierTerrainComponent', {
                      terrainType: 'Zebre',
                    })
                  }
                >
                  <Text style={styles.addText}>Ajouter un zèbre</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.addSub}
                  onPress={() =>
                    navigation.navigate('ModifierTerrainComponent', {
                      terrainType: 'Autruche',
                    })
                  }
                >
                  <Text style={styles.addText}>Ajouter une autruche</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.addSub}
                  onPress={() =>
                    navigation.navigate('ModifierTerrainComponent', {
                      terrainType: 'Panda',
                    })
                  }
                >
                  <Text style={styles.addText}>Ajouter un panda</Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity
              style={[styles.add, afficherStructure && styles.activeButton]}
              onPress={toggleAfficherStructure}
            >
              <Text style={styles.addText}>Ajouter une structure</Text>
            </TouchableOpacity>

            {afficherStructure && (
              <View style={styles.animauxContainer}>
                <TouchableOpacity
                  style={styles.addSub}
                  onPress={() =>
                    navigation.navigate('ModifierTerrainComponent', {
                      terrainType: 'Cafe',
                    })
                  }
                >
                  <Text style={styles.addText}>Ajouter un café</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.addSub}
                  onPress={() =>
                    navigation.navigate('ModifierTerrainComponent', {
                      terrainType: 'Enclos',
                    })
                  }
                >
                  <Text style={styles.addText}>Ajouter un enclos</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Autres options */}
            <TouchableOpacity
              style={styles.add}
              onPress={() =>
                navigation.navigate('AjouterCheminComponent', {
                  terrainType: 'Chemin',
                })
              }
            >
              <Text style={styles.addText}>Ajouter un chemin</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    height: '100%',
    justifyContent: 'center',
  },
  openMenu: {
    flexDirection: 'row',
  },
  toggleButton: {
    width: 60,
    height: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 40,
    color: 'black',
  },
  menu: {
    backgroundColor: 'white',
    elevation: 999,
    padding: 10,
    height: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },
  add: {
    width: 200,
    height: 60,
    backgroundColor: 'white',
    marginTop: 20,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: 20,
    paddingRight: 20,
  },
  addSub: {
    width: 100,
    height: 90,
    backgroundColor: 'white',
    marginTop: 0,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  addText: {
    fontSize: 20,
    textAlign: 'center',
  },
  animauxContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  activeButton: {
    backgroundColor: '#e3e3e3',
  },
});

export default DropdownMenu;
