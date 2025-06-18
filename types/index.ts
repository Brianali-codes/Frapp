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
}

export interface FreeGiveaway extends Giveaway {
  short_description: string;
  game_url: string;
  genre: string;
  publisher: string;
  release_date: string;
  margin: string;
}
