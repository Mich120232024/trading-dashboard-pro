import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { PerformanceChart } from '../components/Dashboard/Charts/PerformanceChart';
import { DrawdownChart } from '../components/Dashboard/Charts/DrawdownChart';

const Analytics: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: 'performance', label: 'Performance', path: '/analytics/performance' },
    { id: 'risk', label: 'Risk Analysis', path: '/analytics/risk' },
    { id: 'portfolio', label: 'Portfolio', path: '/analytics/portfolio' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        
        <div className="flex items-center space-x-4">
          <select className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>Year to Date</option>
            <option>All Time</option>
          </select>
        </div>
      </div>

      <div className="border-b border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`
                py-4 px-1 border-b-2 font-medium text-sm
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

      <div className="bg-gray-800 rounded-lg p-6">
        <Routes>
          <Route path="performance" element={<PerformanceView />} />
          <Route path="risk" element={<RiskView />} />
          <Route path="portfolio" element={<PortfolioView />} />
        </Routes>
      </div>
    </div>
  );
};

// Performance View Component
const PerformanceView: React.FC = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gray-700 p-6 rounded-lg">
        <h3 className="text-gray-400 text-sm font-medium">Total Return</h3>
        <p className="text-white text-2xl font-bold mt-2">+23.45%</p>
        <span className="text-green-500 text-sm">+2.5% vs benchmark</span>
      </div>
      <div className="bg-gray-700 p-6 rounded-lg">
        <h3 className="text-gray-400 text-sm font-medium">Sharpe Ratio</h3>
        <p className="text-white text-2xl font-bold mt-2">1.82</p>
        <span className="text-blue-500 text-sm">Good risk-adjusted return</span>
      </div>
      <div className="bg-gray-700 p-6 rounded-lg">
        <h3 className="text-gray-400 text-sm font-medium">Max Drawdown</h3>
        <p className="text-white text-2xl font-bold mt-2">-12.34%</p>
        <span className="text-yellow-500 text-sm">Within risk limits</span>
      </div>
    </div>
    <PerformanceChart data={samplePerformanceData} />
  </div>
);

// Risk View Component
const RiskView: React.FC = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gray-700 p-6 rounded-lg">
        <h3 className="text-gray-400 text-sm font-medium">Value at Risk</h3>
        <p className="text-white text-2xl font-bold mt-2">$12,345</p>
        <span className="text-yellow-500 text-sm">95% confidence</span>
      </div>
      <div className="bg-gray-700 p-6 rounded-lg">
        <h3 className="text-gray-400 text-sm font-medium">Beta</h3>
        <p className="text-white text-2xl font-bold mt-2">0.85</p>
        <span className="text-blue-500 text-sm">vs S&P 500</span>
      </div>
      <div className="bg-gray-700 p-6 rounded-lg">
        <h3 className="text-gray-400 text-sm font-medium">Volatility</h3>
        <p className="text-white text-2xl font-bold mt-2">15.67%</p>
        <span className="text-green-500 text-sm">30-day rolling</span>
      </div>
    </div>
    <DrawdownChart data={sampleDrawdownData} />
  </div>
);

// Portfolio View Component
const PortfolioView: React.FC = () => (
  <div className="space-y-6">
    <div className="bg-gray-700 p-6 rounded-lg">
      <h2 className="text-white text-lg font-medium mb-4">Asset Allocation</h2>
      <div className="h-64 flex items-center justify-center text-gray-400">
        [Asset Allocation Chart Placeholder]
      </div>
    </div>
  </div>
);

export default Analytics;