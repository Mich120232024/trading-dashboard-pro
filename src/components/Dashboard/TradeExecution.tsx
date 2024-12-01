import React, { useState } from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

interface TradeExecutionProps {
  symbol: string;
  currentPrice: number;
  spread: number;
}

const TradeExecution: React.FC<TradeExecutionProps> = ({
  symbol = 'EUR/USD',
  currentPrice = 1.1000,
  spread = 0.0002
}) => {
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [direction, setDirection] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [limitPrice, setLimitPrice] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');

  // Calculate prices
  const bidPrice = currentPrice - (spread / 2);
  const askPrice = currentPrice + (spread / 2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement trade execution logic
    console.log('Executing trade:', {
      symbol,
      orderType,
      direction,
      amount,
      limitPrice,
      stopLoss,
      takeProfit
    });
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold">{symbol}</h3>
          <div className="text-sm text-gray-400">Spread: {(spread * 10000).toFixed(1)} pips</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">Bid</div>
          <div className="text-lg font-semibold">{bidPrice.toFixed(5)}</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">Ask</div>
          <div className="text-lg font-semibold">{askPrice.toFixed(5)}</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Order Type */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setOrderType('market')}
            className={`px-4 py-2 rounded-lg ${orderType === 'market' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            Market
          </button>
          <button
            type="button"
            onClick={() => setOrderType('limit')}
            className={`px-4 py-2 rounded-lg ${orderType === 'limit' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            Limit
          </button>
        </div>

        {/* Direction */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setDirection('buy')}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg ${direction === 'buy' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            <ArrowUpIcon className="w-5 h-5" />
            Buy
          </button>
          <button
            type="button"
            onClick={() => setDirection('sell')}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg ${direction === 'sell' ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            <ArrowDownIcon className="w-5 h-5" />
            Sell
          </button>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm text-gray-400 mb-1">Amount</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount..."
          />
        </div>

        {/* Limit Price */}
        {orderType === 'limit' && (
          <div>
            <label className="block text-sm text-gray-400 mb-1">Limit Price</label>
            <input
              type="text"
              value={limitPrice}
              onChange={(e) => setLimitPrice(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter limit price..."
            />
          </div>
        )}

        {/* Stop Loss & Take Profit */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Stop Loss</label>
            <input
              type="text"
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Optional"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Take Profit</label>
            <input
              type="text"
              value={takeProfit}
              onChange={(e) => setTakeProfit(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Optional"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 rounded-lg font-medium ${direction === 'buy' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
        >
          {orderType === 'market' ? `${direction === 'buy' ? 'Buy' : 'Sell'} Now` : 'Place Order'}
        </button>
      </form>
    </div>
  );
};

export default TradeExecution;