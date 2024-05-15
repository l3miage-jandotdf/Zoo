import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import TerrainService from '../services/TerrainService';
import TerrainContext from '../contexts/TerrainContext';



const ModifierTerrain = () => {

    const { terrainData, setTerrainData } = useContext(TerrainContext);
    const [tableauCase, setTableauCase] = useState([]);
    const [nouvelleCase, setNouvelleCase] = useState(null);

    useEffect(() => {
        setTableauCase(terrainData);
    }, [terrainData]);

    const AjouterCase = (x: number, y: number) : void =>{
        TerrainService.placeSpecialCase(x, y, terrainData, setTerrainData);
    } 


    return (
        
            <View style={styles.container}>
                <Table borderStyle={{ borderColor: 'transparent' }}>
                    {
                        tableauCase.map((rowData, rowIndex) => (
                            <TableWrapper key={rowIndex} style={styles.row}>
                                {
                                    rowData.map((caseData, cellIndex) => (   
                                            <Cell
                                                key={cellIndex}
                                                textStyle={styles.text}
                                                style={{ backgroundColor: caseData.couleur, width: 40 }}
                                            />
                                    ))
                                }
                            </TableWrapper>
                        ))
                    }
                </Table>
                <TouchableOpacity onPress={() =>AjouterCase(0,0)}>
                    <Text >Ajouter une Case</Text>
                </TouchableOpacity>
            </View>

    );
};

const styles = {
    container: { flex: 1, width: 1200, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, width: 30, backgroundColor: '#808B97' },
    text: { margin: 6 },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
};

export default ModifierTerrain;
