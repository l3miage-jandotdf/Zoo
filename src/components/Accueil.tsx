import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {Text, View, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native';


const Accueil = () => {

  //const navigation = useNavigation(); // Appel à useNavigation dans le composant Accueil

    return(
      <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            //onPress={() => navigation.navigate('Utilisateurs')}
          >
            <View>
              <Text style={styles.buttonText}>Voir la liste des utilisateurs</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("hey")}
          >
            <View>
              <Text style={styles.buttonText}>Voir votre profil</Text>
            </View>
          </TouchableOpacity>
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

export default Accueil;