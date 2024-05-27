import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, PanResponder, PanResponderInstance } from 'react-native';
import { Table, TableWrapper, Cell } from 'react-native-table-component';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/Store';
import { Case } from '../type/Case';
import CaseComponent from './CaseComponent';
import { useNavigation } from '@react-navigation/native';
import { setTerrainData } from '../slices/TerrainSlice'; // Assurez-vous d'importer l'action de votre slice

const ModifierTerrain = () => {
    const dispatch = useDispatch(); 
    const terrainData = useSelector((state: RootState) => state.terrain.terrainData);
    const [tableauCase, setTableauCase] = useState<Case[][]>([]);
    const [originalCase, setOriginalCase] = useState<Case | null>(null);
    const [selectedPosition, setSelectedPosition] = useState({ row: 0, col: 0 });
    const { width, height } = Dimensions.get('window');
    const navigation = useNavigation();
    const cellSize = Math.min(width / (terrainData[0]?.length || 1), height / terrainData.length);
    const panResponder = useRef<PanResponderInstance>(null);

    useEffect(() => {
        if (terrainData.length > 0 && terrainData[0].length > 0) {
            const updatedTerrain = terrainData.map(row => row.map(cell => ({ ...cell })));
            const newCase = { id: 99, couleur: '#FFFFFF', image: 'Default' }; // Exemple de nouvelle case
            setOriginalCase(updatedTerrain[0][0]);
            updatedTerrain[0][0] = newCase;
            setTableauCase(updatedTerrain);
            setSelectedPosition({ row: 0, col: 0 });
        }
    }, [terrainData]);

    const moveCase = (gestureState) => {
        const { dx, dy } = gestureState;
        const newRow = Math.max(0, Math.min(numRows - 1, selectedPosition.row + Math.round(dy / cellSize)));
        const newCol = Math.max(0, Math.min(numCols - 1, selectedPosition.col + Math.round(dx / cellSize)));
        if (newRow !== selectedPosition.row || newCol !== selectedPosition.col) {
            const updatedTerrain = tableauCase.map(row => row.map(cell => ({ ...cell })));
            const movedCase = updatedTerrain[selectedPosition.row][selectedPosition.col];
            // Mettre à jour originalCase avec la case qui va être écrasée
            setOriginalCase(updatedTerrain[newRow][newCol]);
            updatedTerrain[selectedPosition.row][selectedPosition.col] = originalCase;
            updatedTerrain[newRow][newCol] = movedCase;
            setSelectedPosition({ row: newRow, col: newCol });
            setTableauCase(updatedTerrain);
        }
    };

    panResponder.current = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => moveCase(gestureState),
        onPanResponderRelease: () => {},
        onPanResponderTerminate: () => {}
    });

    //TO FIX, il faut spammer le bouton pour que ça marche
    const handleConfirm = () => {
        console.log("pouet")
        dispatch(setTerrainData(tableauCase));
        console.log("pouet")
        navigation.navigate('EcranDeJeuPrincipalComponent');
    };

    const handleCancel = () => {
        if (originalCase) {
            const revertedTerrain = tableauCase.map(row => row.map(cell => ({ ...cell })));
            revertedTerrain[selectedPosition.row][selectedPosition.col] = originalCase;
            setTableauCase(revertedTerrain);
        }
        navigation.navigate('EcranDeJeuPrincipalComponent');
    };

    const numRows = tableauCase.length;
    const numCols = tableauCase[0]?.length || 0;

    return (
        <View style={styles.container} {...panResponder.current.panHandlers}>
            <Table borderStyle={{ borderColor: 'transparent' }}>
                {tableauCase.map((rowData, rowIndex) => (
                    <TableWrapper key={rowIndex} style={styles.row}>
                        {rowData.map((caseData, cellIndex) => (
                            <CaseComponent key={cellIndex} caseData={caseData} cellIndex={cellIndex} length={cellSize} />
                        ))}
                    </TableWrapper>
                ))}
            </Table>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.actionButtonClose} onPress={handleCancel}>
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
