import React, { useRef } from 'react';
import { View, StyleSheet, PanResponder, Animated } from 'react-native';

interface NouvelleCaseProps {
    x: number;
    terrainWidth: number;
    terrainHeight: number;
    setCaseCoordinates: (coordinates: [number, number]) => void;
}

const NouvelleCaseComponent: React.FC<NouvelleCaseProps> = ({ x, terrainWidth, terrainHeight, setCaseCoordinates }) => {
    const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                // Set the current offset to the current position
                position.setOffset({
                    x: position.x._value,
                    y: position.y._value,
                });
                position.setValue({ x: 0, y: 0 }); // Reset the animated value to avoid double counting the offset
            },
            onPanResponderMove: Animated.event(
                [
                    null,
                    { dx: position.x, dy: position.y }
                ],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: (e, gestureState) => {
                // Calculate the new coordinates snapped to x increments
                let newX = Math.round((position.x._value + position.x._offset) / x) * x;
                let newY = Math.round((position.y._value + position.y._offset) / x) * x;

                if (newX >= Math.floor((x*terrainWidth)))(newX= x*terrainWidth - x);
                if (newY >= Math.floor((x*terrainHeight)))(newY= x*terrainHeight - x);

                position.flattenOffset(); 
                position.setValue({ x: newX, y: newY });

                // Update the parent component with the new coordinates
                setCaseCoordinates([newX / x, newY / x]);
            }
        })
    ).current;

    return (
        <Animated.View
            {...panResponder.panHandlers}
            style={[styles.case, { transform: position.getTranslateTransform(), width: x, height: x }]}
        >
            <View style={styles.innerCase} />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    case: {
        position: 'absolute',
        backgroundColor: 'transparent',
    },
    innerCase: {
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF', // Default case color
    },
});

export default NouvelleCaseComponent;
