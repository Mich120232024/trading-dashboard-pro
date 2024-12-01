import React from 'react';
import VolatilitySurfaceChart from '../components/Dashboard/Charts/VolatilitySurfaceChart';
import MarketDepthChart from '../components/Dashboard/Charts/MarketDepthChart';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-12 gap-6">
        {/* Summary Cards */}
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

        {/* Market Depth */}
        <div className="col-span-8">
          <MarketDepthChart />
        </div>

        {/* Volatility Surface */}
        <div className="col-span-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-gray-400 text-sm font-medium mb-4">Volatility Surface</h3>
            <VolatilitySurfaceChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;