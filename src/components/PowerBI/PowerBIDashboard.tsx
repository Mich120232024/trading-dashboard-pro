import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw, Filter, Download, Settings2, Maximize2, PanelLeftClose, Table, BarChart4 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PowerBIConfig {
  embedUrl?: string;
  reportId?: string;
  filters?: any[];
  refreshInterval?: number;
}

interface PowerBIDashboardProps {
  config?: PowerBIConfig;
}

const PowerBIDashboard: React.FC<PowerBIDashboardProps> = ({ config }) => {
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(30); // seconds
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const [fullscreen, setFullscreen] = useState(false);
  const [view, setView] = useState<'visual' | 'table'>('visual');
  const [selectedVisual, setSelectedVisual] = useState('dashboard');

  const handleRefresh = useCallback(async () => {
    setLoading(true);
    try {
      // Here we'll integrate with actual PowerBI refresh
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLastRefresh(new Date());
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(handleRefresh, refreshInterval * 1000);
    return () => clearInterval(interval);
  }, [refreshInterval, handleRefresh]);

  const visuals = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart4 },
    { id: 'revenue', label: 'Revenue Analysis', icon: BarChart4 },
    { id: 'performance', label: 'Performance Metrics', icon: BarChart4 },
    { id: 'insights', label: 'Key Insights', icon: BarChart4 },
  ];

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex justify-between items-center bg-gray-800/50 p-4 rounded-lg backdrop-blur-sm border border-gray-700/50 shadow-lg">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            PowerBI Analytics
          </h2>
          <div className="text-sm text-gray-400 flex items-center space-x-2">
            <span>Last refresh:</span>
            <span className="text-gray-300">{lastRefresh.toLocaleTimeString()}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setView(view === 'visual' ? 'table' : 'visual')}
            className="p-2 hover:bg-gray-700/50 rounded-lg transition-all duration-200 hover:scale-105"
            title={view === 'visual' ? 'Switch to Table View' : 'Switch to Visual View'}
          >
            {view === 'visual' ? <Table className="w-5 h-5" /> : <BarChart4 className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${showFilters ? 'bg-blue-500/20 text-blue-500' : 'hover:bg-gray-700/50'}`}
            title="Toggle Filters"
          >
            <Filter className="w-5 h-5" />
          </button>

          <button
            onClick={handleRefresh}
            className={`p-2 hover:bg-gray-700/50 rounded-lg transition-all duration-200 hover:scale-105 ${loading ? 'opacity-50' : ''}`}
            disabled={loading}
            title="Refresh Data"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            className="p-2 hover:bg-gray-700/50 rounded-lg transition-all duration-200 hover:scale-105"
            title="Download Report"
          >
            <Download className="w-5 h-5" />
          </button>

          <button
            onClick={() => setFullscreen(!fullscreen)}
            className="p-2 hover:bg-gray-700/50 rounded-lg transition-all duration-200 hover:scale-105"
            title="Toggle Fullscreen"
          >
            <Maximize2 className="w-5 h-5" />
          </button>

          <button
            className="p-2 hover:bg-gray-700/50 rounded-lg transition-all duration-200 hover:scale-105"
            title="Settings"
          >
            <Settings2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Visual Selection */}
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {visuals.map((visual) => (
          <button
            key={visual.id}
            onClick={() => setSelectedVisual(visual.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200
              ${selectedVisual === visual.id 
                ? 'bg-blue-500/20 text-blue-500 border border-blue-500/50' 
                : 'hover:bg-gray-700/50 text-gray-400 hover:text-gray-200'}`}
          >
            <visual.icon className="w-4 h-4" />
            <span>{visual.label}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-6" style={{ gridTemplateColumns: showFilters ? '280px 1fr' : '1fr' }}>
        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="h-full bg-gray-800/50 backdrop-blur-sm border-gray-700/50 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Filters</CardTitle>
                  <button 
                    onClick={() => setShowFilters(false)} 
                    className="text-gray-400 hover:text-gray-300 transition-colors"
                  >
                    <PanelLeftClose className="w-4 h-4" />
                  </button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Date Range</label>
                      <select className="w-full bg-gray-700 border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-blue-500 transition-all duration-200">
                        <option>Last 24 Hours</option>
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>Custom Range</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Metrics</label>
                      <div className="space-y-2">
                        {['Volume', 'Price', 'Trades', 'P&L', 'Risk'].map((metric) => (
                          <label key={metric} className="flex items-center space-x-2 p-2 hover:bg-gray-700/50 rounded-md transition-colors">
                            <input 
                              type="checkbox" 
                              className="rounded bg-gray-700 border-gray-600 focus:ring-2 focus:ring-blue-500 transition-all duration-200" 
                            />
                            <span className="text-sm">{metric}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Refresh Rate</label>
                      <select 
                        value={refreshInterval}
                        onChange={(e) => setRefreshInterval(Number(e.target.value))}
                        className="w-full bg-gray-700 border-gray-600 rounded-md p-2 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      >
                        <option value={15}>15 seconds</option>
                        <option value={30}>30 seconds</option>
                        <option value={60}>1 minute</option>
                        <option value={300}>5 minutes</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Visual Type</label>
                      <div className="grid grid-cols-2 gap-2">
                        {['Bar', 'Line', 'Pie', 'Area'].map((type) => (
                          <button
                            key={type}
                            className="p-2 bg-gray-700/50 hover:bg-gray-700 rounded-md transition-all duration-200 text-sm"
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <motion.div
          layout
          className="h-[calc(100vh-13rem)]"
        >
          <Card className="h-full bg-gray-800/50 backdrop-blur-sm border-gray-700/50 shadow-lg">
            <CardContent className="p-6 h-full">
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                {loading ? (
                  <div className="flex flex-col items-center space-y-4">
                    <RefreshCw className="w-8 h-8 animate-spin" />
                    <span>Loading PowerBI Report...</span>
                  </div>
                ) : (
                  <div className="text-center">
                    <BarChart4 className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                    <p>PowerBI Report will be embedded here</p>
                    <p className="text-sm text-gray-500 mt-2">Configure Azure connection to view live data</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PowerBIDashboard;