import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import TradeList from '../components/Dashboard/TradeList';

// Sample data with different statuses
const allTrades = Array.from({ length: 50 }, (_, i) => ({
  id: `TR-${i + 1}`,
  type: ['Market', 'Limit', 'Stop'][i % 3],
  status: ['Active', 'Completed', 'Pending'][i % 3],
  amount: Math.round(Math.random() * 10000),
  date: new Date(Date.now() - i * 86400000).toLocaleDateString()
}));

const ActiveTrades: React.FC = () => {
  const trades = allTrades.filter(t => t.status === 'Active');
  return <TradeList trades={trades} onTradeSelect={() => {}} />;
};

const CompletedTrades: React.FC = () => {
  const trades = allTrades.filter(t => t.status === 'Completed');
  return <TradeList trades={trades} onTradeSelect={() => {}} />;
};

const PendingTrades: React.FC = () => {
  const trades = allTrades.filter(t => t.status === 'Pending');
  return <TradeList trades={trades} onTradeSelect={() => {}} />;
};

const Trades: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const navigate = useNavigate();

  const tabs = [
    { id: 'active', label: 'Active', path: '/trades/active' },
    { id: 'completed', label: 'Completed', path: '/trades/completed' },
    { id: 'pending', label: 'Pending', path: '/trades/pending' }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Trades</h1>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search trades..."
            className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`py-4 px-1 border-b-2 font-medium text-sm
                ${location.pathname === tab.path
                  ? 'border-blue-500 text-blue-500'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'}
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Routes for different trade views */}
      <div className="bg-gray-800 rounded-lg p-6">
        <Routes>
          <Route path="active" element={<ActiveTrades />} />
          <Route path="completed" element={<CompletedTrades />} />
          <Route path="pending" element={<PendingTrades />} />
        </Routes>
      </div>
    </div>
  );
};

export default Trades;