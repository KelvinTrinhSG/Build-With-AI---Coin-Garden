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
  lesson?: string; // only on plants saved before lessons came from the quote register; still shown if harvested
  quoteId?: string; // the register quote this flower received when it was harvested
  isDemo?: boolean;
  demoComplete?: boolean;
  demoSamplePrice?: boolean; // demo buy price is a labelled sample because BTC price was unavailable
  createdAt: string; // ISO timestamp; also decides plot order
  harvestedAt?: string; // ISO timestamp; set once a sunflower is harvested, which moves it to the harvest plot
  harvestPrice?: number; // USD per coin on the day it was harvested
};

export type GardenSave = { version: 1; plants: Plant[] };

export type CoinMatch = {
  id: string;
  name: string;
  symbol: string;
  thumb?: string;
};

export type NewPlant = Pick<Plant, "coinId" | "symbol" | "name" | "thumb" | "buyPrice" | "amount" | "date">;
