import React, { useState, useCallback } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Brush,
  ReferenceLine,
} from "recharts";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";

interface TimeSeriesProps {
  dataset: string;
  timeRange: string;
  mode: "basic" | "advanced";
}

interface DataPoint {
  timestamp: number;
  price: number;
  volume: number;
  ma20?: number;
  ma50?: number;
  bollUpper?: number;
  bollLower?: number;
  prediction?: number;
}

const generateMockData = (timeRange: string): DataPoint[] => {
  const now = Date.now();
  const points = timeRange === "1D" ? 288 : timeRange === "1W" ? 168 : 30;
  const interval =
    timeRange === "1D"
      ? 5 * 60 * 1000
      : timeRange === "1W"
      ? 60 * 60 * 1000
      : 24 * 60 * 60 * 1000;

  return Array.from({ length: points }, (_, i) => {
    const timestamp = now - (points - i) * interval;
    const basePrice = 1.1;
    const noise = Math.sin(i * 0.1) * 0.02 + Math.random() * 0.01;
    const price = basePrice + noise;

    return {
      timestamp,
      price,
      volume: Math.random() * 1000 + 500,
      ma20: basePrice + Math.sin(i * 0.1) * 0.015,
      ma50: basePrice + Math.sin(i * 0.05) * 0.01,
      bollUpper: price + 0.005,
      bollLower: price - 0.005,
      prediction:
        i > points - 20 ? price + Math.sin(i * 0.2) * 0.01 : undefined,
    };
  });
};

const TimeSeries: React.FC<TimeSeriesProps> = ({ dataset, timeRange }) => {
  const [indicators, setIndicators] = useState({
    ma20: true,
    ma50: true,
    bollinger: true,
    volume: true,
    predictions: true,
  });

  const [annotations, setAnnotations] = useState<
    { x: number; label: string }[]
  >([]);

  const data = generateMockData(timeRange);

  const handleClick = useCallback((e: any) => {
    if (!e) return;
    const { activeLabel } = e;
    if (activeLabel) {
      setAnnotations((prev) => [
        ...prev,
        { x: activeLabel, label: "Key Point" },
      ]);
    }
  }, []);

  return (
    <div className="h-[600px] bg-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold">{dataset}</h2>
          <p className="text-sm text-gray-400">{timeRange} Chart</p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Indicator toggles */}
          <div className="flex space-x-2">
            {Object.entries(indicators).map(([key, value]) => (
              <button
                key={key}
                onClick={() =>
                  setIndicators((prev) => ({ ...prev, [key]: !value }))
                }
                className={`px-3 py-1 rounded-full text-sm ${
                  value ? "bg-blue-600" : "bg-gray-700"
                }`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>

          <button className="p-2 hover:bg-gray-700 rounded-lg">
            <Cog6ToothIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} onClick={handleClick}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="timestamp"
              domain={["auto", "auto"]}
              tickFormatter={(timestamp) =>
                new Date(timestamp).toLocaleTimeString()
              }
              stroke="#9CA3AF"
            />
            <YAxis
              domain={["dataMin - 0.01", "dataMax + 0.01"]}
              stroke="#9CA3AF"
              tickFormatter={(value) => value.toFixed(4)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1F2937",
                border: "1px solid #374151",
                borderRadius: "0.5rem",
              }}
              formatter={(value: any) => [(+value).toFixed(4)]}
              labelFormatter={(timestamp) =>
                new Date(timestamp).toLocaleString()
              }
            />

            {/* Main price line */}
            <Line
              type="monotone"
              dataKey="price"
              stroke="#10B981"
              dot={false}
              strokeWidth={2}
            />

            {/* Moving averages */}
            {indicators.ma20 && (
              <Line
                type="monotone"
                dataKey="ma20"
                stroke="#60A5FA"
                dot={false}
                strokeDasharray="5 5"
              />
            )}
            {indicators.ma50 && (
              <Line
                type="monotone"
                dataKey="ma50"
                stroke="#F59E0B"
                dot={false}
                strokeDasharray="5 5"
              />
            )}

            {/* Bollinger Bands */}
            {indicators.bollinger && (
              <>
                <Line
                  type="monotone"
                  dataKey="bollUpper"
                  stroke="#6B7280"
                  dot={false}
                  strokeDasharray="3 3"
                />
                <Line
                  type="monotone"
                  dataKey="bollLower"
                  stroke="#6B7280"
                  dot={false}
                  strokeDasharray="3 3"
                />
              </>
            )}

            {/* Predictions */}
            {indicators.predictions && (
              <Line
                type="monotone"
                dataKey="prediction"
                stroke="#8B5CF6"
                strokeDasharray="5 5"
                dot={false}
              />
            )}

            {/* Annotations */}
            {annotations.map((annotation, i) => (
              <ReferenceLine
                key={i}
                x={annotation.x}
                stroke="#EF4444"
                label={{ value: annotation.label, position: "top" }}
              />
            ))}

            {/* Selected area */}
            <Brush
              dataKey="timestamp"
              height={30}
              stroke="#4B5563"
              fill="#1F2937"
              tickFormatter={(timestamp) =>
                new Date(timestamp).toLocaleDateString()
              }
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TimeSeries;
