import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import TerrainService from '../services/TerrainService';
import { Case } from '../type/Case';


const Terrain = () => {

    const [tableauCase, setTableauCase] = useState([]);

    useEffect(() => {
        setTableauCase(TerrainService.chargerTerrain());
    }, []);


    return (
        <ReactNativeZoomableView
            maxZoom={2}
            minZoom={0.5}
            zoomStep={0.5}
            initialZoom={1}
            bindToBorders={false}
            style={{
                padding: 10,
                backgroundColor: 'black',
            }}
        >
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
            </View>
        </ReactNativeZoomableView>
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

export default Terrain;
