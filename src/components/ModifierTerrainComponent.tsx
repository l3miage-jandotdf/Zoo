import React, { useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import { Table, TableWrapper } from 'react-native-table-component';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/Store';
import { Case } from '../type/Case';
import CaseComponent from './CaseComponent';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { setTerrainData } from '../slices/TerrainSlice';
import NouvelleCaseComponent from './NouvelleCaseComponent';
import CaseService from '../services/CaseService';


interface RouteParams {
    terrainType: string;
}

type ModifierTerrainRouteProp = RouteProp<{ params: RouteParams }, 'params'>;

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
    const [casesWidth, setCasesWidth] = useState(1);
    const [casesHeight, setCasesHeight] = useState(1);

    useEffect(() => {
        if (terrainData.length > 0 && terrainData[0].length > 0) {
        setTableauCase(terrainData);
        }
    }, [terrainData]);

    useEffect(() => {
        if (cases.length !== 0){
            setCasesWidth(cases[0].length);
            setCasesHeight(cases.length);
        }
    }, [cases]);

    useEffect(() => {
        console.log(casesHeight)
    }, [casesHeight]);

    useEffect(() => {
        setCases(CaseService.renderCases(terrainType));
    }, []);

    const handleConfirm = () => {
        const [x, y] = caseCoordinates;
    
        if (y >= 0 && y < tableauCase.length && x >= 0 && x < tableauCase[y].length) {
            const updatedTerrain = tableauCase.map(row => [...row]);
            
            cases.map((ligneDeCases : Case[], i) => {
                ligneDeCases.map((caseSeule : Case, j) => {
                    updatedTerrain[y+i][x+j] = caseSeule; 
                });
            });

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
                    <NouvelleCaseComponent x={cellSize} terrainWidth={terrainData[0]?.length} terrainHeight={terrainData.length} setCaseCoordinates={setCaseCoordinates} cases={cases} casesWidth={casesWidth} casesHeight={casesHeight}/>
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
