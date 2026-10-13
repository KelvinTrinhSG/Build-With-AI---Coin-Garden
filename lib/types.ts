export type Stage = 0 | 1 | 2 | 3 | 4;

export type Plant = {
  id: string;
  coinId: string; // CoinGecko id, e.g. "bitcoin"
  symbol: string; // "BTC"
  name: string; // "Bitcoin"
  thumb?: string;
  buyPrice: number; // USD per coin, > 0
  amount: number; // > 0
  date: string; // "YYYY-MM-DD"
  lesson?: string;
  isDemo?: boolean;
  demoComplete?: boolean;
  createdAt: string; // ISO timestamp; also decides plot order
};

export type GardenSave = { version: 1; plants: Plant[] };

export type CoinMatch = {
  id: string;
  name: string;
  symbol: string;
  thumb?: string;
};

export type NewPlant = Pick<Plant, "coinId" | "symbol" | "name" | "thumb" | "buyPrice" | "amount" | "date">;
