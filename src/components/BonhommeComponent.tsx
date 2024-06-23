import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Image, StyleSheet } from 'react-native';

const BonhommeComponent = ({ initialPosition, tableauCase, cellSize }) => {
    const position = useRef(new Animated.ValueXY(initialPosition)).current;
    const animationRef = useRef(null);

    const getNewDirection = () => {
        const directions = [
            { x: 1, y: 0 },   // right
            { x: -1, y: 0 },  // left
            { x: 0, y: 1 },   // down
            { x: 0, y: -1 }   // up
        ];
        return directions[Math.floor(Math.random() * directions.length)];
    };

    const isOnPath = (x, y) => {
        return tableauCase[y] && tableauCase[y][x] && tableauCase[y][x].sol === 'Chemin';
    };

    const moveBonhomme = () => {
        const { x, y } = position.__getValue();
        const direction = getNewDirection();
        const newX = x + direction.x * cellSize;
        const newY = y + direction.y * cellSize;
        const newCellX = Math.floor(newX / cellSize);
        const newCellY = Math.floor(newY / cellSize);

        if (isOnPath(newCellX, newCellY)) {
            Animated.timing(position, {
                toValue: { x: newX, y: newY },
                duration: 4000,
                easing: Easing.linear,
                useNativeDriver: true
            }).start(() => {
                moveBonhomme();
            });
        } else {
            moveBonhomme(); 
        }
    };

    useEffect(() => {
        moveBonhomme();
        return () => {
            if (animationRef.current) {
                animationRef.current.stop();
            }
        };
    }, []);

    return (
        <Animated.View style={[styles.bonhomme, { transform: position.getTranslateTransform() }]}>
            <Image source={require('../assets/sols/Bonhomme.png')} style={styles.image} />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    bonhomme: {
        position: 'absolute',
        width: 20, 
        height: 20 
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

export default BonhommeComponent;
