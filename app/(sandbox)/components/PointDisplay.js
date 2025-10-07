import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import useGameStore from '../store/useGameStore';

export const PointDisplay = () => {
    const points = useGameStore(state => state.points);
    const pointsPerSecond = useGameStore(state => state.pointsPerSecond());
    const popAnimation = useRef(new Animated.Value(1)).current;
    const colorAnimation = useRef(new Animated.Value(0)).current;

    const pointColor = colorAnimation.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: ['#d9534f', '#000000', '#5cb85c'],
    });

    return (
        <View style={styles.container}>
            <Animated.Text style={[styles.count, { transform: [{ scale: popAnimation }], color: pointColor }]}>
                {Math.round(points)}
            </Animated.Text>
            <Text style={styles.pps}>{pointsPerSecond.toFixed(1)} points/sec</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    count: {
        fontSize: 56,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    pps: {
        fontSize: 16,
        fontStyle: 'italic',
        marginBottom: 20,
        color: 'gray',
    },
});
