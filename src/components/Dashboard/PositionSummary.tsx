import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

interface Position {
  symbol: string;
  direction: 'long' | 'short';
  quantity: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
}

const PositionSummary: React.FC = () => {
  // Mock positions data
  const positions: Position[] = [
    {
      symbol: 'EUR/USD',
      direction: 'long',
      quantity: 100000,
      entryPrice: 1.0990,
      currentPrice: 1.1010,
      pnl: 200,
      pnlPercent: 1.2
    },
    {
      symbol: 'GBP/USD',
      direction: 'short',
      quantity: 50000,
      entryPrice: 1.2650,
      currentPrice: 1.2640,
      pnl: 50,
      pnlPercent: 0.5
    }
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Positions</h3>
      <div className="space-y-4">
        {positions.map((position) => (
          <div key={position.symbol} className="bg-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <span className="text-lg font-medium">{position.symbol}</span>
                <span
                  className={`ml-2 flex items-center ${position.direction === 'long' ? 'text-green-500' : 'text-red-500'}`}
                >
                  {position.direction === 'long' ? 
                    <ArrowUpIcon className="w-4 h-4" /> : 
                    <ArrowDownIcon className="w-4 h-4" />
                  }
                  {position.quantity.toLocaleString()}
                </span>
              </div>
              <span
                className={`px-2 py-1 rounded text-sm ${position.pnl >= 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}
              >
                {position.pnl >= 0 ? '+' : ''}{position.pnlPercent.toFixed(2)}%
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-400">Entry Price</div>
                <div className="text-white">{position.entryPrice.toFixed(4)}</div>
              </div>
              <div>
                <div className="text-gray-400">Current Price</div>
                <div className="text-white">{position.currentPrice.toFixed(4)}</div>
              </div>
              <div>
                <div className="text-gray-400">P&L</div>
                <div className={position.pnl >= 0 ? 'text-green-500' : 'text-red-500'}>
                  {position.pnl >= 0 ? '+' : ''}{position.pnl.toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-gray-400">Size</div>
                <div className="text-white">${(position.quantity * position.currentPrice).toLocaleString()}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PositionSummary;