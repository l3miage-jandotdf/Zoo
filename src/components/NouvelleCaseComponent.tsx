import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, PanResponder, Animated } from 'react-native';
import { Case } from '../type/Case';
import CaseComponent from './CaseComponent';
import { Table, TableWrapper } from 'react-native-table-component';

interface NouvelleCaseProps {
    x: number;
    terrainWidth: number;
    terrainHeight: number;
    setCaseCoordinates: (coordinates: [number, number]) => void;
    cases: Case[][];
    checkIfSolIsOk : (x: number, y: number, caseLibre : string) => boolean;
}

const NouvelleCaseComponent: React.FC<NouvelleCaseProps> = ({ x, terrainWidth, terrainHeight, setCaseCoordinates, cases, checkIfSolIsOk}) => {

    const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const [panResponder, setPanResponder] = useState(null);
    const [placementOk, setPlacementOk] = useState<boolean>(false);

    useEffect(() => {
        if (cases && cases[0] && cases[0][0]) {

            const panResponderInstance = PanResponder.create({
                onStartShouldSetPanResponder: () => true,
                onMoveShouldSetPanResponder: () => true,
                onPanResponderGrant: () => {
                    position.setOffset({
                        x: position.x._value,
                        y: position.y._value,
                    });
                    position.setValue({ x: 0, y: 0 });
                },
                onPanResponderMove: Animated.event(
                    [
                        null,
                        { dx: position.x, dy: position.y }
                    ],
                    { useNativeDriver: false }
                ),
                onPanResponderRelease: () => {
                    let caseLibre = cases[0][0].sol === "Animal" ? "Enclos-herbe" : "Sol-herbe";

                    let newX = Math.round((position.x._value + position.x._offset) / x) * x;
                    let newY = Math.round((position.y._value + position.y._offset) / x) * x;

                    const casesWidth = cases[0].length;
                    const casesHeight = cases.length;

                    if (newX >= x * terrainWidth - casesWidth * x) {
                        newX = x * terrainWidth - (casesWidth * x);
                    }
                    if (newY >= x * terrainHeight - casesHeight * x) {
                        newY = x * terrainHeight - (casesHeight * x);
                    }

                    setPlacementOk(checkIfSolIsOk(newX / x, newY / x, caseLibre));

                    position.flattenOffset();
                    position.setValue({ x: newX, y: newY });

                    setCaseCoordinates([newX / x, newY / x]);
                }
            });

            setPanResponder(panResponderInstance);
        }
    }, [cases]);

    if (!cases) {
        return null;
    }

    return (
        <Animated.View
            {...(panResponder ? panResponder.panHandlers : {})}
            style={[styles.case, { transform: position.getTranslateTransform(), width: x, height: x }]}
        >
            <Table borderStyle={{ borderColor: 'transparent' }}>
                {cases.map((ligneDeCases: Case[], i) => (
                    <TableWrapper key={i} style={styles.row}>
                        {ligneDeCases.map((caseSeule: Case, j) => (
                            <CaseComponent key={i + j} caseData={caseSeule} cellIndex={1} length={x} placementOk={placementOk} />
                        ))}
                    </TableWrapper>
                ))}
            </Table>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    row: { flexDirection: 'row', backgroundColor: 'black' },
    case: {
        position: 'absolute',
        backgroundColor: 'transparent',
    },
    innerCase: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
    },
});

export default NouvelleCaseComponent;
