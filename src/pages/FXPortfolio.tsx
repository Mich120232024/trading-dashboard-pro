import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart3, 
  LineChart as LineChartIcon, 
  PieChart as PieChartIcon,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Filter,
  Download,
  Calendar,
  DollarSign,
  Percent,
  AlertTriangle,
  TrendingUp,
  Wallet,
  Shield
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Area, 
  AreaChart, Scatter, ScatterChart 
} from 'recharts';
import { formatCurrency, formatPercentage, formatNumber } from '@/lib/utils/formatters';

// Chart colors
const COLORS = ['#3B82F6', '#22C55E', '#EF4444', '#F59E0B', '#8B5CF6'];

const FXPortfolio: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('1D');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('pnl');

  // Risk metrics data
  const riskMetrics = {
    varDaily: 125000,
    varWeekly: 275000,
    expectedShortfall: 185000,
    stressTest: 450000,
    correlations: [
      { id: 'EUR/USD vs GBP/USD', value: 0.85 },
      { id: 'EUR/USD vs USD/JPY', value: -0.45 },
      { id: 'GBP/USD vs USD/JPY', value: -0.32 }
    ],
    sensitivityAnalysis: [
      { factor: 'Interest Rate +1%', impact: -125000 },
      { factor: 'FX Volatility +10%', impact: -85000 },
      { factor: 'USD Strength +5%', impact: 195000 }
    ]
  };

  // Portfolio exposure data
  const exposureData = [
    { currency: 'EUR', long: 2500000, short: -1500000, net: 1000000 },
    { currency: 'GBP', long: 1800000, short: -2100000, net: -300000 },
    { currency: 'JPY', long: 2200000, short: -1200000, net: 1000000 },
    { currency: 'CHF', long: 1500000, short: -1800000, net: -300000 }
  ];

  // Performance attribution
  const performanceAttribution = [
    { factor: 'Carry', value: 35 },
    { factor: 'Value', value: 25 },
    { factor: 'Momentum', value: 20 },
    { factor: 'Volatility', value: 15 },
    { factor: 'Other', value: 5 }
  ];

  // Risk scatter data
  const riskReturnData = positions.map(pos => ({
    pair: pos.pair,
    risk: pos.risk,
    return: pos.pnlPercent,
    size: Math.abs(pos.position) / 10000
  }));

  return (
    <div className="space-y-6">
      {/* Previous header and stats code remains the same */}

      {activeTab === 'risk' && (
        <motion.div
          key="risk"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Risk Metrics */}
          <Card className="glass-morphism-hover">
            <CardHeader>
              <CardTitle>Risk Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { label: 'Daily VaR (95%)', value: riskMetrics.varDaily },
                  { label: 'Weekly VaR (95%)', value: riskMetrics.varWeekly },
                  { label: 'Expected Shortfall', value: riskMetrics.expectedShortfall },
                  { label: 'Stress Test Loss', value: riskMetrics.stressTest }
                ].map((metric) => (
                  <div key={metric.label} className="flex justify-between items-center p-2 hover:bg-gray-800/50 rounded-lg transition-colors">
                    <span className="text-gray-400">{metric.label}</span>
                    <span className="font-mono text-red-500">
                      {formatCurrency(metric.value)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Risk Return Scatter */}
          <Card className="glass-morphism-hover lg:col-span-2">
            <CardHeader>
              <CardTitle>Risk/Return Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis 
                      type="number" 
                      dataKey="risk" 
                      name="Risk" 
                      stroke="#666"
                      label={{ value: 'Risk (%)', position: 'bottom', fill: '#666' }} 
                    />
                    <YAxis 
                      type="number" 
                      dataKey="return" 
                      name="Return" 
                      stroke="#666"
                      label={{ value: 'Return (%)', angle: -90, position: 'left', fill: '#666' }} 
                    />
                    <Tooltip 
                      cursor={{ strokeDasharray: '3 3' }}
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                    />
                    <Legend />
                    <Scatter 
                      name="Positions" 
                      data={riskReturnData} 
                      fill="#8884d8"
                    >
                      {riskReturnData.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Exposure Analysis */}
          <Card className="glass-morphism-hover lg:col-span-2">
            <CardHeader>
              <CardTitle>Exposure Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={exposureData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="currency" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px'
                      }}
                      formatter={(value) => formatCurrency(Math.abs(Number(value)))}
                    />
                    <Legend />
                    <Bar dataKey="long" name="Long" fill="#22C55E" />
                    <Bar dataKey="short" name="Short" fill="#EF4444" />
                    <Bar dataKey="net" name="Net" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Correlation Matrix */}
          <Card className="glass-morphism-hover">
            <CardHeader>
              <CardTitle>Correlation Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskMetrics.correlations.map((corr) => (
                  <div key={corr.id} className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-400">{corr.id}</span>
                      <span className={`font-mono ${
                        corr.value > 0.7 ? 'text-red-500' : 
                        corr.value < -0.7 ? 'text-green-500' : 
                        'text-yellow-500'
                      }`}>
                        {corr.value.toFixed(2)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          corr.value > 0 ? 'bg-red-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.abs(corr.value * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Add other tabs content */}
    </div>
  );
};

export default FXPortfolio;