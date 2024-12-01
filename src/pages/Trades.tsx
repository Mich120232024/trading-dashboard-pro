import React from 'react';
import { useLocation } from 'react-router-dom';

interface TradesProps {
  view?: 'active' | 'history' | 'pending';
}

const Trades: React.FC<TradesProps> = ({ view = 'active' }) => {
  const location = useLocation();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">
          {view === 'active' && 'Active Trades'}
          {view === 'history' && 'Trade History'}
          {view === 'pending' && 'Pending Trades'}
        </h1>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        {/* Trade content will go here */}
        <p className="text-gray-400">Current view: {view}</p>
      </div>
    </div>
  );
};

export default Trades;