import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useGameStore from '../store/useGameStore';

export const Stats = () => {
    const prestigeLevel = useGameStore(state => state.prestigeLevel);
    const totalPoints = useGameStore(state => state.totalPoints);
    const highScore = useGameStore(state => state.highScore);
    const autoClickerLevel = useGameStore(state => state.autoClickerLevel);
    const superClickerLevel = useGameStore(state => state.superClickerLevel);

    return (
        <View style={styles.stats}>
            <Text style={styles.sectionTitle}>Stats</Text>
            <Text>Prestige Level: {prestigeLevel}</Text>
            <Text>Total points earned: {Math.round(totalPoints)}</Text>
            <Text>Highest score: {Math.round(highScore)}</Text>
            <Text>Auto-clickers: {autoClickerLevel}</Text>
            <Text>Super-clickers: {superClickerLevel}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    stats: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});
