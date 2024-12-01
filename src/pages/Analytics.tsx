import React from 'react';
import { useLocation } from 'react-router-dom';

interface AnalyticsProps {
  view?: 'performance' | 'risk' | 'portfolio';
}

const Analytics: React.FC<AnalyticsProps> = ({ view = 'performance' }) => {
  const location = useLocation();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">
          {view === 'performance' && 'Performance Analytics'}
          {view === 'risk' && 'Risk Analysis'}
          {view === 'portfolio' && 'Portfolio Analysis'}
        </h1>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        {/* Analytics content will go here */}
        <p className="text-gray-400">Current view: {view}</p>
      </div>
    </div>
  );
};

export default Analytics;