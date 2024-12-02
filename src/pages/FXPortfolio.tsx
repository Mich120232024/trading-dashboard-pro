import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { ArrowUp, ArrowDown, DollarSign, Percent, AlertTriangle, TrendingUp } from 'lucide-react';

interface Position {
  pair: string;
  position: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
  risk: number;
}

const FXPortfolio: React.FC = () => {
  const [positions] = useState<Position[]>([
    {
      pair: 'EUR/USD',
      position: 1000000,
      entryPrice: 1.0950,
      currentPrice: 1.1050,
      pnl: 1000,
      pnlPercent: 1.5,
      risk: 3.2
    },
    {
      pair: 'GBP/USD',
      position: 750000,
      entryPrice: 1.2650,
      currentPrice: 1.2720,
      pnl: 525,
      pnlPercent: 0.8,
      risk: 2.8
    },
    {
      pair: 'USD/JPY',
      position: 1200000,
      entryPrice: 147.50,
      currentPrice: 147.80,
      pnl: -360,
      pnlPercent: -0.3,
      risk: 4.1
    }
  ]);

  const performanceData = [
    { date: '2024-01-01', value: 100000 },
    { date: '2024-01-02', value: 102000 },
    { date: '2024-01-03', value: 101500 },
    { date: '2024-01-04', value: 103500 },
    { date: '2024-01-05', value: 105000 },
    { date: '2024-01-06', value: 104200 },
    { date: '2024-01-07', value: 106000 }
  ];

  const riskData = [
    { name: 'VaR', value: 12500 },
    { name: 'Expected Shortfall', value: 15000 },
    { name: 'Stress Test Loss', value: 25000 }
  ];

  const allocationData = [
    { name: 'EUR/USD', value: 35 },
    { name: 'GBP/USD', value: 25 },
    { name: 'USD/JPY', value: 40 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="p-6 space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total P&L</p>
                <h3 className="text-2xl font-bold text-green-500">$1,165</h3>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Portfolio Return</p>
                <h3 className="text-2xl font-bold text-blue-500">+2.3%</h3>
              </div>
              <Percent className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Risk (VaR)</p>
                <h3 className="text-2xl font-bold text-yellow-500">$12,500</h3>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Sharpe Ratio</p>
                <h3 className="text-2xl font-bold text-purple-500">1.85</h3>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#8884d8" 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Breakdown */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Positions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left">Pair</th>
                      <th className="px-4 py-2 text-right">Position</th>
                      <th className="px-4 py-2 text-right">Entry</th>
                      <th className="px-4 py-2 text-right">Current</th>
                      <th className="px-4 py-2 text-right">P&L</th>
                      <th className="px-4 py-2 text-right">P&L %</th>
                      <th className="px-4 py-2 text-right">Risk</th>
                    </tr>
                  </thead>
                  <tbody>
                    {positions.map((pos) => (
                      <tr key={pos.pair} className="border-b">
                        <td className="px-4 py-2">{pos.pair}</td>
                        <td className="px-4 py-2 text-right">{pos.position.toLocaleString()}</td>
                        <td className="px-4 py-2 text-right">{pos.entryPrice.toFixed(4)}</td>
                        <td className="px-4 py-2 text-right">{pos.currentPrice.toFixed(4)}</td>
                        <td className="px-4 py-2 text-right">
                          <span className={pos.pnl >= 0 ? 'text-green-500' : 'text-red-500'}>
                            ${Math.abs(pos.pnl).toLocaleString()}
                          </span>
                        </td>
                        <td className="px-4 py-2 text-right">
                          <span className={pos.pnlPercent >= 0 ? 'text-green-500' : 'text-red-500'}>
                            {pos.pnlPercent > 0 ? '+' : ''}{pos.pnlPercent.toFixed(2)}%
                          </span>
                        </td>
                        <td className="px-4 py-2 text-right">
                          <span className={pos.risk < 3 ? 'text-green-500' : pos.risk < 4 ? 'text-yellow-500' : 'text-red-500'}>
                            {pos.risk.toFixed(1)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Portfolio Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FXPortfolio;