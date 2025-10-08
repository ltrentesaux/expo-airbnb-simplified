export const AUTO_CLICKER_BASE_COST = 10;
export const SUPER_CLICKER_BASE_COST = 100;
export const PRESTIGE_BASE_COST = 10000;

export const PLUS_TWO_COST = 1000;
export const PLUS_THREE_COST = 2500;
export const PLUS_FOUR_COST = 5000;

export const getAutoClickerCost = (level) => Math.ceil(AUTO_CLICKER_BASE_COST * Math.pow(1.25, level));
export const getSuperClickerCost = (level) => Math.ceil(SUPER_CLICKER_BASE_COST * Math.pow(1.25, level));
export const getPrestigeCost = (level) => Math.ceil(PRESTIGE_BASE_COST * Math.pow(1.25, level)); // Reduced multiplier from 10 to 4
