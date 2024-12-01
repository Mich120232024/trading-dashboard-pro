import React from 'react';
import PerformanceChart from '../components/Dashboard/Charts/PerformanceChart';
import DrawdownChart from '../components/Dashboard/Charts/DrawdownChart';
import VolatilitySurfaceChart from '../components/Dashboard/Charts/VolatilitySurfaceChart';
import TradeList from '../components/Dashboard/TradeList';

const Dashboard: React.FC = () => {
  // Sample data
  const performanceData = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
    value: Math.round(Math.random() * 1000),
    benchmark: Math.round(Math.random() * 900),
  }));

  const drawdownData = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
    value: Math.round(Math.random() * 200 - 100),
  }));

  const trades = Array.from({ length: 20 }, (_, i) => ({
    id: `TR-${i + 1}`,
    type: ['Market', 'Limit', 'Stop'][i % 3],
    status: ['Active', 'Completed', 'Pending'][i % 3],
    amount: Math.round(Math.random() * 10000),
    date: new Date().toISOString().split('T')[0],
  }));

  return (
    <div className="grid grid-cols-12 gap-6 p-6">
      {/* Metrics - 4 per row */}
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

      {/* Analysis Charts - 2 per row */}
      <div className="col-span-6 bg-gray-800 p-6 rounded-lg">
        <h3 className="text-gray-400 text-sm mb-4">Performance Analysis</h3>
        <PerformanceChart data={performanceData} />
      </div>
      <div className="col-span-6 bg-gray-800 p-6 rounded-lg">
        <h3 className="text-gray-400 text-sm mb-4">Drawdown Analysis</h3>
        <DrawdownChart data={drawdownData} />
      </div>

      {/* Volatility Surface - Full width */}
      <div className="col-span-12 bg-gray-800 p-6 rounded-lg">
        <h3 className="text-gray-400 text-sm mb-4">Volatility Surface</h3>
        <VolatilitySurfaceChart />
      </div>

      {/* Trade List - Full width */}
      <div className="col-span-12 bg-gray-800 p-6 rounded-lg">
        <h3 className="text-gray-400 text-sm mb-4">Recent Trades</h3>
        <TradeList trades={trades} onTradeSelect={() => {}} />
      </div>
    </div>
  );
};

export default Dashboard;