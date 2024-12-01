import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const Analytics: React.FC = () => {
  const location = useLocation();
  const currentView = location.pathname.split('/').pop() || 'performance';

  // Mock data - replace with real data
  const performanceData = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    value: Math.random() * 100 + 50,
    benchmark: Math.random() * 80 + 40
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white capitalize">
          {currentView === 'performance' && 'Performance Analytics'}
          {currentView === 'risk' && 'Risk Analysis'}
          {currentView === 'portfolio' && 'Portfolio Overview'}
        </h1>

        <select className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
          <option>Year to Date</option>
          <option>All Time</option>
        </select>
      </div>

      {currentView === 'performance' && (
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
            <span className="text-green-500 text-sm">Good risk-adjusted return</span>
          </div>
        </div>
      )}

      {currentView === 'risk' && (
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

      {currentView === 'portfolio' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-gray-400 text-sm font-medium">Total Value</h3>
            <p className="text-white text-2xl font-bold mt-2">$1,234,567</p>
            <span className="text-green-500 text-sm">+$45,678 today</span>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-gray-400 text-sm font-medium">Cash Balance</h3>
            <p className="text-white text-2xl font-bold mt-2">$123,456</p>
            <span className="text-blue-500 text-sm">10% of portfolio</span>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-gray-400 text-sm font-medium">Positions</h3>
            <p className="text-white text-2xl font-bold mt-2">15</p>
            <span className="text-gray-400 text-sm">Active positions</span>
          </div>
        </div>
      )}

      <div className="bg-gray-800 rounded-lg p-6">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            {currentView === 'performance' ? (
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="benchmark" 
                  stroke="#60A5FA" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            ) : currentView === 'risk' ? (
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#EF4444"
                  fill="#EF444433"
                />
              </AreaChart>
            ) : (
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default Analytics;