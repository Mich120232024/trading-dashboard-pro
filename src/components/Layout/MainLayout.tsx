import React from "react";
import { Link, useLocation } from "react-router-dom";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActivePath = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="w-64 bg-gray-800 text-white p-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Trading Pro</h1>
        </div>
        <nav className="space-y-2">
          <Link
            to="/"
            className={`block px-4 py-2 rounded-lg transition-colors ${isActivePath('/') && location.pathname === '/' ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
          >
            Dashboard
          </Link>
          <div className="pt-4">
            <h2 className="px-4 text-sm font-semibold text-gray-400 uppercase">Trading</h2>
            <div className="mt-2 space-y-1">
              <Link
                to="/trades/active"
                className={`block px-4 py-2 rounded-lg transition-colors ${isActivePath('/trades/active') ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              >
                Active Trades
              </Link>
              <Link
                to="/trades/history"
                className={`block px-4 py-2 rounded-lg transition-colors ${isActivePath('/trades/history') ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              >
                History
              </Link>
              <Link
                to="/trades/pending"
                className={`block px-4 py-2 rounded-lg transition-colors ${isActivePath('/trades/pending') ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              >
                Pending
              </Link>
            </div>
          </div>
          <div className="pt-4">
            <h2 className="px-4 text-sm font-semibold text-gray-400 uppercase">Analysis</h2>
            <div className="mt-2 space-y-1">
              <Link
                to="/analytics/performance"
                className={`block px-4 py-2 rounded-lg transition-colors ${isActivePath('/analytics/performance') ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              >
                Performance
              </Link>
              <Link
                to="/analytics/risk"
                className={`block px-4 py-2 rounded-lg transition-colors ${isActivePath('/analytics/risk') ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              >
                Risk Analysis
              </Link>
              <Link
                to="/analytics/portfolio"
                className={`block px-4 py-2 rounded-lg transition-colors ${isActivePath('/analytics/portfolio') ? 'bg-blue-600' : 'hover:bg-gray-700'}`}
              >
                Portfolio
              </Link>
            </div>
          </div>
        </nav>
      </div>
      <main className="flex-1 overflow-auto bg-gray-900 p-8">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
