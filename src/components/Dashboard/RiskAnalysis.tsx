import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const RiskAnalysis: React.FC = () => {
  const varData = [
    { date: 'Mon', var: 15200, cvar: 18500 },
    { date: 'Tue', var: 16100, cvar: 19200 },
    { date: 'Wed', var: 14800, cvar: 17900 },
    { date: 'Thu', var: 15500, cvar: 18800 },
    { date: 'Fri', var: 16300, cvar: 19500 }
  ];

  const exposureData = [
    { category: 'Equities', value: 450000 },
    { category: 'Fixed Income', value: 320000 },
    { category: 'FX', value: 280000 },
    { category: 'Commodities', value: 150000 },
    { category: 'Derivatives', value: 200000 }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Risk Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-gray-800 rounded-lg">
              <h4 className="text-sm text-gray-400 mb-2">Value at Risk (95%)</h4>
              <p className="text-2xl font-bold">$16,300</p>
              <span className="text-red-500 text-sm">+5.2% vs prev day</span>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg">
              <h4 className="text-sm text-gray-400 mb-2">Portfolio Beta</h4>
              <p className="text-2xl font-bold">1.12</p>
              <span className="text-yellow-500 text-sm">High correlation</span>
            </div>
            <div className="p-4 bg-gray-800 rounded-lg">
              <h4 className="text-sm text-gray-400 mb-2">Sharpe Ratio</h4>
              <p className="text-2xl font-bold">1.85</p>
              <span className="text-green-500 text-sm">Good risk-adjusted return</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* VaR Chart */}
            <div className="h-64">
              <h4 className="text-sm font-medium mb-4">VaR & CVaR Trend</h4>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={varData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="var" 
                    name="VaR" 
                    stroke="#8884d8" 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="cvar" 
                    name="CVaR" 
                    stroke="#82ca9d" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Exposure Distribution */}
            <div className="h-64">
              <h4 className="text-sm font-medium mb-4">Exposure Distribution</h4>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={exposureData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar 
                    dataKey="value" 
                    name="Exposure" 
                    fill="#8884d8" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Risk Factors Table */}
          <div className="mt-6">
            <h4 className="text-sm font-medium mb-4">Key Risk Factors</h4>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left">Factor</th>
                  <th className="px-4 py-2 text-right">Sensitivity</th>
                  <th className="px-4 py-2 text-right">Contribution</th>
                  <th className="px-4 py-2 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-2">Interest Rate Risk</td>
                  <td className="px-4 py-2 text-right">0.85</td>
                  <td className="px-4 py-2 text-right">32%</td>
                  <td className="px-4 py-2 text-right">
                    <span className="text-yellow-500">Moderate</span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2">FX Risk</td>
                  <td className="px-4 py-2 text-right">1.24</td>
                  <td className="px-4 py-2 text-right">28%</td>
                  <td className="px-4 py-2 text-right">
                    <span className="text-red-500">High</span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2">Credit Risk</td>
                  <td className="px-4 py-2 text-right">0.45</td>
                  <td className="px-4 py-2 text-right">15%</td>
                  <td className="px-4 py-2 text-right">
                    <span className="text-green-500">Low</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAnalysis;