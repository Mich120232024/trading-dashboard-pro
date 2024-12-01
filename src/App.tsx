import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Trades from './pages/Trades';
import Analytics from './pages/Analytics';
import TimeSeriesAnalysis from './pages/TimeSeriesAnalysis';

// Command system types
type CommandModule = {
  id: string;
  name: string;
  description: string;
  path: string;
  component: React.ComponentType;
  icon?: string;
};

// Available modules
const availableModules: CommandModule[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Main dashboard with key metrics and charts',
    path: '/',
    component: Dashboard
  },
  {
    id: 'trades',
    name: 'Trades',
    description: 'Trade management and execution',
    path: '/trades',
    component: Trades
  },
  {
    id: 'analytics',
    name: 'Analytics',
    description: 'Advanced analytics and performance metrics',
    path: '/analytics',
    component: Analytics
  },
  {
    id: 'timeseries',
    name: 'Time Series Analysis',
    description: 'Interactive time series analysis with AI',
    path: '/timeseries',
    component: TimeSeriesAnalysis
  },
  // Additional modules
  {
    id: 'portfolio',
    name: 'Portfolio Management',
    description: 'Portfolio construction and optimization',
    path: '/portfolio',
    component: Dashboard // Placeholder
  },
  {
    id: 'risk',
    name: 'Risk Management',
    description: 'Risk analysis and monitoring',
    path: '/risk',
    component: Dashboard // Placeholder
  },
  {
    id: 'backtest',
    name: 'Strategy Backtesting',
    description: 'Backtest trading strategies',
    path: '/backtest',
    component: Dashboard // Placeholder
  },
  {
    id: 'optimization',
    name: 'Strategy Optimization',
    description: 'Optimize trading strategies',
    path: '/optimization',
    component: Dashboard // Placeholder
  }
];

const App: React.FC = () => {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Filter modules based on search
  const filteredModules = availableModules.filter(module =>
    module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    module.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
      if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const handleModuleSelect = (module: CommandModule) => {
    navigate(module.path);
    setIsCommandPaletteOpen(false);
    setSearchTerm('');
  };

  return (
    <>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/trades/*" element={<Trades />} />
          <Route path="/analytics/*" element={<Analytics />} />
          <Route path="/timeseries" element={<TimeSeriesAnalysis />} />
          {availableModules.map(module => (
            <Route key={module.id} path={module.path} element={<module.component />} />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayout>

      {/* Command Palette Modal */}
      {isCommandPaletteOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg w-full max-w-2xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-gray-700">
              <input
                type="text"
                placeholder="Search modules... (Esc to close)"
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
            </div>
            <div className="max-h-96 overflow-y-auto">
              {filteredModules.map((module) => (
                <button
                  key={module.id}
                  className="w-full px-4 py-3 text-left hover:bg-gray-700 focus:bg-gray-700 focus:outline-none"
                  onClick={() => handleModuleSelect(module)}
                >
                  <div className="text-white font-medium">{module.name}</div>
                  <div className="text-gray-400 text-sm">{module.description}</div>
                </button>
              ))}
              {filteredModules.length === 0 && (
                <div className="px-4 py-3 text-gray-400">No modules found</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;