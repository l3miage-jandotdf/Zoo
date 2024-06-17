import React, {useRef} from 'react';
import { StyleSheet, PanResponder, Animated } from 'react-native';
import { Case } from '../type/Case';
import CaseComponent from './CaseComponent';
import { Table, TableWrapper } from 'react-native-table-component';


interface NouvelleCaseProps {
    x: number;
    terrainWidth: number;
    terrainHeight: number;
    setCaseCoordinates: (coordinates: [number, number]) => void;
    cases : Case[][];
    casesWidth : number; //TOFIX
    casesHeight : number; //TOFIX
}

const NouvelleCaseComponent: React.FC<NouvelleCaseProps> = ({ x, terrainWidth, terrainHeight, setCaseCoordinates, cases, casesWidth, casesHeight }) => {

    const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

    const panResponder = useRef(
        PanResponder.create({
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
                let newX = Math.round((position.x._value + position.x._offset) / x) * x;
                let newY = Math.round((position.y._value + position.y._offset) / x) * x;
                console.log(casesHeight);
                if (newX >= Math.floor((x*terrainWidth)))(newX= x*terrainWidth - casesWidth * x);
                if (newY >= Math.floor((x*terrainHeight)))(newY= x*terrainHeight - casesHeight * x);

                position.flattenOffset(); 
                position.setValue({ x: newX, y: newY });

                setCaseCoordinates([newX / x, newY / x]);
            }
        })
    ).current;

    return (
        <Animated.View
            {...panResponder.panHandlers}
            style={[styles.case, { transform: position.getTranslateTransform(), width: x, height: x }]}
        >
            <Table borderStyle={{ borderColor: 'transparent' }}>
            {
                cases.map((ligneDeCases : Case[], i) => (
                    <TableWrapper key={i} style={styles.row}>
                    {
                        ligneDeCases.map((caseSeule : Case, j) => (
                            <CaseComponent key={i+j} caseData={caseSeule} cellIndex={1} length={x}/>
                        ))
                    }
                    </TableWrapper>
                ))
            }
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
