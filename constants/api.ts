// Keep it simple and bypass the finicky proxy server entirely
const GAMERPOWER_BASE = 'https://www.gamerpower.com/api';
const CHEAPSHARK_BASE = 'https://www.cheapshark.com/api/1.0';

export const API_ENDPOINTS = {
  Worth: `${GAMERPOWER_BASE}/worth`,
  Giveaways: `${GAMERPOWER_BASE}/giveaways`,
  HighestWorth: `${GAMERPOWER_BASE}/giveaways?sort-by=value`,
  
  // CheapShark endpoints
  GamesFeed: `${CHEAPSHARK_BASE}/deals`, // Raw, paginated stream of current deals
  HighestSavings: `${CHEAPSHARK_BASE}/deals?sortBy=Savings`, // Deals sorted by best discount %
  GameSearch: `${CHEAPSHARK_BASE}/games`, // Requires '?title=name' appended dynamically when searching
};