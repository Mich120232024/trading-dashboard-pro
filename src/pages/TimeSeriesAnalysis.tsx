import React, { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Brush } from 'recharts';

interface TimeSeriesData {
  timestamp: string;
  value: number;
  prediction?: number;
  upperBound?: number;
  lowerBound?: number;
}

const TimeSeriesAnalysis: React.FC = () => {
  const [query, setQuery] = useState('');
  const [analysisView, setAnalysisView] = useState<'visualization' | 'statistics' | 'forecast'>('visualization');
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);

  // Sample data - replace with real data
  const sampleData: TimeSeriesData[] = Array.from({ length: 100 }, (_, i) => ({
    timestamp: new Date(Date.now() - (100 - i) * 24 * 60 * 60 * 1000).toISOString(),
    value: Math.sin(i * 0.1) * 10 + Math.random() * 5 + 50,
    prediction: Math.sin(i * 0.1) * 10 + 50,
    upperBound: Math.sin(i * 0.1) * 10 + 55,
    lowerBound: Math.sin(i * 0.1) * 10 + 45
  }));

  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement LLM query handling
    console.log('Query submitted:', query);
  };

  return (
    <div className="p-6 space-y-6">
      {/* LLM Query Interface */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <form onSubmit={handleQuerySubmit} className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about your time series data..."
              className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Analyze
            </button>
          </div>
          <div className="flex gap-4">
            {['Mean', 'Trend', 'Seasonality', 'Outliers', 'Forecast'].map((metric) => (
              <label key={metric} className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={selectedMetrics.includes(metric)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedMetrics([...selectedMetrics, metric]);
                    } else {
                      setSelectedMetrics(selectedMetrics.filter(m => m !== metric));
                    }
                  }}
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <span className="ml-2 text-white">{metric}</span>
              </label>
            ))}
          </div>
        </form>
      </div>

      {/* Analysis Controls */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          {['visualization', 'statistics', 'forecast'].map((view) => (
            <button
              key={view}
              onClick={() => setAnalysisView(view as any)}
              className={`px-4 py-2 rounded-lg ${
                analysisView === view ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex space-x-4">
          <select className="bg-gray-700 text-white px-4 py-2 rounded-lg">
            <option>Last 24 Hours</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Custom Range</option>
          </select>
        </div>
      </div>

      {/* Time Series Chart */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="timestamp"
                stroke="#9CA3AF"
                tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
              />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151'
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#10B981"
                dot={false}
                strokeWidth={2}
              />
              {selectedMetrics.includes('Forecast') && (
                <>
                  <Line
                    type="monotone"
                    dataKey="prediction"
                    stroke="#60A5FA"
                    strokeDasharray="5 5"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="upperBound"
                    stroke="#60A5FA"
                    strokeDasharray="2 2"
                    dot={false}
                    opacity={0.5}
                  />
                  <Line
                    type="monotone"
                    dataKey="lowerBound"
                    stroke="#60A5FA"
                    strokeDasharray="2 2"
                    dot={false}
                    opacity={0.5}
                  />
                </>
              )}
              <Brush dataKey="timestamp" height={30} stroke="#4B5563" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Statistics Panel */}
      {analysisView === 'statistics' && (
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-white mb-4">Summary Statistics</h3>
            <div className="space-y-4">
              <div>
                <span className="text-gray-400">Mean:</span>
                <span className="float-right text-white">52.3</span>
              </div>
              <div>
                <span className="text-gray-400">Std Dev:</span>
                <span className="float-right text-white">7.8</span>
              </div>
              <div>
                <span className="text-gray-400">Min:</span>
                <span className="float-right text-white">35.2</span>
              </div>
              <div>
                <span className="text-gray-400">Max:</span>
                <span className="float-right text-white">68.9</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-white mb-4">Trend Analysis</h3>
            <div className="space-y-4">
              <div>
                <span className="text-gray-400">Trend Direction:</span>
                <span className="float-right text-green-500">Upward</span>
              </div>
              <div>
                <span className="text-gray-400">Trend Strength:</span>
                <span className="float-right text-white">0.75</span>
              </div>
              <div>
                <span className="text-gray-400">Seasonality:</span>
                <span className="float-right text-white">Strong</span>
              </div>
              <div>
                <span className="text-gray-400">Cycle Period:</span>
                <span className="float-right text-white">24h</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSeriesAnalysis;