import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Activity,
  DollarSign,
  Percent,
  RefreshCcw,
  CandlestickChart,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const Dashboard: React.FC = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshData = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const stats = [
    {
      title: "Portfolio Value",
      value: "$1,234,567",
      change: "+2.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Daily P&L",
      value: "$12,345",
      change: "+1.2%",
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: "Active Trades",
      value: "23",
      change: "5 pending",
      trend: "neutral",
      icon: Activity,
    },
    {
      title: "Win Rate",
      value: "68%",
      change: "+3% MoM",
      trend: "up",
      icon: Percent,
    },
  ];

  const chartData = [
    { time: "09:00", value: 1.095 },
    { time: "10:00", value: 1.0965 },
    { time: "11:00", value: 1.0955 },
    { time: "12:00", value: 1.098 },
    { time: "13:00", value: 1.099 },
    { time: "14:00", value: 1.097 },
    { time: "15:00", value: 1.1 },
  ];

  const volumeData = [
    { time: "09:00", buy: 500000, sell: 450000 },
    { time: "10:00", buy: 600000, sell: 550000 },
    { time: "11:00", buy: 480000, sell: 520000 },
    { time: "12:00", buy: 700000, sell: 650000 },
    { time: "13:00", buy: 550000, sell: 500000 },
    { time: "14:00", buy: 600000, sell: 580000 },
    { time: "15:00", buy: 650000, sell: 620000 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold gradient-text">Dashboard</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={refreshData}
          className="btn-primary flex items-center gap-2"
          disabled={isRefreshing}
        >
          <RefreshCcw
            className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
          />
          Refresh Data
        </motion.button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="glass-morphism-hover">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-400">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <div className="flex items-center mt-1">
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                      ) : stat.trend === "down" ? (
                        <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                      ) : null}
                      <span
                        className={`text-sm ${
                          stat.trend === "up"
                            ? "text-green-500"
                            : stat.trend === "down"
                            ? "text-red-500"
                            : "text-gray-400"
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-700/50 rounded-lg">
                    <stat.icon className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-morphism-hover">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>EUR/USD Price Action</CardTitle>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 rounded-md bg-gray-700/50 hover:bg-gray-700 transition-colors">
                    1H
                  </button>
                  <button className="px-3 py-1 rounded-md bg-blue-500/20 text-blue-500">
                    1D
                  </button>
                  <button className="px-3 py-1 rounded-md bg-gray-700/50 hover:bg-gray-700 transition-colors">
                    1W
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="time" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-morphism-hover">
            <CardHeader>
              <CardTitle>Volume Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={volumeData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="time" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1F2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar
                      dataKey="buy"
                      name="Buy Volume"
                      fill="#10B981"
                      stackId="a"
                    />
                    <Bar
                      dataKey="sell"
                      name="Sell Volume"
                      fill="#EF4444"
                      stackId="a"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Market Overview */}
          <Card className="glass-morphism-hover">
            <CardHeader>
              <CardTitle>Market Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { pair: "EUR/USD", price: "1.1000", change: "+0.15%" },
                  { pair: "GBP/USD", price: "1.2650", change: "-0.08%" },
                  { pair: "USD/JPY", price: "147.85", change: "+0.25%" },
                ].map((item) => (
                  <div
                    key={item.pair}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors"
                  >
                    <div>
                      <div className="font-medium">{item.pair}</div>
                      <div className="text-sm text-gray-400">{item.price}</div>
                    </div>
                    <div
                      className={
                        item.change.startsWith("+")
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {item.change}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Active Orders */}
          <Card className="glass-morphism-hover">
            <CardHeader>
              <CardTitle>Active Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: "Buy Limit", price: "1.0950", size: "100,000" },
                  { type: "Sell Stop", price: "1.1050", size: "75,000" },
                ].map((order, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{order.type}</span>
                      <span className="text-sm text-gray-400">
                        {order.size}
                      </span>
                    </div>
                    <div className="text-lg font-mono">{order.price}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="glass-morphism-hover">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 rounded-lg bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 transition-colors text-center">
                  <CandlestickChart className="w-6 h-6 mx-auto mb-2" />
                  New Trade
                </button>
                <button className="p-4 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors text-center">
                  <BarChart3 className="w-6 h-6 mx-auto mb-2" />
                  Analysis
                </button>
                <button className="p-4 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors text-center">
                  <PieChart className="w-6 h-6 mx-auto mb-2" />
                  Portfolio
                </button>
                <button className="p-4 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors text-center">
                  <Activity className="w-6 h-6 mx-auto mb-2" />
                  Reports
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
