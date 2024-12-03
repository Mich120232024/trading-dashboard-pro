import { useState, useEffect } from 'react';
import MarketDataService from '../services/MarketDataService';

const marketDataService = new MarketDataService('wss://your-websocket-url/market-data');

export interface MarketData {
  symbol: string;
  price: number;
  bid: number;
  ask: number;
  volume: number;
  timestamp: number;
  change?: number;
  changePercent?: number;
}

interface MarketDataOptions {
  autoSubscribe?: boolean;
  includeTradingStatus?: boolean;
  updateInterval?: number;
  onUpdate?: (data: MarketData) => void;
  onError?: (error: any) => void;
}

export const useMarketData = (symbol: string, options: MarketDataOptions = {}) => {
  const {
    autoSubscribe = true,
    includeTradingStatus = false,
    updateInterval = 0,
    onUpdate,
    onError
  } = options;

  const [data, setData] = useState<MarketData | null>(null);
  const [status, setStatus] = useState<string>('unknown');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let cleanup: (() => void) | undefined;

    const handleMarketData = (newData: MarketData) => {
      setData(prevData => {
        if (prevData) {
          const change = newData.price - prevData.price;
          const changePercent = (change / prevData.price) * 100;
          newData = { ...newData, change, changePercent };
        }
        onUpdate?.(newData);
        return newData;
      });
      setError(null);
    };

    const handleError = (err: any) => {
      setError(err);
      onError?.(err);
    };

    const subscribe = () => {
      try {
        // Subscribe to market data
        cleanup = marketDataService.subscribeToSymbol(symbol, handleMarketData);

        // Subscribe to trading status if requested
        if (includeTradingStatus) {
          const statusCleanup = marketDataService.subscribeToTradingStatus(
            symbol,
            (statusData) => setStatus(statusData.status)
          );
          const originalCleanup = cleanup;
          cleanup = () => {
            originalCleanup();
            statusCleanup();
          };
        }

        setIsSubscribed(true);

        // Set up polling interval if specified
        if (updateInterval > 0) {
          intervalId = setInterval(() => {
            const lastPrice = marketDataService.getLastPrice(symbol);
            if (lastPrice) {
              handleMarketData(lastPrice);
            }
          }, updateInterval);
        }
      } catch (err) {
        handleError(err);
      }
    };

    if (autoSubscribe) {
      subscribe();
    }

    return () => {
      cleanup?.();
      if (intervalId) {
        clearInterval(intervalId);
      }
      setIsSubscribed(false);
    };
  }, [symbol, autoSubscribe, includeTradingStatus, updateInterval, onUpdate, onError]);

  const manualSubscribe = () => {
    if (!isSubscribed) {
      const cleanup = marketDataService.subscribeToSymbol(symbol, (newData) => {
        setData(newData);
        setError(null);
      });
      setIsSubscribed(true);
      return cleanup;
    }
  };

  const manualUnsubscribe = () => {
    if (isSubscribed) {
      marketDataService.unsubscribeFromSymbol(symbol, () => {});
      setIsSubscribed(false);
    }
  };

  return {
    data,
    status,
    isSubscribed,
    error,
    subscribe: manualSubscribe,
    unsubscribe: manualUnsubscribe,
    getLastPrice: () => marketDataService.getLastPrice(symbol)
  };
};
