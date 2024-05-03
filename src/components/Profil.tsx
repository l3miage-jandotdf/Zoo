import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {Text, View, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native';


const Profil = () => {

    const navigation = useNavigation();

    return(
      <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            //onPress={() => navigation.navigate('Profil')}
          >
            <View>
              <Text style={styles.buttonText}>Revenir à l'acceuil</Text>
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

export default Profil;