import React from "react";
import VolatilitySurfaceChart from "../components/Dashboard/Charts/VolatilitySurfaceChart";
import PerformanceChart from "../components/Dashboard/Charts/PerformanceChart";
import DrawdownChart from "../components/Dashboard/Charts/DrawdownChart";
import TradeList from "../components/Dashboard/TradeList";

// Sample data
const samplePerformanceData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
  value: Math.round(Math.random() * 1000),
  benchmark: Math.round(Math.random() * 900),
}));

const sampleDrawdownData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
  value: Math.round(Math.random() * 200 - 100),
}));

const sampleTrades = Array.from({ length: 20 }, (_, i) => ({
  id: `TR-${i + 1}`,
  type: ["Market", "Limit", "Stop"][i % 3],
  status: ["Active", "Completed", "Pending"][i % 3],
  amount: Math.round(Math.random() * 10000),
  date: new Date().toISOString().split("T")[0],
}));

const Dashboard: React.FC = () => {
  return (
    <div className="grid grid-cols-12 gap-6 p-6">
      {/* Top Metrics - 4 per row */}
      <div className="col-span-3 bg-gray-800 p-6 rounded-lg">
        <h3 className="text-gray-400 text-sm">Portfolio Value</h3>
        <p className="text-white text-2xl font-bold mt-2">$1,234,567</p>
        <span className="text-green-500">+2.5%</span>
      </div>
      <div className="col-span-3 bg-gray-800 p-6 rounded-lg">
        <h3 className="text-gray-400 text-sm">Daily P&L</h3>
        <p className="text-white text-2xl font-bold mt-2">$12,345</p>
        <span className="text-green-500">+1.2%</span>
      </div>
      <div className="col-span-3 bg-gray-800 p-6 rounded-lg">
        <h3 className="text-gray-400 text-sm">Active Trades</h3>
        <p className="text-white text-2xl font-bold mt-2">23</p>
        <span className="text-yellow-500">5 pending</span>
      </div>
      <div className="col-span-3 bg-gray-800 p-6 rounded-lg">
        <h3 className="text-gray-400 text-sm">Win Rate</h3>
        <p className="text-white text-2xl font-bold mt-2">68%</p>
        <span className="text-blue-500">+3% MoM</span>
      </div>

      {/* Charts - 2 per row */}
      <div className="col-span-6 bg-gray-800 p-6 rounded-lg">
        <div className="mb-4">
          <h3 className="text-gray-400 text-sm">Performance Analysis</h3>
        </div>
        <PerformanceChart data={samplePerformanceData} />
      </div>
      <div className="col-span-6 bg-gray-800 p-6 rounded-lg">
        <div className="mb-4">
          <h3 className="text-gray-400 text-sm">Drawdown Analysis</h3>
        </div>
        <DrawdownChart data={sampleDrawdownData} />
      </div>

      {/* Volatility Surface - full width */}
      <div className="col-span-12 bg-gray-800 p-6 rounded-lg">
        <VolatilitySurfaceChart />
      </div>

      {/* Trade List */}
      <div className="col-span-12 bg-gray-800 p-6 rounded-lg">
        <TradeList trades={sampleTrades} onTradeSelect={() => {}} />
      </div>
    </div>
  );
};

export default Dashboard;
