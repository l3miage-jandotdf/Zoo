import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';


interface CaseProps {
    caseData: {
        id: number;
        couleur: string;
        image: string;
    },
    cellIndex : number
}

const CaseComponent: React.FC<CaseProps> = ({ caseData, cellIndex }) => {
    const img = require('../assets/sols/Herbe.png')
    return (
        <ImageBackground 
            key={cellIndex}
            resizeMode="cover"
            source={img}
        >
            <Cell   
                textStyle={styles.text}
                style={{  width: 40 }}
            />
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    text: { margin: 6 }
});

export default CaseComponent;
