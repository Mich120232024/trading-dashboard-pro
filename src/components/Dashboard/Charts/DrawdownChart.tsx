import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DrawdownData {
  date: string;
  value: number;
}

interface DrawdownChartProps {
  data: DrawdownData[];
}

const DrawdownChart: React.FC<DrawdownChartProps> = ({ data }) => {
  return (
    <div className="h-[400px] bg-gray-800 p-4 rounded-lg">
      <h3 className="text-white mb-4">Drawdown Analysis</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="date" 
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#9CA3AF"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '4px'
            }}
          />
          <defs>
            <linearGradient id="drawdownGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60A5FA" stopOpacity={0.1} />
              <stop offset="50%" stopColor="#60A5FA" stopOpacity={0.05} />
              <stop offset="100%" stopColor="#EF4444" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke={(d: any) => d >= 0 ? '#60A5FA' : '#EF4444'}
            fill="url(#drawdownGradient)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default React.memo(DrawdownChart);