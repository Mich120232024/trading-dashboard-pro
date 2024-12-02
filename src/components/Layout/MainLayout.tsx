import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChartBarIcon, ArrowTrendingUpIcon, ChartPieIcon, CogIcon, BeakerIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: ChartBarIcon },
    { path: '/trades', label: 'Trades', icon: ArrowTrendingUpIcon },
    { path: '/fx-portfolio', label: 'FX Portfolio', icon: CurrencyDollarIcon },
    { path: '/analytics', label: 'Analytics', icon: ChartPieIcon },
    { path: '/timeseries', label: 'Time Series', icon: BeakerIcon },
  ];

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div className={`${collapsed ? 'w-16' : 'w-64'} bg-gray-800 transition-all duration-300`}>
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          {!collapsed && <span className="text-lg font-bold text-white">Trading Pro</span>}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-lg hover:bg-gray-700"
          >
            <ChartBarIcon className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <nav className="mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`
                  w-full flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700
                  ${location.pathname === item.path ? 'bg-gray-700 text-white' : ''}
                `}
              >
                <Icon className="w-5 h-5" />
                {!collapsed && <span className="ml-3">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
          <button 
            onClick={() => navigate('/settings')}
            className="w-full flex items-center text-gray-300 hover:bg-gray-700 px-4 py-2 rounded-lg"
          >
            <CogIcon className="w-5 h-5" />
            {!collapsed && <span className="ml-3">Settings</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;