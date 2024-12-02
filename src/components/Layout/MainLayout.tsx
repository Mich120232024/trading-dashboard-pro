import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HomeIcon,
  BarChart3Icon,
  LineChartIcon,
  PieChartIcon,
  ActivityIcon,
  Settings2Icon,
  MenuIcon,
  GaugeIcon,
  LayoutDashboardIcon
} from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboardIcon },
    { path: '/trades', label: 'Trading', icon: LineChartIcon },
    { path: '/fx-portfolio', label: 'Portfolio', icon: PieChartIcon },
    { path: '/analytics', label: 'Analytics', icon: BarChart3Icon },
    { path: '/powerbi', label: 'PowerBI', icon: GaugeIcon },
    { path: '/timeseries', label: 'Analysis', icon: ActivityIcon },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          width: collapsed ? 80 : 280,
          transition: { duration: 0.3, ease: 'easeInOut' }
        }}
        className="fixed left-0 top-0 h-full bg-gray-800/50 backdrop-blur-md border-r border-gray-700/50"
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700/50">
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text"
              >
                Trading Pro
              </motion.span>
            )}
          </AnimatePresence>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors"
          >
            <MenuIcon className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-600/20 text-blue-500' 
                    : 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-100'}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className="w-5 h-5" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="ml-4"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </nav>

        {/* Footer */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700/50"
        >
          <button
            onClick={() => navigate('/settings')}
            className="w-full flex items-center px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-700/50 hover:text-gray-100 transition-colors"
          >
            <Settings2Icon className="w-5 h-5" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="ml-4"
                >
                  Settings
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        className="flex-1"
        initial={{ marginLeft: 280 }}
        animate={{
          marginLeft: collapsed ? 80 : 280,
          transition: { duration: 0.3, ease: 'easeInOut' }
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-8"
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MainLayout;