import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import TradeExecution from '../../components/Dashboard/TradeExecution';
import MarketDepthChart from '../../components/Dashboard/Charts/MarketDepthChart';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

interface Trade {
  id: string;
  symbol: string;
  type: string;
  direction: 'buy' | 'sell';
  amount: number;
  openPrice: number;
  currentPrice: number;
  pnl: number;
  status: string;
  timestamp: string;
}

const Trades: React.FC = () => {
  const location = useLocation();
  const [selectedSymbol, setSelectedSymbol] = useState('EUR/USD');
  
  // Mock active trades
  const trades: Trade[] = [
    {
      id: 'T1',
      symbol: 'EUR/USD',
      type: 'Market',
      direction: 'buy',
      amount: 100000,
      openPrice: 1.0990,
      currentPrice: 1.1010,
      pnl: 200,
      status: 'open',
      timestamp: new Date().toISOString()
    },
    {
      id: 'T2',
      symbol: 'GBP/USD',
      type: 'Limit',
      direction: 'sell',
      amount: 50000,
      openPrice: 1.2650,
      currentPrice: 1.2640,
      pnl: 50,
      status: 'open',
      timestamp: new Date().toISOString()
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Trading</h1>
        <select
          value={selectedSymbol}
          onChange={(e) => setSelectedSymbol(e.target.value)}
          className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>EUR/USD</option>
          <option>GBP/USD</option>
          <option>USD/JPY</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Market Depth */}
        <div className="col-span-2">
          <MarketDepthChart />
        </div>

        {/* Trade Execution */}
        <div>
          <TradeExecution 
            symbol={selectedSymbol}
            currentPrice={1.1000}
            spread={0.0002}
          />
        </div>
      </div>

      {/* Active Trades */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Active Trades</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Symbol</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Direction</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Open Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Current Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">P&L</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {trades.map((trade) => (
                <tr key={trade.id} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{trade.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{trade.symbol}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{trade.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`flex items-center ${trade.direction === 'buy' ? 'text-green-500' : 'text-red-500'}`}>
                      {trade.direction === 'buy' ? <ArrowUpIcon className="w-4 h-4 mr-1" /> : <ArrowDownIcon className="w-4 h-4 mr-1" />}
                      {trade.direction.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{trade.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{trade.openPrice.toFixed(4)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{trade.currentPrice.toFixed(4)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={trade.pnl >= 0 ? 'text-green-500' : 'text-red-500'}>
                      {trade.pnl >= 0 ? '+' : ''}{trade.pnl.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-red-500 hover:text-red-400">
                      Close
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Trades;