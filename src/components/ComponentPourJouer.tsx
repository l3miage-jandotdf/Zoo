import React, { useState } from 'react';
import {Text, View, StyleSheet, Image, TextInput, TouchableOpacity} from 'react-native';

export type ComponentPourJouerType = {
    route: {
      params: {
        data: {
          image: string;
          text: string;
        };
      };
    };
  };

const ComponentPourJouer = ({route: {params: {data}}}: ComponentPourJouerType) => {
    const [nom, setNom] = useState<string>('');

    const effacerNom = () : void => {
      console.log("pouic");
      setNom("");
    }

    return(
      <View style={styles.container}>
          <Image 
            style={styles.image} 
            source={{uri: data?.image}} 
            resizeMode="contain"
          />
          <Text>{data?.text}</Text>

          <Text>
            Bonjour, {nom}
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Saisissez votre nom"
            value={nom}
            onChangeText={(text) => setNom(text)}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => effacerNom()}
          >
            <View>
              <Text style={styles.buttonText}>Effacer</Text>
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
    image:{
      width: 300,
      height: 300,
    },
    input:{
      borderColor: 'grey',
      borderWidth: 1,
      width : 200,
      marginBottom: 30,
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

export default ComponentPourJouer;