import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Table, TableWrapper } from 'react-native-table-component';
import CaseComponent from './CaseComponent';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/Store';
import { Case } from '../type/Case';
import BonhommeComponent from './BonhommeComponent'; 
import { fetchTerrainData } from '../slices/TerrainSlice';

const Terrain = () => {
    const dispatch: AppDispatch = useDispatch();
    const terrainData = useSelector((state: RootState) => state.terrain.terrainData);
    const loading = useSelector((state: RootState) => state.terrain.loading);
    const error = useSelector((state: RootState) => state.terrain.error);

    const [tableauCase, setTableauCase] = useState<Case[][]>([]); 
    const [bonhommes, setBonhommes] = useState([]);

    useEffect(() => {
        dispatch(fetchTerrainData());
    }, [dispatch]);

    useEffect(() => {
        setTableauCase(terrainData);
        if (terrainData.length > 0) {
            initBonhommes(terrainData);
        }
    }, [terrainData]);

    /**
     * Place les bonhommes sur les cases de types chemin
     * @param terrain 
     */
    const initBonhommes = (terrain: Case[][]) => {
        const chemins: { x: number, y: number }[] = [];
        for (let y = 0; y < terrain.length; y++) {
            for (let x = 0; x < terrain[y].length; x++) {
                if (terrain[y][x].sol === 'Chemin') {
                    chemins.push({ x, y });
                }
            }
        }

        const randomChemins = chemins.sort(() => 0.5 - Math.random()).slice(0, 8); 
        setBonhommes(randomChemins.map(c => ({
            id: `${c.x}-${c.y}`,
            initialPosition: { x: c.x * 40, y: c.y * 40 }
        })));
    };

    if (loading) {
        return <View><Text>Loading...</Text></View>;
    }

    if (error) {
        return <View><Text>Error: {error}</Text></View>;
    }

    return (
        <View style={styles.container}>
            <Table borderStyle={{ borderColor: 'transparent' }}>
                {tableauCase.map((rowData, rowIndex) => (
                    <TableWrapper key={rowIndex} style={styles.row}>
                        {rowData.map((caseData, cellIndex) => (
                            <CaseComponent key={cellIndex} caseData={caseData} cellIndex={cellIndex} length={40} placementOk={true} />
                        ))}
                    </TableWrapper>
                ))}
            </Table>
            {bonhommes.map(bonhomme => (
                <BonhommeComponent
                    key={bonhomme.id}
                    initialPosition={bonhomme.initialPosition}
                    tableauCase={tableauCase}
                    cellSize={40}
                />
            ))}
            <TouchableOpacity>
                <Text>Ajouter une Case</Text>
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
