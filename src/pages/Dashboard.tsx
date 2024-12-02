import React, { useState } from 'react';
import VolatilitySurfaceChart from '../components/Dashboard/Charts/VolatilitySurfaceChart';
import MarketDepthChart from '../components/Dashboard/Charts/MarketDepthChart';
import TradeExecution from '../components/Dashboard/TradeExecution';
import TradeList from '../components/Dashboard/TradeList';
import Portfolio from '../components/Dashboard/Portfolio';
import Booking from '../components/Dashboard/Booking';

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

const Dashboard: React.FC = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('EUR/USD');
  const [activeTab, setActiveTab] = useState<'trading' | 'portfolio' | 'booking'>('trading');
  
  // Mock trades data
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
      {/* Top Row - Summary Cards */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3 bg-gray-800 p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm font-medium">Portfolio Value</h3>
          <p className="text-white text-2xl font-bold mt-2">$1,234,567</p>
          <span className="text-green-500 text-sm">+2.5%</span>
        </div>

        <div className="col-span-3 bg-gray-800 p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm font-medium">Daily P&L</h3>
          <p className="text-white text-2xl font-bold mt-2">$12,345</p>
          <span className="text-green-500 text-sm">+1.2%</span>
        </div>

        <div className="col-span-3 bg-gray-800 p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm font-medium">Active Trades</h3>
          <p className="text-white text-2xl font-bold mt-2">23</p>
          <span className="text-yellow-500 text-sm">5 pending</span>
        </div>

        <div className="col-span-3 bg-gray-800 p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm font-medium">Win Rate</h3>
          <p className="text-white text-2xl font-bold mt-2">68%</p>
          <span className="text-blue-500 text-sm">+3% MoM</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 border-b border-gray-700">
        <button
          className={`px-4 py-2 ${activeTab === 'trading' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-400'}`}
          onClick={() => setActiveTab('trading')}
        >
          Trading
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'portfolio' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-400'}`}
          onClick={() => setActiveTab('portfolio')}
        >
          Portfolio
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'booking' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-400'}`}
          onClick={() => setActiveTab('booking')}
        >
          Booking
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'trading' && (
        <>
          {/* Middle Row - Charts and Trading */}
          <div className="grid grid-cols-12 gap-6">
            {/* Market Depth and Trade Execution */}
            <div className="col-span-8 grid grid-rows-2 gap-6">
              <div className="row-span-1">
                <MarketDepthChart />
              </div>
              <div className="row-span-1 grid grid-cols-2 gap-6">
                <div className="col-span-1 bg-gray-800 rounded-lg p-4">
                  <h3 className="text-gray-400 text-sm font-medium mb-4">Position Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Exposure</span>
                      <span className="text-white">$1.2M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Margin Used</span>
                      <span className="text-white">45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Risk Level</span>
                      <span className="text-yellow-500">Moderate</span>
                    </div>
                  </div>
                </div>
                <div className="col-span-1 bg-gray-800 rounded-lg p-4">
                  <h3 className="text-gray-400 text-sm font-medium mb-4">Risk Metrics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">VaR (1d, 95%)</span>
                      <span className="text-white">$15,234</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Sharpe Ratio</span>
                      <span className="text-white">1.82</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Beta</span>
                      <span className="text-white">0.85</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trade Execution and Vol Surface */}
            <div className="col-span-4 space-y-6">
              <TradeExecution 
                symbol={selectedSymbol}
                currentPrice={1.1000}
                spread={0.0002}
              />
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="text-gray-400 text-sm font-medium mb-4">Volatility Surface</h3>
                <VolatilitySurfaceChart />
              </div>
            </div>
          </div>

          {/* Bottom Row - Active Trades */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Active Trades</h3>
              <div className="flex space-x-4">
                <select
                  value={selectedSymbol}
                  onChange={(e) => setSelectedSymbol(e.target.value)}
                  className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>EUR/USD</option>
                  <option>GBP/USD</option>
                  <option>USD/JPY</option>
                </select>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  New Trade
                </button>
              </div>
            </div>
            <TradeList trades={trades} onTradeSelect={() => {}} />
          </div>
        </>
      )}

      {/* Portfolio View */}
      {activeTab === 'portfolio' && (
        <div className="space-y-6">
          <Portfolio />
        </div>
      )}

      {/* Booking View */}
      {activeTab === 'booking' && (
        <div className="max-w-2xl mx-auto">
          <Booking />
        </div>
      )}
    </div>
  );
};

export default Dashboard;