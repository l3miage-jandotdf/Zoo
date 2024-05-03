// DetailProfil.tsx
import React from 'react';
import { View, Text } from 'react-native';

export type Utilisateur = {
    id: number;
    name: string;
    username: string;
    email: string;
}

const DetailProfil = ({ utilisateur }: { utilisateur: Utilisateur }) => {
  return (
    <View>
      <Text>Nom : {utilisateur.name}</Text>
      <Text>Nom d'utilisateur : {utilisateur.username}</Text>
      <Text>Email : {utilisateur.email}</Text>
      {/* Ajoutez d'autres informations d'utilisateur que vous souhaitez afficher */}
    </View>
  );
};

export default DetailProfil;
