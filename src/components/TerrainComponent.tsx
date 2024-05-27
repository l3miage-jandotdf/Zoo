import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ImageBackground, Image } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import TerrainService from '../services/TerrainService';
import TerrainContext from '../contexts/TerrainContext';
import CaseComponent from './CaseComponent';
import { useSelector, useDispatch } from 'react-redux';
import { ajouterCase, setTerrainData } from '../slices/TerrainSlice';
import { RootState } from '../store/Store';
import { Case } from '../type/Case';

const Terrain = () => {

    const dispatch = useDispatch(); 
    const terrainData = useSelector((state: RootState) => state.terrain.terrainData);
    const [tableauCase, setTableauCase] = useState<Case[][]>([]);

    useEffect(() => {
        setTableauCase(terrainData);
    }, [terrainData]);


    return (
            <View style={styles.container}>
                <Table borderStyle={{ borderColor: 'transparent' }}>
                    {
                        tableauCase.map((rowData, rowIndex) => (
                            <TableWrapper key={rowIndex} style={styles.row}>
                                {
                                    rowData.map((caseData, cellIndex) => (   
                                        <CaseComponent key={cellIndex} caseData={caseData} cellIndex={cellIndex} length={40}/>
                                    ))
                                }
                            </TableWrapper>
                        ))
                    }
                </Table>
                <TouchableOpacity>
                    <Text >Ajouter une Case</Text>
            </TouchableOpacity>

            </View>
    );
};

const styles = {
    container: { flex: 1, width: 1200, backgroundColor: 'black' },
    head: { height: 40, width: 30, backgroundColor: 'black' },
    text: { margin: 6 },
    row: { flexDirection: 'row', backgroundColor: 'black' },
    btn: { width: 58, height: 18, backgroundColor: 'black', borderRadius: 2 },
    btnText: { textAlign: 'center', color: 'black' }
};

export default Terrain;
