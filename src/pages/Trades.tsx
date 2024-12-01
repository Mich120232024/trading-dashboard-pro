import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const Trades: React.FC = () => {
  const location = useLocation();
  const currentView = location.pathname.split('/').pop() || 'active';

  // Mock data - replace with real data
  const trades = Array.from({ length: 10 }, (_, i) => ({
    id: `TR-${i + 1}`,
    symbol: ['AAPL', 'GOOGL', 'MSFT', 'AMZN'][i % 4],
    type: ['Buy', 'Sell'][i % 2],
    quantity: Math.floor(Math.random() * 100) + 1,
    price: Math.random() * 1000,
    status: currentView === 'pending' ? 'Pending' : currentView === 'active' ? 'Active' : 'Completed'
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white capitalize">
          {currentView === 'active' && 'Active Trades'}
          {currentView === 'history' && 'Trade History'}
          {currentView === 'pending' && 'Pending Trades'}
        </h1>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Symbol</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {trades.map((trade) => (
                <tr key={trade.id} className="hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{trade.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{trade.symbol}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{trade.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{trade.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">${trade.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{trade.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default Trades;