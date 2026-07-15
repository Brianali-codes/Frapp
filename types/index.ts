export interface Giveaway {
  id: number;
  title: string;
  thumbnail: string;
  image: string;
  description: string;
  open_giveaway_url: string;
  open_giveaway: string;
  worth: string;
  end_date: string;
  // FIXED: Renamed 'plaform' to 'platform'
  platform: string; 

  // Added metadata properties used by the immersive detail modal
  instructions?: string;   // Step-by-step instructions to claim the drop
  keys_left?: string;      // Key/Store claim state (e.g. "Direct Redeem", "Keys Left")
  type?: string;           // Categorization (e.g. "Game", "DLC", "Early Access")
  platforms?: string;      // Formatted list of all eligible platforms for modal tags
}

export interface FreeGiveaway extends Giveaway {
  // Added any specific properties from the API here
  short_description: string;
  game_url: string;
  genre: string;
  publisher: string;
  release_date: string;
  margin: string;
  status: string;

  // CheapShark API Mappings for Free Game Listings
  dealID?: string;
  storeID?: string;
  gameID?: string;
  thumb?: string;        // CheapShark fallback for image thumbnails
  salePrice?: string;    // Maps current free/sale status ($0.00)
  normalPrice?: string;  // Maps true market valuation values
  savings?: string;      // Percent calculations for custom pricing labels
  steamRatingPercent?: string;
}