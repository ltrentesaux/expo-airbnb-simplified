import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PointDisplay } from './components/PointDisplay';
import { ActionButtons } from './components/ActionButtons';
import { Shop } from './components/Shop';
import { Stats } from './components/Stats';

export default function SandboxScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sandbox Clicker</Text>
            <PointDisplay />
            <ActionButtons />
            <Shop />
            <Stats />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});
