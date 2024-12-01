import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface MarketDepthProps {
  data?: {
    price: number;
    bids: number;
    asks: number;
  }[];
}

const MarketDepthChart: React.FC<MarketDepthProps> = ({ data = generateMockData() }) => {
  return (
    <div className="h-[300px] bg-gray-800 rounded-lg p-4">
      <h3 className="text-sm font-medium text-gray-300 mb-4">Market Depth</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="price" 
            stroke="#9CA3AF" 
            tickFormatter={(value) => value.toFixed(4)}
          />
          <YAxis 
            stroke="#9CA3AF"
            tickFormatter={(value) => `${value}K`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '4px'
            }}
            formatter={(value: number) => [`${value}K`, 'Volume']}
            labelFormatter={(label) => `Price: ${label.toFixed(4)}`}
          />
          <Area
            type="monotone"
            dataKey="bids"
            stackId="1"
            stroke="#10B981"
            fill="#10B98144"
          />
          <Area
            type="monotone"
            dataKey="asks"
            stackId="2"
            stroke="#EF4444"
            fill="#EF444444"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// Generate mock market depth data
function generateMockData() {
  const basePrice = 1.1000;
  const data = [];
  
  for (let i = -20; i <= 20; i++) {
    const price = basePrice + (i * 0.0001);
    const distance = Math.abs(i);
    const bidVolume = i <= 0 ? Math.max(0, 100 - (distance * 4)) : 0;
    const askVolume = i >= 0 ? Math.max(0, 100 - (distance * 4)) : 0;
    
    data.push({
      price,
      bids: bidVolume / 10,
      asks: askVolume / 10
    });
  }
  
  return data;
}

export default MarketDepthChart;