import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart4, 
  PieChart, 
  RefreshCw, 
  Filter, 
  Download, 
  Settings2,
  ChevronDown,
  Table,
  LineChart,
  Activity
} from 'lucide-react';

const mockData = {
  pnlData: [
    { date: '2024-01', value: 1250000 },
    { date: '2024-02', value: 1450000 },
    { date: '2024-03', value: 1350000 },
    { date: '2024-04', value: 1650000 },
    { date: '2024-05', value: 1550000 },
  ],
  exposureData: [
    { currency: 'EUR', value: 2500000 },
    { currency: 'GBP', value: 1800000 },
    { currency: 'JPY', value: 2200000 },
    { currency: 'CHF', value: 1500000 },
  ],
  metrics: {
    totalPnL: 1550000,
    pnlChange: 12.5,
    sharpeRatio: 1.85,
    sortino: 2.1,
    maxDrawdown: -8.5,
    volatility: 15.2
  }
};

const PowerBIAnalytics: React.FC = () => {
  const [selectedView, setSelectedView] = useState('dashboard');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeMetric, setActiveMetric] = useState('pnl');

  const refreshData = async () => {
    setIsRefreshing(true);
    await new Promise(r => setTimeout(r, 1000));
    setIsRefreshing(false);
  };

  const views = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart4 },
    { id: 'performance', label: 'Performance', icon: LineChart },
    { id: 'risk', label: 'Risk Analysis', icon: Activity },
    { id: 'allocations', label: 'Allocations', icon: PieChart },
    { id: 'detailed', label: 'Detailed View', icon: Table }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold gradient-text">Analytics Dashboard</h1>
          <p className="text-gray-400">Real-time portfolio analysis and insights</p>
        </div>

        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={refreshData}
            className="btn-primary flex items-center gap-2"
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh Data
          </motion.button>
        </div>
      </div>

      {/* Views Navigation */}
      <div className="flex space-x-4 border-b border-gray-700">
        {views.map((view) => (
          <button
            key={view.id}
            onClick={() => setSelectedView(view.id)}
            className={`flex items-center space-x-2 px-4 py-2 -mb-px ${selectedView === view.id ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-400 hover:text-gray-300'}`}
          >
            <view.icon className="w-4 h-4" />
            <span>{view.label}</span>
          </button>
        ))}
      </div>

      {/* Mock PowerBI Content */}
      <div className="grid grid-cols-4 gap-6">
        <Card className="glass-morphism col-span-4">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Performance Overview</CardTitle>
              <div className="flex items-center space-x-4">
                <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                  <Filter className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                  <Settings2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] flex items-center justify-center bg-gray-800/50 rounded-lg">
              <div className="text-center">
                <BarChart4 className="w-16 h-16 mx-auto mb-4 text-gray-500" />
                <p className="text-lg font-medium">PowerBI Visualization Placeholder</p>
                <p className="text-sm text-gray-400 mt-2">Configure Azure credentials to view live PowerBI reports</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="glass-morphism">
          <CardHeader>
            <CardTitle>Key Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(mockData.metrics).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  <span className="font-mono">{typeof value === 'number' ? value.toFixed(2) : value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism col-span-2">
          <CardHeader>
            <CardTitle>Analysis Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Correlation Analysis</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
                <p className="text-sm text-gray-400">Analyze cross-asset correlations</p>
              </button>

              <button className="p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Risk Attribution</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
                <p className="text-sm text-gray-400">Detailed risk factor analysis</p>
              </button>

              <button className="p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Performance Attribution</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
                <p className="text-sm text-gray-400">Factor-based performance breakdown</p>
              </button>

              <button className="p-4 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Scenario Analysis</span>
                  <ChevronDown className="w-4 h-4" />
                </div>
                <p className="text-sm text-gray-400">Stress testing and scenarios</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PowerBIAnalytics;