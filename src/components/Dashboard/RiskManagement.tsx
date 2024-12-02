import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface RiskMetric {
  name: string;
  value: number;
  change: number;
  status: 'good' | 'warning' | 'danger';
}

const RiskManagement: React.FC = () => {
  const riskMetrics: RiskMetric[] = [
    {
      name: 'Value at Risk (95%)',
      value: 12500,
      change: 5.2,
      status: 'warning'
    },
    {
      name: 'Expected Shortfall',
      value: 15000,
      change: 3.8,
      status: 'warning'
    },
    {
      name: 'Maximum Drawdown',
      value: 8500,
      change: -2.1,
      status: 'good'
    },
    {
      name: 'Position Leverage',
      value: 4.2,
      change: 0.5,
      status: 'warning'
    },
    {
      name: 'Correlation Risk',
      value: 0.65,
      change: 0.08,
      status: 'good'
    },
    {
      name: 'Stress Test Loss',
      value: 25000,
      change: 12.5,
      status: 'danger'
    }
  ];

  const correlationMatrix = [
    ['EUR/USD', 1, 0.65, -0.45],
    ['GBP/USD', 0.65, 1, -0.32],
    ['USD/JPY', -0.45, -0.32, 1]
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      case 'danger':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const formatValue = (value: number): string => {
    if (value > 1000) {
      return `$${value.toLocaleString()}`;
    }
    return value.toFixed(2);
  };

  return (
    <div className="space-y-6">
      {/* Risk Metrics Grid */}
      <div className="grid grid-cols-3 gap-4">
        {riskMetrics.map((metric) => (
          <Card key={metric.name}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">{metric.name}</p>
                  <h3 className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>
                    {formatValue(metric.value)}
                  </h3>
                  <div className="flex items-center mt-1">
                    {metric.change >= 0 ? (
                      <ArrowUpRight className="w-4 h-4 text-red-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-green-500" />
                    )}
                    <span className={metric.change >= 0 ? 'text-red-500' : 'text-green-500'}>
                      {Math.abs(metric.change)}%
                    </span>
                  </div>
                </div>
                <AlertTriangle className={`h-8 w-8 ${getStatusColor(metric.status)}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Correlation Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Currency Pair Correlations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left">Pair</th>
                  <th className="px-4 py-2 text-right">EUR/USD</th>
                  <th className="px-4 py-2 text-right">GBP/USD</th>
                  <th className="px-4 py-2 text-right">USD/JPY</th>
                </tr>
              </thead>
              <tbody>
                {correlationMatrix.map((row, i) => (
                  <tr key={i} className="border-b">
                    {row.map((value, j) => (
                      <td 
                        key={j} 
                        className={`px-4 py-2 ${j === 0 ? 'text-left' : 'text-right'}`}
                      >
                        {j === 0 ? value : (
                          <span className={value === 1 ? 'text-white' : 
                            value > 0 ? 'text-yellow-500' : 'text-blue-500'}
                          >
                            {value.toFixed(2)}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Risk Limits */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Limits & Thresholds</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Daily VaR Limit</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-700 h-2 rounded-full">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full" 
                    style={{ width: '75%' }}
                  />
                </div>
                <span className="text-yellow-500">75%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Position Size Limit</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-700 h-2 rounded-full">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: '45%' }}
                  />
                </div>
                <span className="text-green-500">45%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>Leverage Limit</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-700 h-2 rounded-full">
                  <div 
                    className="bg-red-500 h-2 rounded-full" 
                    style={{ width: '90%' }}
                  />
                </div>
                <span className="text-red-500">90%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskManagement;