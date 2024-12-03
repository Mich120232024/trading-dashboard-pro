import WebSocketService from './WebSocketService';

type MarketDataCallback = (data: any) => void;

class MarketDataService {
  private ws: WebSocketService;
  private subscribers: Map<string, Set<MarketDataCallback>> = new Map();
  private lastPrices: Map<string, any> = new Map();

  constructor(url: string) {
    this.ws = new WebSocketService(url);
    this.initializeWebSocket();
  }

  private initializeWebSocket() {
    this.ws.subscribe('marketData', (data) => {
      this.handleMarketData(data);
    });

    this.ws.subscribe('tradingStatus', (data) => {
      this.handleTradingStatus(data);
    });

    this.ws.connect();
  }

  private handleMarketData(data: any) {
    const { symbol, price, bid, ask, volume } = data;
    this.lastPrices.set(symbol, { price, bid, ask, volume, timestamp: Date.now() });
    
    if (this.subscribers.has(symbol)) {
      this.subscribers.get(symbol)?.forEach(callback => callback(data));
    }
  }

  private handleTradingStatus(data: any) {
    const { symbol, status } = data;
    if (this.subscribers.has(`${symbol}_status`)) {
      this.subscribers.get(`${symbol}_status`)?.forEach(callback => callback(data));
    }
  }

  subscribeToSymbol(symbol: string, callback: MarketDataCallback) {
    if (!this.subscribers.has(symbol)) {
      this.subscribers.set(symbol, new Set());
    }
    this.subscribers.get(symbol)?.add(callback);

    // Send last known price immediately if available
    const lastPrice = this.lastPrices.get(symbol);
    if (lastPrice) {
      callback(lastPrice);
    }

    return () => this.unsubscribeFromSymbol(symbol, callback);
  }

  unsubscribeFromSymbol(symbol: string, callback: MarketDataCallback) {
    this.subscribers.get(symbol)?.delete(callback);
    if (this.subscribers.get(symbol)?.size === 0) {
      this.subscribers.delete(symbol);
    }
  }

  subscribeToTradingStatus(symbol: string, callback: MarketDataCallback) {
    const key = `${symbol}_status`;
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, new Set());
    }
    this.subscribers.get(key)?.add(callback);

    return () => this.unsubscribeFromTradingStatus(symbol, callback);
  }

  unsubscribeFromTradingStatus(symbol: string, callback: MarketDataCallback) {
    const key = `${symbol}_status`;
    this.subscribers.get(key)?.delete(callback);
    if (this.subscribers.get(key)?.size === 0) {
      this.subscribers.delete(key);
    }
  }

  getLastPrice(symbol: string) {
    return this.lastPrices.get(symbol);
  }

  disconnect() {
    this.ws.disconnect();
    this.subscribers.clear();
    this.lastPrices.clear();
  }
}

export default MarketDataService;