import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
    getAutoClickerCost,
    getSuperClickerCost,
    getPrestigeCost,
    PLUS_TWO_COST,
    PLUS_THREE_COST,
    PLUS_FOUR_COST
} from '../game/constants';
import useGameStore from '../store/useGameStore';

const UpgradeButton = ({ title, cost, onPress, disabled, prestige }) => (
    <View style={styles.upgrade}>
        <Text>{title}</Text>
        <TouchableOpacity
            style={[styles.buyButton, prestige && styles.prestigeButton, disabled && styles.disabledButton]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={styles.buttonText}>Buy ({cost} pts)</Text>
        </TouchableOpacity>
    </View>
);

export const Shop = () => {
    const points = useGameStore(state => state.points);
    const autoClickerLevel = useGameStore(state => state.autoClickerLevel);
    const superClickerLevel = useGameStore(state => state.superClickerLevel);
    const prestigeLevel = useGameStore(state => state.prestigeLevel);
    const plusTwoUnlocked = useGameStore(state => state.plusTwoUnlocked);
    const plusThreeUnlocked = useGameStore(state => state.plusThreeUnlocked);
    const plusFourUnlocked = useGameStore(state => state.plusFourUnlocked);
    const {
        handleBuyAutoClicker, handleBuySuperClicker, handlePrestige,
        handleBuyPlusTwo, handleBuyPlusThree, handleBuyPlusFour
    } = useGameStore();

    return (
        <View style={styles.shop}>
            <Text style={styles.sectionTitle}>Shop</Text>
            <UpgradeButton title="Auto-clicker (+1/sec)" cost={getAutoClickerCost(autoClickerLevel)} onPress={handleBuyAutoClicker} disabled={points < getAutoClickerCost(autoClickerLevel)} />
            <UpgradeButton title="Super-clicker (+5/sec)" cost={getSuperClickerCost(superClickerLevel)} onPress={handleBuySuperClicker} disabled={points < getSuperClickerCost(superClickerLevel)} />
            <UpgradeButton title="Prestige (+50% gain/lvl)" cost={getPrestigeCost(prestigeLevel)} onPress={handlePrestige} disabled={points < getPrestigeCost(prestigeLevel)} prestige />
            {prestigeLevel >= 1 && !plusTwoUnlocked && (
                <UpgradeButton title="Unlock +2 Clicks" cost={PLUS_TWO_COST} onPress={handleBuyPlusTwo} disabled={points < PLUS_TWO_COST} />
            )}
            {prestigeLevel >= 2 && !plusThreeUnlocked && (
                <UpgradeButton title="Unlock +3 Clicks" cost={PLUS_THREE_COST} onPress={handleBuyPlusThree} disabled={points < PLUS_THREE_COST} />
            )}
            {prestigeLevel >= 3 && !plusFourUnlocked && (
                <UpgradeButton title="Unlock +4 Clicks" cost={PLUS_FOUR_COST} onPress={handleBuyPlusFour} disabled={points < PLUS_FOUR_COST} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    shop: {
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
    upgrade: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    buyButton: {
        backgroundColor: '#5cb85c',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    prestigeButton: {
        backgroundColor: '#8a2be2',
    },
    disabledButton: {
        backgroundColor: '#aaa',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
