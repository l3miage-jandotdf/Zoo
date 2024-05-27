import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';


interface CaseProps {
    caseData: {
        id: number;
        couleur: string;
        image: string;
    },
    cellIndex : number, 
    length: number
}

const CaseComponent: React.FC<CaseProps> = ({ caseData, cellIndex, length }) => {
    let img = require('../assets/sols/Default.png')
    switch(caseData.image) { 
        case "Herbe": { 
            img = require('../assets/sols/Herbe.png')
           break; 
        } 
        case "Herbe-bas": { 
            img = require('../assets/sols/Herbe-bas.png')
           break; 
        } 
        case "Herbe-haut": { 
            img = require('../assets/sols/Herbe-haut.png')
           break; 
        } 
        case "Herbe-droite": { 
            img = require('../assets/sols/Herbe-droite.png')
           break; 
        } 
        case "Herbe-gauche": { 
            img = require('../assets/sols/Herbe-gauche.png')
           break; 
        } 
        case "Herbe-bas-droite": { 
            img = require('../assets/sols/Herbe-bas-droite.png')
           break; 
        } 
        case "Herbe-bas-gauche": { 
            img = require('../assets/sols/Herbe-bas-gauche.png')
           break; 
        } 
        case "Herbe-haut-droite": { 
            img = require('../assets/sols/Herbe-haut-droite.png')
           break; 
        } 
        case "Herbe-haut-gauche": { 
            img = require('../assets/sols/Herbe-haut-gauche.png')
           break; 
        } 
     } 

    return (
        <ImageBackground 
            key={cellIndex}
            resizeMode="cover"
            source={img}
        >
            <Cell   
                textStyle={styles.text}
                style={{  width: length, height: length }}
            />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    text: { margin: 6 }
});

export default CaseComponent;
