import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { useMarketData, MarketData } from '@/lib/hooks/useMarketData';

interface PriceTickerProps {
  symbol: string;
  showDetails?: boolean;
  className?: string;
}

const PriceTicker: React.FC<PriceTickerProps> = ({ 
  symbol, 
  showDetails = false,
  className = ''
}) => {
  const prevPriceRef = useRef<number | null>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  
  const { data, status, error } = useMarketData(symbol, {
    includeTradingStatus: true,
    updateInterval: 1000,
    onUpdate: (newData) => {
      if (prevPriceRef.current !== null && newData.price !== prevPriceRef.current) {
        flashPrice(newData.price > prevPriceRef.current ? 'up' : 'down');
      }
      prevPriceRef.current = newData.price;
    }
  });

  const flashPrice = (direction: 'up' | 'down') => {
    if (flashRef.current) {
      flashRef.current.className = `absolute inset-0 rounded-lg ${
        direction === 'up' ? 'bg-green-500/20' : 'bg-red-500/20'
      }`;
      setTimeout(() => {
        if (flashRef.current) {
          flashRef.current.className = 'absolute inset-0 rounded-lg bg-transparent';
        }
      }, 200);
    }
  };

  if (error) {
    return (
      <div className={`p-4 bg-red-500/20 rounded-lg ${className}`}>
        <span className="text-red-500">Error loading price data</span>
      </div>
    );
  }

  return (
    <div className={`relative p-4 rounded-lg glass-morphism-hover ${className}`}>
      <div ref={flashRef} className="absolute inset-0 rounded-lg bg-transparent transition-colors duration-200" />
      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">{symbol}</span>
          <span className={`text-xs px-2 py-1 rounded-full ${
            status === 'active' ? 'bg-green-500/20 text-green-500' :
            status === 'suspended' ? 'bg-red-500/20 text-red-500' :
            'bg-yellow-500/20 text-yellow-500'
          }`}>
            {status}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <AnimatePresence mode='wait'>
              {data && (
                <motion.div
                  key={data.price}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-2xl font-bold"
                >
                  {data.price.toFixed(4)}
                </motion.div>
              )}
            </AnimatePresence>
            {data?.change && (
              <div className={`flex items-center text-sm ${
                data.change >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {data.change >= 0 ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                {Math.abs(data.changePercent || 0).toFixed(2)}%
              </div>
            )}
          </div>

          {showDetails && data && (
            <div className="text-right">
              <div className="text-sm text-gray-400">
                <div>Bid: {data.bid.toFixed(4)}</div>
                <div>Ask: {data.ask.toFixed(4)}</div>
              </div>
              <div className="text-xs text-gray-500 flex items-center justify-end mt-1">
                <Clock className="w-3 h-3 mr-1" />
                {new Date(data.timestamp).toLocaleTimeString()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PriceTicker;