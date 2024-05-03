import React, { useEffect, useState } from 'react';
import {Text, View, StyleSheet, Image, TextInput, TouchableOpacity, FlatList} from 'react-native';
import DetailProfil, { Utilisateur } from './DetailProfil';


const Utilisateurs = () => {

    const [utilisateurs, setUtilisateurs] = useState([]);

    const recupererListe =() : void => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => setUtilisateurs(data))
        .catch(error => console.error('Erreur de chargement des utilisateurs :', error));
    }

    return(
      <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("hey")}
          >
            <View>
              <Text style={styles.buttonText}>Revenir à l'accueil</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => recupererListe()}
          >
            <View>
              <Text style={styles.buttonText}>Récupérer la liste des utilisateurs</Text>
            </View>
          </TouchableOpacity>

          <FlatList
            data={utilisateurs}
            renderItem={({ item } : {item : Utilisateur}) => (
            <DetailProfil utilisateur={item} /> // Utilisation du composant DetailProfil pour afficher les détails de chaque utilisateur
            )}
            keyExtractor={item => item.id.toString()}
          />
      </View>
      
    );
  }

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    button:{
      borderColor: 'grey',
      borderWidth: 1,
      width : 150,
      borderRadius: 5,
      backgroundColor: '#1d8953'
    },
    buttonText: {
      textAlign: 'center',
      padding : 10,
      color: '#FFFFFF',
    }
});

export default Utilisateurs;