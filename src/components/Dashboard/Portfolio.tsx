import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Position {
  symbol: string;
  quantity: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  allocation: number;
}

const Portfolio: React.FC = () => {
  const [positions] = useState<Position[]>([
    {
      symbol: "AAPL",
      quantity: 100,
      entryPrice: 150,
      currentPrice: 175,
      pnl: 2500,
      allocation: 25,
    },
    // Add more positions...
  ]);

  const performanceData = [
    { date: "2024-01", value: 100000 },
    { date: "2024-02", value: 105000 },
    { date: "2024-03", value: 108000 },
    { date: "2024-04", value: 112000 },
    { date: "2024-05", value: 109000 },
    { date: "2024-06", value: 115000 },
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
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
          <CardTitle>Positions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left">Symbol</th>
                  <th className="px-4 py-2 text-right">Quantity</th>
                  <th className="px-4 py-2 text-right">Entry Price</th>
                  <th className="px-4 py-2 text-right">Current Price</th>
                  <th className="px-4 py-2 text-right">P&L</th>
                  <th className="px-4 py-2 text-right">Allocation %</th>
                </tr>
              </thead>
              <tbody>
                {positions.map((position) => (
                  <tr key={position.symbol} className="border-b">
                    <td className="px-4 py-2">{position.symbol}</td>
                    <td className="px-4 py-2 text-right">
                      {position.quantity}
                    </td>
                    <td className="px-4 py-2 text-right">
                      ${position.entryPrice.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-right">
                      ${position.currentPrice.toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-right">
                      <span
                        className={
                          position.pnl >= 0 ? "text-green-500" : "text-red-500"
                        }
                      >
                        ${position.pnl.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-right">
                      {position.allocation}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Portfolio;
