import React, { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import Portfolio from "./FXPortfolio"; // Ensure the correct path

const Analytics: React.FC = () => {
  const [currentView, setCurrentView] = useState("portfolio");
  const performanceData = [
    { date: "2024-01", value: 1000 },
    { date: "2024-02", value: 1100 },
    { date: "2024-03", value: 1050 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <select
          className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setCurrentView(e.target.value)}
          value={currentView}
        >
          <option value="portfolio">Portfolio Overview</option>
          <option value="performance">Performance Analytics</option>
          <option value="risk">Risk Analysis</option>
        </select>
      </div>

      {currentView === "performance" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-gray-400 text-sm font-medium">Total Return</h3>
            <p className="text-white text-2xl font-bold mt-2">+23.45%</p>
            <span className="text-green-500 text-sm">+2.5% vs benchmark</span>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-gray-400 text-sm font-medium">Alpha</h3>
            <p className="text-white text-2xl font-bold mt-2">1.82</p>
            <span className="text-blue-500 text-sm">Above market</span>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-gray-400 text-sm font-medium">Sharpe Ratio</h3>
            <p className="text-white text-2xl font-bold mt-2">2.1</p>
            <span className="text-green-500 text-sm">
              Good risk-adjusted return
            </span>
          </div>
        </div>
      )}

      {currentView === "risk" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-gray-400 text-sm font-medium">Beta</h3>
            <p className="text-white text-2xl font-bold mt-2">0.85</p>
            <span className="text-blue-500 text-sm">vs S&P 500</span>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-gray-400 text-sm font-medium">Value at Risk</h3>
            <p className="text-white text-2xl font-bold mt-2">$12,345</p>
            <span className="text-yellow-500 text-sm">95% confidence</span>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-gray-400 text-sm font-medium">Max Drawdown</h3>
            <p className="text-white text-2xl font-bold mt-2">-15.4%</p>
            <span className="text-red-500 text-sm">Historical max</span>
          </div>
        </div>
      )}

      {currentView === "portfolio" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Portfolio />
        </div>
      )}

      <div className="bg-gray-800 rounded-lg p-6">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            {currentView === "performance" ? (
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3B82F6"
                  strokeWidth={2}
                />
              </LineChart>
            ) : (
              <div className="text-white">
                Select a view to display the chart
              </div>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
