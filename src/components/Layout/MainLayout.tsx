import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard as LayoutDashboardIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Menu as MenuIcon,
  CandlestickChart as CandlestickChartIcon,
} from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    {
      path: "/",
      label: "Dashboard",
      icon: LayoutDashboardIcon,
      description: "Main overview of all activities",
    },
    {
      path: "/trades",
      label: "Trading",
      icon: CandlestickChartIcon,
      description: "Live trading interface",
    },
    {
      path: "/analytics",
      label: "Analytics",
      icon: MenuIcon,
      description: "Detailed analytics and reports",
    },
  ];

  const contentVariants = {
    expanded: { marginLeft: 0 },
    collapsed: { marginLeft: "5rem" },
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <motion.nav
        className={`bg-gray-800 ${
          collapsed ? "w-20" : "w-64"
        } transition-all duration-300`}
        initial={false}
        animate={collapsed ? "collapsed" : "expanded"}
        variants={contentVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex items-center justify-between p-4">
          {!collapsed && <span className="text-xl font-bold">Logo</span>}
          <button onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </button>
        </div>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path} className="group">
              <button
                onClick={() => navigate(item.path)}
                className={`flex items-center w-full p-4 text-left hover:bg-gray-700 transition-colors duration-200 ${
                  location.pathname === item.path ? "bg-gray-700" : ""
                }`}
              >
                <item.icon className="w-6 h-6" />
                {!collapsed && (
                  <div className="ml-4">
                    <span className="font-medium">{item.label}</span>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </motion.nav>

      {/* Main Content */}
      <motion.div
        className="flex-1"
        initial={false}
        animate={collapsed ? "collapsed" : "expanded"}
        variants={contentVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <AnimatePresence mode="wait">
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
