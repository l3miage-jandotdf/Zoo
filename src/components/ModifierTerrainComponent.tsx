import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Table, TableWrapper } from 'react-native-table-component';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/Store';
import { Case } from '../type/Case';
import CaseComponent from './CaseComponent';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { setTerrainData } from '../slices/TerrainSlice';
import NouvelleCaseComponent from './NouvelleCaseComponent';
import CaseService from '../services/CaseService';
import Spinner from './SpinnerComponent'; // Import du composant Spinner
import TerrainService from '../services/TerrainService';

interface RouteParams {
    terrainType: string;
}

type ModifierTerrainRouteProp = RouteProp<{ params: RouteParams }, 'params'>;


/**
 * Recoie en paramètre un type de terrain 
 */
const ModifierTerrain = () => {
    
    const dispatch = useDispatch();
    const terrainData = useSelector((state: RootState) => state.terrain.terrainData);
    const [tableauCase, setTableauCase] = useState<Case[][]>([]);
    const { width, height } = Dimensions.get('window');
    const cellSize = Math.min(width / (terrainData[0]?.length || 1), height / terrainData.length);
    const [caseCoordinates, setCaseCoordinates] = useState<[number, number]>([0, 0]);
    const navigation = useNavigation();
    const route = useRoute<ModifierTerrainRouteProp>();
    const { terrainType } = route.params || {};
    const [cases, setCases] = useState<Case[][]>([[]]);
    const [boutonValideBloque, setBoutonValideBloque] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (terrainData.length > 0 && terrainData[0].length > 0) {
            setTableauCase(terrainData);
            setLoading(false);
        }
    }, [terrainData]);

    useEffect(() => {
        setCases(CaseService.renderCases(terrainType));
    }, []);

    /**
     * @param x position x de la case à placer
     * @param y position x de la case à placer
     * @param caseLibre le type de sol sur lequel la case a le droit d'être placée 
     * @return true si la case a le droit d'être placée sur le sol  
     */
    const checkIfSolIsOk = (x: number, y: number, caseLibre: string): boolean => {
        let placementOk = true;
        cases.map((ligneDeCases: Case[], i) => {
            ligneDeCases.map((caseSeule: Case, j) => {
                const sommeY = Math.round(y + i);
                const sommeX = Math.round(x + j);
                if (tableauCase[sommeY][sommeX].sol !== caseLibre) {
                    placementOk = false;
                }
            });
        });
        setBoutonValideBloque(!placementOk);
        return placementOk;
    };

    /**
     * Met à jour le terrain avec la ou les nouvelles cases positionnées dans le redux
     * Revient à l'écran principal 
     */
    const handleConfirm = () => {
        const [x, y] = caseCoordinates;

        if (y >= 0 && y < tableauCase.length && x >= 0 && x < tableauCase[y].length) {
            const updatedTerrain = tableauCase.map(row => [...row]);

            cases.map((ligneDeCases: Case[], i) => {
                ligneDeCases.map((caseSeule: Case, j) => {
                    updatedTerrain[y + i][x + j] = caseSeule;
                });
            });

            setTableauCase(updatedTerrain);

            TerrainService.enregistrerTerrain(updatedTerrain)
            .then(() => {
              dispatch(setTerrainData(updatedTerrain));
            })
            .catch(error => {
              console.error('Erreur lors de l\'enregistrement du terrain:', error);
            });

            navigation.navigate('EcranDeJeuPrincipalComponent');
        } else {
            console.error('Invalid coordinates:', caseCoordinates);
        }
    };

    // Affiche un spinner le temps que le tableau se charge
    if (loading) {
        return <Spinner />; 
    }

    return (
        <View style={styles.container}>
            <View>
                <Table borderStyle={{ borderColor: 'transparent' }}>
                    {tableauCase.map((rowData, rowIndex) => (
                        <TableWrapper key={rowIndex} style={styles.row}>
                            {rowData.map((caseData, cellIndex) => (
                                <CaseComponent
                                    key={cellIndex}
                                    caseData={caseData}
                                    cellIndex={cellIndex}
                                    length={cellSize}
                                    placementOk={true}
                                />
                            ))}
                        </TableWrapper>
                    ))}
                    <NouvelleCaseComponent
                        x={cellSize}
                        terrainWidth={terrainData[0]?.length}
                        terrainHeight={terrainData.length}
                        setCaseCoordinates={setCaseCoordinates}
                        cases={cases}
                        checkIfSolIsOk={checkIfSolIsOk}
                    />
                </Table>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.actionButtonClose}
                    onPress={() => navigation.navigate('EcranDeJeuPrincipalComponent')}
                >
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
        alignItems: 'center',
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
    },
});

export default ModifierTerrain;
