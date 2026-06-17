// Keep it simple and bypass the finicky proxy server entirely
const GAMERPOWER_BASE = 'https://www.gamerpower.com/api';
const FREETOGAME_BASE = 'https://www.freetogame.com/api';

export const API_ENDPOINTS = {
  Worth: `${GAMERPOWER_BASE}/worth`,
  Giveaways: `${GAMERPOWER_BASE}/giveaways`,
  HighestWorth: `${GAMERPOWER_BASE}/giveaways?sort-by=value`,
  Games: `${FREETOGAME_BASE}/games`,
};