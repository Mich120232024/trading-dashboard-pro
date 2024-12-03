import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Shield, AlertTriangle, TrendingUp } from "lucide-react";
import { formatCurrency, formatPercentage } from "@/lib/utils/formatters";

interface CollateralItem {
  type: string;
  allocated: number;
  required: number;
  excess: number;
  rating?: string;
  haircut?: number;
}

interface CollateralManagementProps {
  data: CollateralItem[];
}

const COLORS = ["#3B82F6", "#22C55E", "#EF4444", "#F59E0B"];

const CollateralManagement: React.FC<CollateralManagementProps> = ({
  data,
}) => {
  const totalAllocated = data.reduce((sum, item) => sum + item.allocated, 0);
  const totalRequired = data.reduce((sum, item) => sum + item.required, 0);
  const totalExcess = data.reduce((sum, item) => sum + item.excess, 0);

  const pieData = data.map((item) => ({
    name: item.type,
    value: item.allocated,
  }));

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-morphism-hover">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Total Allocated</p>
                <p className="text-2xl font-bold mt-1">
                  {formatCurrency(totalAllocated)}
                </p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Shield className="w-5 h-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism-hover">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Required Collateral</p>
                <p className="text-2xl font-bold mt-1">
                  {formatCurrency(totalRequired)}
                </p>
              </div>
              <div className="p-3 bg-yellow-500/20 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism-hover">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-400">Excess Collateral</p>
                <p className="text-2xl font-bold mt-1">
                  {formatCurrency(totalExcess)}
                </p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-morphism-hover">
          <CardHeader>
            <CardTitle>Collateral Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="type" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => formatCurrency(Number(value))}
                  />
                  <Legend />
                  <Bar dataKey="allocated" name="Allocated" fill="#3B82F6" />
                  <Bar dataKey="required" name="Required" fill="#F59E0B" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism-hover">
          <CardHeader>
            <CardTitle>Collateral Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) =>
                      `${name} (${formatPercentage(
                        (value / totalAllocated) * 100
                      )})`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => formatCurrency(Number(value))}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed List */}
      <Card className="glass-morphism-hover">
        <CardHeader>
          <CardTitle>Collateral Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="pb-3 text-gray-400">Type</th>
                  <th className="pb-3 text-right text-gray-400">Allocated</th>
                  <th className="pb-3 text-right text-gray-400">Required</th>
                  <th className="pb-3 text-right text-gray-400">Excess</th>
                  <th className="pb-3 text-right text-gray-400">Rating</th>
                  <th className="pb-3 text-right text-gray-400">Haircut</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.type} className="border-t border-gray-800">
                    <td className="py-3">{item.type}</td>
                    <td className="py-3 text-right font-mono">
                      {formatCurrency(item.allocated)}
                    </td>
                    <td className="py-3 text-right font-mono">
                      {formatCurrency(item.required)}
                    </td>
                    <td className="py-3 text-right font-mono">
                      <span
                        className={
                          item.excess >= 0 ? "text-green-500" : "text-red-500"
                        }
                      >
                        {formatCurrency(item.excess)}
                      </span>
                    </td>
                    <td className="py-3 text-right">{item.rating || "-"}</td>
                    <td className="py-3 text-right">
                      {item.haircut ? formatPercentage(item.haircut) : "-"}
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

export default CollateralManagement;
