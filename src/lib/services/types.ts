// src/lib/services/types.ts
export interface MarketData {
  symbol: string;
  price: number;
  bid: number;
  ask: number;
  volume: number;
  timestamp: number;
}

export interface TradingStatus {
  symbol: string;
  status: string;
}

export type MarketDataCallback = (data: MarketData) => void;
export type TradingStatusCallback = (data: TradingStatus) => void;
