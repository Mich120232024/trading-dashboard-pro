import React from "react";

interface AnalyticsDashboardProps {
  dataset: string;
  timeRange: string;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = () => {
  // Mock analytics data
  const metrics = [
    {
      label: "Trend Direction",
      value: "Bullish",
      change: "+2.3%",
      isPositive: true,
      details: "Strong upward momentum",
    },
    {
      label: "Volatility",
      value: "12.5%",
      change: "-1.2%",
      isPositive: true,
      details: "Decreasing volatility",
    },
    {
      label: "RSI",
      value: "65.4",
      change: "+5.2",
      isPositive: true,
      details: "Approaching overbought",
    },
    {
      label: "Volume",
      value: "1.2M",
      change: "-5.4%",
      isPositive: false,
      details: "Below average volume",
    },
  ];

  const patterns = [
    {
      name: "Double Top",
      confidence: 85,
      timeframe: "4H",
      impact: "Bearish",
    },
    {
      name: "Support Level",
      confidence: 92,
      timeframe: "1D",
      impact: "Bullish",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Technical Indicators */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Technical Analysis</h3>
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm text-gray-400">{metric.label}</span>
                <span
                  className={`text-sm ${
                    metric.isPositive ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {metric.change}
                </span>
              </div>
              <div className="text-xl font-bold mb-1">{metric.value}</div>
              <div className="text-sm text-gray-400">{metric.details}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pattern Recognition */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Pattern Recognition</h3>
        <div className="space-y-4">
          {patterns.map((pattern) => (
            <div key={pattern.name} className="bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{pattern.name}</span>
                <span className="text-sm text-gray-400">
                  {pattern.timeframe}
                </span>
              </div>
              <div className="mb-2">
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span>Confidence</span>
                  <span>{pattern.confidence}%</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-blue-600 rounded-full h-2"
                    style={{ width: `${pattern.confidence}%` }}
                  />
                </div>
              </div>
              <div className="text-sm">
                <span className="text-gray-400">Impact: </span>
                <span
                  className={
                    pattern.impact === "Bullish"
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {pattern.impact}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
