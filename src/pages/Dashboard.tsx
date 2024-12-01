import React, { useState } from "react";

interface Trade {
  id: string;
  type: string;
  status: string;
  amount: number;
  date: string;
}
import TradeList from "../components/Dashboard/TradeList";
import PerformanceChart from "../components/Dashboard/Charts/PerformanceChart";
import DrawdownChart from "../components/Dashboard/Charts/DrawdownChart";

// Sample data
const sampleTrades = Array.from({ length: 20 }, (_, i) => ({
  id: `TR-${i + 1}`,
  type: ["Market", "Limit", "Stop"][i % 3],
  status: ["Active", "Completed", "Pending"][i % 3],
  amount: Math.round(Math.random() * 10000),
  date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
}));

const samplePerformanceData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
  value: Math.round(Math.random() * 1000),
  benchmark: Math.round(Math.random() * 900),
}));

const sampleDrawdownData = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
  value: Math.round(Math.random() * 200 - 100),
}));

const Dashboard: React.FC = () => {
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);

  return (
    <div className="p-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm font-medium">Portfolio Value</h3>
          <p className="text-white text-2xl font-bold mt-2">$1,234,567</p>
          <span className="text-green-500 text-sm">+2.5%</span>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm font-medium">Daily P&L</h3>
          <p className="text-white text-2xl font-bold mt-2">$12,345</p>
          <span className="text-green-500 text-sm">+1.2%</span>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm font-medium">Active Trades</h3>
          <p className="text-white text-2xl font-bold mt-2">23</p>
          <span className="text-blue-500 text-sm">5 pending</span>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart data={samplePerformanceData} />
        <DrawdownChart data={sampleDrawdownData} />
      </div>

      {/* Trade List */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-white text-lg font-medium mb-4">Recent Trades</h2>
        <TradeList trades={sampleTrades} onTradeSelect={setSelectedTrade} />
      </div>
      {selectedTrade && (
        <div className="bg-gray-800 rounded-lg p-6 mt-6">
          <h2 className="text-white text-lg font-medium mb-4">
            Selected Trade
          </h2>
          <p className="text-white">ID: {selectedTrade.id}</p>
          <p className="text-white">Type: {selectedTrade.type}</p>
          <p className="text-white">Status: {selectedTrade.status}</p>
          <p className="text-white">Amount: ${selectedTrade.amount}</p>
          <p className="text-white">Date: {selectedTrade.date}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
