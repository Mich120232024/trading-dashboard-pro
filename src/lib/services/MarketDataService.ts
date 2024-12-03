// src/lib/services/MarketDataService.ts
import {
  MarketData,
  MarketDataCallback,
  TradingStatus,
  TradingStatusCallback,
} from "./types";

class MarketDataService {
  private socket: WebSocket | null = null;
  private marketDataSubscribers: Map<string, Set<MarketDataCallback>> =
    new Map();
  private statusSubscribers: Map<string, Set<TradingStatusCallback>> =
    new Map();
  private lastPrices: Map<string, MarketData> = new Map();
  private url: string;

  constructor(url: string) {
    this.url = url;
    this.connect();
  }

  private connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "marketData") {
          this.handleMarketData(data.payload);
        } else if (data.type === "tradingStatus") {
          this.handleTradingStatus(data.payload);
        }
      } catch (error) {
        console.error("Error processing message:", error);
      }
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }

  private handleMarketData(data: MarketData) {
    const { symbol } = data;
    this.lastPrices.set(symbol, {
      ...data,
      timestamp: Date.now(),
    });

    const subscribers = this.marketDataSubscribers.get(symbol);
    if (subscribers) {
      subscribers.forEach((callback) => callback(data));
    }
  }

  private handleTradingStatus(data: TradingStatus) {
    const { symbol } = data;
    const subscribers = this.statusSubscribers.get(symbol);
    if (subscribers) {
      subscribers.forEach((callback) => callback(data));
    }
  }

  subscribeToMarketData(symbol: string, callback: MarketDataCallback) {
    if (!this.marketDataSubscribers.has(symbol)) {
      this.marketDataSubscribers.set(symbol, new Set());
    }
    this.marketDataSubscribers.get(symbol)?.add(callback);

    // Send latest price if available
    const lastPrice = this.lastPrices.get(symbol);
    if (lastPrice) {
      callback(lastPrice);
    }
  }

  subscribeToTradingStatus(symbol: string, callback: TradingStatusCallback) {
    if (!this.statusSubscribers.has(symbol)) {
      this.statusSubscribers.set(symbol, new Set());
    }
    this.statusSubscribers.get(symbol)?.add(callback);
  }

  unsubscribeFromMarketData(symbol: string, callback: MarketDataCallback) {
    this.marketDataSubscribers.get(symbol)?.delete(callback);
  }

  unsubscribeFromTradingStatus(
    symbol: string,
    callback: TradingStatusCallback
  ) {
    this.statusSubscribers.get(symbol)?.delete(callback);
  }

  getLastPrice(symbol: string): MarketData | undefined {
    return this.lastPrices.get(symbol);
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    this.marketDataSubscribers.clear();
    this.statusSubscribers.clear();
    this.lastPrices.clear();
  }
}

export default MarketDataService;

// src/lib/services/WebSocketService.ts
export interface WebSocketMessage {
  type: string;
  data: any;
}

export class WebSocketService {
  private url: string;
  private socket: WebSocket | null = null;
  private subscriptions: Map<string, ((data: any) => void)[]> = new Map();

  constructor(url: string) {
    this.url = url;
  }

  connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data) as WebSocketMessage;
        const callbacks = this.subscriptions.get(message.type);
        if (callbacks) {
          callbacks.forEach((callback) => callback(message.data));
        }
      } catch (error) {
        console.error("Error processing websocket message:", error);
      }
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  }

  subscribe(type: string, callback: (data: any) => void) {
    if (!this.subscriptions.has(type)) {
      this.subscriptions.set(type, []);
    }
    this.subscriptions.get(type)?.push(callback);
  }

  unsubscribe(type: string, callback: (data: any) => void) {
    const callbacks = this.subscriptions.get(type);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    this.subscriptions.clear();
  }
}
