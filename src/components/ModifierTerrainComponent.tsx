import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, PanResponder, PanResponderInstance } from 'react-native';
import { Table, TableWrapper, Cell } from 'react-native-table-component';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/Store';
import { Case } from '../type/Case';
import CaseComponent from './CaseComponent';
import { useNavigation } from '@react-navigation/native';
import { setTerrainData } from '../slices/TerrainSlice'; 
import NouvelleCaseComponent from './NouvelleCaseComponent';

const ModifierTerrain = () => {
    const dispatch = useDispatch();
    const terrainData = useSelector((state: RootState) => state.terrain.terrainData);
    const [tableauCase, setTableauCase] = useState<Case[][]>([]);
    const { width, height } = Dimensions.get('window');
    const navigation = useNavigation();
    const cellSize = Math.min(width / (terrainData[0]?.length || 1), height / terrainData.length);
    const newCase = { id: 99, couleur: '#FFFFFF', image: 'Zebre' };
    const [caseCoordinates, setCaseCoordinates] = useState<[number, number]>([0, 0]);

    useEffect(() => {
        if (terrainData.length > 0 && terrainData[0].length > 0) {
            setTableauCase(terrainData);
        }
    }, [terrainData]);

    const handleConfirm = () => {
        const [x, y] = caseCoordinates;
        console.log('Case coordinates:', caseCoordinates);
    
        if (y >= 0 && y < tableauCase.length && x >= 0 && x < tableauCase[y].length) {
            const updatedTerrain = tableauCase.map(row => [...row]);
    
            updatedTerrain[y][x] = newCase;
            console.log('Updated terrain:', updatedTerrain);
    
            setTableauCase(updatedTerrain);
            dispatch(setTerrainData(updatedTerrain));
            navigation.navigate('EcranDeJeuPrincipalComponent');
        } else {
            console.error('Invalid coordinates:', caseCoordinates);
        }
    };


    return (
        <View style={styles.container} >
            <View>
                <Table borderStyle={{ borderColor: 'transparent' }}>
                    {tableauCase.map((rowData, rowIndex) => (
                        <TableWrapper key={rowIndex} style={styles.row}>
                            {rowData.map((caseData, cellIndex) => (
                                <CaseComponent key={cellIndex} caseData={caseData} cellIndex={cellIndex} length={cellSize} />
                            ))}
                        </TableWrapper>
                    ))}
                    <NouvelleCaseComponent x={cellSize} terrainWidth={terrainData[0]?.length} terrainHeight={terrainData.length} setCaseCoordinates={setCaseCoordinates} />
                </Table>
            </View>
            
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.actionButtonClose} onPress={() => navigation.navigate('EcranDeJeuPrincipalComponent')}>
                    <Text style={styles.buttonText}>✖</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButtonOk} onPress={handleConfirm}>
                    <Text style={styles.buttonText}>☑</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'black' },
    row: { flexDirection: 'row', backgroundColor: 'black' },
    cell: { justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
    text: { color: 'black' },
    button: {
        backgroundColor: '#1E90FF',
        padding: 10,
        marginTop: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 22,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 5,
    },
    actionButtonClose: {
        backgroundColor: 'red',
        padding: 8,
        flex: 1,
        marginHorizontal: 50,
        alignItems: 'center'
    },
    actionButtonOk: {
        backgroundColor: 'green',
        padding: 8,
        flex: 1,
        marginHorizontal: 50,
        alignItems: 'center',
    }
});

export default ModifierTerrain;
