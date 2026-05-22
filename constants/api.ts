const IS_DEV = __DEV__;

const GAMERPOWER_BASE = IS_DEV
  ? 'https://api.codetabs.com/v1/proxy?quest=https://www.gamerpower.com/api'
  : 'https://www.gamerpower.com/api';

const FREETOGAME_BASE = IS_DEV
  ? 'https://api.codetabs.com/v1/proxy?quest=https://www.freetogame.com/api'
  : 'https://www.freetogame.com/api';

export const API_ENDPOINTS = {
  Worth: `${GAMERPOWER_BASE}/worth`,
  Giveaways: `${GAMERPOWER_BASE}/giveaways`,
  Games: `${FREETOGAME_BASE}/games`,
};