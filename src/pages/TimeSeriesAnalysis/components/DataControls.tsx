import React from 'react';
import { ChartBarIcon, ArrowPathIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

interface DataControlsProps {
  activeDataset: string;
  setActiveDataset: (dataset: string) => void;
  timeRange: string;
  setTimeRange: (range: string) => void;
  analysisMode: 'basic' | 'advanced';
  setAnalysisMode: (mode: 'basic' | 'advanced') => void;
}

const DataControls: React.FC<DataControlsProps> = ({
  activeDataset,
  setActiveDataset,
  timeRange,
  setTimeRange,
  analysisMode,
  setAnalysisMode,
}) => {
  const datasets = ['EUR/USD', 'GBP/USD', 'USD/JPY', 'BTC/USD', 'ETH/USD'];
  const timeRanges = ['5m', '15m', '1H', '4H', '1D', '1W'];

  return (
    <div className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
      <div className="flex items-center space-x-6">
        {/* Dataset Selector */}
        <div className="flex items-center space-x-2">
          <ChartBarIcon className="w-5 h-5 text-gray-400" />
          <select
            value={activeDataset}
            onChange={(e) => setActiveDataset(e.target.value)}
            className="bg-gray-700 text-white px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {datasets.map((dataset) => (
              <option key={dataset} value={dataset}>
                {dataset}
              </option>
            ))}
          </select>
        </div>

        {/* Time Range Controls */}
        <div className="flex items-center space-x-2">
          <ArrowPathIcon className="w-5 h-5 text-gray-400" />
          <div className="flex bg-gray-700 rounded-lg p-1">
            {timeRanges.map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-lg text-sm ${timeRange === range ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Analysis Mode Toggle */}
        <div className="flex items-center space-x-2">
          <AdjustmentsHorizontalIcon className="w-5 h-5 text-gray-400" />
          <div className="flex bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setAnalysisMode('basic')}
              className={`px-3 py-1 rounded-lg text-sm ${analysisMode === 'basic' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
            >
              Basic
            </button>
            <button
              onClick={() => setAnalysisMode('advanced')}
              className={`px-3 py-1 rounded-lg text-sm ${analysisMode === 'advanced' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-600'}`}
            >
              Advanced
            </button>
          </div>
        </div>
      </div>

      {/* Additional Controls */}
      <div className="flex items-center space-x-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Export Data
        </button>
        <button className="p-2 hover:bg-gray-700 rounded-lg">
          <AdjustmentsHorizontalIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default DataControls;