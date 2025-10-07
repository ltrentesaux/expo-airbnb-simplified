import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    getAutoClickerCost,
    getSuperClickerCost,
    getPrestigeCost,
    PLUS_TWO_COST,
    PLUS_THREE_COST,
    PLUS_FOUR_COST
} from '../game/constants';

const useGameStore = create((set, get) => ({
    // State
    points: 0,
    prestigeLevel: 0,
    autoClickerLevel: 0,
    superClickerLevel: 0,
    totalPoints: 0,
    highScore: 0,
    plusTwoUnlocked: false,
    plusThreeUnlocked: false,
    plusFourUnlocked: false,

    // Derived state (getters)
    prestigeBonus: () => 1 + get().prestigeLevel * 0.5,
    pointsPerSecond: () => ((get().autoClickerLevel * 1) + (get().superClickerLevel * 5)) * get().prestigeBonus(),

    // Actions
    loadData: async () => {
        try {
            const savedData = await AsyncStorage.getItem('clickerGame');
            if (savedData !== null) {
                set(JSON.parse(savedData));
            }
        } catch (error) {
            console.error('Failed to load data from storage', error);
        }
    },

    saveData: async () => {
        try {
            const {
                points, prestigeLevel, autoClickerLevel, superClickerLevel,
                totalPoints, highScore, plusTwoUnlocked, plusThreeUnlocked, plusFourUnlocked
            } = get();
            const gameState = { points, prestigeLevel, autoClickerLevel, superClickerLevel, totalPoints, highScore, plusTwoUnlocked, plusThreeUnlocked, plusFourUnlocked };
            await AsyncStorage.setItem('clickerGame', JSON.stringify(gameState));
        } catch (error) {
            console.error('Failed to save data to storage', error);
        }
    },

    tick: () => {
        const { pointsPerSecond } = get();
        if (pointsPerSecond() > 0) {
            set(state => ({
                points: state.points + pointsPerSecond(),
                totalPoints: state.totalPoints + pointsPerSecond()
            }));
        }
    },

    handleIncrement: (amount) => {
        const pointsToAdd = amount * get().prestigeBonus();
        set(state => ({
            points: state.points + pointsToAdd,
            totalPoints: state.totalPoints + pointsToAdd
        }));
    },

    handleReset: () => {
        set({
            points: 0,
            prestigeLevel: 0,
            autoClickerLevel: 0,
            superClickerLevel: 0,
            totalPoints: 0,
            plusTwoUnlocked: false,
            plusThreeUnlocked: false,
            plusFourUnlocked: false,
        });
    },

    handleGamble: () => {
        const { points } = get();
        if (points === 0) return;
        const win = Math.random() < 0.5;
        if (win) {
            set(state => ({
                points: state.points * 2,
                totalPoints: state.totalPoints + state.points
            }));
        } else {
            set({ points: 0 });
        }
    },

    handleBuy: (cost, action) => {
        if (get().points >= cost) {
            set(state => ({ points: state.points - cost }));
            action();
        }
    },

    handleBuyAutoClicker: () => {
        const cost = getAutoClickerCost(get().autoClickerLevel);
        get().handleBuy(cost, () => set(state => ({ autoClickerLevel: state.autoClickerLevel + 1 })));
    },

    handleBuySuperClicker: () => {
        const cost = getSuperClickerCost(get().superClickerLevel);
        get().handleBuy(cost, () => set(state => ({ superClickerLevel: state.superClickerLevel + 1 })));
    },

    handlePrestige: () => {
        const cost = getPrestigeCost(get().prestigeLevel);
        if (get().points >= cost) {
            set(state => ({ 
                prestigeLevel: state.prestigeLevel + 1,
                points: 0,
                autoClickerLevel: 0,
                superClickerLevel: 0,
            }));
        }
    },

    handleBuyPlusTwo: () => get().handleBuy(PLUS_TWO_COST, () => set({ plusTwoUnlocked: true })),
    handleBuyPlusThree: () => get().handleBuy(PLUS_THREE_COST, () => set({ plusThreeUnlocked: true })),
    handleBuyPlusFour: () => get().handleBuy(PLUS_FOUR_COST, () => set({ plusFourUnlocked: true })),
    
    // High score updater
    updateHighScore: () => {
        set(state => ({
            highScore: Math.max(state.points, state.highScore)
        }));
    }
}));

// Subscribe to state changes for saving and updating high score
useGameStore.subscribe((state, prevState) => {
    useGameStore.getState().saveData();
    if (state.points !== prevState.points) {
        useGameStore.getState().updateHighScore();
    }
});

// Load initial data
useGameStore.getState().loadData();

// Set up the game tick
setInterval(() => {
    useGameStore.getState().tick();
}, 1000);

export default useGameStore;
