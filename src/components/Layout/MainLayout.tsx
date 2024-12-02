import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3Icon,
  LineChartIcon,
  BookOpenIcon,
  Activity,
  Settings2Icon,
  GaugeIcon,
  CandlestickChartIcon,
  LayoutDashboardIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MenuIcon
} from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { 
      path: '/', 
      label: 'Dashboard', 
      icon: LayoutDashboardIcon,
      description: 'Main overview of all activities'
    },
    { 
      path: '/trades', 
      label: 'Trading', 
      icon: CandlestickChartIcon,
      description: 'Live trading interface'
    },
    { 
      path: '/fx-portfolio', 
      label: 'Portfolio', 
      icon: BookOpenIcon,
      description: 'Portfolio management and analysis'
    },
    { 
      path: '/analytics', 
      label: 'Analytics', 
      icon: BarChart3Icon,
      description: 'Advanced data analytics'
    },
    { 
      path: '/powerbi', 
      label: 'PowerBI', 
      icon: GaugeIcon,
      description: 'Interactive PowerBI dashboards'
    },
    { 
      path: '/timeseries', 
      label: 'Analysis', 
      icon: Activity,
      description: 'Time series analysis tools'
    },
  ];

  const sidebarVariants = {
    expanded: { width: 280 },
    collapsed: { width: 80 }
  };

  const contentVariants = {
    expanded: { marginLeft: 280 },
    collapsed: { marginLeft: 80 }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <motion.div
        initial={false}
        animate={collapsed ? 'collapsed' : 'expanded'}
        variants={sidebarVariants}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-full bg-gray-800/50 backdrop-blur-xl border-r border-gray-700/50 z-50"
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700/50">
          <AnimatePresence mode='wait'>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
              >
                Trading Pro
              </motion.span>
            )}
          </AnimatePresence>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-700/50 transition-colors group"
          >
            {collapsed ? (
              <ChevronRightIcon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            ) : (
              <ChevronLeftIcon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
            )}
          </motion.button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 group
                  ${isActive 
                    ? 'bg-blue-600/20 text-blue-500 border border-blue-500/20' 
                    : 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-100'}`}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className={`w-5 h-5 ${isActive ? 'text-blue-500' : 'group-hover:text-white'}`} />
                <AnimatePresence mode='wait'>
                  {!collapsed && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="ml-4 flex flex-col items-start"
                    >
                      <span className="font-medium">{item.label}</span>
                      <span className="text-xs text-gray-500 group-hover:text-gray-400">
                        {item.description}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
                {isActive && (
                  <motion.div
                    className="absolute inset-0 border border-blue-500/20 rounded-lg"
                    layoutId="active-nav"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Footer */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700/50"
        >
          <motion.button
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/settings')}
            className="w-full flex items-center px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-700/50 hover:text-gray-100 transition-colors group"
          >
            <Settings2Icon className="w-5 h-5" />
            <AnimatePresence mode='wait'>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="ml-4 flex flex-col items-start"
                >
                  <span className="font-medium">Settings</span>
                  <span className="text-xs text-gray-500 group-hover:text-gray-400">
                    Configure your workspace
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        className="flex-1"
        initial={false}
        animate={collapsed ? 'collapsed' : 'expanded'}
        variants={contentVariants}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <AnimatePresence mode='wait'>
          {mounted && (
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="p-8"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default MainLayout;