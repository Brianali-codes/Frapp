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
  platform: string; 
  game_url:string;
  instructions?: string;   
  keys_left?: string;      
  type?: string;          
  platforms?: string;   
  status?: string;   
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
  dealID?: string;
  storeID?: string;
  gameID?: string;
  thumb?: string;        
  salePrice?: string;    
  normalPrice?: string;  
  savings?: string;      
  steamRatingPercent?: string;
}