import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface Order {
  id: string;
  timestamp: string;
  symbol: string;
  type: "market" | "limit" | "stop";
  side: "buy" | "sell";
  quantity: number;
  price: number;
  status: "filled" | "partial" | "canceled" | "rejected";
  notes?: string;
}

const OrderHistory: React.FC = () => {
  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const orders: Order[] = [
    {
      id: "O1",
      timestamp: "2024-03-01T10:30:00Z",
      symbol: "EUR/USD",
      type: "market",
      side: "buy",
      quantity: 100000,
      price: 1.099,
      status: "filled",
      notes: "Regular rebalance",
    },
    {
      id: "O2",
      timestamp: "2024-03-01T11:15:00Z",
      symbol: "GBP/USD",
      type: "limit",
      side: "sell",
      quantity: 50000,
      price: 1.265,
      status: "partial",
      notes: "Position reduction",
    },
    {
      id: "O3",
      timestamp: "2024-03-01T14:20:00Z",
      symbol: "USD/JPY",
      type: "stop",
      side: "sell",
      quantity: 75000,
      price: 147.85,
      status: "canceled",
      notes: "Risk management",
    },
    {
      id: "O4",
      timestamp: "2024-03-01T15:45:00Z",
      symbol: "EUR/USD",
      type: "market",
      side: "buy",
      quantity: 150000,
      price: 1.1005,
      status: "filled",
      notes: "Opportunity trade",
    },
  ];

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "filled":
        return "text-green-500";
      case "partial":
        return "text-yellow-500";
      case "canceled":
        return "text-gray-500";
      case "rejected":
        return "text-red-500";
      default:
        return "text-gray-400";
    }
  };

  const formatDateTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const filteredOrders = orders.filter((order) => {
    if (statusFilter !== "all" && order.status !== statusFilter) return false;
    if (dateFilter === "today") {
      const today = new Date().toDateString();
      const orderDate = new Date(order.timestamp).toDateString();
      return today === orderDate;
    }
    return true;
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Order History</CardTitle>
          <div className="flex space-x-4">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="bg-gray-700 text-white px-3 py-1 rounded-md text-sm"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-700 text-white px-3 py-1 rounded-md text-sm"
            >
              <option value="all">All Status</option>
              <option value="filled">Filled</option>
              <option value="partial">Partial</option>
              <option value="canceled">Canceled</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left">Time</th>
                <th className="px-4 py-2 text-left">Symbol</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Side</th>
                <th className="px-4 py-2 text-right">Quantity</th>
                <th className="px-4 py-2 text-right">Price</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Notes</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50/5">
                  <td className="px-4 py-2">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {formatDateTime(order.timestamp)}
                    </div>
                  </td>
                  <td className="px-4 py-2 font-medium">{order.symbol}</td>
                  <td className="px-4 py-2">
                    <span className="px-2 py-1 bg-gray-700 rounded-md text-sm">
                      {order.type}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center">
                      {order.side === "buy" ? (
                        <ArrowUpRight className="w-4 h-4 mr-1 text-green-500" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 mr-1 text-red-500" />
                      )}
                      {order.side}
                    </div>
                  </td>
                  <td className="px-4 py-2 text-right font-mono">
                    {order.quantity.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-right font-mono">
                    {order.price.toFixed(4)}
                  </td>
                  <td className="px-4 py-2">
                    <span className={`${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-gray-400">{order.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderHistory;
