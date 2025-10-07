import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import useGameStore from '../store/useGameStore';

export const ActionButtons = () => {
    const {
        handleIncrement, handleReset, handleGamble,
        plusTwoUnlocked, plusThreeUnlocked, plusFourUnlocked
    } = useGameStore();

    return (
        <View>
            <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button} onPress={() => handleIncrement(1)}>
                    <Text style={styles.buttonText}>+1</Text>
                </TouchableOpacity>
                {plusTwoUnlocked && (
                    <TouchableOpacity style={styles.button} onPress={() => handleIncrement(2)}>
                        <Text style={styles.buttonText}>+2</Text>
                    </TouchableOpacity>
                )}
                {plusThreeUnlocked && (
                    <TouchableOpacity style={styles.button} onPress={() => handleIncrement(3)}>
                        <Text style={styles.buttonText}>+3</Text>
                    </TouchableOpacity>
                )}
                {plusFourUnlocked && (
                    <TouchableOpacity style={styles.button} onPress={() => handleIncrement(4)}>
                        <Text style={styles.buttonText}>+4</Text>
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.buttonRow}>
                <TouchableOpacity style={[styles.button, styles.gambleButton]} onPress={handleGamble}>
                    <Text style={styles.buttonText}>Gamble</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.resetButton]} onPress={handleReset}>
                    <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonRow: {
        flexDirection: 'row',
        gap: 20,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#ff385c',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
    },
    gambleButton: {
        backgroundColor: '#f0ad4e'
    },
    resetButton: {
        backgroundColor: '#d9534f'
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
