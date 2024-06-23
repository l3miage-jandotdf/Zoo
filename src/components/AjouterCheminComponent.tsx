import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, PanResponder, GestureResponderEvent, PanResponderGestureState } from 'react-native';
import { Table, TableWrapper } from 'react-native-table-component';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/Store';
import { Case } from '../type/Case';
import CaseComponent from './CaseComponent';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { setTerrainData } from '../slices/TerrainSlice';
import CaseService from '../services/CaseService';

interface RouteParams {
    terrainType: string;
}

type AjouterCheminRouteProp = RouteProp<{ params: RouteParams }, 'params'>;

const AjouterChemin = () => {
    const dispatch = useDispatch();
    const terrainData = useSelector((state: RootState) => state.terrain.terrainData);
    const [tableauCase, setTableauCase] = useState<Case[][]>([]);
    const { width, height } = Dimensions.get('window');
    const cellSize = Math.min(width / (terrainData[0]?.length || 1), height / terrainData.length);
    const navigation = useNavigation();
    const route = useRoute<AjouterCheminRouteProp>();
    const { terrainType } = route.params || {};
    const [cases, setCases] = useState<Case[][]>([[]]);
    const [boutonValideBloque, setBoutonValideBloque] = useState<boolean>(true);
    const [panResponder, setPanResponder] = useState(null);
    const [cheminTrace, setCheminTrace] = useState<[number, number][]>([]);


    useEffect(() => {
        if (terrainData.length > 0 && terrainData[0].length > 0) {
            setTableauCase(terrainData);
        }
    }, [terrainData]);

    useEffect(() => {
        setCases(CaseService.renderCases(terrainType));
    }, []);

    const handleConfirm = () => {
        const updatedTerrain = tableauCase.map(row => [...row]);

        // Ajouter le chemin tracé au terrain
        cheminTrace.map(([x, y]) => {
            updatedTerrain[y][x] = { id: 1, image: 'Chemin', sol: 'Chemin' };
        });

        setTableauCase(updatedTerrain);
        dispatch(setTerrainData(updatedTerrain));
        navigation.navigate('EcranDeJeuPrincipalComponent');
    };

    useEffect(() => {
        if (tableauCase && tableauCase[0] && tableauCase[0][0]) {
            const panResponderInstance = PanResponder.create({
                onStartShouldSetPanResponder: () => true,
                onMoveShouldSetPanResponder: () => true,
                onPanResponderGrant: (evt, gestureState) => {
                    ajouterCaseAuChemin(gestureState);
                },
                onPanResponderMove: (evt, gestureState) => {
                    ajouterCaseAuChemin(gestureState);
                },
                onPanResponderRelease: () => {}
            });
            setPanResponder(panResponderInstance);
        }
    }, [tableauCase]);

    const ajouterCaseAuChemin = (gestureState: PanResponderGestureState) => {
        const { moveX, moveY } = gestureState;
        const x = Math.floor(moveX / cellSize);
        const y = Math.floor(moveY / cellSize);
    
        if (y >= 0 && y < tableauCase.length && x >= 0 && x < tableauCase[0].length) {
            setCheminTrace((prevCheminTrace) => {
                if (tableauCase[y][x].sol === "Sol-herbe"){
                    const caseExisteDéjà = prevCheminTrace.some(([cx, cy]) => cx === x && cy === y);
                    if (!caseExisteDéjà) {
                        return [...prevCheminTrace, [x, y]];
                    }
                }
                return prevCheminTrace;
            });
            setBoutonValideBloque(false);
        }
    };
    

    return (
        <View style={styles.container}>
            <View {...(panResponder ? panResponder.panHandlers : {})}>
                <Table borderStyle={{ borderColor: 'transparent' }}>
                    {tableauCase.map((rowData, rowIndex) => (
                        <TableWrapper key={rowIndex} style={styles.row}>
                            {rowData.map((caseData, cellIndex) => (
                                <CaseComponent key={cellIndex} caseData={caseData} cellIndex={cellIndex} length={cellSize} placementOk={true} />
                            ))}
                        </TableWrapper>
                    ))}
                </Table>
            </View>
                    
            {cheminTrace.map(([x, y], index) => (
                <View
                    key={index}
                    style={{
                        position: 'absolute',
                        top: y * cellSize,
                        left: x * cellSize,
                        width: cellSize,
                        height: cellSize,
                        backgroundColor: 'rgba(255, 255, 255, 0.5)'
                    }}
                />
            ))}

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.actionButtonClose} onPress={() => navigation.navigate('EcranDeJeuPrincipalComponent')}>
                    <Text style={styles.buttonText}>✖</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[!boutonValideBloque && styles.actionButtonOk, boutonValideBloque && styles.actionButtonOkDisabled]}
                    onPress={handleConfirm}
                    disabled={boutonValideBloque}
                >
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
    },
    actionButtonOkDisabled: {
        backgroundColor: 'grey',
        padding: 8,
        flex: 1,
        marginHorizontal: 50,
        alignItems: 'center',
    }
});

export default AjouterChemin;
