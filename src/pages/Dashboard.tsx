import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard: React.FC = () => {
  // Mock data
  const performanceData = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (30 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    value: Math.random() * 100 + 50,
    benchmark: Math.random() * 80 + 40
  }));

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm font-medium">Portfolio Value</h3>
          <p className="text-white text-2xl font-bold mt-2">$1,234,567</p>
          <span className="text-green-500 text-sm">+2.5% today</span>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm font-medium">Daily P&L</h3>
          <p className="text-white text-2xl font-bold mt-2">+$12,345</p>
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
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-white mb-4">Performance</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
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
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-white mb-4">Asset Allocation</h3>
          <div className="h-[300px]">
            {/* Add Asset Allocation chart here */}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-white mb-4">Recent Activity</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">2 mins ago</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Trade</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">Bought AAPL</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">$10,000</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;